import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { Box, makeStyles } from '@material-ui/core';





const useStyles = makeStyles({




    dialogActions: {

        display: "flex",
        justifyContent: "center"
    }




})









export default function DeleteDialog(props) {


    const { open, dialogClose, noteId, noteDelete } = props

    const classes = useStyles()




    return (
        <Dialog
            open={open}
            onClose={dialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <Box p={3}>


                <DialogTitle id="alert-dialog-title" align="center">{"Are You sure You want to delete this note?"} </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" align="center">
                        Note will be deleted permanently from database.
                        </DialogContentText>
                </DialogContent>

                <DialogActions className={classes.dialogActions}>



                    <Button variant="contained" color="secondary" autoFocus onClick={() => { noteDelete(noteId); dialogClose() }}>
                        Delete
                        </Button>

                    <Button variant="contained" onClick={dialogClose} >
                        Cancel
                        </Button>







                </DialogActions>



            </Box>






        </Dialog>

    );
}
