var rp = require('request-promise');
var $ = require('cheerio');
var fs = require("fs");
var moment = require("moment");

var fishUrl = 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)';
var bugsUrl = 'https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)';
var scrapeTime = moment();
var fileName = './data/data_' + scrapeTime.format("YYYYMMDDHHmmss") + '.json';
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

var updatedata = function(callback){
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
        "wiki": "https://animalcrossing.fandom.com" + northRows.eq(i).find("td").eq(0).children().eq(0).attr("href"),
        "price": northRows.eq(i).find("td").eq(2).text().trim(),
        "location": northRows.eq(i).find("td").eq(3).text().trim(),
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
            "price": northRows.eq(i).find("td").eq(2).text().trim(),
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
          // TODO add actual error logging
        } else {
          fs.copyFile(fileName, latestFileName, function(error){
            if (error) {
              callback(error);
            } else {
              console.log("Done updating data");
              callback();
            }
          })
        }
      })

      })
      .catch(function(err){
        callback(err);
      });
  })
  .catch(function(err){
    callback(err);
  });
};

module.exports = updatedata
