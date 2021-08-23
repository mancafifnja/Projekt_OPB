import db from "./Database.js"



export default async function (req, res) {
	try {
		console.log("Request on add content: " + JSON.stringify(req.body))


		const [results, metadata] = await db.query(
			"INSERT INTO živali (id_živali, oglas, kategorija, cena, število_nog, prodajalec, kraj, pasma, spol, starost, opis, slika) 	VALUES ((SELECT max(id_živali) FROM živali)+1,:oglas, :category,:price,:legs,:owner,:place,:pasma,:spol,:starost,:opis,:image)", 		
			{
				replacements: req.body,
				type: db.QueryTypes.INSERT,
			  });

		// price,
		// oglas,
		// opis,
		// starost,
		// spol,
		// place,
		// category,
		// subCategory,
		// owner: global.context.user,
		// image
		// legs



		res.status(200).send("OK")

	} catch (e) {
		console.log("Error:")
		console.warn(e)
	}

}