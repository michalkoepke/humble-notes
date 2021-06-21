import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Link from "@material-ui/core/Link";

import MailIcon from "@material-ui/icons/Mail";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";

import { useHistory } from "react-router";

import React from "react";

import logo from "../images/HumbleLogoText.svg";

const drawerWidth = 240;

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const menuItems = [
  {
    text: "michalkoepke@gmail.com",
    icon: <MailIcon color="primary" />,
    path: "",
    // foo: handleDrawerToggle
  },

  {
    text: "LinkedIn",
    icon: <LinkedInIcon color="primary" />,
    path: "https://www.linkedin.com/in/michał-koepke-30021233/",
    // foo: handleDrawerToggle
  },

  {
    text: "My website",
    icon: <LanguageIcon color="primary" />,
    path: "https://xenodochial-lalande-fc3c2e.netlify.app/#home",
    // foo: handleDrawerToggle
  },
];

const SecondMenuItems = [
  {
    text: "Home",
    icon: <HomeOutlinedIcon color="primary" />,
    path: "/",
  },

  {
    text: "My Notes",
    icon: <SubjectOutlined color="primary" />,
    path: "/notes",
  },

  {
    text: "Create Note",
    icon: <AddCircleOutlineOutlined color="primary" />,
    path: "/create",
  },
];

const useStyles = makeStyles((theme) => {
  return {
    foot: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },

      padding: theme.spacing(3),

      // backgroundColor: "#673ab7",
      // ciemniejszy deepPurple:
      backgroundColor: "#261754",

      boxSizing: "border-box",

      margin: 0,
    },

    kontener: {
      padding: "4rem 0rem",

      [theme.breakpoints.up("sm")]: {
        padding: "4rem 2rem",
      },

      boxSizing: "border-box",
      witdh: "90%",
    },

    lista: {
      color: "#b39ddb",
    },

    ikona: {
      color: "#b39ddb",
      opacity: "0.5",
    },

    itemText: {
      color: "#b39ddb",
      cursor: "pointer",

      "&:hover": {
        color: "white",
      },

      "&:active": {
        color: "white",
      },
    },

    naglowek: {
      marginBottom: "2rem",
      paddingLeft: "1rem",
      fontWeight: "300",
    },

    opis: {
      color: "#b39ddb",
    },

    logo: {
      width: "200px",
      opacity: "0.7",
    },

    gridElement: {
      boxSizing: "border-box",
      // maxWidth: "250px"
    },

    gridElementDescription: {
      boxSizing: "border-box",
      marginLeft: "1rem",

      [theme.breakpoints.up("sm")]: {
        marginLeft: "0px",
      },
    },

    gridContainer: {
      boxSizing: "border-box",
    },

    boxik: {
      maxWidth: "280px",
    },

    link: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    },
  };
});

export default function Footer() {
  const preventDefault = (event) => event.preventDefault();

  const history = useHistory();

  const classes = useStyles();

  return (
    <div className={classes.foot}>
      <CssBaseline />

      <Container className={classes.kontener}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            className={classes.gridElementDescription}
          >
            <Box pb={4}>
              <img src={logo} alt="Logo" className={classes.logo} />
            </Box>

            <Box pb={4} className={classes.boxik}>
              <Typography variant="body1" className={classes.opis}>
                A simple note App. I have made it in process of learnig
                React.js. You can add and delete your notes, and put them into
                categories. Feel free to use it for your notes.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            className={classes.gridElement}
          >
            <Typography
              variant="h6"
              color="primary"
              className={classes.naglowek}
            >
              Contact
            </Typography>

            {menuItems.map((item) => (
              <ListItem key={item.text}>
                <Link
                  href={item.path}
                  className={classes.link}
                  underline="none"
                  color="primary"
                >
                  <ListItemIcon className={classes.ikona}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className={classes.itemText}
                  />
                </Link>
              </ListItem>
            ))}
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            className={classes.gridElement}
          >
            <Typography
              variant="h6"
              color="primary"
              className={classes.naglowek}
            >
              Links
            </Typography>

            {SecondMenuItems.map((item) => (
              <ListItem
                key={item.text}
                // button
                onClick={() => {
                  history.push(item.path);
                }}
              >
                <ListItemIcon className={classes.ikona}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={classes.itemText}
                />
              </ListItem>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
