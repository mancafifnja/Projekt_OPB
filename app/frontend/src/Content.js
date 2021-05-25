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
import { DialogContent, DialogTitle, Paper } from '@material-ui/core';
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
	}
}));

export default function SignUp() {
	const classes = useStyles();
	let history = useHistory();
	const [content, setContent] = useState([])
	const [openContent, setOpenContent] = useState(null)
	const global = useContext(GlobalContext)


	const onGetContent = async () => {
		try {
			var res = await axios.post("/getContent", {})
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



	useEffect(() => { onGetContent() }, []);

	return (
		<Container component="div" maxWidth="md">
			<List className={classes.root}>
				{content.map(c => {
					return <React.Fragment><ListItem alignItems="flex-start">

						<Grid container spacing={3} direction="row" justify="space-between">
							<Grid item >
								<ListItemText
									className={classes.centerbleh}
									primary={c.name}
									secondary={
										<React.Fragment>

											<Typography
												component="span"
												variant="body2"
												className={classes.inline}
												color="textPrimary"
											>
												{c.type}
											</Typography>

										</React.Fragment>
									}
								/>
							</Grid>
							<Grid item>
								<ListItemText
									className={classes.centerbleh}
									primary={c.name}
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
							<Grid item>
								<ListItemText
									className={classes.centerbleh}
									primary={c.name}
									secondary={
										<React.Fragment>

											<Typography
												component="span"
												variant="body2"
												className={classes.inline}
												color="textPrimary"
											>
												{c.price}
											</Typography>

										</React.Fragment>
									}
								/>
							</Grid>
							<Grid item>
								<Button variant="outlined" className={classes.bbbb}
									onClick={() => {
										setOpenContent(c)
									}}
								>
									Buy
								</Button>
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

					<Typography variant="h6"><AccountCircleIcon /> {openContent && (openContent.type + " " + openContent.subtype)}</Typography>
					<IconButton aria-label="close" className={classes.closeButton} onClick={() => { setOpenContent(null) }}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					{openContent && <div>To je kontent</div>}
					<Divider />
					<Container maxWith="sm" className={classes.fabcont}>
						<Fab className={classes.fab} variant="extended" onClick={() => { onBuy(openContent.id, global.context.user.name) }} variant="extended">
							Buy
						</Fab>
					</Container>
				</DialogContent>
			</Dialog>
		</Container >
	);
}