"""
Test the site on your computer with the same clean addresses as GitHub Pages
(/about, /restaurants, /restaurant?id=mokro ...).

From the damye-site folder:

    python3 tools/serve.py          (Mac)
    python tools/serve.py           (Windows)

Then open http://localhost:8000   —   press Ctrl + C to stop.
"""
import http.server
import os
import socketserver
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8000


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        parts = urllib.parse.urlsplit(self.path)
        path = parts.path
        local = os.path.join(ROOT, path.lstrip("/"))
        # /about  ->  /about.html   (only when no file or folder of that name exists)
        if path not in ("", "/") and not os.path.exists(local) and os.path.exists(local + ".html"):
            self.path = path + ".html" + ("?" + parts.query if parts.query else "")
        return super().do_GET()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
    print(f"Damye is running at http://localhost:{PORT}  (Ctrl + C to stop)")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
