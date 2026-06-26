# 📉 Price Tracker & Predictor

A full-stack **E-commerce Price Tracker** that allows users to search products, track price history, get **future price predictions** using Machine Learning, and receive **real-time drop chances** — all in one place.

---

## 🚀 Features

- **🔍 Product Search & Tracking**
  - Paste a product link (Amazon/Flipkart).
  - Or select from already tracked products.
  - If product exists in DB → fetch instantly.
  - If not → scrape details and save for future tracking.

- **⚡ Smart Scraping**
  - Uses **Puppeteer** to scrape product details and prices from Amazon & Flipkart.
  - Stores Current Price, Lowest Price, and Highest Price.

- **📈 Price History Visualization**
  - Interactive chart showing how the price has changed over time.
  - Automatically updates every night at 2 AM IST.

- **🤖 Machine Learning Prediction**
  - Uses **Facebook Prophet** (Python) to predict future prices.
  - Prediction includes:
    - `yhat` → Predicted price
    - `yhat_lower` → Minimum expected price
    - `yhat_upper` → Maximum expected price
  - Confidence intervals make predictions more realistic.

- **📊 Chances of Drop**
  - Calculates the probability (%) that the price will drop.
  - Small fluctuations are ignored for better accuracy.

- **💡 "Should You Buy?"**
  - Smart suggestion system based on current price vs predicted drop and historical lows.

- **⏳ Automatic Price Updates**
  - Backend cron job runs every night at **2 AM IST** to scrape fresh prices for all tracked products.
  - No manual refresh needed. No GitHub Actions required.

---

## 🛠 Tech Stack

**Frontend:**
- Next.js
- Tailwind CSS
- Chart.js / Recharts

**Backend:**
- Java 17 + Spring Boot 3
- MongoDB Atlas (product data)
- PostgreSQL / Neon (price history)
- Spring Mail (email alerts)
- Spring Scheduler (automated cron job)

**Machine Learning:**
- Python
- Facebook Prophet
- Pandas, NumPy

**Scraping:**
- Puppeteer
- Cheerio

---

## 📂 Project Workflow

1️⃣ **User enters a product link**
   - If found in DB → Fetch data instantly.
   - If not found → Scrape product details & store.

2️⃣ **Scraper fetches details**
   - Extracts current, lowest, and highest price.
   - Saves in `priceHistory`.

3️⃣ **Prediction Engine runs**
   - Sends price history to ML API (Python Prophet deployed on Render).
   - Gets predicted price, lower & upper bounds, and drop chance.

4️⃣ **Frontend displays results**
   - Price History Graph
   - Future Prediction Graph
   - Drop chance & buy suggestion.

5️⃣ **Backend auto-updates prices**
   - Every night at 2 AM IST, the Java backend automatically scrapes fresh prices for all tracked products.
   - Sends email alerts to subscribers if a price drops.

---

## 🏗 Project Structure

```
├── app/                     # Next.js frontend pages
├── Components/              # Reusable UI components
├── public/                  # Static assets
├── pricetracker-java/       # Java Spring Boot backend
│   ├── src/
│   │   └── main/java/com/pricetracker/
│   │       ├── controller/  # REST API endpoints
│   │       ├── service/     # Business logic + cron job
│   │       ├── model/       # MongoDB & PostgreSQL models
│   │       └── repository/  # Database queries
│   ├── Dockerfile
│   └── pom.xml
└── scraper-server/          # Node.js Puppeteer scraping server
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/price-tracker.git
cd price-tracker
```

### 2️⃣ Frontend Setup
```bash
npm install
```

Create a `.env.local` file:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

Run the frontend:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

### 3️⃣ Java Backend Setup

**Requirements:** Java 17+, Maven 3.6+

```bash
cd pricetracker-java
mvn clean install
mvn spring-boot:run
```

Backend starts at **http://localhost:8080**

All database and email config is in `src/main/resources/application.properties`. For local development, create `application-local.properties` with your actual credentials and run:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

---

### 4️⃣ Python ML API Setup
```bash
pip install -r requirements.txt
python app.py
```

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Java Backend | Render (Docker) |
| ML API | Render |
| Scraper Server | Render |
| Database | MongoDB Atlas + Neon PostgreSQL |

The Java backend is deployed on Render using Docker. A `Dockerfile` is included in the `pricetracker-java/` folder.

---

## ⚙️ Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/getProductByLink?url=` | Fetch or scrape a product by link |
| GET | `/api/search?q=` | Search tracked products by name |
| GET | `/api/trending-products` | Get recently tracked products |
| POST | `/api/price-alert` | Subscribe for price drop email alerts |
| GET | `/api/update-prices` | Manually trigger a price refresh |