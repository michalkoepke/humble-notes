import React, { useRef, useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Box, makeStyles } from '@material-ui/core';

import { Link, useHistory } from 'react-router-dom'




import { useAuth } from '../../Firebase/AuthContext'



const useStyles = makeStyles((theme) => {

    return {


        field: {

            marginTop: '1rem',
            marginBottom: '1rem',
            display: 'block',
            backgroundColor: "white",


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


export default function LoginForm() {

    // refs

    const emailRef = useRef();
    const passwordRef = useRef();


    // 

    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const history = useHistory()




    const classes = useStyles()


    // handlery:

    async function handleSubmit(e) {

        e.preventDefault()



        try {

            setError('')
            setLoading(true)

            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/notes")

        } catch (err) {

            setError('failed to log in ' + err.message)
        }


        setLoading(false)


    }


    return (


        <div>

            <Typography variant="h4" align="center" gutterBottom>
                Please Log in:
            </Typography>



            {error && <Alert severity="error" className={classes.alert}>

                <AlertTitle>{error}</AlertTitle>



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
                    Log in
                </Button>

            </form>

            <Box p={4}>

                <Typography variant="subtitle1" align="center">

                    <Link to="/forgot-password" variant="inherit" color="secondary" style={{ textDecoration: 'none' }}>Forgot Password?</Link>

                </Typography>


            </Box>

            <Typography className={classes.haveAccount} variant="subtitle1">
                Don't have an account? <Link to="/signup" variant="inherit" color="secondary" style={{ textDecoration: 'none' }}><strong>Sign up</strong></Link>
            </Typography>



        </div>
    )
}
