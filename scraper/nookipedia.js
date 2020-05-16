var rp = require('request-promise');
var $ = require('cheerio');
var fs = require("fs");
var moment = require("moment-timezone");

var fishUrl = 'https://nookipedia.com/wiki/Fish/New_Horizons';
var bugsUrl = 'https://nookipedia.com/wiki/Bugs/New_Horizons';

var fishMonthUrls = [
  "https://nookipedia.com/wiki/Fish/New_Horizons/January",
  "https://nookipedia.com/wiki/Fish/New_Horizons/February",
  "https://nookipedia.com/wiki/Fish/New_Horizons/March",
  "https://nookipedia.com/wiki/Fish/New_Horizons/April",
  "https://nookipedia.com/wiki/Fish/New_Horizons/May",
  "https://nookipedia.com/wiki/Fish/New_Horizons/June",
  "https://nookipedia.com/wiki/Fish/New_Horizons/July",
  "https://nookipedia.com/wiki/Fish/New_Horizons/August",
  "https://nookipedia.com/wiki/Fish/New_Horizons/September",
  "https://nookipedia.com/wiki/Fish/New_Horizons/October",
  "https://nookipedia.com/wiki/Fish/New_Horizons/November",
  "https://nookipedia.com/wiki/Fish/New_Horizons/December"
];
var bugMonthUrls = [
  "https://nookipedia.com/wiki/Bugs/New_Horizons/January",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/February",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/March",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/April",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/May",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/June",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/July",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/August",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/September",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/October",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/November",
  "https://nookipedia.com/wiki/Bugs/New_Horizons/December"
];
var scrapeTime = moment();
var fileName = './data/data-nookipedia_' + scrapeTime.format("YYYYMMDDHHmmss") + '.json';
var latestFileName = './data/data_latest.json';

var data = {
  "time": scrapeTime,
  "fish": [],
  "bugs": [],
}

var creaturesByMonth = {
  "fish": {},
  "bugs": {}
}

function processMonth(url) {
  console.log("Processing " + url)

  var northRowData = "";
  var southRowData = "";

  var foundCreatures = {
    "north": [],
    "south": []
  };

  return rp(url)
    .then(function(html) {

      var northRowData = $("#mw-content-text > div > div:nth-child(4) > div > table", html).find("tr");
      var southRowData = $("#mw-content-text > div > div:nth-child(6) > div > table", html).find("tr");

      return Promise.all(
        $("#mw-content-text > div > div:nth-child(4) > div > table", html).find("tr").map(function(count, dataRow) {
          return $(this).find("td").eq(1).text().trim().toLowerCase();
        })
      )
    })
    .then(function(northData){

      foundCreatures.north = northData;
      return Promise.all($("#mw-content-text > div > div:nth-child(6) > div > table", html).find("tr").map(function(count, dataRow) {
        return $(this).find("td").eq(1).text().trim().toLowerCase();
      }))
    })
    .then(function(southData){
      foundCreatures.south = southData;
      return foundCreatures;
    })
    .catch(function(err) {
      //TODO Proper error logging
      console.log(err);
    });
}

console.log("Starting data update");

console.log("Updating fish by month");
Promise.all(
  fishMonthUrls.map(function(url) {
    return processMonth(url);
  })
)
.then(function(fishData){
  creaturesByMonth.fish = fishData;
  
  console.log("Updating bugs by month");

  return Promise.all(
    bugMonthUrls.map(function(url) {
      return processMonth(url);
    })
  )
})
.then(function(bugData){
  creaturesByMonth.bugs = bugData;

  console.log("Getting fish page");
  return rp(fishUrl);
})
.then(function(html){

  console.log("Processing fish page");


  var rowData = $("table", html).eq(2).find("tr");

  var newFish = {
    "name": rowData.eq(1).find("td").eq(1).text().trim(),
    "img": rowData.eq(1).find("td").eq(1).text().trim().toLowerCase().replace(/\s/g, '').replace("-", "").replace("'", "") + ".png",
    "wiki_url": "https://nookipedia.com" + rowData.eq(1).find("td").eq(1).children().eq(0).attr("href"),
    "price": rowData.eq(1).find("td").eq(3).text().trim().replace(/,/g, ""),
    "location": rowData.eq(1).find("td").eq(7).text().trim(),
    "location_url": "https://nookipedia.com" + rowData.eq(1).find("td").eq(7).find("a").eq(0).attr("href"),
    "shadow": rowData.eq(1).find("td").eq(4).text().trim(),
    "time": rowData.eq(1).find("td").eq(8).text().trim(),
    "availability": {
      "north": [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      "south": [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    }
  }

  //console.log(creaturesByMonth.fish)

  for (var i = 0; i < creaturesByMonth.fish.length; i++) {
    newFish.availability.north[i] = !!+(creaturesByMonth.fish.north.includes(newFish.name))
  }


  console.log();
  console.log(newFish);
})
.catch(function(err){
  console.log(err);
  // TODO add actual error logging
});
