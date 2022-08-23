import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

/*Import from Material UI*/
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import MonetizationOnSharpIcon from '@mui/icons-material/MonetizationOnSharp';
import TrackChangesSharpIcon from '@mui/icons-material/TrackChangesSharp';
import HomeWorkSharpIcon from '@mui/icons-material/HomeWorkSharp';
import VolunteerActivismSharpIcon from '@mui/icons-material/VolunteerActivismSharp';

const drawerWidth = 240;

const menuItems= [
    {
        text: 'Home',
        icon: <HomeSharpIcon color="secondary"/>,
        path: '/'
    },
    {
        text: 'Networth',
        icon: <MonetizationOnSharpIcon color="secondary"/>,
        path: 'networth'
    },
    {
        text: 'Goal',
        icon: <TrackChangesSharpIcon color="secondary"/>,
        path: 'goal'
    },
    {
        text: 'Property',
        icon: <HomeWorkSharpIcon color="secondary"/>,
        path: 'property'
    },
    {
        text: 'Donation',
        icon: <VolunteerActivismSharpIcon color="secondary"/>,
        path: 'donation'
    }
]

const useStyles = makeStyles((theme) => {
    return{
        page: {
            // background: '#f9f9f9',
            background: '#e4f2f7',
            width: '100%',
            padding: theme.spacing(3),
        },
        root: {
            display: 'flex',
            minHeight: "100vh",
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        active: {
            // background: '#f4f4f4'
            background: '#e4f2f7'
        },
        title: {
            padding: 30
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        toolbar: theme.mixins.toolbar,
        space: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        },
        bottomPush: {
            position: "fixed",
            bottom: 0,
            textAlign: "center",
            paddingBottom: 10,
            paddingLeft: 60
        }
    }
})

const Layout = () => {

    const classes = useStyles();
    const history = useNavigate();
    const location = useLocation();

    return(
        <div className={classes.root}>
            {/* app bar */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.space}>
                        {/* Test */}
                    </Typography>
                    <Typography>Are Lee</Typography>
                    <Avatar className={classes.avatar} src="/" />
                </Toolbar>
            </AppBar>
            
            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
                elevation={3}
            >
                <Box
                display="flex"
                height={100}
                >
                <Box m="auto">
                <Typography variant="h5" className={classes.title}>
                    TheFuture
                </Typography>
                    {/* <img src="/logo.png" alt="logo" style={{height: 40, width: 125}}/> */}
                    {/* <img src="/logo1.png" alt="logo"/> */}
                </Box>
                </Box>
                <Divider />

                {/* links/list section */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem 
                            button 
                            key={item.text} 
                            onClick={() => history(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                            sx={{height: 50}}
                        >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
    
            {/* main content */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;