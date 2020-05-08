var express = require('express');
var router = express.Router();

var bugs_north = require('../data/bugs_north.json');
var bugs_south = require('../data/bugs_south.json');
var fish_north = require('../data/fish_north.json');
var fish_south = require('../data/fish_south.json');

var data = {
  "bugs": {
    "north": bugs_north,
    "south": bugs_south
  },
  "fish": {
    "north": fish_north,
    "south": fish_south
  }
};

var titlePrefix = "What leaves in ";
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
  
  // filter bugs

  for (var i = 0; i < data.bugs.north.length; i++) {
    if (data.bugs.north[i][monthcode] && !data.bugs.north[i][nextmonth]) {
      filteredData.bugs.north.push(data.bugs.north[i]);
    }
  }

  for (var i = 0; i < data.bugs.south.length; i++) {
    if (data.bugs.south[i][monthcode] && !data.bugs.south[i][nextmonth]) {
      filteredData.bugs.south.push(data.bugs.south[i]);
    }
  }

  for (var i = 0; i < data.fish.north.length; i++) {
    if (data.fish.north[i][monthcode] && !data.fish.north[i][nextmonth]) {
      filteredData.fish.north.push(data.fish.north[i]);
    }
  }

  for (var i = 0; i < data.fish.north.length; i++) {
    if (data.fish.south[i][monthcode] && !data.fish.south[i][nextmonth]) {
      filteredData.fish.south.push(data.fish.south[i]);
    }
  }

  return filteredData;
}

//console.log(getFilteredDataByCurrentMonth(3).bugs.north);


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
      monthNumber: d.getMonth() + 1
    }
  );
});

router.get('/january', function(req, res, next) {
  var monthsData = getFilteredDataByCurrentMonth(1);
  var monthText = "January";
  res.render(
    'month', 
    { 
      title: titlePrefix + monthText + titleSuffix, 
      data: monthsData, 
      month: monthText,
      monthNumber: 1
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
      monthNumber: 2
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
      monthNumber: 3
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
      monthNumber: 4
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
      monthNumber: 5
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
      monthNumber: 6
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
      monthNumber: 7
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
      monthNumber: 8
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
      monthNumber: 9
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
      monthNumber: 10
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
      monthNumber: 11
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
      monthNumber: 12
    }
  );
});

module.exports = router;
