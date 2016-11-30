const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

let messageStore = [
    {value: 'this is a messageStore'},
    {value: 'this is another message'}
];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Accept", "application/json");
  next();
});

app.use('/', express.static('../client'));
app.use(bodyParser.json())

app.get('/messages', (req, res) => {
    res.send(messageStore);
});

app.post('/messages', (req, res) => {
    if(req.body && req.body.data) {
        messageStore.push({value: req.body.data});
    }
    res.status(200);
    res.send(messageStore);
})

app.listen(port, () => {
    console.log('server started on port:', port);
});