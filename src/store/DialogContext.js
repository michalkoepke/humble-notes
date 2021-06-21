import React, { useState, useContext } from 'react';



const DialogContext = React.createContext();


export function useDialog() {

    return useContext(DialogContext)

}

export function DialogProvider({ children }) {




    // stan dla dialog 

    const [dialogOpen, setDialogOpen] = useState(false)





    // handlers dla dialogu


    function openDialog() {

        setDialogOpen(true)
    }




    function closeDialog() {

        setDialogOpen(false)

    }




    const value = {


        dialogOpen,
        openDialog,
        closeDialog

    }


    return (


        <DialogContext.Provider value={value}>


            {children}


        </DialogContext.Provider>



    )
}

