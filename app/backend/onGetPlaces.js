import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on get places: " + JSON.stringify(req.body))
		const [results, metadata] = await db.query("SELECT * FROM kraj");
		//console.log(results)

		res.status(200).send(results)


	} catch (e) {

		console.log("Error:")
		console.warn(e)
		res.status(400).send("Failed to get content")
	}

}