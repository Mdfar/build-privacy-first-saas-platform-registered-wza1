staqlt Privacy-First SaaS Platform
Architecture Overview

Backend: Node.js/Express with TypeScript.

ORM: Prisma for PostgreSQL management.

Real-time: Socket.io for 1-to-1 secure messaging.

Payments: Stripe Webhooks for automated access control.

Setup Instructions

Clone the repository.

Run npm install.

Configure .env with DATABASE_URL, STRIPE_SECRET_KEY, and JWT_SECRET.

Run npx prisma migrate dev to initialize the database.

Start the development server with npm run dev.

Environment Variables

DATABASE_URL: PostgreSQL connection string.

STRIPE_SECRET_KEY: Stripe API key.

STRIPE_WEBHOOK_SECRET: Stripe webhook signing secret.

JWT_SECRET: Secret key for session tokens.