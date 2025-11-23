# TinyLink — URL Shortener (Aganitha Take-Home Assignment)

TinyLink is a clean and modern URL shortener similar to bit.ly.  
Users can shorten long URLs, optionally use custom short codes, view click statistics, and delete links.

## Live Demo: 
https://tinylink-mocha.vercel.app/

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Prisma ORM**
- **NeonPostgres**
- **Vercel Deployment**

---

## Features

Core Functionality
- Create short URLs  
- Optional custom short codes  
- Auto-generate codes when empty  
- Validate URLs and short codes  
- Track clicks + last clicked timestamp  
- Delete links  
- Quick-copy short URL  
- Mobile-friendly UI  
- Toast notifications  
- Server actions + edge-safe database interactions

Pages
- `/` — Dashboard  
- `/code/:code` — Stats page  
- `/:code` — Redirect  
- `/healthz` — Health endpoint  

---

## API Endpoints

| Method | Path | Description |
| ------ | ----- | ----------- |
| POST | `/api/links` | Create link (409 for duplicate) |
| GET | `/api/links` | List all links |
| GET | `/api/links/:code` | Stats for single code |
| DELETE | `/api/links/:code` | Delete link |

---

## Database Schema (Prisma)

```prisma
model Link {
  id          String   @id @default(cuid())
  shortCode   String   @unique
  originalUrl String
  clicks      Int      @default(0)
  lastClicked DateTime?
  createdAt   DateTime @default(now())
}
