import React, {createContext, useContext, useState} from 'react'
import * as Realm from 'realm-web'

/**
 * Auth context stores the auth data and methods 
 */
const authContext = createContext()

/**
 * Provider object to allow access in the component tree
 */

export const AuthContextProvider = ({children, appId}) => {
    const auth = provideAuth(appId);
    
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}


/**
 * API 
 */
const provideAuth = appId => {
    const app = new Realm.App({id: appId})

    const [user, setUser] = useState(null)

    const login = async (email, password) => {
        const user = await app.logIn(Realm.Credentials.emailPassword(email, password));

        setUser(user)
    }

    /**
     * Check if is logged in 
     */

     const isLoggedIn = () => app.currentUser &&  app.currentUser.isLoggedIn

     /**
      * Logout action
      */
     const logout = async () => await app.currentUser.logOut()

     /**
      * Send a password reset request
      */
     const sendPasswordReset = async email => await app.emailPasswordAuth.sendResetPasswordEmail(email)

     /**
      * Confirm password reset from tokenId and tokenSecret
      * 
      * tokenId and token are retrieved from the url parameters
      */
     const resetPassword = async (email, password) => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        const tokenId = params.get('tokenId')

        if(!token || !tokenId){
            throw new Error("You can only call resetPassword() if the user followed a confirmation email link")
        }

        // call the reset function 
        return app.emailPasswordAuth.callResetPasswordFunction(email, password)
     }

     /** get the current user */
     const currentUser = () => app.currentUser

    return {
        user,
        app,
        login,
        isLoggedIn,
        logout,
        sendPasswordReset,          // initiate password reset
        resetPassword,
        currentUser
    }
}

/**
 * Utility to access auth API
 */

export const useAuth = () => useContext(authContext)