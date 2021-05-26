import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on get contents: " + JSON.stringify(req.body))

		// var content = await db.Content.findAll({
		// })

		res.status(200).send([
			{
				id: 1,
				type: "pes",
				subtype: "bernardinec",
				price: 12.4,
				location: "Nalov1"
			},
			{
				id: 2,
				type: "mačka",
				subtype: "bela",
				price: 14314.4,
				location: "Nalov2"
			},
		])


	} catch (e) {

		console.log("Error:")
		console.warn(e)
		res.status(400).send("Failed to get content")
	}

}