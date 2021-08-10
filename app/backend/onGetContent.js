import db from "./Database.js"


// {
// 	place,
// 	category,
// 	subCategory
// }
export default async function (req, res) {
	try {
		console.log("Request on get contents: " + JSON.stringify(req.body))

		var query = "SELECT * FROM public.živali ORDER BY id_živali DESC LIMIT 10"
		var needsAND = false;

		if( req.body.place || req.body.category || req.body.subCategory ){
			query = "SELECT * FROM public.živali WHERE ";
		}
		if( req.body.place  ){

			query += " kraj = '" + req.body.place + "'";
			needsAND = true;
		}
		
		if( req.body.category  ){
			if(needsAND){
				query += " AND ";
				needsAND = false;
			}
			query += " kategorija IN ( SELECT id_kategorija FROM kategorija  WHERE nadkategorija = '" + req.body.category + "') ";
			needsAND = true;
		}
		
		if( req.body.subCategory ){
			if(needsAND){
				query += " AND ";
				needsAND = false;
			}
			query += " kategorija = '" + req.body.subCategory + "'" ;
		}


		const [results, metadata] = await db.query(query);
		//console.log(results)

		res.status(200).send(results)

	} catch (e) {

		console.log("Error:")
		console.warn(e)
		res.status(400).send("Failed to get content")
	}

}