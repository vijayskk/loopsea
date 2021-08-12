import { IconButton } from '@material-ui/core'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Timeago from 'timeago-react'
import { auth, db } from '../firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function AllComments({comments,handleClose,handleToggle,postid,refresh,setrefresh}) {
    const [user] = useAuthState(auth)
    const deletePost = (id) =>{
        if (user) {
            if (confirm("Do you want to delete the comment? It cant be undone") == true) {
                handleToggle()
                db.collection('postreactions').doc(postid).collection('comments').doc(id).delete().then(()=>{
                    setrefresh(refresh + 1)
                    handleClose()
                })
            }
        }
    }
    if(comments.length === 0){
        return (
            <>
            <p className="text-2xl mt-10">Comments</p>
            <p className="text-sm font-light italic mt-1">No Comments yet</p>
            </>
        )
    }else{
        return (
            <div className="mt-10">
                <p className="text-2xl mt-10">Comments</p>
                {
                    comments.map((obj)=>{
                        return (
                            <div key={obj.commentid} className="flex overflow-hidden bg-gray-200 my-4 p-4 mr-5  md:mr-10 rounded-xl items-center">
                                <img className="rounded-full -mb-10 -mt-10 mr-5 h-10" src={obj.commenterpic} alt="" />
                                <div className="w-full">
                                    <p className="text-lg md:text-xl w-full">{obj.commentinput}</p>
                                    <div className="flex flex-row">
                                        <p className="text-sm  font-light">From {obj.commentername}</p>
                                        <p className="ml-4 text-sm font-light"><Timeago minperiod="0" datetime={obj.date.toDate()} /></p>
                                    </div>
                                    {( user && obj.commenteremail === user.email)?<div className="float-right -mb-4 md:-mt-4"><IconButton onClick={()=>{
                                    deletePost(obj.commentid)
                                }} ><DeleteForeverIcon style={{fill: "red"}} /></IconButton></div>:null}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default AllComments
