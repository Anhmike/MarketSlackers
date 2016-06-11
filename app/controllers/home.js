var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  http = require('http'),
  querystring = require('querystring');


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  // Article.find(function (err, articles) {
  //   if (err) return next(err);
  //   res.render('index', {
  //     title: 'Generator-Express MVC',
  //     articles: articles
  //   });
  //
    return "Hello World";

});
router.post('/dew', function (req, res, next) {
  res.status(200).json({text:'hello to Roboadvisor'});
  // Article.find(function (err, articles) {
  //   if (err) return next(err);
  //   res.render('index', {
  //     title: 'Generator-Express MVC',
  //     articles: articles
  //   });
  //
    //return "Hello World";

});



router.get('/yquote', function (req, res, next) {
   var postData = querystring.stringify({
   'msg' : 'Hello World!'
  });

  var options = {
    hostname: 'finance.yahoo.com',
    port: 80,
    path: '/webservice/v1/symbols/MSFT/quote?format=json',
    method: 'GET'
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Content-Length': postData.length
    // }
  };

  var req = http.request(options, (apiResponse) => {
    console.log('hello');
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    apiResponse.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //   console.log(`BODY: ${chunk}`);
    // });
    // res.on('end', () => {
    //   console.log('No more data in response.')
    // })
    var body = '';
    apiResponse.on('data', function(d){
      body += d;
    })
    apiResponse.on('end', function(){
      var parsed = JSON.parse(body);
      fields = parsed.list.resources[0].resource.fields;
      output = fields.name + " " + fields.symbol + " " + fields.price;
      console.log(output);
      res.send(output);
    });
  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  //req.write(postData);
  req.end();
});
