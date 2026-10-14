/* =========================================================
   DAMYE INSIGHT REPORTS  (shown on the Reports page)
   ---------------------------------------------------------
   To add a report:
     1. Put the PDF in assets/reports/  (name it after the restaurant id, e.g. mokro.pdf)
     2. Put a cover image in assets/reports/covers/  (e.g. mokro.webp, 3:2 shape)
     3. Copy one { … } block below and change the values.

   Fields:
     id        restaurant id from restaurants.js — used for the file names and
               for the "View restaurant" button
     area      neighborhood shown on the card
     title     short headline for the card
     desc      one or two sentences on what the report found
     reviews   number of Google Maps reviews analyzed
     pages     number of pages in the PDF
     date      month the report was made
     sent      true shows a "Sent" label (report delivered to the restaurant)
   ========================================================= */
window.DAMYE_REPORTS = [
  {
    id: "naris-house", area: "Hannam-dong, Yongsan",
    title: "The pork brings them in, the sides bring them back",
    desc: "Guests come for frozen samgyeopsal but return for the cheonggukjang and green-onion salad. Long waits and rushed service are the main complaints.",
    reviews: 566, pages: 9, date: "Oct 2026", sent: false
  },
  {
    id: "no-1-lamb-skewers", area: "Hannam-dong, Yongsan",
    title: "Lamb ribs guests call the best in Korea",
    desc: "Clean-tasting lamb ribs and skewers are praised alongside dishes like guobaorou and mapo tofu. Long waits and little guidance on grilling hold it back.",
    reviews: 162, pages: 8, date: "Oct 2026", sent: false
  },
  {
    id: "ranju-kalmyeon", area: "Myeongdong, Jung-gu",
    title: "Knife-cut noodles worth the line",
    desc: "Chewy dosakmyeon, crispy guobaorou and big portions keep the queue long, and foreign guests rate it highly. Waits and unannounced ordering rules lower satisfaction.",
    reviews: 1625, pages: 9, date: "Oct 2026", sent: false
  },
  {
    id: "pizzeria-d-buzza", area: "Hannam-dong, Yongsan",
    title: "Wood-fired crust, and sides as loved as the pizza",
    desc: "Chewy wood-fired dough, fresh arugula, Caesar salad and pumpkin soup draw long lines. Waits of up to three hours and a cramped room are the biggest challenge.",
    reviews: 956, pages: 9, date: "Oct 2026", sent: false
  },
  {
    id: "seorae-jjukkumi", area: "Seorae Village, Seocho",
    title: "Smoky jjukkumi that even spice-shy guests enjoy",
    desc: "Mild, fire-grilled webfoot octopus, crispy jeon and fair prices for Seorae Village stand out. Repeated comments about staff attitude are the main thing to fix.",
    reviews: 320, pages: 8, date: "Oct 2026", sent: false
  },
  {
    id: "sinsuk", area: "Seocho-dong, Seocho",
    title: "Kalguksu where the kimchi steals the show",
    desc: "Guests praise the kimchi as much as the noodles, giving the food 4.7 out of 5. Lunch waits, shared tables and being rushed out are the pain points.",
    reviews: 313, pages: 8, date: "Oct 2026", sent: false
  },
  {
    id: "yetnal-guksi", area: "Itaewon, Yongsan",
    title: "Mini gimbap and perilla sujebi keep regulars coming",
    desc: "The mini gimbap and perilla sujebi pairing wins over decade-long regulars and foreign guests. Portion size, cleanliness and self-service draw complaints.",
    reviews: 103, pages: 8, date: "Oct 2026", sent: false
  },
  {
    id: "jinmi-pyeongyang-naengmyeon", area: "Near Hakdong Station, Gangnam",
    title: "Cold noodles, with the side dishes as hidden stars",
    desc: "Dumplings, boiled pork and eobok jaengban get as much praise as the naengmyeon. The mild broth divides first-timers, and the busy room is loud.",
    reviews: 3547, pages: 9, date: "Oct 2026", sent: false
  },
  {
    id: "pizzeria-hokey-pokey", area: "Seocho-dong, Seocho",
    title: "American-style pizza and wings before a show",
    desc: "Chewy, crisp dough, unusual toppings and true Buffalo wings make it a favorite near Seoul Arts Center. Saltiness and a small room split opinions.",
    reviews: 257, pages: 8, date: "Oct 2026", sent: false
  }
];
