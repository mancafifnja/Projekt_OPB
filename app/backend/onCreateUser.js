import db from "./Database.js"
export default async function onCreateUser(req, res) {
	try {
		console.log("Request on create user: " + JSON.stringify(req.body))

		var [results, metadata] = await db.query("INSERT INTO uporabniki (id_uporabnik, uporabniško_ime, telefon, kraj, geslo) VALUES ( (SELECT max(id_uporabnik) FROM uporabniki)+1,:uporabniskoIme ,:telefon,:kraj,:geslo)",
			{
				replacements: {
					uporabniskoIme: req.body.username,
					geslo: req.body.password,
					telefon: req.body.phone,
					kraj: req.body.place,
				},
				type: db.QueryTypes.INSERT,
			});

		console.log("results")
		console.log(results)
		console.log("metadata")
		console.log(metadata)

		results = await db.query("SELECT * FROM uporabniki WHERE uporabniško_ime = '" + req.body.username + "' AND geslo = '" + req.body.password + "'");


		console.log(results[0][0])

		res.status(200).send(results[0])
	} catch (e) {
		console.log("Error:")
		console.warn(e)
	}
}