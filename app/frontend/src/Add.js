import React, { useState, useContext } from 'react';
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
	const [price, setPrice] = useState(0)




	const onCreateUser = async () => {
		console.log(global)
		try {
			var res = await axios.post("/addContent", {
				subtype,
				price,
				type,
				owner: global.context.user,

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
							id="type"
							label="Type"
							name="type"
							value={type}
							onChange={e => { setType(e.target.value) }}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="subtype"
							label="subType"
							name="subtype"
							value={subtype}
							onChange={e => { setSubtype(e.target.value) }}
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
					<Grid item xs={3}>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={onCreateUser}
						>
							Add new content
         				</Button>
					</Grid>
				</Grid>
			</div>

		</Container >
	);
}