# 🔗 Serverless URL Shortener & Analytics Dashboard

A full-stack, serverless web application that allows users to convert long URLs into highly clickable short links, complete with a real-time analytics dashboard to track link traffic.

## ✨ Features
* **Instant URL Shortening:** Generates a random, unique 6-character short code for any valid URL.
* **Real-Time Analytics:** Tracks the total number of clicks and the creation date for every generated link.
* **Responsive Dashboard:** A clean, mobile-friendly user interface built with modern CSS and FontAwesome icons.
* **Serverless Architecture:** Deployed on edge infrastructure for lightning-fast redirects and zero-maintenance scaling.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
* **Backend:** Node.js (Vercel Serverless Functions)
* **Database:** Vercel KV (Redis Key-Value Store)
* **Deployment:** GitHub CI/CD to Vercel

## 🚀 Live Demo
*(Will add Vercel live link here once deployed!)*

## 📡 API Endpoints
The backend exposes the following RESTful endpoints:
* `POST /api/shorten` - Accepts a `original_url` and returns a generated `short_code`.
* `GET /api/redirect?code=xyz123` - Looks up the code, increments the click counter, and redirects the user.
* `GET /api/analytics` - Returns an array of all shortened links and their click statistics.

---
*Developed as part of my cloud engineering and full-stack development portfolio.*
