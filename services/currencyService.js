const axios = require('axios');

const getFiatExchangeRates = async () => {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY; 
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch fiat exchange rates');
    }
};

const convertFiat = async (from, to, amount) => {
    const exchangeRates = await getFiatExchangeRates();

    if (!exchangeRates.conversion_rates[from] || !exchangeRates.conversion_rates[to]) {
        throw new Error('Invalid currency codes');
    }

    const fromRate = exchangeRates.conversion_rates[from];
    const toRate = exchangeRates.conversion_rates[to];

    const convertedAmount = (amount / fromRate) * toRate;
    return convertedAmount;
};

const convertCrypto = async (from, to, amount) => {
    const options = {
        url: `https://pro-api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`,
        method: 'GET',
        headers: {},
      };
  
      const apiKey = process.env.COIN_GECKO_API_KEY;
      if (apiKey) {
        options.headers['x-cg-pro-api-key'] = apiKey;
      }
      const response = await axios(options);
      console.log(response.data)
      const rate = response?.data?.[from]?.[to];
  console.log(rate)
      if (!rate) {
        throw new Error("Invalid currency pair or no exchange rate available.");
      }
  
      const convertedAmount = amount * response?.data?.[from]?.[to];

    return convertedAmount.toFixed(6);
};

module.exports = { convertFiat, convertCrypto };
