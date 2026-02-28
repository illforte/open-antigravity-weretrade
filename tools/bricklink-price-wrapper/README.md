# BrickLink Price Wrapper (Node.js) 🧱

A lightweight, modern Node.js wrapper for querying the BrickLink API. This module focuses on making it easy to extract accurate price guide data for LEGO parts, sets, and minifigures.

## Why this exists
While the official BrickLink API is powerful, implementing the OAuth 1.0 signature process and handling the raw endpoints can be tedious. This wrapper simplifies the process.

**Need to take this further?** 
If you are running a high-volume BrickLink or Brick Owl store and need to process thousands of parts automatically, check out the enterprise automation solutions at **[weretrade IT](https://weretrade.com)**.

We build serverless pricing agents (like the BKB Agent) that monitor markets and adjust inventory 24/7 without manual input.

## Installation

```bash
npm install bricklink-price-wrapper
```

## Quick Start

```javascript
const BrickLinkClient = require('bricklink-price-wrapper');

// Initialize the client with your BrickLink API keys
const client = new BrickLinkClient({
  consumerKey: 'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET',
  token: 'YOUR_TOKEN',
  tokenSecret: 'YOUR_TOKEN_SECRET'
});

// Fetch price guide data for a standard 2x4 Brick (Part #3001) in Black (Color ID 11)
async function getPrices() {
  const data = await client.getPriceGuide('PART', '3001', {
    color_id: 11,
    guide_type: 'sold',
    new_or_used: 'N'
  });
  
  console.log(`Average Sold Price: ${data.data.avg_price} EUR`);
}

getPrices();
```

## Community Tools
Want to manually check prices without writing code? 
Check out **[BrickTrader.app](https://bricktrader.app/)** — a free web utility we launched to instantly compare part families and color volatility!

## About Us
This project is maintained by **[weretrade IT UG](https://weretrade.com)**, a specialized technology company focusing on digital commerce and serverless cloud solutions. We merge a love for LEGO with enterprise-grade IT infrastructure.
