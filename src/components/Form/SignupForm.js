import React, { useRef, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";

import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../Firebase/AuthContext";

import { db } from "../../Firebase/firebase";

// CSS

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: "1rem",
      marginBottom: "1rem",
      display: "block",
      backgroundColor: "white",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    alert: {
      padding: theme.spacing(2),
      margin: "2rem 0rem",
    },

    haveAccount: {
      padding: theme.spacing(3),
    },

    button: {
      margin: theme.spacing(2),
    },
  };
});

// Logika

export default function SignupForm() {
  // refs

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  //

  const { signup } = useAuth();

  // !obsluga bledow

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const classes = useStyles();

  function failureCallback(error) {
    setError("failed to create account " + error);
  }

  // ! handlery:

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);

    // ! SIGN UP + utworz kolekcje users:

    async function funkcja() {
      const cred = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );

      const {
        user: { uid },
      } = cred;
      console.log("przyszlo z bazy: ", uid);

      await makeUserCollection(uid);

      history.push("/notes");
    }

    funkcja().catch(failureCallback);

    setLoading(false);
  }

  function makeUserCollection(uid) {
    return db.collection("users").doc(uid).set({
      userID: uid,
    });
  }

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Please Sign in:
      </Typography>

      {error && (
        <Alert severity="error" className={classes.alert}>
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <TextField
          className={classes.field}
          id="email"
          label="User Email"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          type="email"
          inputRef={emailRef}
        ></TextField>

        <TextField
          className={classes.field}
          id="password"
          label="Password"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          type="password"
          inputRef={passwordRef}
        ></TextField>

        <TextField
          className={classes.field}
          id="password-confirm"
          label="Confirm Password"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          type="password"
          inputRef={passwordConfirmRef}
        ></TextField>

        <Button
          className={classes.button}
          size="large"
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          disabled={loading}
        >
          Sign in
        </Button>
      </form>

      <Typography className={classes.haveAccount} variant="subtitle1">
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
    </div>
  );
}
