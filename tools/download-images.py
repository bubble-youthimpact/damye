"""
Copies every restaurant photo from Bubble's image server into
assets/img/restaurants/ and updates assets/js/restaurants.js to use the local copies.

Run it once, from the damye-site folder, BEFORE you close the Bubble app:

    python3 tools/download-images.py        (Mac)
    python tools/download-images.py         (Windows)

Safe to run again: photos that were already downloaded are skipped.
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
DATA = os.path.join(SITE, "assets", "js", "restaurants.js")
IMG_DIR = os.path.join(SITE, "assets", "img", "restaurants")

text = open(DATA, encoding="utf-8").read()
start = text.index("window.DAMYE_RESTAURANTS = [")
head, body = text[:start], text[start:]
lines = body.split("\n")

os.makedirs(IMG_DIR, exist_ok=True)
done = skipped = failed = 0

for i, line in enumerate(lines):
    m = re.match(r"^(\s*)(\{.*\})(,?)$", line)
    if not m:
        continue
    r = json.loads(m.group(2))
    url = r.get("image", "")
    if not url.startswith("http"):
        skipped += 1
        continue
    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower() or ".jpg"
    if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        ext = ".jpg"
    name = r["id"] + ext
    dest = os.path.join(IMG_DIR, name)
    try:
        if not os.path.exists(dest):
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as resp, open(dest, "wb") as f:
                f.write(resp.read())
            time.sleep(0.1)
        r["image"] = "assets/img/restaurants/" + name
        lines[i] = m.group(1) + json.dumps(r, ensure_ascii=False) + m.group(3)
        done += 1
        print("ok   ", name)
    except Exception as e:  # keep the Bubble link if a download fails
        failed += 1
        print("FAIL ", r["id"], "-", e)

open(DATA, "w", encoding="utf-8").write(head + "\n".join(lines))
print(f"\nDownloaded/updated: {done}   already local: {skipped}   failed: {failed}")
if failed:
    print("Run the script again to retry the failed ones.")
    sys.exit(1)
