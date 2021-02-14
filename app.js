var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());
app.use(limiter);

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.post('/predict', function(req,res){
	var spawn = require("child_process").spawn;
	var process = spawn('python',["./app.py", req.body.message]);
	process.stdout.on('data', function(data) {
		if(data==1){
			txt="Distracting";
			res.send('<html><head><title>Result</title></head><body><header></div><h2>Text Classifier</h2><br></div></header><p><b>Results</b></p><br><h2 style="color:red;">'+txt+'</h2></body></html>');
		}
		else{
			txt="Not distracting";
			res.send('<html><head><title>Result</title></head><body><header></div><h2>Text Classifier</h2><br></div></header><p><b>Results</b></p><br><h2 style="color:green;">'+txt+'</h2></body></html>');
		}
    });
});

app.listen(process.env.PORT || 3000, function() { 
    console.log('server running on port 3000'); 
});