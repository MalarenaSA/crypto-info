"use strict";

// Import axios as the HTTP request handler
import axios from "../node_modules/axios";


// Hard-coding Lookup Pairs for now
const cryptoPairs = [{
  source: "Bitstamp",
  crypto: "ETH",
  currency: "EUR",
  target: 3000.00,
},{
  source: "Bitstamp",
  crypto: "XRP",
  currency: "EUR",
  target: 2.00,
},{
  source: "Bitstamp",
  crypto: "FLR",
  currency: "EUR",
  target: 2.00,
},{
  source: "Bitstamp",
  crypto: "SGB",
  currency: "EUR",
  target: 2.00,
},{
  source: "Bitstamp",
  crypto: "ATOM",
  currency: "EUR",
  target: 2.00,
},{
  source: "Bitstamp",
  crypto: "ADA",
  currency: "EUR",
  target: 2.00,
},{
  source: "Bitstamp",
  crypto: "COREUM",
  currency: "EUR",
  target: 2.00,
},{
  source: "Bitstamp",
  crypto: "DOT",
  currency: "EUR",
  target: 2.00,
},{
  source: "Bitstamp",
  crypto: "NEAR",
  currency: "EUR",
  target: 2.00,
},{
  source: "Bitstamp",
  crypto: "SOL",
  currency: "EUR",
  target: 2.00,
},{
  source: "Coingecko",
  crypto: "BTC",
  currency: "EUR",
  target: 90000.00,
},{
  source: "Coingecko",
  crypto: "ETH",
  currency: "EUR",
  target: 3000.00,
},{
  source: "Coingecko",
  crypto: "ATOM",
  currency: "EUR",
  target: 3000.00,
},];

// Initialise ResultsHTML
let resultsHTML = "";

// Get the HTML elements to manipulate
const results = document.querySelector(".results");
const messages = document.querySelector(".messages");


// Initialise Function
async function init() {
  results.innerHTML="<p>Results will display here...</p>";
  messages.innerHTML="<p>Messages will display here...</p>";
  await getBitstampData();
  await getCoingeckoData();
  console.log(cryptoPairs);

  cryptoPairs.forEach((item) => {
    const item_colour = (item.percent_change_24 < 0) ? "red" : "green";
    resultsHTML += `<p> ${item.crypto}/${item.currency}  >  ${item.last}  |  <span style="color:${item_colour}">${item.percent_change_24}%</span></p>`;
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
          cryptoPairs.map(pair => {
            if (pair.source !== "Bitstamp") {
              return;
            };
            const searchString = `${pair.crypto}/${pair.currency}`;
            const pairData = response.data.find(obj => obj.pair === searchString);
            if (pairData === undefined) {
              pair.last = 0.00;
              pair.percent_change_24 = 0.00;
              pair.found = false;   
            } else {
              pair.last = +pairData.last;
              pair.percent_change_24 = +pairData.percent_change_24;
              pair.found = true; 
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
          cryptoPairs.map(pair => {
            if (pair.source !== "Coingecko") {
              return;
            };
            const searchString = pair.crypto.toLowerCase();
            const pairData = response.data.find(obj => obj.symbol === searchString);
            if (pairData === undefined) {
              pair.last = 0.00;
              pair.percent_change_24 = 0.00;
              pair.found = false;
            } else {
              pair.last = +pairData.current_price;
              pair.percent_change_24 = +pairData.price_change_percentage_24h;
              pair.found = true; 
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
