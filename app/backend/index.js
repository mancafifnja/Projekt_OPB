import dotenv from 'dotenv'
dotenv.config()
// require('dotenv').config()
import express from "express"
import db from "./Database.js"
import BodyParser from "body-parser"
import onLogin from "./onLogin.js"
import onCreateUser from "./onCreateUser.js"
import onAddContent from "./onAddContent.js"
import onGetContent from "./onGetContent.js"
import onGetPlaces from "./onGetPlaces.js"
import onGetCategory from './onGetCategory.js'
import onGetSubcategory from './onGetSubcategory.js'
import onBuy from "./onBuy.js"

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

console.log(process.env)

const app = express();
const port = 8765;
try {



	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Headers", "*");
		next();
	});


	app.use(BodyParser.json())

	app.get('/', (req, res) => {
		res.sendFile("./build/index.html")
	});

	app.post("/login", onLogin)
	app.post("/createUser", onCreateUser)
	app.post("/addContent", onAddContent)
	app.post("/getContent", onGetContent)
	app.post("/buy", onBuy)
	app.post("/getPlaces", onGetPlaces)
	app.post("/getCategory", onGetCategory)
	app.post("/getSubcategory", onGetSubcategory)

	app.get('/singin', function(req, res) {res.redirect('/')})
	app.get('/singup', function(req, res) {res.redirect('/')})
	app.get('/home', function(req, res) {res.redirect('/')})
	app.get('/add', function(req, res) {res.redirect('/')})
	app.get('/add', function(req, res) {res.redirect('/')})

	app.listen(port, () => {
		console.log(`Example app listening on port ${port}!`)
	});
} catch (e) {
	console.log("catch error")
	console.warn(e)
}
