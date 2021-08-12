import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router-dom'
import { auth, db } from '../firebase'
import Header from './Header'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));



function Profile() {
    const history = useHistory()
    const [user] = useAuthState(auth)
    const [posts, setposts] = useState([])
    const [refreshposts, setrefreshposts] = useState(1)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    useEffect(()=>{
        if (user) {
            handleToggle()
            db.collection('posts').get().then((data)=>{
                var getdata = []
                data.forEach(obj=>{
                    if(obj.data().authoremail === user.email){
                        var id = obj.id
                        getdata = [...getdata,{...obj.data(),id}]
                    }
                })
                console.log(getdata);
                setposts(getdata)
                handleClose()
            })
        }
    },[user,refreshposts])
    const deletePost = (id) =>{
        if (user) {
            if (confirm("Do you want to delete the post? It cant be undone") == true) {
                handleToggle()
                db.collection('posts').doc(id).delete().then(()=>{
                    setrefreshposts(refreshposts + 1)
                    handleClose()
                })
            }
        }
    }
    if (user) {
        return (
            <div>
                <Header />
                <div className="flex items-center">
                    <img className="w-20 md:w-40 rounded-full ml-5 mt-10 md:mt-20 md:m-20" src={user.photoURL} alt="" />
                    <div>
                        <p className="text-3xl md:text-5xl ml-2 mt-10 md:mt-0 md:-ml-10">{user.displayName}</p>
                        <p className="mt-2 font-light ml-3 md:-ml-8">{user.email}</p>
                        
                    </div>
                </div>
                <p className="mt-10 md:mt-0 ml-5 md:ml-20 text-4xl ">My Posts</p>
                <div className="ml-5 md:ml-20 mr-5 md:mr-40 mt-10 grid grid-flow-row select-none md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10"> 
                {
                    posts.map((obj)=>{
                        return (
                            <div className="w-full border cursor-pointer border-black rounded-lg  p-5" >
                                <p className="text-2xl">{obj.title}</p>
                                <p>By {obj.author}</p>
                                <div className="float-right -mb-4"><IconButton onClick={()=>{
                                history.push(`/post?id=${obj.id}`)
                            }}><OpenInNewIcon style={{fill: "blue"}} /></IconButton></div>
                                <div className="float-right -mb-4"><IconButton onClick={()=>{
                                    deletePost(obj.id)
                                }} ><DeleteForeverIcon style={{fill: "red"}} /></IconButton></div>
                            </div>
                        )
                    })
                }   
                </div>
                <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
                </Backdrop>
                
            </div>
        )
    }else{
        return(
            <>
            <Header />
            <p>Login First</p>
            </>
        )
    }
}

export default Profile
