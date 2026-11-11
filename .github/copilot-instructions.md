# ShopSphere Repository Instructions

## Project Layout

- `frontend/my-app/` is the Next.js 16, React 19, TypeScript, and Tailwind CSS v4 app.
- `backend/Ecommerce/` is the Spring Boot 4 / Java 17 API, using MongoDB.
- The backend serves routes under `/api`; `NEXT_PUBLIC_API_URL` points the frontend to that API.
- See the root `CLAUDE.md` for the fuller architecture, endpoint list, and environment setup.

## Development and Verification

- Frontend: run `npm run dev`, `npm run lint`, or `npm run build` from `frontend/my-app/`.
- Backend: run `./gradlew bootRun`, `./gradlew test`, or `./gradlew build` from `backend/Ecommerce/`.
- Prefer focused checks for the code being changed. Backend tests are currently limited to a context-load smoke test.
- Do not add credentials to source control. Local configuration belongs in `.env.local` or `application.properties`, which should remain untracked.

## Implementation Notes

- Follow the existing layered backend structure: controllers, services, repositories, entities, and configuration.
- Frontend auth, cart, and wishlist state are provided by React contexts and persisted in localStorage. Preserve their existing APIs when changing consumers.
- The active Razorpay flow calls the Spring Boot API directly; the Next.js `create-order` and `verify-payment` routes are legacy and unused.
- Product create, update, and delete endpoints currently require authentication but do not enforce an admin role. Do not assume they are admin-only or broaden access without an explicit authorization change.
- Keep changes scoped, preserve existing conventions, and update relevant documentation when behavior or setup changes.