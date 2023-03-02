import React, {useContext} from "react"
import {Link} from "react-router-dom"
import "../styles/EntranceScreen.css"

import NavGuest from "./NavGuest"
import NavUser from "./NavUser"
import { UserContext } from "./Usercontext"

export default function EntranceScreen(){
    const {user} = useContext(UserContext);
    return(
        <div>
            {user.id ? <NavUser/> : <NavGuest/>}
            <div className='bodycover'>
                <div className='textbox'>
                    <h1 className='textmain'>Wander around safely and efficiently</h1>
                    <p className='textsub'>
                        Navigate with ease using Wanderful as we aim to support the lifestyle that you want!
                    </p>
                    <div className='bookride'>
                        <button className='bookridebutton'>
                            <Link to ={user.id ? "/main" : "/login"}>
                                Book ride now
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}