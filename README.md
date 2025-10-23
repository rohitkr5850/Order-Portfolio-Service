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