import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import EntranceScreen from './components/EntranceScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Signup from './components/SignupScreen';
import Main from './components/Main';
import initMap from './components/Map';
import Navbar from './components/NavGuest';
import NavMain from './components/NavMain';
import "./styles/DefaultStyles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserContext ,SelectionContext , UserNameContext, Marker1Context, Marker2Context, CarparkMarkerContext, PathContext, TaxiContext, LocationContext, ImgContext} from './components/Usercontext';
import Settings from './components/Settings';


export default function App(){
    const [user, setUser] = useState({token: null});
    const [selection, setSelection] = useState("");
    const [marker1, setMarker1] = useState("");
    const [marker2, setMarker2] = useState("");
    const [carparkMarker, setCarparkMarker] = useState([])
    const [path, setPath] = useState([])
    const [taxis, setTaxis] = useState([])
    const [location, setLocation] = useState([])
    const [img, setImg] = useState("")
    const [UserName, setUserName] = useState("");

    useEffect(()=>{
        setUser({token: localStorage.getItem("user")});
        setImg(localStorage.getItem("img"))
    },[])
    return(
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{user, setUser}}>
                    <UserNameContext.Provider value={{UserName, setUserName}}>
                    <SelectionContext.Provider value={{selection, setSelection}}>
                        <Marker1Context.Provider value = {{marker1, setMarker1}}>
                        <Marker2Context.Provider value = {{marker2, setMarker2}}>
                        <CarparkMarkerContext.Provider value = {{carparkMarker, setCarparkMarker}}>
                        <PathContext.Provider value={{path, setPath}}>
                        <TaxiContext.Provider value ={{taxis, setTaxis}}>
                        <LocationContext.Provider value = {{location, setLocation}}>
                        <ImgContext.Provider value={{img, setImg}}>
                    {user.token ? <NavMain/> : <Navbar/>}
                    <Routes>
                        <Route path="/" element={<EntranceScreen/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/login" element={<LoginScreen/>}/>
                        <Route path="/signup" element={<Signup/>}/>                       
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                    </ImgContext.Provider>
                    </LocationContext.Provider>
                    </TaxiContext.Provider>
                    </PathContext.Provider>
                    </CarparkMarkerContext.Provider>
                    </Marker2Context.Provider>
                    </Marker1Context.Provider>
                    </SelectionContext.Provider>
                    </UserNameContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
        
    )
}