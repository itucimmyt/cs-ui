import EBSAnimate from 'components/atoms/EBSAnimate';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux'; 
import * as authActions from 'store/ducks/auth';
 
//Your styles here


const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh'
	},
	font: {
		fontFamily: 'Raleway'
	},
	containerToolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	list: {
		display: 'flex'
	},
	listItem: {
		color: '#000'
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative'
	}
}));


export default function LoginView(props) { 
    const classes = useStyles();
	const dispatch = useDispatch();
 

 
	async function handleLogin() {
		await dispatch(authActions.getLogin());
		// window.location.href = '/';
	}

	return (
		<div className={classes.root}>
			
			<AppBar position="absolute" color="transparent" elevation={0} className={''}>
				<Toolbar className={classes.containerToolbar}>
					<EBSAnimate animation="transition.expandIn" className={''}>
						<img className={'m-16'} width="180" src="assets/images/logos/EBS_Vertical_2.png" alt="logo" />
					</EBSAnimate>
					<nav>
						<List className={classes.list}>
							<ListItem className={classes.listItem}>
								<Button href="#" onClick={e => e.preventDefault()}>
									Products
								</Button>
							</ListItem>
							<ListItem className={classes.listItem}>
								<Button href="#" onClick={e => e.preventDefault()}>
									AboutUs
								</Button>
							</ListItem>
							<ListItem className={classes.listItem}>
								<Button href="#" onClick={e => e.preventDefault()}>
									Contact
								</Button>
							</ListItem>
						</List>
					</nav>
					<Button
						variant="contained"
						className="w-224 bg-ebs-brand hover:bg-ebs-brand-900 text-white"
						aria-label="Login"
						disabled={false}
						onClick={handleLogin}
					>
						LOGIN
					</Button>
				</Toolbar>
			</AppBar>
			<div className={'flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0'}>
				<div className="flex flex-col flex-grow-0 items-center text-ebs-gray mt-32 p-16 text-center md:p-60 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
					<EBSAnimate animation="transition.slideUpIn" delay={300}>
						<Typography
							variant="h3"
							color="inherit"
							paragraph={true}
							className="font-bold text-ebs-green-900"
						>
							Enterprise Breeding System
						</Typography>
					</EBSAnimate>

					<div className="max-w-lg mt-16">
						<EBSAnimate delay={200}>
							<Typography variant="subtitle1" align="justify" paragraph={true} className={classes.font}>
								The Enterprise Breeding System (EBS) is an open-source breeding informatics software
								being developed for crop breeding programs serving resource-poor farmers in Africa, Asia
								and Latin America.
							</Typography>
						</EBSAnimate>
						<EBSAnimate delay={400}>
							<Typography variant="subtitle1" align="justify" className={classes.font}>
								The EBS connects, merges and builds upon existing breeding software and data solutions
								to offer a single powerful tool, so that breeders can focus on using data to create
								better varieties, faster.
							</Typography>
						</EBSAnimate>
					</div>

					<EBSAnimate animation="transition.expandIn">
						<img
							className="w-320 h-320 mt-40 ml-80"
							src="assets/images/branding/ebs_domains.png"
							alt="logo"
						/>
					</EBSAnimate>
				</div>
				<EBSAnimate animation={{ translateX: [0, '100%'] }}>
					<div className="w-full max-w-400 mx-auto m-16 md:m-0">
						<div className="w-300 h-screen bg-ebs-green" style={{"clipPath" : "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)"}}/>
					</div>
				</EBSAnimate>
			</div>
		</div>
	);
}
