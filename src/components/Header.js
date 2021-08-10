import React from 'react'
import { useHistory } from 'react-router'

function Header() {
    const history = useHistory()
    return (
        <div>
            <div className="w-full h-20 flex bg-gray-200">
                <p className="my-auto ml-10 font-bold cursor-pointer font-mono text-3xl" onClick={()=>{
                    history.push('/')
                }}>Loopsea</p>
            </div>
        </div>
    )
}

export default Header
