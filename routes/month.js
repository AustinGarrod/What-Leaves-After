const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const moment = require('moment-timezone');

const creatures = require('../data/data_latest.json');

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

const titlePrefix = "What leaves after ";
const titleSuffix = " in Animal Crossing: New Horizons";

function getFilteredDataByCurrentMonth(monthcode) {
  var filteredData = {
    "bugs": {
      "north": [],
      "south": []
    },
    "fish": {
      "north": [],
      "south": []
    }
  };

  var nextmonth = monthcode + 1;
  if (nextmonth > 11) {
    nextmonth = 0;
  }

  for (var i = 0; i < creatures.bugs.length; i++) {
    if (creatures.bugs[i].availability.north[monthcode] && !creatures.bugs[i].availability.north[nextmonth])
    {
      filteredData.bugs.north.push(creatures.bugs[i]);
    }
    if (creatures.bugs[i].availability.south[monthcode] && !creatures.bugs[i].availability.south[nextmonth])
    {
      filteredData.bugs.south.push(creatures.bugs[i]);
    }
  }

  for (var i = 0; i < creatures.fish.length; i++) {
    if (creatures.fish[i].availability.north[monthcode] && !creatures.fish[i].availability.north[nextmonth])
    {
      filteredData.fish.north.push(creatures.fish[i]);
    }
    if (creatures.fish[i].availability.south[monthcode] && !creatures.fish[i].availability.south[nextmonth])
    {
      filteredData.fish.south.push(creatures.fish[i]);
    }
  }

  return filteredData;
}




/* Default router */
router.get('/', function(req, res, next) {
  var d = new Date();
  var monthText = d.toLocaleString('default', { month: 'long' });
  var monthsData = getFilteredDataByCurrentMonth(d.getMonth());

  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: d.getMonth() + 1,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

/* Provided month router */
router.get('/:month', function(req, res, next) {
  var requestedMonth = req.params.month.trim();
  var monthNumber = months.indexOf(requestedMonth.toLowerCase());

  if (monthNumber < 0)
  {
    next(createError(404));
  }
  else {
    var monthText = months[monthNumber].charAt(0).toUpperCase() + months[monthNumber].slice(1);
    var monthsData = getFilteredDataByCurrentMonth(monthNumber);

    res.render(
    'month', 
      { 
        title: titlePrefix + monthText + titleSuffix, 
        data: monthsData, 
        month: monthText,
        monthNumber: monthNumber + 1,
        dataage: moment(creatures.time).tz('America/Toronto').format("YYYY-MM-DD HH:mm:ss z")
      }
    );
  }
});

module.exports = router;
