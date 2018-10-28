const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`

	console.log(log);
	fs.appendFile('server.log', log + '\n', err =>{
		if(err){
			console.log('unable to append to server.log.');
		}
	});
	next();
});

// app.use((req, res, next)=>{
// 	res.render('maitenence.hbs');
// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()

});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();

});

app.get('/', (req, res)=>{
	// res.send('<h1>hello express</h1>');
	res.render('home.hbs',{
		name: 'Noelle',
		welcomeMessage: 'welcome to my website'

	});
});

app.get('/about',(req, res)=>{
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});
});

app.get('/bad',(req, res)=>{
	res.send({
		errorMessage: 'Bruh you thought that would work'
	});
});


app.listen(3000, ()=>{
	console.log('Server is up and running dog');
});

process.on('SIGINT',()=>{
	console.log('\nserver stopped man');
	process.exit();
});