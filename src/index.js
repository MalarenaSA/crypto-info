/* global chrome */
"use strict";

// Import axios as the HTTP request handler
import axios from "../node_modules/axios";

// API URLs
const bitstampURL = "https://www.bitstamp.net/api/v2/ticker/";
const coingeckoURL = "https://api.coingecko.com/api/v3/coins/list/";

// Hard-coding Lookup Pairs for now
const bitstampPairs = [
  "ETH/EUR",
  "XRP/EUR",
];

// Get the HTML elements to manipulate
const results = document.querySelector(".results");
const messages = document.querySelector(".messages");


// Initialise Function
function init() {
  results.innerHTML="<p>Results will display here...</p>";
  messages.innerHTML="<p>Messages will display here...</p>";
  getBitstampData();
  getCoingeckoData();


};

// Function to get the current Bitstamp Price Data
async function getBitstampData() {
  try {
    // Get Data using Axios
    await axios
      .get(bitstampURL)
      .then((response) => {        
        console.log(response);
      });
  } catch (error) {
    console.log(error);
  }
};

// Function to get the current Coingecko Price Data
async function getCoingeckoData() {
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
