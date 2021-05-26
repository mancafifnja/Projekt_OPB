import db from "./Database.js"
export default async function onCreateUser(req, res) {
	try {
		console.log("Request on create user: " + JSON.stringify(req.body))

		const [results, metadata] = await db.query("UPDATE users SET y = 42 WHERE x = 12");

		// var user = await db.Users.create({
		// 	email: req.body.email,
		// 	password: req.body.password,
		// 	name: req.body.name,
		// 	account: "temp",
		// })
		// console.log("Start creating user")
		// var node = await createNode(req.body.name, user.dataValues.id)
		// console.log("Stop creating user")
		// console.log(node)
		// if (user) {
		// 	res.status(200).send(user)
		// } else {
		// 	console.log("Failed to create user")
		// 	res.status(400).send("Invalid username or password")
		// }



		res.status(200).send({ name: req.body.name })
	} catch (e) {
		console.log("Error:")
		console.warn(e)
	}
}