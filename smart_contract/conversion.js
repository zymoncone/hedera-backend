const axios = require('axios');

// Binance API endpoint for exchange info
const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price';

// Function to get exchange rate from Binance API
async function getExchangeRate() {
    try {
        const response = await axios.get(`${BINANCE_API_URL}?symbol=HBARUSDT`);
        const exchangeRate = parseFloat(response.data.price); // USD exchange rate for 1 HBAR
        return exchangeRate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
}

// Convert USD to HBAR using the Binance exchange rate
async function convertUSDtoHBAR(usdAmount) {
    try {
        const exchangeRate = await getExchangeRate();
        const hbarAmount = usdAmount / exchangeRate;
        return hbarAmount;
    } catch (error) {
        throw error;
    }
}

// Example conversion from USD to HBAR using Binance API
const usdAmount = 10; // Amount in USD to convert
convertUSDtoHBAR(usdAmount)
    .then(hbarAmount => {
        console.log(`${usdAmount} USD is equivalent to ${hbarAmount.toFixed(2)} HBAR.`);
    })
    .catch(error => {
        console.error('Conversion error:', error);
    });
