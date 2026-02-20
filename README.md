# ShopSphere — Full Stack E-commerce App

A full stack e-commerce application built with **Next.js** (frontend) and **Spring Boot** (backend), deployed on **Vercel** and **Render**.

---

## Live Demo

| Service | URL |
|---------|-----|
| Frontend | https://e-commerce-lrvl.vercel.app |
| Backend API | https://e-commerce-1-2nbq.onrender.com/api |

---

## Tech Stack

### Frontend
- **Next.js 16** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Razorpay** — Payment integration
- **Nodemailer** — Contact form emails
- **next-themes** — Dark / Light mode

### Backend
- **Spring Boot 4** — Java framework
- **MongoDB Atlas** — Cloud database
- **Spring Security** — Authentication
- **JWT** — Token-based auth
- **BCrypt** — Password hashing
- **Razorpay Java SDK** — Payment processing
- **Gmail SMTP** — Email notifications

---

## Project Structure

```
E-commerce/
├── frontend/
│   └── my-app/
│       ├── app/
│       │   ├── page.tsx              # Home page
│       │   ├── products/             # Products listing & detail
│       │   ├── categories/           # Categories page
│       │   ├── cart/                 # Shopping cart
│       │   ├── my-orders/            # Order history
│       │   ├── login/                # Login page
│       │   ├── register/             # Register page
│       │   ├── contact/              # Contact form
│       │   ├── faq/                  # FAQ page
│       │   ├── about/                # About page
│       │   └── api/                  # Next.js API routes
│       │       ├── contact/          # Email via Nodemailer
│       │       ├── create-order/     # Razorpay order (legacy)
│       │       └── verify-payment/   # Razorpay verify (legacy)
│       ├── components/
│       │   ├── header.tsx            # Navigation header
│       │   ├── footer.tsx            # Site footer
│       │   ├── product-card.tsx      # Product card component
│       │   ├── razorpay-checkout.tsx # Payment component
│       │   └── ui/                   # Reusable UI components
│       └── contexts/
│           ├── auth-context.tsx      # Global auth state
│           └── cart-context.tsx      # Global cart state
│
└── backend/
    └── Ecommerce/
        └── src/main/java/com/example/Ecommerce/
            ├── controller/           # REST API controllers
            ├── service/              # Business logic
            ├── repository/           # MongoDB repositories
            ├── entity/               # Data models
            ├── security/             # JWT filter
            └── config/               # CORS, Security, MongoDB config
```

---

## Features

- Browse and search products by name or category
- User registration and login with JWT authentication
- Shopping cart (persisted in localStorage)
- Razorpay payment integration
- Order history (My Orders page)
- Contact form with email notifications
- Dark / Light mode toggle
- Fully responsive design

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products?category=` | Filter by category |
| GET | `/api/products?search=` | Search by name |
| POST | `/api/products` | Add product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/create-order` | Create Razorpay order |
| POST | `/api/verify-payment` | Verify payment signature |
| GET | `/api/my-orders` | Get logged-in user orders |
| GET | `/api/orders/:id` | Get order by ID |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Send contact form email |

---

## Getting Started Locally

### Prerequisites
- Node.js 20+
- Java 17+
- MongoDB Atlas account
- Razorpay account

### 1. Clone the repo

```bash
git clone https://github.com/balivarun/E_commerce.git
cd E_commerce
```

### 2. Setup Backend

```bash
cd backend/Ecommerce
```

Create `src/main/resources/application.properties` with:

```properties
spring.data.mongodb.uri=${MONGODB_URI}
spring.mail.username=${EMAIL_USER}
spring.mail.password=${EMAIL_PASS}
razorpay.key.id=${RAZORPAY_KEY_ID}
razorpay.key.secret=${RAZORPAY_KEY_SECRET}
jwt.secret=${JWT_SECRET}
cors.allowed-origins=http://localhost:3000
```

Run the backend:

```bash
./gradlew bootRun
```

Backend runs on `http://localhost:8080/api`

### 3. Setup Frontend

```bash
cd frontend/my-app
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Run the frontend:

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## Deployment

### Backend — Render
1. Connect GitHub repo on [render.com](https://render.com)
2. Set **Root Directory** → `backend/Ecommerce`
3. Set **Runtime** → `Docker`
4. Add environment variables in Render dashboard:
   - `MONGODB_URI`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `JWT_SECRET`
   - `CORS_ALLOWED_ORIGINS` → your Vercel URL

### Frontend — Vercel
1. Connect GitHub repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** → `frontend/my-app`
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` → your Render URL + `/api`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`

---

## Environment Variables

### Frontend (Vercel)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `EMAIL_USER` | Gmail address for contact form |
| `EMAIL_PASS` | Gmail app password |

### Backend (Render)

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `EMAIL_USER` | Gmail address |
| `EMAIL_PASS` | Gmail app password |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `JWT_SECRET` | Secret key for JWT signing |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend URLs |

---

## Author

**Varun Bali**
- GitHub: [@balivarun](https://github.com/balivarun)
- Email: varunbali47@gmail.com
