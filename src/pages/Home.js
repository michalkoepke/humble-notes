import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React from "react";

import { useHistory } from "react-router";
import Background from "../components/Background";
import FooterHome from "../components/FooterHome";

import Navi from "../components/Navigation/Navi";

import { useAuth } from "../Firebase/AuthContext";

import HumbleNotesBG from "../images/HumbleNotesBG.svg";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      padding: theme.spacing(3),
    },

    backg: {
      height: "100vh",
      backgroundImage: `url(${HumbleNotesBG})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    root: {
      display: "flex",

      minHeight: "100vh",
      backgroundImage: `url(${HumbleNotesBG})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
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

      height: "80%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    welcome: {
      boxSizing: "border-box",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",

      width: "60%",
      minWidth: "300px",
      marginBottom: "3rem",
    },

    logo: {
      flexGrow: 1,
    },

    przycisk: {
      marginTop: "1rem",
    },

    loginNav: {
      marginRight: theme.spacing(2),
    },

    button: {
      margin: "0 0.5rem",
      padding: theme.spacing(3),
    },

    spaceBig: {
      marginBottom: "6rem",
    },

    spaceSmall: {
      marginBottom: "3rem",
    },

    bgWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  };
});

export default function Home() {
  const classes = useStyles();

  const history = useHistory();

  const { currentUser } = useAuth();

  // handler

  function startHandler(currentUser) {
    currentUser ? history.push("/notes") : history.push("/login");
  }

  return (
    <div>
      <Background className={classes.bgWrapper}>
        <Navi />

        <Container className={classes.kontener}>
          <Box className={classes.welcome}>
            <Box p={6}>
              <Typography variant="h3" align="center" color="secondary">
                Welcome to Humble Notes
              </Typography>
            </Box>

            <Typography variant="body1" align="center">
              A simple note App. I have made it as a demo in process of learnig
              React.js. The App uses Firebase/Firestore database. You can add
              and delete your notes, and put them into categories. <br></br>
              <br></br>
              Feel free to test it, or use for your notes. <br></br>
              In this app I have used: React, Firebase, Material UI.
            </Typography>
          </Box>

          <Button
            className={classes.przycisk}
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={startHandler}
          >
            Start
          </Button>
        </Container>
      </Background>

      <FooterHome />
    </div>
  );
}
