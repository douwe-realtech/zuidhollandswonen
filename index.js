var express = require('express');
var path = require('path')
var mailer = require('nodemailer');
var bodyParser = require('body-parser')

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
  console.log(req.body)
  let response = 'transporter did nothing';
  mailOptions.text = JSON.stringify(req.body, null, 2);
	transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      response = 'Error: ' + error
      console.log(error);
    } else {
      response = 'Email sent: ' + info.response;
      console.log('Email sent: ' + info.response);
    }
    res.end(response);
  });
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'client/build/index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port)

console.log(`Server Started on ${port}`)