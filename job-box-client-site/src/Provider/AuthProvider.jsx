import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";



const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log("current user", currentUser)
            setUser(currentUser)
            if(currentUser?.email){
                const user = { email: currentUser.email}

                axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
                .then(res=>{
                    console.log("login",res.data)
                    setLoading(false)
                })
            }
            else {
                axios.post('http://localhost:5000/logout', {}, {withCredentials: true})
                .then(res=>{
                    console.log("logout", res.data)
                    setLoading(false)
                })
            }
            
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const socialLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)

    }

    const logoutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    
    const authInfo ={
        user,
        loading,
        createUser,
        loginUser,
        socialLogin,
        logoutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;