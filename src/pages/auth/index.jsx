import { auth, provider } from "../../config/firebase-config";
import {signInWithPopup} from 'firebase/auth';
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import './styles.css';


export const Auth = () => {
    const navigate = useNavigate();

    const {isAuth} = useGetUserInfo();

    const signInWithGoogle = async () =>{
        const results = await signInWithPopup(auth, provider)
        const authInfo = {
            userID : results.user.uid,
            name : results.user.displayName,
            profilePhoto : results.user.photoURL,
            isAuth : true,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expense");
    }

    if( isAuth){
        return <Navigate to="/expense" />
    }

    return (
        <>
        {isAuth && navigate("/expense")}
        <div className="login-page">
            <p>Sign in with Google to continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In</button>
        </div>
        </>
    );
}