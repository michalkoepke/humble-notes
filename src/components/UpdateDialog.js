import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { Box, FormControlLabel, makeStyles } from "@material-ui/core";

import { useAuth } from "../Firebase/AuthContext";
import { db } from "../Firebase/firebase";

import { useHistory } from "react-router";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  field: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },

  buttonBox: {
    display: "flex",
    justifyContent: "center",
  },

  dialogButton: {
    margin: "5px",
  },
});

export default function FormDialog(props) {
  const { currentUser } = useAuth();

  const history = useHistory();

  const {
    open,
    updateDialogClose,
    noteId,
    noteTitle,
    noteCategory,
    noteDetails,
  } = props;

  const classes = useStyles();

  // eksperyment z kopia stanu

  const [newDetails, setNewDetails] = useState(noteDetails);
  const [newTitle, setNewTitle] = useState(noteTitle);
  const [newCategory, setNewCategory] = useState(noteCategory);

  // handlers:

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("firestore update clicked");

    updateFireCollection(currentUser);
  };

  async function updateFireCollection(currentUser) {
    if (newTitle && newDetails) {
      return await db
        .collection("notes")
        .doc(noteId)
        .update({
          title: newTitle,
          category: newCategory,
          details: newDetails,
        })

        .then(updateDialogClose);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={updateDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <Box>
          <DialogTitle id="form-dialog-title">Update note:</DialogTitle>

          <DialogContent>
            <DialogContentText>
              You can update this note below:
            </DialogContentText>

            <form noValidate autoComplete="off" onSubmit={handleUpdate}>
              <TextField
                className={classes.field}
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                color="secondary"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <TextField
                className={classes.field}
                autoFocus
                margin="dense"
                id="details"
                label="Details"
                type="text"
                fullWidth
                multiline
                rows="4"
                variant="outlined"
                color="secondary"
                required
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
              />

              <FormControl className={classes.field}>
                <FormLabel>Note Category</FormLabel>

                <RadioGroup
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="money"
                    control={<Radio />}
                    label="money"
                  />
                  <FormControlLabel
                    value="todos"
                    control={<Radio />}
                    label="todos"
                  />
                  <FormControlLabel
                    value="reminders"
                    control={<Radio />}
                    label="reminders"
                  />
                  <FormControlLabel
                    value="work"
                    control={<Radio />}
                    label="work"
                  />
                </RadioGroup>
              </FormControl>

              <Box className={classes.buttonBox}>
                <Button
                  className={classes.dialogButton}
                  type="submit"
                  color="secondary"
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                >
                  Submit
                </Button>

                <Button
                  className={classes.dialogButton}
                  onClick={updateDialogClose}
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}
