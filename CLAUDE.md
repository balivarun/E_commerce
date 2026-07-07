# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ShopSphere** is a full-stack e-commerce application:
- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS v4, deployed to Vercel at `https://e-commerce-lrvl.vercel.app`
- **Backend**: Spring Boot 4 + Java 17 + MongoDB Atlas, deployed to Render via Docker at `https://e-commerce-1-2nbq.onrender.com/api`

## Development Commands

### Frontend (`frontend/my-app/`)
```bash
npm run dev        # Start dev server on http://localhost:3000
npm run build      # Production build
npm run lint       # Run ESLint
```

### Backend (`backend/Ecommerce/`)
```bash
./gradlew bootRun         # Start server on http://localhost:8080
./gradlew test            # Run all tests
./gradlew test --tests "com.example.Ecommerce.SomeTest"  # Run single test
./gradlew build           # Build JAR
```
There is currently only the default `EcommerceApplicationTests` (context-load smoke test) — no meaningful test coverage exists yet.

## Environment Setup

### Frontend — create `frontend/my-app/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Backend — create `backend/Ecommerce/src/main/resources/application.properties`
```
spring.data.mongodb.uri=${MONGODB_URI}
spring.mail.username=${EMAIL_USER}
spring.mail.password=${EMAIL_PASS}
razorpay.key.id=${RAZORPAY_KEY_ID}
razorpay.key.secret=${RAZORPAY_KEY_SECRET}
jwt.secret=${JWT_SECRET}
cors.allowed-origins=http://localhost:3000
```

## Architecture

### Frontend Structure
- `app/` — Next.js App Router pages (all pages use `"use client"`)
- `app/api/` — Next.js API routes: `contact/` (Nodemailer), `create-order/` and `verify-payment/` (unused — the active payment flow calls the Spring Boot backend directly, not these routes)
- `components/` — Shared UI; `components/ui/` contains shadcn/ui primitives
- `contexts/` — Three React context providers wrapping the entire app (in `layout.tsx`, nested `AuthProvider > CartProvider > WishlistProvider`):
  - `auth-context.tsx` — JWT auth state (user, token), persisted to localStorage; uses a reducer pattern
  - `cart-context.tsx` — Cart state, persisted to localStorage
  - `wishlist-context.tsx` — Wishlist state, persisted to localStorage
- All API calls use `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8080/api`)
- The Razorpay checkout script (`https://checkout.razorpay.com/v1/checkout.js`) is loaded globally in `app/layout.tsx`'s `<head>`.

### Backend Structure
All routes are served under `/api` (`server.servlet.context-path=/api`). Standard Spring Boot layered architecture under `src/main/java/com/example/Ecommerce/`:
- `controller/` — REST controllers (AuthController, ProductController, OrderController, ContactController)
- `service/` — Business logic (AuthService, ProductService, RazorpayService, EmailService)
- `repository/` — Spring Data MongoDB repositories
- `entity/` — MongoDB documents (User, Product, Order, OrderItem, ContactMessage)
- `security/` — `JwtAuthFilter` (servlet filter) + `JwtUtil` (token generation/validation with 24h expiry)
- `config/` — `SecurityConfig`, `CorsConfig` (origins from `CORS_ALLOWED_ORIGINS` env var), `MongoConfig`, `DataInitializer`

### Auth Flow
1. Frontend calls `POST /api/auth/login` or `POST /api/auth/register`
2. Backend returns a JWT (contains email as subject, `role` and `name` claims)
3. Frontend stores token in localStorage via `auth-context`; sends it as `Authorization: Bearer <token>` on subsequent requests
4. `JwtAuthFilter` validates the token on every request, loads the `User` document by email, and sets it directly as the Spring Security principal — `User` implements `UserDetails` itself (no separate `UserDetails` adapter class). Controllers pull the authenticated user via `Authentication.getPrincipal()` cast to `User` (see `OrderController.getMyOrders`).

