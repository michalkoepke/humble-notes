// import classes from '*.module.css'
import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'


import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';


import { useHistory, useLocation } from 'react-router'



import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'

import { format } from 'date-fns'

import { useAuth } from '../Firebase/AuthContext'



import MyDialog from './MyDialog'
import { useDialog } from '../store/DialogContext'






// szerokośc drawera:

const drawerWidth = 240

// nasze style:

const useStyles = makeStyles((theme) => {

    return {


        page: {

            backgroundColor: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },

        drawer: {
            width: drawerWidth

        },

        drawerPaper: {

            background: "#673ab7",
            width: drawerWidth
        },

        root: {
            display: 'flex'
        },

        active: {

            background: '#7e57c2'
        },

        title: {
            padding: theme.spacing(2)
        },

        appbar: {

            width: `calc(100% - ${drawerWidth}px)`,
            // padding: theme.spacing(2)
        },

        toolbar: theme.mixins.toolbar,

        date: {

            flexGrow: 1
        },

        avatar: {

            marginLeft: theme.spacing(2),
            backgroundColor: '#2196f3'
        },

        accountButton: {

            marginRight: theme.spacing(2),
            padding: "0.5rem 1rem"


        },

        itemText: {
            color: 'white'
        }



    }


})







export default function Layout(props) {

    const history = useHistory()
    const location = useLocation()


    const [error, setError] = useState("")
    const { logout } = useAuth()

    const { currentUser } = useAuth()


    const { openDialog } = useDialog()
    // const { closeDialog } = useAuth()










    // handler do logoutu

    async function handleLogout() {

        setError("")

        try {

            await logout()
            history.push('/login')

        } catch {
            setError("Failed to log out")
        }


    }





    const menuItems = [

        {
            text: 'My Notes',
            icon: <SubjectOutlined color="primary" />,
            path: '/notes'
        },

        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color="primary" />,
            path: '/create'
        },


        {
            text: 'Home',
            icon: <HomeOutlinedIcon color="primary" />,
            path: '/'
        }

    ]


    const menuItemsadditional = [

        {
            text: 'Your Account',
            icon: <PersonOutlineOutlinedIcon color="primary" />,
            // path: '/',
            funkcja: openDialog

        },

        {
            text: 'Logout',
            icon: <ExitToAppOutlinedIcon color="primary" />,
            // path: '/',
            funkcja: handleLogout
        }




    ]



    const classes = useStyles()



















    //!ORYGINAL:


    return (

        <div className={classes.root}>



            <AppBar className={classes.appbar} elevation={0} color="secondary">
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>

                    {/* <Button color="secondary" className={classes.accountButton} onClick={handleLogout}>Logout</Button>
                    <Button color="secondary" className={classes.accountButton} onClick={openDialog}>Your Account</Button> */}


                </Toolbar>

                <MyDialog />




            </AppBar>



            <Drawer className={classes.drawer}
                variant="permanent"
                // variant="temporary"
                anchor="left"

                // default paper class override:

                classes={{ paper: classes.drawerPaper }}


            >
                <div>
                    <Typography variant="h5" className={classes.title} color="primary">
                        Humble Notes
                   </Typography>
                </div>

                {/* links: */}

                <List>

                    {menuItems.map(item => (

                        <ListItem key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path ? classes.active : null}

                        >

                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} className={classes.itemText} />

                        </ListItem>

                    ))}



                </List>




                <Divider />





                <List>

                    {menuItemsadditional.map(item => (

                        <ListItem key={item.text}
                            button
                            onClick={item.funkcja}
                            className={location.pathname == item.path ? classes.active : null}

                        >

                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} className={classes.itemText} />

                        </ListItem>

                    ))}



                </List>

            </Drawer>





            <div className={classes.page}>

                <div className={classes.toolbar}></div>

                {props.children}

            </div>

        </div>
    )
}
