
var http = require('http');

var express = require('express');

var router = express();
var server = http.createServer(router);


router.get('/speedtestserver', function(req, res){

  //res.header('Content-Type', 'text/plain; charset=utf-8');
  // Allow cross-site HTTP requests
  res.header('Access-Control-Allow-Origin','*');
  // The connection must be closed after each response. Allowing the client to correctly estimate the network latency.
  
  res.header('Connection','close')
  var params=req.query;
  if (params['module']=='download')
  {

    // The response should never be cached or even stored on a hard drive
    res.header('Cache-Control','no-cache, no-store, no-transform');
    res.header('Pragma','no-cache'); // Support for HTTP 1.0
    // Define a content size for the response, defaults to 20MB.

    var contentSize = 20 * 1024 * 1024;
    if (params['size'])
    {
      contentSize=parseInt(params['size']);
      contentSize=Math.min(contentSize,200*1024*1024);
      
    }
    
    // Provide a base string which will be provided as a response to the client
    var baseString='This text is so uncool, deal with it. ';
    var baseLength=baseString.length;
    // Output the string as much as necessary to reach the required size
   
    for (var i = 0 ; i < Math.floor(contentSize / baseLength) ; i++) {
          res.write(baseString);
    }
    // If necessary, complete the response to fully reach the required size.
    if (( lastBytes = contentSize % baseLength) > 0) 
    {
        res.end(baseString.substr(0,lastBytes));
    }
    
  }
  res.end();
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  
  console.log(" server listening at", addr.address + ":" + addr.port);

  });
