import React from 'react'
import { useHistory } from 'react-router'
import { auth,provider } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function Header() {
    const history = useHistory()
    const [user] = useAuthState(auth)
    return (
        <div>
            <div className="w-full h-20 items-center flex bg-gray-200">
                <p className="my-auto logofont ml-10 cursor-pointer font-mono text-4xl" onClick={()=>{
                    history.push('/')
                }}>Loopsea</p>
                {!user?<p className="my-auto absolute right-10 select-none font-normal cursor-pointer font-mono text-xl hover:text-gray-500" onClick={()=>{
                    history.push('/login')
                }}>Signin</p>
                :
                <div className="my-auto absolute right-7 md:right-10 select-none font-normal cursor-pointer font-mono text-xl hover:text-gray-500"><Avatar src={user.photoURL} /></div>
                }


                {user?<div className="my-auto absolute right-32 md:right-40 cursor-pointer"><IconButton onClick={()=>{
                    history.push('/profile')
                }}><AccountCircleIcon /></IconButton></div>
                :
                null
                }
            {user?<div className="my-auto absolute right-20 md:right-24"><IconButton onClick={()=>{
                    auth.signOut().then(()=>{
                        history.push('/login')
                    })
                }}><ExitToAppIcon /></IconButton></div>:null}
            </div>
        </div>
    )
}

export default Header
