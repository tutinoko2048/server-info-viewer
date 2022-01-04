const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();


// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen(3000);
console.log('Server is online.');


app.post('/', function(req, res) {
  // リクエストボディを出力
  console.log(req.body);

  res.send('POST request to the homepage');
  if (req.body.mode == 'write') {
    if (req.body.info) {
      let data =`[${getTime()}] ${req.body.info}\n`;
      let file = fs.readFileSync('data.txt','utf-8');
      let output = data + file;
      fs.writeFileSync('data.txt', output)
    }
  } else if (req.body.mode == 'reset') {
      fs.writeFileSync('data.txt', '')
  }
})

function getTime(mode) {
  let date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  let month = date.getMonth()+1;
  let day = date.getDate();
  let hour = ('0' + date.getHours()).slice(-2);
  let minute = ('0' + date.getMinutes()).slice(-2);
  let second = ('0' + date.getSeconds()).slice(-2);
  if (mode == 'date') {
    return `${month}/${day} ${hour}:${minute}:${second}`;
  } else {
    return `${hour}:${minute}:${second}`;
  }
}