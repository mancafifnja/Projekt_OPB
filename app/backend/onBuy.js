import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on buy: " + JSON.stringify(req.body))
		const [results, metadata] = await db.query("DELETE FROM živali WHERE id_živali = " + req.body.id + ";");
		console.log(results)
		console.log(metadata)

		res.status(200).send("Bought successfully")


	} catch (e) {

		console.log("Error:")
		console.warn(e)
		res.status(400).send("Failed to get content")
	}

}