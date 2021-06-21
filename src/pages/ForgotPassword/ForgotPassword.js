import React, { useRef, useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Box, Container, makeStyles } from '@material-ui/core';

import { Link } from 'react-router-dom'




import { useAuth } from '../../Firebase/AuthContext'

import Navi from '../../components/Navigation/Navi'



const useStyles = makeStyles((theme) => {

    return {


        field: {

            marginTop: '1rem',
            marginBottom: '1rem',
            display: 'block'


        },

        form: {

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'

        },

        alert: {

            padding: theme.spacing(2),
            margin: '2rem 0rem'
        },

        haveAccount: {

            padding: theme.spacing(3),



        },

        button: {

            margin: theme.spacing(2),


        }

    }

});


export default function ForgotPassword() {

    // refs

    const emailRef = useRef();
    // const passwordRef = useRef();


    // 

    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)






    const classes = useStyles()



    // handler

    async function handleSubmit(e) {

        e.preventDefault()



        try {

            setMessage('')
            setError('')
            setLoading(true)

            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')

        } catch (err) {

            setError('failed to reset password ' + err.message)
        }


        setLoading(false)


    }




    return (



        <div>

            <Navi />


            <Grid container direction="column"
                alignItems="center"
                justify="center"

            >


                <Grid item xs={12} sm={12}>


                    <Box mt={20}>

                        <Typography variant="h6" align="center">

                            Forgot Password?


</Typography>




                        <Typography variant="h4" align="center" gutterBottom>
                            Password Reset
</Typography>



                        {error && <Alert severity="error" className={classes.alert}>

                            <AlertTitle>{error}</AlertTitle>



                        </Alert>}


                        {message && <Alert severity="success" className={classes.alert}>

                            <AlertTitle>{message}</AlertTitle>



                        </Alert>}

                        <form noValidate autoComplete='off' className={classes.form} onSubmit={handleSubmit}>

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
                            // error={titleError}


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
                                Reset Password
    </Button>

                        </form>

                        <Box p={4}>

                            <Typography variant="subtitle1" align="center">

                                <Link to="/login" variant="inherit" color="secondary" style={{ textDecoration: 'none' }}>Log in</Link>

                            </Typography>


                        </Box>

                        <Typography className={classes.haveAccount} variant="subtitle1">
                            Don't have an account? <Link to="/signup" variant="inherit" color="secondary" style={{ textDecoration: 'none' }}><strong>Sign up</strong></Link>
                        </Typography>






                    </Box>










                </Grid>









            </Grid>




        </div>
    )
}
