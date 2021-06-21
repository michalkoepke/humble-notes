import { Dialog, DialogTitle, DialogContent, Avatar, Typography, Box, makeStyles } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';



import { useAuth } from '../Firebase/AuthContext'
import { useDialog } from '../store/DialogContext';



const useStyles = makeStyles((theme) => {

    return {

        accountHeader: {
            color: "#673ab7"
        },

        box: {
            display: "flex",
            alignItems: "center"
        },

        avatar: {

            backgroundColor: "#673ab7"
        }



    }









})





export default function MyDialog() {


    const { dialogOpen } = useDialog()
    const { closeDialog } = useDialog()
    const { currentUser } = useAuth()



    const classes = useStyles()






    return (

        <Dialog open={dialogOpen} onClose={closeDialog}>


            <DialogTitle id="simple-dialog-title" className={classes.accountHeader}>


                Your Account: {currentUser && currentUser.email}



            </DialogTitle>



            <DialogContent dividers>



                <Box p={3} className={classes.box}>

                    <Box p={1}>

                        <Avatar className={classes.avatar}>
                            <PersonIcon />
                        </Avatar>


                    </Box>


                    <Typography hariant="h6">

                        {currentUser && currentUser.email}

                    </Typography>



                </Box>


                {/* <Typography gutterBottom>

                    {currentUser && currentUser.email}<br></br><br></br>




                </Typography> */}

            </DialogContent>

        </Dialog >

    )
}
