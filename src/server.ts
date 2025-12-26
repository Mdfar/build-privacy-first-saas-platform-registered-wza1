import express from 'express'; import helmet from 'helmet'; import cors from 'cors'; import { createServer } from 'http'; import { Server } from 'socket.io'; import dotenv from 'dotenv'; import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express(); const httpServer = createServer(app); const io = new Server(httpServer, { cors: { origin: '*' } }); const prisma = new PrismaClient();

app.use(helmet()); app.use(cors()); app.use(express.json());

// Socket.io for Real-time Communication io.on('connection', (socket) => { console.log('User connected:', socket.id); socket.on('join_private_chat', (room) => socket.join(room)); socket.on('send_message', async (data) => { const message = await prisma.message.create({ data }); io.to(data.room).emit('new_message', message); }); });

// Stripe Webhook for Entitlements app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => { const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); const sig = req.headers['stripe-signature']; let event;

try { event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET); } catch (err) { return res.status(400).send(Webhook Error: ${err.message}); }

if (event.type === 'customer.subscription.updated') { const subscription = event.data.object; await prisma.user.update({ where: { stripeCustomerId: subscription.customer }, data: { subscriptionStatus: subscription.status } }); } res.json({received: true}); });

const PORT = process.env.PORT || 3001; httpServer.listen(PORT, () => console.log(Architecture active on port ${PORT}));