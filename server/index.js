// server/index.js
// Minimal Express server — sole purpose is to proxy Gemini API calls
// and keep the API key off the frontend

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const aiRoutes = require('./routes/ai')

const app = express()
const PORT = process.env.PORT || 5001

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })) // Limit payload size
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://sehat-saathi.vercel.app'] // Update with actual domain
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}))

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'Sehat Saathi API' }))

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/ai', aiRoutes)

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_, res) => res.status(404).json({ message: 'Route not found' }))

// ── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, _, res, __) => {
  console.error('[Server Error]', err.message)
  res.status(500).json({ message: 'Internal server error' })
})

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏥 Sehat Saathi API running on http://localhost:${PORT}`)
  console.log(`   Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ Loaded' : '❌ MISSING — set GEMINI_API_KEY in server/.env'}`)
})
