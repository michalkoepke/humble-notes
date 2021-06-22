import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonIcon from "@material-ui/icons/Person";

import HomeIcon from "@material-ui/icons/Home";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Drawer from "@material-ui/core/Drawer";

import { useHistory, useLocation } from "react-router";

import { useAuth } from "../../Firebase/AuthContext";

import { useEffect, useState } from "react";

// import logoHome from '../../images/HumbleNotesLogoHome.svg'
import { ReactComponent as LogoHome } from "../../images/HumbleLogoText.svg";

// !STYLE

const drawerWidth = 240;

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
      boxSizing: "border-box",
    },

    toolbar: theme.mixins.toolbar,

    tool: {
      // boxSizing: "boredr-box"
      padding: 0,

      // experimental:

      display: "flex",
      justifyContent: "space-between",
      alignItems: "stretch",
    },

    buttonsBar: {
      display: "flex",
      alignItems: "stretch",

      // height: "100%",
    },

    button: {
      // background: 'red',
      // margin: '0 0.5rem',
      // padding: theme.spacing(3),
      padding: "1rem 2rem",
      color: "white",
      // height: '75px',
      height: "100%",
      borderRadius: "0",

      "&:hover": {
        backgroundColor: "#7e57c2",
      },

      "&:active": {
        backgroundColor: "#7e57c2",
      },
    },

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

    paper: {
      background: "#673ab7",
      width: drawerWidth,
    },

    mobileMenu: {
      display: "flex",
      flexDirection: "column",
      margin: "3rem 0rem",
    },

    mobileButton: {
      padding: "1rem 4rem",
      color: "white",
      display: "flex",
      justifyContent: "space-around",
    },

    hLogo: {
      height: 50,
      padding: "0.3rem",
      flexGrow: 1,
    },

    belka: {
      display: "flex",
      // flexGrow: 1,

      alignItems: "center",
      // boxSizing: "border-box",

      // backgroundColor: "red",
      padding: "0 1.8rem",
    },
  };
});

export default function Navi() {
  const history = useHistory();
  const location = useLocation();
  const { currentUser } = useAuth();

  // !MENU ITEMS

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon color="primary" />,
      mobileIcon: <HomeIcon color="primary" />,
      path: "/",
    },

    {
      text: "Sign up",
      icon: <PersonIcon color="primary" />,
      mobileIcon: <PersonIcon color="primary" />,
      path: "/signup",
    },

    {
      text: "Log in",
      icon: <LockOpenIcon color="primary" />,
      mobileIcon: <LockOpenIcon color="primary" />,
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

  //! stan dla mobile view i drawer

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  //! useEffect dla responsive

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  //! DISPLAY DESKTOP

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.tool}>
        <Box className={classes.belka}>
          {/* <img src={logoHome} alt="Logo" className={classes.humbleLogo} /> */}
          <LogoHome className={classes.hLogo} />

          {/* <Typography variant="h6">

                        Humble Notes
                    </Typography> */}
        </Box>

        <Box className={classes.buttonsBar}>
          {menuItems.map((item) => (
            <Button
              className={classes.button}
              key={item.text}
              onClick={() => history.push(item.path)}
              startIcon={item.icon}
              color={item.color}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    );
  };

  //! DISPLAY MOBILE

  const displayMobile = () => {
    const handleDrawerOpen = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    };

    const handleDrawerClose = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    };

    return (
      <Toolbar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          classes={{ paper: classes.paper }}
        >
          <div className={classes.mobileMenu}>
            {menuItems.map((item) => (
              <Button
                className={classes.mobileButton}
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
          </div>
        </Drawer>

        <Box className={classes.logo}>
          <LogoHome className={classes.hLogo} />
        </Box>

        {/* <Typography variant="h6" className={classes.logo}>

                    Humble Notes
                </Typography> */}

        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    );
  };

  return (
    <div>
      <CssBaseline />

      <AppBar
        className={classes.appbar}
        elevation={0}
        color="secondary"
        position="fixed"
      >
        <Container>{mobileView ? displayMobile() : displayDesktop()}</Container>
      </AppBar>
    </div>
  );
}
