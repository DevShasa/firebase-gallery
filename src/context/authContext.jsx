import {useState,useContext, useEffect, createContext } from 'react'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged, // checks if the user is signed in or signed out
    sendPasswordResetEmail, // sends a password reset email to given addres
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config';

const authContext = createContext();
export const useAuth = () =>{
    return useContext(authContext)
}

const AuthContext = ({children}) => {

    const [ loading, setLoading ] = useState(false)
    const [ currentUser, setCurrentUser ] = useState(null);
    const [modal, setModal] = useState({isOpen: false, title:'', content:''})
    const [alert, setAlert] = useState({
        isAlert: false,
        severity: 'info',
        message: '',
        timeout: null,
        location: '',
    })

    // CREATE A NEW USER
    const signUp = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // LOGIN A USER
    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    // USE GOOGLE POP UP LOGIN
    const loginWithGoogle = () =>{
        const provider  = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    // LOGOUT
    const logout = () =>{
        return signOut(auth)
    }

    //RESET PASSWORD
    const resetPassword = (email)=>{
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(()=>{
        // observer whether user is loggedin or not
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            console.log("USER STATUS HAS CHANGED: ", user);
        })

        return unsubscribe; 
    },[])

    // provide the values and functions

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        modal,
        setModal,
        loginWithGoogle,
        alert,
        setAlert,
        loading,
        setLoading,
        resetPassword
    }

    return (
        <authContext.Provider {...{value}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContext