"use strict";

// Import axios as the HTTP request handler
import axios from "../node_modules/axios";


// Hard-coding Lookup Pairs for now
const bitstampPairs = [
  "ETH/EUR",
  "XRP/EUR",
  "FLR/EUR",
  "SGB/EUR",
  "ATOM/EUR",
  "ADA/EUR",
  "COREUM/EUR",
  "DOT/EUR",
  "NEAR/EUR",
  "SOL/EUR",
];

const coingeckoPairs = [
  "BTC",
  "ETH",
  "ATOM",
];


// Initialise ResultsHTML and priceData Array
let resultsHTML = "";
let priceData = [];
/* Structure of each priceData item {
  source:
  crypto:
  currency:
  last:
  percent_change_24:
  percent_change_colour:
}*/

// Get the HTML elements to manipulate
const results = document.querySelector(".results");
const messages = document.querySelector(".messages");


// Initialise Function
async function init() {
  results.innerHTML="<p>Results will display here...</p>";
  messages.innerHTML="<p>Messages will display here...</p>";
  await getBitstampData();
  await getCoingeckoData();
  priceData.forEach((item) => {
    const item_colour = (item.percent_change_24 < 0) ? "red" : "green";
    resultsHTML += `<p> ${item.pair}  >  ${item.last}  |  <span style="color:${item_colour}">${item.percent_change_24}%</span></p>`;
  });
  results.innerHTML = resultsHTML;
  
  


};

// Function to get the current Bitstamp Price Data
async function getBitstampData() {
  try {
    // Get Data using Axios
    await axios
      .get("https://www.bitstamp.net/api/v2/ticker/")
      .then((response) => {        
        // console.log(response);
        if (response.data.length === 0) {
          throw Error (`No Bitstamp data retrieved`);
        } else {
          bitstampPairs.forEach(pair => {
            const pairData = response.data.find(obj => obj.pair === pair);
            console.log(pairData);
            if (pairData === undefined) {
              priceData.push({
                last: "0.00", 
                market: pair,
                pair: pair,
                percent_change_24: "0.00",
              });
            } else {
              priceData.push(pairData);
            }
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
};

// Function to get the current Coingecko Price Data
async function getCoingeckoData() {
  try {
    // Get Data using Axios
    await axios
      .get("https://api.coingecko.com/api/v3/coins/markets" , {
        params: {
          vs_currency: "eur"
        },
      })
      .then((response) => {        
        // console.log(response);
        if (response.data.length === 0) {
          throw Error (`No Coingecko data retrieved`);
        } else {
          coingeckoPairs.forEach(pair => {
            const pairData = response.data.find(obj => obj.symbol === pair.toLowerCase());
            console.log(pairData);
            if (pairData === undefined) {
              priceData.push({
                last: "0.00", 
                market: `${pair}/EUR`,
                pair: `${pair}/EUR`,
                percent_change_24: "0.00",
              });
            } else {              
              priceData.push({
                last: pairData.current_price,
                market: `${pair}/EUR`,
                pair: `${pair}/EUR`,
                percent_change_24: pairData.price_change_percentage_24h,
              });
            }
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};


// Start the app
init();
