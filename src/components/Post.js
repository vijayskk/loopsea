import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Comment from './Comment';
import './Markdown.css'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TrendingUpRounded } from '@material-ui/icons';
var Markdown = require('react-markdown')

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));



function Post() {
  const [user] = useAuthState(auth)
    const [totallikes, settotallikes] = useState(0)
    const [liked, setliked] = useState(false)
    const [likerefresh, setlikerefresh] = useState(1)
    const [postid, setpostid] = useState('')
    const [posttext, setposttext] = useState('')
    const [posttitle, setposttitle] = useState('')
    const [postauthor, setpostauthor] = useState('')
    const [postauthorimg, setpostauthorimg] = useState('')
    const [postauthoremail, setpostauthoremail] = useState('')
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    const likePost = () =>{
      handleToggle()
      db.collection('postreactions').doc(postid).collection('likes').add({
        likedemail:user.email,
        likedname:user.displayName
      }).then(()=>{
        setliked(true)
        setlikerefresh(likerefresh + 1)
        handleClose()
    })
    }

    useEffect(()=>{
      if(postid){
        db.collection('postreactions').doc(postid).collection('likes').get().then((data)=>{
          var total = 0
          data.forEach(obj=>{
            total = total + 1
          })
          settotallikes(total)
        })
      }
    },[postid,likerefresh])

    useEffect(() => {
        handleToggle()
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const postid = urlParams.get('id')
        db.collection('posts').doc(postid).get().then((data)=>{
            setpostid(postid)
            setposttext(data.data().posttext)
            setposttitle(data.data().title)
            setpostauthor(data.data().author)
            setpostauthoremail(data.data().authoremail)
            setpostauthorimg(data.data().authorpic)
            handleClose()
        })

        if(user){
          db.collection('postreactions').doc(postid).collection('likes').get().then((data)=>{
            data.forEach(obj=>{
                if(obj.data().likedemail === user.email){
                  setliked(true)
                }
            })
          })
        }
    }, [postid,user])
    return (
        <div>
            <Header />
            <div className="ml-5 md:ml-20 w-full relative flex -mb-4 md:-mb-10 items-center mt-10">
              <img className="rounded-full -mt-7 -mb-7 h-10" src={postauthorimg} alt="" />
              <div className="ml-4 relative">
                <p className="font-bold text-lg">{posttitle}</p>
                <p className="font-light"><b>By</b> {postauthor} | {totallikes} {(totallikes > 1)?"likes":"like"}</p>
                <div className="opacity-50 inline md:hidden fixed right-8 select-none ">
                <FormControlLabel
                  control={<Checkbox checked={liked} onChange={(e)=>{
                    if(e.target.checked){
                      likePost()
                    }
                  }} icon={<ThumbUpAltOutlinedIcon fontSize="large" />} checkedIcon={<ThumbUpAltIcon style={{fill:"blue"}} fontSize="large" />} name="checkedH" />}
                  
                />
              </div>
              </div>
              <div className="absolute md:inline hidden right-40 px-4 py-1 select-none bg-blue-200 rounded-3xl">
                <FormControlLabel
                  control={<Checkbox checked={liked} onChange={(e)=>{
                    if(e.target.checked){
                      likePost()
                    }
                  }} icon={<ThumbUpAltOutlinedIcon fontSize="large" />} checkedIcon={<ThumbUpAltIcon style={{fill:"blue"}} fontSize="large" />} name="checkedH" />}
                  label={liked? "You liked this":"like this post"}
                />
              </div>

            </div>
            <div className="md:m-20  mt-14 m-5">
                <Markdown className="text-left"  children={posttext} />
            </div>
            
            <div className="ml-5 mt-10 md:ml-20">
              <Comment postid={postid} handleToggle={handleToggle} handleClose={handleClose} />
            </div>


            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}   

export default Post
