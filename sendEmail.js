var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/sendEmail',function(req,res){
	sendEmail(req.body, res);
	console.log(req.body);
});

app.listen(157);
console.log('Servidor rodando na porta 157');

function sendEmail(params,res){
	var options = {
		host: params.host != null
		 	? params.host
		 	: 'smtp-mail.outlook.com',

		secureConnection: params.secureConnection != null
			? params.secureConnection
			: false,

		port: params.port != null
			? params.port
			: 587,
		auth: {
			user: params.auth != null && params.auth.user != null
				? params.auth.user
				: 'guilhermeesteves@outlook.com.br',
			pass: params.auth != null && params.auth.pass != null
				? params.auth.pass
				: '123'
		}
	};

	var transporter = nodemailer.createTransport(options);
			
	var mailOptions = {
		from: params.emailFrom,
		to: params.emailTo,
		subject: params.subject,
		html: params.html
	};

	transporter.sendMail(mailOptions,function(error,info){
		if(error){
			console.log(error);
			res.status(500).send(info.response);
		}
		else{
			//console.log(info.response);
			res.send("email enviado");
		}
	});
}
