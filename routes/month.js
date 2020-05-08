var express = require('express');
var router = express.Router();
var moment = require('moment');
var CronJob = require('cron').CronJob;
var UpdateData = require('../modules/updatedata');

var creatures = require('../data/data_latest.json');

var titlePrefix = "What leaves after ";
var titleSuffix = " in Animal Crossing: New Horizons";

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
  if (nextmonth > 12) {
    nextmonth = 1;
  }

  for (var i = 0; i < creatures.bugs.length; i++) {
    if (creatures.bugs[i].availability.north[monthcode - 1] && !creatures.bugs[i].availability.north[nextmonth - 1])
    {
      filteredData.bugs.north.push(creatures.bugs[i]);
    }
    if (creatures.bugs[i].availability.south[monthcode - 1] && !creatures.bugs[i].availability.south[nextmonth - 1])
    {
      filteredData.bugs.south.push(creatures.bugs[i]);
    }
  }

  for (var i = 0; i < creatures.fish.length; i++) {
    if (creatures.fish[i].availability.north[monthcode - 1] && !creatures.fish[i].availability.north[nextmonth - 1])
    {
      filteredData.fish.north.push(creatures.fish[i]);
    }
    if (creatures.fish[i].availability.south[monthcode - 1] && !creatures.fish[i].availability.south[nextmonth - 1])
    {
      filteredData.fish.south.push(creatures.fish[i]);
    }
  }

  return filteredData;
}

new CronJob('0 * * * *', function() {
  UpdateData(function(error){
    if (error)
    {
      console.log(error);
      // TODO add error logging
    } else {
      creatures = require('../data/data_latest.json');
    }
  });
}, null, true, 'America/Toronto');


/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date();
  var monthText = d.toLocaleString('default', { month: 'long' });
  var monthsData = getFilteredDataByCurrentMonth(d.getMonth() + 1);

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

// router.get('/update', function(req, res, next) {
//   UpdateData(function(error){
//     if (error)
//     {
//       console.log(error);
//       res.send("Failed to update data");
//       // TODO add error logging
//     } else {
//       creatures = require('../data/data_latest.json');
//       res.send("Updated data");
//     }
//   });  
// });

router.get('/january', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(1);
  var monthText = "January";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 1,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/february', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(2);
  var monthText = "February";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 2,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/march', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(3);
  var monthText = "March";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 3,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/april', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(4);
  var monthText = "April";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 4,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/may', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(5);
  var monthText = "May";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 5,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/june', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(6);
  var monthText = "June";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 6,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/july', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(7);
  var monthText = "July";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 7,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/august', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(8);
  var monthText = "August";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 8,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/september', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(9);
  var monthText = "September";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 9,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/october', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(10);
  var monthText = "October";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 10,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/november', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(11);
  var monthText = "November";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 11,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

router.get('/december', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(12);
  var monthText = "December";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 12,
      dataage: moment(creatures.time).format("YYYY-MM-DD HH:mm:ss (ZZ)")
    }
  );
});

module.exports = router;
