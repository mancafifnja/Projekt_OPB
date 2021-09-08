import db from "./Database.js"

export default async function (req, res) {
	try {
		console.log("Request on get subcategory: " + JSON.stringify(req.body))
		var results = null;
		var metadata = null;
		if( req.body.category ){
			[results, metadata] = await db.query("SELECT * FROM kategorija WHERE nadkategorija = :category", {
					replacements: {
						category: req.body.category
					},
					type: db.QueryTypes.INSERT,
			});
		} else {
			[results, metadata] = await db.query("SELECT * FROM kategorija");
		}
		// console.log(results)

		res.status(200).send(results)


	} catch (e) {

		console.log("Error:")
		console.warn(e)
		res.status(400).send("Failed to get content")
	}

}