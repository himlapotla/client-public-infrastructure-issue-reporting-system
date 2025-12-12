import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile }
    from "firebase/auth";
import app from '../Firebase/firebase.config';
import axios from 'axios';


export const AllContext = createContext()
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [mail, setMail] = useState(null)
    const [role, setRole] = useState(null)

    const [color, setColor] = useState(localStorage.getItem("bodyColor") || "light-mode")


    // Theme-dark-light................................................................
    const changeColor = () => {
        if (color === "light-mode") {
            setColor("dark-mode")
        }
        else {
            setColor("light-mode")
        }
    }

    useEffect(() => {
        document.querySelector("body").className = color;
        localStorage.setItem("bodyColor", color);
    }, [color]);
    // ................................................................

    //Define the user role.............................................
    const roleFinder = async () => {
        if (!user?.email) return
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/role/${user.email}`)
        setRole(res.data.role)
    }
    useEffect(() => {
        if (user?.email) {
            roleFinder()
        }
    }, [user])
    //..................................................................

    const createUser = (email, Password) => {
        return createUserWithEmailAndPassword(auth, email, Password)
    }

    const logIn = (email, Password) => {
        return signInWithEmailAndPassword(auth, email, Password)
    }

    const googleRegister = () => {
        return signInWithPopup(auth, provider)
    }

    const logOutt = () => {
        return signOut(auth)
    }

    const updateUserProfile = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, displayName, photoURL)
    }

    useEffect(() => {
        const unsubscrib = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscrib()
        }
    }, [])

    const saveOrUpdateUser = async (userData) => {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData)
        return data
    }

    const info = {
        loading,
        user,
        createUser,
        googleRegister,
        updateUserProfile,
        setUser,
        logOutt,
        logIn,
        setLoading,
        changeColor,
        color,
        mail,
        setMail,

        saveOrUpdateUser,
        role,
        
    }

    return (
        <AllContext value={info}>
            {children}
        </AllContext>
    )
}

export default AuthProvider




// useEffect(() => {
//     if (!user?.email) return;
//     axios
//         .get(`${import.meta.env.VITE_API_URL}/role/${user?.email}`)

//         .then(res => setRole(res.data))
//         .catch(err => console.log(err));
// }, [user]);
// console.log(role.role)

// const roleFinder = async () => {
//     useEffect(() => {
//         if (!user?.email) return;
//         axios.get(`${import.meta.env.VITE_API_URL}/role/${user?.email}`)
//             .then(res => setRole(res.data))
//             .catch(err => console.log(err));
//     }, [user]);
//     const userRole = role.role
// }