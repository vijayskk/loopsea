import React from 'react'
import Header from './Header'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SignalCellularNullTwoTone } from '@material-ui/icons';
import fb from 'firebase'
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


function CreatePost() {
    const [user] = useAuthState(auth)
    const history = useHistory()
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [title, settitle] = useState("")
    const [posttext, setposttext] = useState("")
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
      setOpen(!open);
    };
    function handleEditorChange({ html, text }) {
        setposttext(text)
    console.log(html, text);
    }
    const createPost = () =>{
        if (title === "") {
            console.log("Title is empty");
        }
        else if(posttext === ""){
            console.log("you have to write something");
        }
        else{
            handleToggle()
            const author = user.displayName
            const authoremail = user.email
            const authorpic = user.photoURL
            db.collection('posts').add({
                title,
                author,
                authoremail,
                authorpic,
                posttext
            }).then((data)=>{
                console.log(data.id)
                history.push(`/post?id=${data.id}`)
            })
        }
    }
    if (!user) {
        history.push('/login')
        return null
    }else{
        return (
            <div>
                <Header />
                <div className="space-y-10 mx-10 flex flex-col">
                    <h1 className="mt-10 font-mono font-bold text-4xl">Create Your Post Here</h1>
                    <div className="mt-10">
                        <TextField onChange={(e)=>{
                            settitle(e.target.value)
                        }} className="w-full" id="outlined-basic" label="Title" variant="outlined" />
                    </div>
                    <h1 className="mt-10 font-mono font-bold text-2xl">Post Using Markup</h1>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                    <button onClick={createPost} className="bg-blue-600 text-2xl font-bold text-white w-1/2 h-10 rounded-lg hover:bg-blue-700 mx-auto">Post</button>
                    <div className="mt-52">footer will be here soon</div>
                </div>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    }
}

export default CreatePost
