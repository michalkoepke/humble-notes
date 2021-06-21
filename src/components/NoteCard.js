import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import {
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { DeleteOutlined } from "@material-ui/icons";

import { blue, green, pink, yellow } from "@material-ui/core/colors";

import { format } from "date-fns";

import Button from "@material-ui/core/Button";

import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category == "work") {
        return yellow[700];
      }

      if (note.category == "money") {
        return green[500];
      }

      if (note.category == "todos") {
        return pink[500];
      }

      return blue[500];
    },
  },

  cardHead: {
    fontSize: "40px",
    color: "red",
  },

  boxik: {
    display: "flex",
    flexDirection: "column",
    margin: "0.3rem 1rem",
  },

  mainBox: {
    padding: "0rem 0.5rem",
  },

  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },

  avatarBox: {
    display: "flex",
    alignItems: "center",
  },
});

export default function NoteCard({ note, handleDelete }) {
  // to jest do modalu(dialogu)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // to jest do modalu(dialogu) UPDATE:

  const [updateOpen, setUpdateOpen] = useState(false);

  const handleClickUpdateOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const data = note.createdAt.toDate();

  const classes = useStyles(note);

  const handleUpdate = () => {
    console.log("update note");
  };

  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={handleClickOpen}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />

        <CardContent>
          <Box pb={3}>
            <Typography variant="body2" color="secondary" gutterBottom>
              <strong>Created at: </strong> {format(data, "do MMMM Y, kk:m")}
            </Typography>
          </Box>

          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>

        <Box p={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickUpdateOpen}
          >
            EDIT
          </Button>
        </Box>
      </Card>

      <DeleteDialog
        open={open}
        dialogOpen={handleClickOpen}
        dialogClose={handleClose}
        noteDelete={handleDelete}
        noteId={note.id}
      />

      <UpdateDialog
        open={updateOpen}
        updateDialogOpen={handleClickUpdateOpen}
        updateDialogClose={handleUpdateClose}
        noteUpdate={handleUpdate}
        noteId={note.id}
        noteTitle={note.title}
        noteDetails={note.details}
        noteCategory={note.category}
        noteCreatedAt={note.createdAt}
      />
    </div>
  );
}