### Payment Flow (Razorpay — currently active)
1. User clicks "Pay" in the cart → frontend (`razorpay-checkout.tsx`) calls `POST /api/create-order` with `{amount, currency, orderItems}`
2. `OrderController`/`RazorpayService` creates a Razorpay order, saves an `Order` (CREATED status) to MongoDB keyed by `razorpayOrderId`, returns the Razorpay order object
3. Razorpay's client-side checkout.js widget collects payment details and redirects/callbacks with `{orderId, paymentId, signature}`
4. Frontend calls `POST /api/verify-payment`; `RazorpayService.verifyPaymentSignature` recomputes an HMAC-SHA256 over `orderId|paymentId` using the Razorpay key secret and compares it to the given signature; on match the order is marked PAID, otherwise FAILED
5. Amounts are sent to Razorpay in paise as an integer (`Math.round(amount * 100)`); currency is `"INR"`

**Stripe migration in progress (not yet wired up):** `service/StripeService.java`, `components/stripe-checkout.tsx`, and `lib/stripe.ts` exist but are unused — `OrderController` still depends on `RazorpayService`, `build.gradle` only declares the Razorpay SDK, and `app/cart/page.tsx` still renders `RazorpayCheckout`, not `StripeCheckout`. Don't assume the Stripe flow is live until `OrderController` is repointed at `StripeService` and the `stripe` / `@stripe/stripe-js` / `@stripe/react-stripe-js` packages are added to `package.json`.

### Security Rules (Spring Security)
- Public: `GET /products/**`, `GET /categories/**`, `POST /contact`, `POST /create-order`, `POST /verify-payment`, `GET /orders/**`, all `/auth/**`
- `POST/PUT/DELETE /products/**` require only `.authenticated()` — there is no role check, so any logged-in user (not just admins) can create/update/delete products.
- Catch-all: `.anyRequest().permitAll()` — so `/my-orders` passes Spring Security but the controller itself returns 401 if `Authentication` is null or its principal isn't a `User`.

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/products` | — | List products; supports `?category=`, `?search=`, `?minPrice=`, `?maxPrice=`, `?featured=` |
| GET | `/api/products/:id` | — | Get product by ID |
| GET | `/api/products/category/:category` | — | Get products by category |
| GET | `/api/products/categories` | — | List distinct categories |
| GET | `/api/products/search?q=` | — | Search products by name |
| GET | `/api/products/featured?limit=` | — | Featured products (defaults to 4) |
| POST | `/api/products` | JWT (any user) | Add product |
| PUT | `/api/products/:id` | JWT (any user) | Update product |
| DELETE | `/api/products/:id` | JWT (any user) | Delete product |
| POST | `/api/create-order` | optional | Create Razorpay order; links to user if JWT present |
| POST | `/api/verify-payment` | — | Verify Razorpay signature, mark order PAID/FAILED |
| GET | `/api/orders/:id` | — | Get order by ID |
| GET | `/api/orders?email=` | — | Get orders by customer email |
| GET | `/api/my-orders` | JWT (controller-enforced) | Get orders for the authenticated user |
| POST | `/api/contact` | — | Send contact form email via Gmail SMTP |

### Data Initialization
`DataInitializer` (CommandLineRunner) seeds 20 sample products across electronics/clothing/jewelery into MongoDB on first startup, only if the products collection is empty.

## Key Design Decisions
- The frontend has both Next.js API routes (`app/api/`) and direct calls to the Spring Boot backend; the Next.js `create-order`/`verify-payment` routes are unused legacy code.
- Cart and wishlist state live entirely in the browser (localStorage); there are no backend endpoints for them.
- Default theme is dark (`defaultTheme="dark"` in ThemeProvider, `enableSystem={false}`).
- Prices are in INR (₹).
- The `cors.allowed-origins` property maps to the `CORS_ALLOWED_ORIGINS` environment variable in production (Render); set it to your Vercel frontend URL.
