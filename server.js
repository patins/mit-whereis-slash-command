/*jshint esversion: 6 */

var express = require('express'),
    cors = require('cors'),
    request = require('request'),
    keys = require('./keys.js');

var app = express();

var corsOpts = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/typeahead', cors(corsOpts), function(req, res) {
  var q = req.query.text.trim() || '';
  if(q.length === 0) {
    res.json([{title: '<i>please enter a search term</i>', text: ''}]);
    return;
  }
  request.get('https://whereis.mit.edu/search?type=suggest&output=json&q=' + encodeURIComponent(req.query.text) + '&output=json', {json: true}, function(err, _, data) {
    if(err !== null || data.length === 0) {
      res.json([{title: '<i>no buildings found</i>', text: ''}]);
    } else {
      var suggestions = [];
      for(var i = 0; i < data.length; i++) {
        suggestions.push({title: "<b>" + data[i] + "</b>", text: data[i]});
      }
      res.json(suggestions);
    }
  });
});

function map_view(name, bldgnum, clat, clong) {
  return `<a href="https://www.google.com/maps/place/${clat},${clong}" style="display: block; text-decoration: none; color: black; text-align: center;">
  <div style="font-family: Arial, sans-serif; border: 1px solid black; border-radius: 3px;">
  <h2 style="margin: 5px; margin-bottom: 0;">${name} (${bldgnum})</h2>
  <img src="https://maps.googleapis.com/maps/api/staticmap?key=${keys.GOOGLE_MAPS_STATIC_API_KEY}&size=480x480&markers=${clat},${clong}&zoom=16" style="margin: 5px;"/>
  </div>
  </a>`;
}

app.get('/resolver', cors(corsOpts), function(req, res) {
  request.get('https://whereis.mit.edu/search?type=query&q=' + encodeURIComponent(req.query.text) + '&output=json', {json: true}, function(err, _, data) {
    if(err !== null || data.length === 0) {
      res.json({'body': '<i>MIT whereis could not find the specified building.</i>'}); // fail to complete
      return;
    }
    res.json({body: map_view(data[0].name, data[0].bldgnum, data[0].lat_wgs84, data[0].long_wgs84)});
  });
});

app.listen(process.env.PORT || 9145);
