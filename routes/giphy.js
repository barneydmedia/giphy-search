var express = require('express');
var request = require('request');
var router = express.Router();

// easier and more secure to do these requests on the backend
router.get('/', function(req, res, next) {
  const baseUri = 'https://api.giphy.com/v1/gifs/';
  var params = [
    ["api_key", 'T9l8SF8V8rPy84fK8LwFmaf6CIxhpqGO'],
    ["q", req.query.q ? req.query.q : 'cats'],
    ["limit", 25],
    ["offset", req.query.offset ? parseInt(req.query.offset) : 0],
    ["rating", 'PG'],
    ["lang", 'en'],
  ];
  const fmtParams = params.map((elem, index) => elem[0] + '=' + elem[1] + '&').join('');
  const searchUri = baseUri + 'search?' + fmtParams;

  request.get(searchUri,  (err, response, body) => {
    res.json(JSON.parse(body));
  });
});

module.exports = router;
