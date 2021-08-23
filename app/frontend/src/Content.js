import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Text from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkRoute, useHistory } from "react-router-dom"
import axios from "axios"
import { DialogContent, DialogTitle, MenuItem, Paper, Select } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import GlobalContext from "./GlobalContext.js"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Fab from '@material-ui/core/Fab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
      </Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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
	contentPaper: {
		border: "1px solid black",
		margin: "10px",
		padding: "10px",
		width: "100%"
	},
	contentGrid: {
		justifyItems: "space-betwen"
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	btcicon: {
		marginBottom: -1,
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	fab: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	fabcont: {
		marginBottom: theme.spacing(3),
		marginTop: theme.spacing(3),
		marginLeft: -20,
	},
	concentdialog: {
		marginTop: '7vh',
		maxHeight: '100vh',
	},
	bookicon: {
		margin: 20,
	},
	centerbleh: {
		marginTop: 30,
		marginLeft: -20,
	},
	bbbb: {
		marginTop: 30,
	},
	img:{
		height: "100px",
		width: "100px"
	}
}));
/*
{
    'id_živali': 6690070,
    oglas: 'PRODAM MLADE ZAJCE NEMŠKI LISEC',
    pasma: 'nemški lisec',
    kategorija: 20,
    spol: null,
    cena: '10€',
    starost: '3 mesece',
    'število_nog': 4,
    opis: 'Zajci pasme nemški lisec',
    slika: 'https://www.bolha.com/image-bigger/kunci/zajci-kunci-prodam-zajca-nemski-lisec-slika-6555833.jpg',
    datum: '2021-04-01',
    prodajalec: 83,
    kraj: 312
  },


*/

export default function SignUp() {
	const classes = useStyles();
	let history = useHistory();
	const [content, setContent] = useState([])
	const [openContent, setOpenContent] = useState(null)
	const global = useContext(GlobalContext)

	const [places, setPlaces] = useState([]);
	const [kategorije, setKategorije] = useState([]);
	const [nadkategorije, setNadkategorije] = useState([]);

	const [place, setPlace] = useState(null);
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





	const onGetContent = async () => {
		try {
			var res = await axios.post("/getContent", {
				place,
				category,
				subCategory
			})
			console.log(res.data)
			setContent(res.data)
			//history.push('/home')
		} catch (e) {
			console.log("Error")
			console.warn(e)
		}
	}

	const onBuy = async (id, username) => {
		try {
			var res = await axios.post("/buy", {
				id: id,
				username: username
			})
			console.log(res.data)
			setOpenContent(null)
		} catch (e) {
			console.log("Error")
			console.warn(e)
		}
	}



	useEffect(() => { onGetContent() }, [ place, category, subCategory]);

	
	var selectedKraj = null;
	var selectedKategorija = null;
	var selectedNadkategorija = null;

	if(openContent && !openContent.krajObj){
		selectedKategorija = kategorije.find(k=>{ 
			return k.id_kategorija === openContent.kategorija
		})
		selectedNadkategorija = nadkategorije.find(k=>{ 
			return k.id_nadkategorija === selectedKategorija.nadkategorija
		})

		selectedKraj = places.find(k=>{ 
			return k.id_kraj=== openContent.kraj
		})
		console.log(selectedKraj)
		console.log(selectedKategorija)
		console.log(selectedNadkategorija)
	}

	return (
		<Container component="div" maxWidth="md">
			<Grid container direction="row" justify="space-around">
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
					onChange={e => { setSubCategory(e.target.value); 
					console.log(e.target.value) }}
					>
					<MenuItem value={null}>Nedoločeno</MenuItem>
					{kategorije.map(p=>{
						return <MenuItem value={p.id_kategorija}>{ p.ime }</MenuItem>
					})}
        		</Select>
				</Grid>
			</Grid>
			<List className={classes.root}>
				{content.map(c => {
					return <React.Fragment><ListItem alignItems="flex-start" button onClick={() => {
						setOpenContent(c)
					}}>

						<Grid container spacing={3} direction="row" justify="space-between">
							<Grid item>
								<img alt="No Img" className={classes.img} src={c.slika}></img>
							</Grid>
							<Grid item >
								<ListItemText
									className={classes.centerbleh}
									primary={c.oglas}
									secondary={
										<React.Fragment>

											<Typography
												component="span"
												variant="body2"
												className={classes.inline}
												color="textPrimary"
											>
												{c.pasma}
											</Typography>

										</React.Fragment>
									}
								/>
							</Grid>
							<Grid item>
								<ListItemText
									className={classes.centerbleh}
									primary={c.cena}
									secondary={
										<React.Fragment>

											<Typography
												component="span"
												variant="body2"
												className={classes.inline}
												color="textPrimary"
											>
												{c.subtype}
											</Typography>

										</React.Fragment>
									}
								/>
							</Grid>

						</Grid>
					</ListItem>
						<Divider />
					</React.Fragment>
				})}
			</List>
			<CssBaseline />
			<Dialog
				open={!!openContent}
				onClose={() => {
					setOpenContent(null)
				}}
				fullWidth={true}
				maxWidth="sm"
				className={classes.concentdialog}
			>
				<DialogTitle>

					<Typography variant="h6"> {selectedKategorija && selectedNadkategorija && (selectedNadkategorija.ime + ": " + selectedKategorija.ime)}</Typography>
					<IconButton aria-label="close" className={classes.closeButton} onClick={() => { setOpenContent(null) }}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					{openContent && <div>
						<Grid container direction="column" justify="space-around">
						<Typography variant="h5"> {openContent.oglas}</Typography>
						<Typography> {  openContent.opis}</Typography>
						{selectedKraj && <Typography>{
							selectedKraj.kraj
							}
							</Typography>}
						{ openContent.pasma && <Typography>{"Pasma: "+openContent.pasma}</Typography>}
						{ openContent.spol && <Typography>{"Spol: "+openContent.spol}</Typography>}
						{ openContent.starost && <Typography>{"Starost: "+ openContent.starost}</Typography>}
						{ openContent["število_nog"] && <Typography>{"Število nog: "+openContent["število_nog"]}</Typography>}
						</Grid>
						</div>}
					<Divider />
					<Container maxWith="sm" className={classes.fabcont}>
						<Fab className={classes.fab} variant="extended" onClick={() => { onBuy(openContent.id_živali, global.context.user.uporabniško_ime) }} variant="extended">
							Buy
						</Fab>
					</Container>
				</DialogContent>
			</Dialog>
		</Container >
	);
}