import React from "react";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Box, FormControlLabel, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { useAuth } from "../Firebase/AuthContext";
import { db } from "../Firebase/firebase";

import { useHistory } from "react-router";

const useStyles = makeStyles({
  field: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    display: "block",
  },

  kontener: {
    marginTop: "4rem",
  },
});

export default function Create() {
  //firebase user:

  const { currentUser } = useAuth();

  // klasy:

  const classes = useStyles();

  // useHistoryHook:

  const history = useHistory();

  // stan dla notatek:

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const [category, setCategory] = useState("todos");

  //! handlers

  //! FIRESTORE Submit

  const handleFireSubmit = (e) => {
    e.preventDefault();
    console.log("firestore submit clicked");

    createFireCollection(currentUser);
  };

  //! funkcja tworzenia nowej kolekcji (notatki):

  async function createFireCollection(currentUser) {
    if (title && details) {
      var newDocRef = db.collection("notes").doc();

      return await newDocRef
        .set({
          title: title,
          category: category,
          details: details,
          uid: currentUser.uid,
          id: newDocRef.id,

          // ponizej bedzie ten timestamp

          createdAt: new Date(),
        })
        .then(() => history.push("/notes"));
    }
  }

  return (
    <Container className={classes.kontener}>
      {/* firestore form */}

      <Typography
        className={classes.title}
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleFireSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          id="outlined-basic"
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        ></TextField>

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          id="outlined-basic"
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows="4"
          error={detailsError}
        ></TextField>

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>

          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="money" control={<Radio />} label="money" />
            <FormControlLabel value="todos" control={<Radio />} label="todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
      <br></br>
    </Container>
  );
}
