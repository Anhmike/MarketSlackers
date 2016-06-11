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

router.get('/yquote', function (req, res, next) {
 var postData = querystring.stringify({
   'msg' : 'Hello World!'
 });

 var ticker = req.query.text;
 var options = {
  hostname: 'finance.yahoo.com',
  port: 80,
  path: "/webservice/v1/symbols/"+ticker+"/quote?format=json",
  method: 'GET'
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Content-Length': postData.length
    // }
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

  // write data to request body
  //req.write(postData);
  apiRequest.end();
});

router.get('/iquote', function (req, res, next) {
 var postData = querystring.stringify({
   'msg' : 'Hello World!'
 });

 var ticker = req.query.text;
 var options = {
  hostname: 'www.intrinio.com',
  port: 80,
  path: "/api/data_point?identifier="+ticker+"&item=name,close_price,pricetoearnings,totalrevenue?format=json",
  method: 'GET'
    headers: {
       "Authorization:Basic 0d3c46cc6c9658f0624758642a92ed6e:1b4c6eb8d5553fd00f7292fc69da4336"
    }
  };

  var apiRequest = http.request(options, (apiResponse) => {

    //console.log(`STATUS: ${res.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    apiResponse.setEncoding('utf8');
    var body = '';
    apiResponse.on('data', function(d){
      body += d;
    })
    apiResponse.on('end', function(){
      var parsed = JSON.parse(body);
      if (parsed.data.meta.count != 0){
        fields = parsed.data;
        output = fields[0].value + " " + fields[0].identifier + "/n" +
         fields[1].name ":"+ fields[1].value + "/n" +
         fields[2].name ":"+ fields[2].value + "/n" +
         fields[3].name ":"+ fields[3].value + "/n" + 
         fields[4].name ":"+ fields[4].value;
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

  // write data to request body
  //req.write(postData);
  apiRequest.end();
});
