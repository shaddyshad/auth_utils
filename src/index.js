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

     const isLoggedIn = () => app.currentUser.isLoggedIn

     /**
      * Logout action
      */
     const logout = async () => await app.currentUser.logOut()

    return {
        user,
        app,
        login,
        isLoggedIn,
        logout
    }
}

/**
 * Utility to access auth API
 */

export const useAuth = () => useContext(authContext)