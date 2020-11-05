const express = require('express');
const app = express();

var reqq = [];
console.log('Tuta1')

app.listen(9010);

app.get('/*', function(req, res){
    res.send(reqq);
});

module.exports = {
    *beforeSendResponse(requestDetail, responseDetail) {
        reqq.push(requestDetail);  
        reqq.push('\n \n \n');
    }
  };
