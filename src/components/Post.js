import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
var Markdown = require('react-markdown')

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));



function Post() {
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
    useEffect(() => {
        handleToggle()
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const postid = urlParams.get('id')
        console.log(postid);
        db.collection('posts').doc(postid).get().then((data)=>{
            console.log(data.data());
            setposttext(data.data().posttext)
            setposttitle(data.data().title)
            setpostauthor(data.data().author)
            setpostauthoremail(data.data().authoremail)
            setpostauthorimg(data.data().authorpic)
            handleClose()
        })
    }, [])
    return (
        <div>
            <Header />
            <div className="ml-5 md:ml-20 flex -mb-4 md:-mb-10 items-center mt-10">
              <img className="rounded-full h-10" src={postauthorimg} alt="" />
              <div className="ml-4">
                <p className="font-bold text-lg">{posttitle}</p>
                <p className="font-light"><b>By</b> {postauthor}</p>
              </div>
            </div>
            <div className="md:m-20 m-10">
                <Markdown className="text-left"  children={posttext} />
            </div>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}   

export default Post
