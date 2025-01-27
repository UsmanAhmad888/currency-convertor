# Currency Conversion API

## Description
This API provides functionality to convert an amount between two currencies. It supports both fiat and cryptocurrency conversions. Fiat exchange rates are fetched from a third-party API (ExchangeRate API). The API is modular, clean, and easy to set up.

## Features
- Convert an amount between two fiat currencies using real-time exchange rates.
- Extendable functionality for cryptocurrency conversions.
- Validates input parameters using `Joi` for improved error handling.

---

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- NPM or Yarn package manager
- An API key from [EXCHANGE_RATE_API_KEY-API](https://www.exchangerate-api.com)
- An API key form [COIN_GECKO_API_KEY](https://docs.coingecko.com/reference/setting-up-your-api-key)

### Installation
1. Clone the repository:
   bash
   git clone https://github.com/UsmanAhmad888/currency-converter.git
   cd currency-converter
```