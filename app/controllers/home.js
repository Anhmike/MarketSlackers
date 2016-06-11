var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
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
  return res.status(200).send("Hello THere");

});

router.post('/dew', function(req, res, next) {
  return res.status(200).json({text:JSON.stringify(req.body)});
/*
  if(body.text){
    return res.status(200).json({text:"I am Dew! I will be your financial advisor."+
      +" I will help you to learn about investing."
      +"I will also help you to build a portfolio and track progress overtime."});
  }
  */
//help
//I am Dew! I will be your financial advisor. I will help you to learn about investing.
//I would also help you to build a portfolio and track progress overtime.


  //return "What is your age?"
  //return res.status(200).json({text:"Hello there"});
});

router.get('/buy', function (req, res, next) {

 var ticker = req.query.text;
 var userid = req.query;
 res.send(userid);
 var options = {
  hostname: 'finance.yahoo.com',
  port: 80,
  path: "/webservice/v1/symbols/"+ticker+"/quote?format=json",
  method: 'GET'
  };

  var apiRequest = http.request(options, (apiResponse) => {

    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    apiResponse.setEncoding('utf8');
    var body = '';
    apiResponse.on('data', function(d){
      body += d;
    })
    apiResponse.on('end', function(){
      var parsed = JSON.parse(body);
      if (parsed.list.meta.count != 0){
        fields = parsed.list.resources[0].resource.fields;
        output = fields.name + " " + fields.symbol + " " + fields.price;
      //console.log(output);
      //output += JSON.stringify(req.query);
      res.send(output);
    }
    else {
      res.status(404).send("Ticker not found");
    }
  });
  });

  apiRequest.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  apiRequest.end();
});


router.get('/yquote', function (req, res, next) {

 var ticker = req.query.text;
 var options = {
  hostname: 'finance.yahoo.com',
  port: 80,
  path: "/webservice/v1/symbols/"+ticker+"/quote?format=json",
  method: 'GET'
  };

  var apiRequest = http.request(options, (apiResponse) => {

    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    apiResponse.setEncoding('utf8');
    var body = '';
    apiResponse.on('data', function(d){
      body += d;
    })
    apiResponse.on('end', function(){
      var parsed = JSON.parse(body);
      if (parsed.list.meta.count != 0){
        fields = parsed.list.resources[0].resource.fields;
        output = fields.name + " " + fields.symbol + " " + fields.price;
      //console.log(output);
      //output += JSON.stringify(req.query);
      res.send(output);
    }
    else {
      res.status(404).send("Ticker not found");
    }
  });
  });

  apiRequest.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  apiRequest.end();
});
