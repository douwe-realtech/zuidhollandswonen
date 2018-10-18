var express = require('express');
var path = require('path')
var mailer = require('nodemailer');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

var transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'real.tech.mailer@gmail.com',
    pass: 'realtech123'
  }
});

var mailOptions = {
  from: 'douwe@real-tech.nl',
  to: 'douwemdevries@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

app.post('/sendform', (req, res) => {
	transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'client/build/index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port)

console.log(`Server Started on ${port}`)