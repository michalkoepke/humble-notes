import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useHistory } from "react-router";

import NoteCard from "../components/NoteCard";

import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";
import Masonry from "react-masonry-css";

import { db } from "../Firebase/firebase";
import { useAuth } from "../Firebase/AuthContext";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  date: {
    flexGrow: 1,
  },

  root: {
    display: "flex",
  },
}));

export default function Notes() {
  // currentUser z use Auth

  const { currentUser } = useAuth();

  const daneUsera = currentUser.uid;

  //! STAN NOTES:

  const [notes, setNotes] = useState([]);

  // ! pobieranie danych z firebase NIE KASOWAC:

  useEffect(() => {
    const unsubscribe = db
      .collection("notes")
      .where("uid", "==", daneUsera)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot);
        if (snapshot.size) {
          const tmp = [];

          snapshot.forEach((doc) => tmp.push({ id: doc.id, ...doc.data() }));

          console.log("tmp: ", tmp);

          setNotes(tmp);
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  //! USuwanie notatek - wersja FIRESTORE

  const handleFirestoreDelete = async (id) => {
    await db
      .collection("notes")
      .doc(id)
      .delete()
      .then(console.log("usun, id dokumentu kliknietego:", id));
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    900: 1,
  };

  const classes = useStyles();

  return (
    <Container>
      <Box p={3} mt={6}>
        <Typography
          className={classes.date}
          variant="h6"
          component="h2"
          gutterBottom
          color="textSecondary"
        >
          Today is the {format(new Date(), "do MMMM Y")}
        </Typography>
      </Box>

      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((element) => (
          <div key={element.id}>
            <NoteCard note={element} handleDelete={handleFirestoreDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
