# 🏦 Orders & Portfolio Service

A clean, modular **Node.js + TypeScript** service for managing **orders, fills, and portfolios** — demonstrating **idempotent order creation**, **portfolio updates**, **PnL calculations**, and **mock domain events**.  

Built for scalability and best practices with:
- **Prisma ORM (PostgreSQL)**
- **Express + Zod validation**
- **Dockerized setup**
- **Structured logging**
- **Clean architecture**
- **Unit & Integration tests**

---

## 🚀 Features

✅ **Order Management**
- Create Buy/Sell orders with idempotency (`clientOrderId` or `Idempotency-Key`)
- Filter, paginate, and sort orders  

✅ **Fills & Settlements**
- Apply fills via webhook-like endpoint  
- Automatically update order status (`pending → partially_filled → filled`)  
- Compute average fill price  

✅ **Portfolio Tracking**
- Maintain per-symbol positions  
- Compute unrealized P&L from mock quotes  

✅ **Event System**
- Emits `order.created` and `fill.applied` events via internal pub/sub  

✅ **Production Ready**
- Environment configs via `.env`
- Structured logs with request correlation ID
- Error normalization (`{ code, message, details }`)
- Docker + PostgreSQL setup

---

## 🧱 Architecture Overview

src/
├── app/ # App bootstrap, routes, middlewares
├── core/ # Core utilities (db, logging, config, errors, utils)
├── modules/
│ ├── orders/ # Order logic (controller, service, repo)
│ ├── fills/ # Fill application & status logic
│ ├── portfolio/ # Position tracking & PnL computation
│ ├── quotes/ # Mock market quotes provider
│ └── events/ # Event bus (pub/sub mock)
└── tests/ # Unit & integration tests

yaml
Copy code

---

## ⚙️ Tech Stack

| Layer | Tech |
|-------|------|
| Language | TypeScript |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Validation | Zod |
| Logger | Pino |
| Testing | Vitest |
| Containerization | Docker + docker-compose |

---

## 🧩 Entity Models (Simplified)

### Order
| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Unique order ID |
| clientOrderId | String | For idempotency |
| symbol | String | e.g. SPY, BND |
| side | Enum | buy / sell |
| qty | Int | Quantity |
| status | Enum | pending / filled / partially_filled |
| avgPrice | Float | Average fill price |
| createdAt | Date | Timestamp |

### Fill
| Field | Type | Description |
|--------|------|-------------|
| id | UUID | Fill ID |
| orderId | FK | Associated order |
| price | Float | Fill price |
| qty | Int | Fill quantity |
| timestamp | Date | Fill time |

### Position
| Field | Type | Description |
|--------|------|-------------|
| symbol | String | e.g. SPY |
| qty | Int | Position quantity |
| avgCost | Float | Weighted average cost |
| unrealizedPnL | Float | Computed on the fly |

---

## 🧮 Business Logic

### Order Status Flow
pending → partially_filled → filled

pgsql
Copy code
When total filled quantity = order quantity.

### Average Cost Formula
BUY:
newAvg = (oldQty * oldAvg + buyQty * price) / (oldQty + buyQty)
SELL:
qty -= sellQty
(Avg cost stays same; realized P&L ignored)

pgsql
Copy code

### Idempotency
- Supported via `clientOrderId` in request body  
- If re-sent with same payload → return same order  
- If payload differs → 409 Conflict  

---

## 🧠 API Endpoints

### 1️⃣ Create Order
`POST /orders`
```json
{
  "symbol": "BND",
  "side": "buy",
  "qty": 120,
  "clientOrderId": "cli-20251010-0001"
}

Response

{
  "id": "uuid",
  "symbol": "BND",
  "side": "buy",
  "qty": 120,
  "status": "pending",
  "avgPrice": null,
  "createdAt": "2025-10-10T08:30:00.000Z"
}

2️⃣ List Orders

GET /orders?page=1&pageSize=10&symbol=BND&status=pending

Response

{
  "items": [...],
  "page": 1,
  "pageSize": 10,
  "total": 25
}

3️⃣ Apply Fill (Webhook Simulation)

POST /fills

{
  "orderId": "uuid",
  "price": 73.5,
  "qty": 100,
  "timestamp": "2025-10-10T09:00:00Z"
}


Response

{
  "message": "Fill applied successfully",
  "orderStatus": "partially_filled"
}

4️⃣ Get Portfolio Snapshot

GET /portfolio

Response

{
  "positions": [
    {
      "symbol": "BND",
      "qty": 120,
      "avgCost": 73.8,
      "unrealizedPnL": -12.0,
      "updatedAt": "2025-10-10T09:10:00Z"
    }
  ],
  "totals": {
    "value": 8856.0,
    "pnl": -12.0
  }
}

🧰 Environment Variables
Variable	Description	Default
PORT	Server port	4000
NODE_ENV	Environment	development
DATABASE_URL	PostgreSQL connection string	(see below)
LOG_LEVEL	Logging level	debug
🐳 Docker Setup
Prerequisites

Docker

Docker Compose

Run Everything
docker-compose up --build


✅ Starts:

PostgreSQL @ localhost:5432

Prisma Studio @ http://localhost:5555

API @ http://localhost:4000

💻 Run Locally (Without Docker)
# 1. Install dependencies
npm install

# 2. Setup DB (Postgres or SQLite)
npx prisma migrate dev --name init

# 3. Seed data (optional)
npm run seed

# 4. Run app
npm run dev

🧪 Testing
Run all tests
npm run test
