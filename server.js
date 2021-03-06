const express = require('express');

const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '3sds',
    database : 'smartbrain'
  }
});

//db.select('*').from ('users').then(data =>{
//	console.log(data);
//})


const app = express();
app.use(bodyParser.json());
app.use(cors());
/*const database = {

	users: [
	{
		id:'123',
		name: 'John',
		email:'John@gmail.com',
		password:'cookies',
		entries:0,
		joined:new Date()
	},
    {
		id:'124',
		name: 'Sally',
		email:'Sally@gmail.com',
		password:'bannans',
		entries:0,
		joined:new Date()
	}
	],
	login: [
	{
		id:'987',
		hash:'',
		email:'john@gmail.com'
	}
	]
}*/

app.get('/',(req,res) => {
	res.send("its working");
})

app.post('/signin',signin.handleSignin(db,bcrypt))

app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})

// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
	console.log(`app is running on port ${port}`);
})


/*
/--> res = this is working
/signin ---> post = sucess/fail
/register ---> post = user
/profile/:userid --> GET = user
/image ---> PUT --> user


*/