var rp = require('request-promise');
var $ = require('cheerio');
var fs = require("fs");
var moment = require("moment-timezone");

var fishUrl = 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)';
var bugsUrl = 'https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)';
var scrapeTime = moment();
var fileName = './data/data-fandom_' + scrapeTime.format("YYYYMMDDHHmmss") + '.json';
var latestFileName = './data/data_latest.json';

var data = {
  "time": scrapeTime,
  "fish": [],
  "bugs": [],
}

function getBooleanFromCheckOrDash(string)
{
  if (string == "-") {
    return false;
  } else {
    return true;
  }
}

console.log("Starting data update");
rp(fishUrl)
.then(function(html){
  var northRows = $(".tabbertab > table", html).eq(0).find("tr");
  var southRows = $(".tabbertab > table", html).eq(1).find("tr");

  for (var i = 2; i < northRows.length; i++) {

    console.log("Processing "  + northRows.eq(i).find("td").eq(0).text().trim());
    var newFish = {
      "name": northRows.eq(i).find("td").eq(0).text().trim(),
      "img": northRows.eq(i).find("td").eq(0).text().trim().toLowerCase().replace(/\s/g, '').replace("-", "").replace("'", "") + ".png",
      "wiki_url": "https://animalcrossing.fandom.com" + northRows.eq(i).find("td").eq(0).children().eq(0).attr("href"),
      "price": northRows.eq(i).find("td").eq(2).text().trim().replace(/,/g, ""),
      "location": northRows.eq(i).find("td").eq(3).text().trim(),
      "location_url": "",
      "shadow": northRows.eq(i).find("td").eq(4).text().trim(),
      "time": northRows.eq(i).find("td").eq(5).text().trim(),
      "availability": {
        "north": [
        ],
        "south": [
        ]
      }
    }

    for (var j = 6; j <= 17; j++) {
      newFish.availability.north.push(getBooleanFromCheckOrDash(northRows.eq(i).find("td").eq(j).text().trim()));
      newFish.availability.south.push(getBooleanFromCheckOrDash(southRows.eq(i).find("td").eq(j).text().trim()));
    }

    data.fish.push(newFish);
  }

  rp(bugsUrl)
    .then(function(html){
      var northRows = $(".tabbertab > table", html).eq(0).find("tr");
      var southRows = $(".tabbertab > table", html).eq(1).find("tr");

      for (var i = 3; i < northRows.length; i++) {
        console.log("Processing " + northRows.eq(i).find("td").eq(0).text().trim());

        var newBug = {
          "name": northRows.eq(i).find("td").eq(0).text().trim(),
          "img": northRows.eq(i).find("td").eq(0).text().trim().toLowerCase().replace(/\s/g, '').replace("-", "").replace("'", "") + ".png",
          "wiki": "https://animalcrossing.fandom.com" + northRows.eq(i).find("td").eq(0).children().eq(0).attr("href"),
          "price": northRows.eq(i).find("td").eq(2).text().trim().replace(/,/g, ""),
          "location": northRows.eq(i).find("td").eq(3).text().trim(),
          "time": northRows.eq(i).find("td").eq(4).text().trim(),
          "availability": {
            "north": [
            ],
            "south": [
            ]
          }
        }

        for (var j = 5; j <= 16; j++) {
          newBug.availability.north.push(getBooleanFromCheckOrDash(northRows.eq(i).find("td").eq(j).text().trim()));
          newBug.availability.south.push(getBooleanFromCheckOrDash(southRows.eq(i).find("td").eq(j).text().trim()));
        } 

        data.bugs.push(newBug);
      }


    fs.writeFile(fileName, JSON.stringify(data, null, '\t'), function(error){
      if (error) {
        console.log(error);
      } else {
        fs.copyFile(fileName, latestFileName, function(error){
          if (error) {
            // TODO add actual error logging
            console.log(error);
          } else {
            console.log("Done updating data");
          }
        })
      }
    })

    })
    .catch(function(err){
      console.log(err);
      // TODO add actual error logging
    });
})
.catch(function(err){
  console.log(err);
  // TODO add actual error logging
});
