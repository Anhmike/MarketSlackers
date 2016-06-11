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
      //console.log(output);
      //output += JSON.stringify(req.query);
      res.send(output);

    });
  });

  apiRequest.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  //req.write(postData);
  apiRequest.end();
});