import React from 'react'
import { GoogleLoginButton,FacebookLoginButton,GithubLoginButton } from "react-social-login-buttons";
import TypeWriter from "react-typewriter";
import { auth,provider,githubprovider,facebookprovider } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
function Login() {
    const history = useHistory()
    const [user] = useAuthState(auth)
    document.title = "Login to Loopsea"
    if (user) {
        history.push('/')
        return null
    }else{
    return (
        <div className="w-full flex h-screen loginbg">
            <div className="lg:w-1/2 w-full h-full lg:h-3/4 mx-auto flex flex-col my-auto bg-gray-200 md:rounded-3xl">
                <div className="mx-auto mt-20">
                    <div className="md:inline  ">
                        <p className="text-4xl font-extrabold font-sans text-center">Login to Loopsea <br /> to continue</p>
                    </div>
                    {/* <p className="md:hidden inline text-4xl md:text-6xl font-extrabold font-sans">Sign in with</p> */}
                </div>
                
                <div className=" w-64 self-center pt-20 md:pt-10">
                    <GoogleLoginButton className="" onClick={()=>{
                        auth.signInWithPopup(provider).then(()=>{
                            history.push('/')
                        })
                    }} />
                </div>
                <div className=" w-64 self-center pt-4">
                    <FacebookLoginButton className="" onClick={()=>{
                        auth.signInWithPopup(facebookprovider).then(()=>{
                            history.push('/')
                        })
                    }} />
                </div>
                <div className=" w-64 self-center pt-4">
                    <GithubLoginButton className="" onClick={()=>{
                        auth.signInWithPopup(githubprovider).then(()=>{
                            history.push('/')
                        })
                    }} />
                </div>
            </div>
        </div>
    )
    }
}

export default Login
