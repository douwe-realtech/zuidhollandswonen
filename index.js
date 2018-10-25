var express = require('express');
var path = require('path')
var mailer = require('nodemailer');
var bodyParser = require('body-parser')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())

var transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'real.tech.mailer@gmail.com',
    pass: 'realtech123'
  }
});

var mailOptions = {
  from: 'douwe@real-tech.nl',
  to: 'douwemdevries@gmail.com, douwe@real-tech.nl',
  subject: 'Nieuwe inschrijving Winston Churchilllaan',
  text: 'Er is iets misgegaan'
};

app.post('/sendform', (req, res) => {
  var data = {};
  data["email_address"] = req.body.EMAIL
  data["status"] = "subscribed"
  data["merge_fields"] = req.body
  var json = JSON.stringify(data);
  console.log(json);

  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://us15.api.mailchimp.com/3.0/lists/a9f97aa81f/members/");
  xhr.setRequestHeader('Authorization', 'Basic aGVsbWhldXM6NjQyOTBlZmZmNThkN2IzYWU4Nzk3MTgwY2JhNTk1NjktdXMxNQ==' );

  xhr.onreadystatechange = function () {
    console.log(xhr.status)
    if(xhr.readyState === 4 && xhr.status === 400) {
      console.log(xhr.responseText);
    }
  };

  // send the collected data as JSON
  xhr.send(JSON.stringify(data));

  res.send('Request send');
})

app.post('/opendag/send', (req, res) => {
  var data = {};
  data["email_address"] = req.body.EMAIL
  data["status"] = "subscribed"
  data["merge_fields"] = req.body
  var json = JSON.stringify(data);
  console.log(json);

  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://us15.api.mailchimp.com/3.0/lists/55382268b6/members/");
  xhr.setRequestHeader('Authorization', 'Basic aGVsbWhldXM6NjQyOTBlZmZmNThkN2IzYWU4Nzk3MTgwY2JhNTk1NjktdXMxNQ==' );

  xhr.onreadystatechange = function () {
    console.log(xhr.status)
    if(xhr.readyState === 4 && xhr.status === 400) {
      console.log(xhr.responseText);
    }
  };

  // send the collected data as JSON
  xhr.send(JSON.stringify(data));

  res.send('Request send');
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port)

console.log(`Server Started on ${port}`)