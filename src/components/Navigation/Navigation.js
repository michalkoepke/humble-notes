import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonIcon from "@material-ui/icons/Person";

import HomeIcon from "@material-ui/icons/Home";

import { useHistory, useLocation } from "react-router";

import { useAuth } from "../../Firebase/AuthContext";

import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },

    root: {
      display: "flex",
    },

    active: {
      background: "#f4f4f4",
    },

    title: {
      padding: theme.spacing(2),
    },

    appbar: {
      width: "100%",
    },

    toolbar: theme.mixins.toolbar,

    avatar: {
      marginLeft: theme.spacing(2),
    },

    kontener: {
      boxSizing: "border-box",
      marginTop: 0,
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#b0bec5",
    },

    welcome: {
      boxSizing: "border-box",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",

      backgroundColor: "#cfd8dc",

      width: "60%",
      minWidth: "300px",
    },

    logo: {
      flexGrow: 1,
    },

    przycisk: {
      marginTop: theme.spacing(4),
    },

    loginNav: {
      marginRight: theme.spacing(2),
    },

    button: {
      // background: 'red'
      margin: "0 0.5rem",
      padding: theme.spacing(3),
      color: "white",
    },
  };
});

export default function Navigation() {
  const history = useHistory();
  const location = useLocation();
  const { currentUser } = useAuth();

  const [isMobile, setIsState] = useState(false);

  // Tutaj use Effect dla responsywnosci

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon color="primary" />,
      path: "/humble-notes",
    },

    {
      text: "Sign up",
      icon: <PersonIcon color="primary" />,
      path: "/signup",
    },

    {
      text: "Log in",
      icon: <LockOpenIcon color="primary" />,
      path: "/login",
    },
  ];

  const classes = useStyles();

  // sprawdzanie czy user istnieje

  const check = () => {
    if (currentUser != null) {
      console.log({ currentUser });
    } else {
      console.log("not logged");
    }
  };

  check();

  return (
    <div>
      <AppBar
        className={classes.appbar}
        elevation={0}
        color={"secondary"}
        position="static"
      >
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.logo}>
              Humble Notes
            </Typography>

            {/* login, sign in buttons: */}

            <Box>
              {menuItems.map((item) => (
                <Button
                  className={classes.button}
                  // variant="contained"
                  // color="default"

                  key={item.text}
                  onClick={() => history.push(item.path)}
                  // className={location.pathname == item.path ? classes.active : null}
                  startIcon={item.icon}
                  color={item.color}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* avatar ponizej */}

            {/* <Typography>
                            Mike
                        </Typography>

                        <Avatar src="/MK-logo.jpg" className={classes.avatar} /> */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
