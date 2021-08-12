import { IconButton, TextField } from '@material-ui/core'
import { PhonePausedOutlined, Send } from '@material-ui/icons'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import fb from 'firebase' 
import { useEffect } from 'react'
import AllComments from './AllComments'
function Comment({postid , handleToggle , handleClose}) {
    const [user] = useAuthState(auth)
    const [commentrefresh, setcommentrefresh] = useState(1)
    const [comments, setcomments] = useState([])
    const [commentinput, setcommentinput] = useState("")
    useEffect(()=>{
        console.log("Post id is " + postid);
        if (postid) {
            db.collection('postreactions').doc(postid).collection('comments').orderBy("date", "asc").get().then((data)=>{
                var getdata = []
                data.forEach(obj=>{
                    // console.log(obj.data())
                    var id = obj.id
                    getdata = [...getdata,{...obj.data(),commentid:id}]
                })
                setcomments(getdata)
            })
        }
    },[postid ,commentrefresh])
    const addComment = () =>{
        if (commentinput === "") {
            console.log("please Enter something");
        }else{
            handleToggle()
            db.collection('postreactions').doc(postid).collection('comments').add({
                commentinput,
                date:fb.firestore.FieldValue.serverTimestamp(),
                commentername: user.displayName,
                commenteremail:user.email,
                commenterpic:user.photoURL
            }).then(()=>{
                setcommentinput("")
                setcommentrefresh(commentrefresh + 1)
                handleClose()
            })
        }
    }
    return (
        <div>
            <div className="flex items-center">
            <TextField
            className="w-3/4"
                id="outlined-multiline-static"
                label="Add a comment"
                multiline
                rows={2}
                variant="outlined"
                value={commentinput}
                onChange={(e)=>{
                    setcommentinput(e.target.value)
                }}
            />
            <div className="ml-4">
                <IconButton onClick={addComment} disabled={(commentinput.length === 0)} ><Send style={{fill:"blue"}} /></IconButton>
            </div>
            </div>
            <AllComments key={postid} refresh={commentrefresh} setrefresh={setcommentrefresh} postid={postid} handleClose={handleClose} handleToggle={handleToggle} comments={comments} />
            <p className="mt-52">Footer Will Be Here</p>
        </div>
    )
}

export default Comment
