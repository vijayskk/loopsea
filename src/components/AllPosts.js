import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { db } from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


function AllPosts() {
    const history = useHistory()
    const [posts, setposts] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    useEffect(()=>{
        handleToggle()
        db.collection('posts').get().then((data)=>{
            var getdata = []
            data.forEach(obj=>{
                // console.log(obj.data())
                var id = obj.id
                getdata = [...getdata,{...obj.data(),id}]
            })
            console.log(getdata);
            document.title = "Loopsea posts"
            setposts(getdata)
            handleClose()
        })
    },[])
    return (
        <>
        <div className="text-4xl mt-10 font-bold mb-10 ">All Posts</div>
        <div className="grid grid-flow-row select-none md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10">
            {
                posts.map((obj)=>{
                    return (
                        <div className="w-full border cursor-pointer hover:bg-gray-100 border-gray-300 p-4" onClick={()=>{
                            history.push(`/post?id=${obj.id}`)
                        }}>
                            <div className="text-2xl font-bold">{obj.title}</div>
                            <div className="text-sm">By {obj.author}</div>
                        </div>
                    )
                })
            }  
        </div>
        <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
        </Backdrop>
        </>
    )
}

export default AllPosts
