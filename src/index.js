"use strict";

// Import axios as the HTTP request handler
import axios from "../node_modules/axios";


// Hard-coding Lookup Pairs for now
const bitstampPairs = [
  "ETH/EUR",
  "XRP/EUR",
  "ATOM/EUR",
  "FLR/EUR",
];


// Initialise priceData Array and ResultsHTML
let priceData = [];
let resultsHTML = "";

// Get the HTML elements to manipulate
const results = document.querySelector(".results");
const messages = document.querySelector(".messages");


// Initialise Function
async function init() {
  results.innerHTML="<p>Results will display here...</p>";
  messages.innerHTML="<p>Messages will display here...</p>";
  await getBitstampData();
  resultsHTML = `<h2>Current Prices:</h2>`;
  priceData.forEach((item) => {
    resultsHTML += `<p> ${item.pair}  >  ${item.last}  |  ${item.percent_change_24}%`;
  });
  results.innerHTML = resultsHTML;
  
  // getCoingeckoData();


};

// Function to get the current Bitstamp Price Data
async function getBitstampData() {
  const bitstampURL = "https://www.bitstamp.net/api/v2/ticker/";
  try {
    // Get Data using Axios
    await axios
      .get(bitstampURL)
      .then((response) => {        
        // console.log(response);
        if (response.data.length === 0) {
          throw Error (`No Bitstamp data retrieved`);
        } else {
          bitstampPairs.forEach(pair => {
            const pairData = response.data.find(obj => obj.pair === pair);
            // console.log(pairData);
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
  const coingeckoURL = "https://api.coingecko.com/api/v3/coins/list/";
  try {
    // Get Data using Axios
    await axios
      .get(coingeckoURL)
      .then((response) => {        
        console.log(response);
      });
  } catch (error) {
    console.log(error);
  }
};


// Start the app
init();
