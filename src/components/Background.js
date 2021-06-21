import React from 'react'

import { Box, makeStyles } from '@material-ui/core'

import HumbleNotesBG from '../images/HumbleNotesBG.svg'




const useStyles = makeStyles((theme) => {




    return {




        backg: {


            display: 'flex',
            flexDirection: 'colummn',
            justifyContent: 'center',
            alignItems: 'center',


            minHeight: '100vh',
            backgroundImage: `url(${HumbleNotesBG})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",

        },

    }









})


export default function Background({ children }) {

    const classes = useStyles()




    return (

        // <div styles={{backgroundImage: `url(${HumbleNotesBG})`}}>

        <div className={classes.backg}>

            {children}
        </div>


    )
}
