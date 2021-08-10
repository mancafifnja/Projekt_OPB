import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on login: " + JSON.stringify(req.body))

		const [results, metadata] = await db.query("SELECT * FROM uporabniki WHERE uporabniško_ime = '" + req.body.email + "' AND geslo = '" + req.body.password + "'");

		console.log("results")
		console.log(results)
		console.log("metadata")
		console.log(metadata)

		res.status(200).send(results)

	} catch (e) {
		console.log("Error:")
		console.warn(e)
	}

}