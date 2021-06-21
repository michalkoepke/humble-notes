import { Box, Container, Typography, makeStyles } from '@material-ui/core'



import React from 'react'
import Background from '../../components/Background'
import LoginForm from '../../components/Form/LoginForm'
// import Navigation from '../../components/Navigation/Navigation'
import Navi from '../../components/Navigation/Navi'




const useStyles = makeStyles((theme) => {

    return {




        kontener: {

            boxSizing: 'border-box',
            marginTop: 0,
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#b0bec5'



        },

        welcome: {
            boxSizing: 'border-box',

            // marginTop: theme.spacing(30),
            // height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: '#cfd8dc',
            // backgroundColor: 'red',

            maxWidth: '500px',
            minWidth: '300px',

            marginTop: '6rem'



        },



        spaceBig: {

            marginBottom: '6rem'

        },

        spaceSmall: {

            marginBottom: '3rem'

        }



    }


})




export default function Login() {


    const classes = useStyles()



    return (

        <Background>

            <Navi />

            <Container className={classes.kontener}>
                <Box className={classes.welcome}>



                    <LoginForm />



                </Box>


            </Container>



        </Background>












    )
}
