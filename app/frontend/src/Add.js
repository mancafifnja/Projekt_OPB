import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRoute, useHistory } from "react-router-dom"
import axios from "axios"
import GlobalContext from "./GlobalContext.js"
import { MenuItem, Select } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'left',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	data: {
		height: "100%"
	},
	dataItem: {
	}
}));

export default function SignUp() {
	const global = useContext(GlobalContext);
	const classes = useStyles();
	let history = useHistory();
	const [type, setType] = useState("")
	const [subtype, setSubtype] = useState("")
	const [price, setPrice] = useState("")
	const [oglas, setOglas] = useState("")
	const [opis, setOpis] = useState("")
	const [starost, setStarost] = useState("")
	const [spol, setSpol] = useState("")
	const [image, setImage] = useState("")
	const [legs, setLegs] = useState("")
	const [pasma, setPasma] = useState("")


	const [places, setPlaces] = useState([]);
	const [kategorije, setKategorije] = useState([]);
	const [nadkategorije, setNadkategorije] = useState([]);

	const [place, setPlace] = useState(global.context.user.kraj);
	const [category, setCategory] = useState(null);
	const [subCategory, setSubCategory] = useState(null);


	useEffect (  ()=>{
		axios.post("/getPlaces", {}).then((res)=>{
			console.log(res.data);
		  	setPlaces(res.data);
		})
	}, [])

	useEffect (  ()=>{
	axios.post("/getCategory", {}).then((res)=>{
		console.log(res.data);
		setNadkategorije(res.data);
	})
	}, [])

	useEffect (  ()=>{
		axios.post("/getSubcategory", { category: category}).then((res)=>{
		  console.log(res.data);
		  setKategorije(res.data);
		})
	}, [category])




	const onCreateItem = async () => {
		console.log(global)
		try {
			var res = await axios.post("/addContent", {
				price,
				oglas,
				opis,
				starost,
				spol,
				place,
				category,
				subCategory,
				owner: global.context.user.id_uporabnik,
				image,
				legs,
				pasma
			})
			console.log(res)
			history.push('/home')
		} catch (e) {
			console.log("Error")
			console.warn(e)
		}
	}
	return (
		<Container component="div" maxWidth="lg">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5" style={{ marginBottom: "20px" }}>
					New animal
        		</Typography>
				<Grid container spacing={3} direction="column">
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="oglas"
							label="Oglas"
							name="oglas"
							value={oglas}
							onChange={e => { setOglas(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="opis"
							label="Opis"
							name="opis"
							value={opis}
							onChange={e => { setOpis(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							id="Starost"
							label="Starost"
							name="Starost"
							value={starost}
							onChange={e => { setStarost(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							id="Legs"
							type="number"
							label="Število nog"
							name="Legs"
							value={legs}
							onChange={e => { setLegs(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							id="Spol"
							label="Spol"
							name="Spol"
							value={spol}
							onChange={e => { setSpol(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							fullWidth
							id="Pasma"
							label="Pasma"
							name="Pasma"
							value={pasma}
							onChange={e => { setPasma(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="price"
							label="price"
							name="Price"
							value={price}
							onChange={e => { setPrice(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="Image"
							label="Image URL"
							name="Image"
							value={image}
							onChange={e => { setImage(e.target.value) }}
						/>
					</Grid>
					<Grid item>
					<Typography> Kraj:</Typography>
					<Select
						autoWidth
						variant="outlined"
						displayEmpty
						className={classes.select}
						labelId="place-select"
						id="place-select"
						value={place}
						onChange={e => { setPlace(e.target.value) }}
						>
						<MenuItem value={null}>Nedoločeno</MenuItem>
						{places.map(p=>{
							return <MenuItem value={p.id_kraj}>{ p.pošta + " " + p.kraj }</MenuItem>
						})}
					</Select>
				</Grid>
				<Grid item>
				<Typography>Nadkategorija:</Typography>
				<Select
					variant="outlined"
					displayEmpty
					className={classes.select}
					labelId="place-select"
					id="place-select"
					value={category}
					onChange={e => { setCategory(e.target.value) }}
					>
					<MenuItem value={null}>Nedoločeno</MenuItem>
					{nadkategorije.map(p=>{
						return <MenuItem value={p.id_nadkategorija}>{ p.ime }</MenuItem>
					})}
        		</Select>
				</Grid>
				<Grid item>
				<Typography>Kategorija:</Typography>
				<Select
					variant="outlined"
					displayEmpty
					className={classes.select}
					labelId="place-select"
					id="place-select"
					value={subCategory}
					onChange={e => { setSubCategory(e.target.value) }}
					>
					<MenuItem value={null}>Nedoločeno</MenuItem>
					{kategorije.map(p=>{
						return <MenuItem value={p.id_kategorija}>{ p.ime }</MenuItem>
					})}
        		</Select>
				</Grid>
					<Grid item xs={3}>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={onCreateItem}
						>
							Add new content
         				</Button>
					</Grid>
				</Grid>
			</div>

		</Container >
	);
}