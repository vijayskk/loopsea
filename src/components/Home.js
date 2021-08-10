import React from 'react'
import { useHistory } from 'react-router-dom'
import AllPosts from './AllPosts'
import Header from './Header'

function Home() {
    const history = useHistory()
    return (
        <div>
            <Header />
            <div className="m-8 mt-10 md:m-20">
                <button className="w-52 mb-10 -mt-10 hover:bg-indigo-500 rounded-xl float-right bg-indigo-400 text-white h-12" onClick={()=>{
                    history.push('/createpost')
                }}>+ Create a post</button>
                <AllPosts />
            </div>
        </div>
    )
}

export default Home
