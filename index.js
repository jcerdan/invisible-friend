var nodemailer = require('nodemailer')
var shuffle = require('shuffle-array')
let users = require('./users.js')
let config = require('./config.js')
let newusers = []
let debug = true
let sendmail = false


repeated = true
while (repeated){
	repeated = false
	newusers = shuffle(users, { 'copy': true });
	newusers.forEach(function(newuser, index, newusers){
		if (newuser.name == users[index].name){
			repeated = true
		}
	})
}

newusers.forEach(function(newuser, index, newusers){
	if (debug){
		console.log(users[index].name + " => " + newuser.name)
	}
})

var transporter = nodemailer.createTransport(config.mail);

if (sendmail){
	users.forEach(function(user, index, users){
		var mailOptions = {
		  from: '"' + config.from.name + '" <' + config.from.mail +'>', 
		  to: user.mail, 
		  subject: 'TEST - Navidad invisible', 
		  text: 'ESTO ES UNA PRUEBA. ' + user.name + ' te ha tocao ' + newusers[index].name,
		  html: '<strong>ESTO ES UNA PRUEBA.</strong> ' + user.name + ' te ha tocao ' + newusers[index].name 
		};
		transporter.sendMail(mailOptions, function(error, info){
		  if(error){
		    return console.log(error);
		  }
		  console.log('Message sent to ' + user.mail + ': ' + info.response);
		})
	})
}
else{
	console.log("No mail has been sent as sendmail option is set to false")
}
