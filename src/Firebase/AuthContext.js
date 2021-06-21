import React, { useState, useEffect, useContext, useHistory } from 'react';
import { auth } from './firebase';
import { db } from './firebase';




const AuthContext = React.createContext();




export function useAuth() {

    return useContext(AuthContext)

}

// Auth provider ktory zapewni nam dostęp do : currentUser, loading i metod signup i login

export function AuthProvider({ children }) {


    // stany:

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)





    //! funkcja ta wykorzystuje metode firebase do tworzenia usera
    // !to dziala:

    function signup(email, password) {

        return auth.createUserWithEmailAndPassword(email, password)

    }


    //! funkcja ta wykorzystuje metode firebase do logowania

    function login(email, password) {

        return auth.signInWithEmailAndPassword(email, password)

    }




    //! funkcja ta wykorzystuje metode firebase do WYlOGOWANIA

    function logout() {

        return auth.signOut()

    }

    function resetPassword(email) {

        return auth.sendPasswordResetEmail(email)
    }





    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {

            setCurrentUser(user)
            setLoading(false)

        })

        return unsubscribe


    }, [])




    const value = {

        currentUser,


        login,
        logout,
        signup,
        resetPassword




    }


    return (

        <AuthContext.Provider value={value}>


            {!loading && children}


        </AuthContext.Provider>

    );


};