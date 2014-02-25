
/**
 * Module dependencies.
 */

 var express = require('express');
 var http = require('http');
 var path = require('path');
 var mongoose = require('mongoose');

 var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//renders the index page
app.get('/', function(req, res){
	res.render('index')
});

mongoose.connect('mongodb://localhost/Omega3')

var ApplicantSchema= new mongoose.Schema({
	name: String,
	bio: String,
	skills: String,
	experience: Number,
	reason: String 
});

var ApplicantModel= mongoose.model('applicant', ApplicantSchema)


// displays a list of applicants
app.get('/applicants', function(req, res){

});

// creates and applicant
app.post('/applicant', function (req, res){
	console.log(req.body);

	var newApplicant = new ApplicantModel ({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		experience: req.body.years,
		reason: req.body.why
	});

// Here is where you need to get the data
	// from the post body and store it
	newApplicant.save(function (err, data) {
		res.render('successPage');
	})
	
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
