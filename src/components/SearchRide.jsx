import React, {useEffect, useState, useContext} from "react";
import { createRoutesFromChildren } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "../styles/SearchRide.css"
import {Link} from "react-router-dom"
import {Marker1Context, Marker2Context, PathContext, UserContext } from "./Usercontext";
import { getRides, calculateRoute, requestRide } from "./Helper";
/**
 * Returns a search ride UI that allows user to search for a ride by location
 * @returns SearchRide UI
 */
export default function SearchRide (props){
    const {path, setPath} = useContext(PathContext)
     const {marker1, setMarker1} = useContext(Marker1Context);
     const {marker2, setMarker2} = useContext(Marker2Context);
    const [step ,setStep] = useState("Search") //Search, Book, Complete
    const [search, setSearch] = useState("")     //Constantly changing search 
    const [prevSearch, setPrevSearch] = useState("-")   //Sets the search based on the last search when u click on search button
    const [re, setRe] = useState(new RegExp("none"))   //regex used to filter search
    const [display, setDisplay] = useState([])    //Returned array of filtered rides
    const [selection , setSelection] = useState({}) //Selected ride
    const [allRides, setAllRides] = useState([])
    const {user} = useContext(UserContext)

    /**
     * sets search result to input
     * @param {*} event user search input
     */
    const handleSearch =(event) =>{
        event.preventDefault();
        setStep("Search")
        setPrevSearch(search)
        const re = new RegExp(search.toLowerCase())
        setRe(re)
        
        let arr = []
        allRides.map((a) => {
            if(re.test(a.attributes.origin.toLowerCase())){
                arr.push(a)
            }
        })
        setDisplay(arr)
    }
    const handleBooking =() =>{
        setStep("Book")
        
    }
    const handleMarker = async (a) =>{
        const origin = JSON.parse(a.attributes.start_lat)
        const dest = JSON.parse(a.attributes.end_lat)
        setMarker1(origin)
        setMarker2(dest)
        const path = await calculateRoute(origin, dest)
        setPath(path)
        
    }
    const handleComplete = async (complete,selection) =>{
        props.parentCallBack(complete)
        console.log(selection)
        const response = await requestRide(user,selection.id)

    }

    const handleCallBack = (step)=>{
        setStep(step)
    }
    useEffect(() => {
        async function getRides(user){
            const response = await fetch("http://127.0.0.1:8000/core/rides/",{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token '+ user.token
                },
            }).then(res => res.json())
            console.log(response.data)
           setAllRides(response.data)
        }
        getRides(user)
        }, []); 
    
    const DisplayBooking = (props) =>{
        const handleComplete = (action) =>{
            {action === "return" ? props.parentCallBack("Search") : props.parentCallBack("Confirmed")} 
        }
        return (
            <div className = "search-ride">
                <div className="search-ride-header">
                    <img src ="assets/bookRideIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                    <h1 className="search-ride-headerText">Book Ride</h1>
                </div>
                <div className="search-ride-body"  >       
                    <div className = "search-title-text" >
                        {selection.attributes.types === "Personal Car" ? <h1>Drive Offer</h1> : <h1>Taxi Request</h1>}
                    </div>
                    <div className="booking-body" style={{display:"flex", flexDirection: "row", justifyContent:"center", marginTop:"20px"}}>
                        <div className="profile-pic">
                            <h1>InsertPic</h1>
                        </div>
                        <div className="search-text" style={{marginBottom:"2em"}}>
                            <div className = "text">
                                {selection.attributes.types === "Personal Car" ? <h1>Driver: </h1> : <h1>Name: </h1>}
                                <h1>{selection.attributes.creator.username}</h1>
                            </div>
                            <div className = "text">
                                <h1>Pick Up location:</h1>
                                <h1>{selection.attributes.origin}</h1></div>
                            <div className = "text">
                                <h1>Destination:</h1>  
                                <h1>{selection.attributes.destination}</h1>
                            </div>
                            {selection.attributes.types === "Personal Car" ? 
                            <div className = "text">
                                <h1 style={{marginLeft:"20px"}}>Seats:</h1>
                                <h1>{selection.attributes.seats}</h1>
                            </div> :
                            <div className = "text">
                            
                                <h1>Passangers:</h1>
                                <h1>{selection.attributes.seats}</h1>
                            </div> 
                            }
                        </div>
                    </div>
                    <div className="booking-buttons">
                        <button onClick={()=>handleComplete("return")}>&lt; Go back</button>
                        <button onClick={()=>handleComplete("confirm",selection)}>Confirm Booking &gt;</button>
                        

                    </div>
                </div>
            </div>
        )
    }
    
    
    const displayResults = display.map((a)=>{   
    
        
        return(
            
            <div className={a.attributes.types === "Personal Car" ? "search-result-entry" : "search-result-entry-2"} key={a.id}>
                <div className="profile-section">
                    <div className="profile-pic">
                        <h1>Insert image</h1>
                    </div>
                    {a.type === "Personal Car" ? 
                    <div className = "text">
                        <h1 style={{marginLeft:"20px"}}>Seats:</h1>
                        <h1>{a.attributes.seats}</h1>
                    </div> :
                    <div className = "text">
                    
                        <h1>Passangers:</h1>
                        <h1>{a.attributes.seats}</h1>
                    </div> 
                    }
                </div>
                <div className="search-result-entry-info">
                    <div className = "search-title-text">
                        {a.attributes.types === "Personal Car" ? <h1>Drive Offer</h1> : <h1>Taxi Request</h1>}
                    </div>
                    <div className = "text">
                        {a.attributes.types === "Personal Car" ? <h1>Driver: </h1> : <h1>Name: </h1>}
                        <h1>{a.attributes.creator.username}</h1>
                    </div>
                    <div className = "text">
                        <h1>Time:</h1>
                        <h1>{a.attributes.date_time}</h1>
                    </div>
                    <div className = "text">
                        <h1>Pick Up location:</h1>
                        <h1>{a.attributes.origin}</h1></div>
                    <div className = "text">
                        <h1>Destination:</h1>  
                        <h1>{a.attributes.destination}</h1>
                    </div>
                </div>
                <button className="book-button" onClick={() => {setSelection(a); handleBooking();handleMarker(a), setPath(a.path)}}> Book Now</button>
            </div>

        )
    })

    const SearchRide = () =>{
        return(
        <div className="search-ride">
            <div className="search-ride-header">
                
                <img src ="assets/carRideIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                <h1 className="search-ride-headerText">Rides Available</h1>
            </div>
            <div className = "search-ride-upper">
                <div className="search-ride-searchbar">
                    <textarea rows={1}placeholder ="Search pick-up location" value ={search} onChange={e =>setSearch(e.target.value)} >

                    </textarea>
                    <div className="search-ride-searchIcon">
                        <img src = "assets/searchIcon.png" width="15px" style={{marginTop:"40%"}} onClick ={handleSearch}></img>
                        
                    </div>
                </div>
                <div className="search-ride-result">
                    <h4 >Searched: </h4><h4 style= {{borderBottom : "solid"}}>{prevSearch}</h4>
                </div>
            </div>
            <div className="search-ride-body">
               {displayResults}
            </div> 
             
        </div>
    )
    }
    const DisplayComplete = (props) =>{
        const closeWindow = () =>{
            props.parentCallBack("My Rides")
        }
        return(
            <div className = "search-ride">
                <div className="search-ride-header">
                    <img src ="assets/bookRideIcon.png" width="30px" style={{marginTop:"10px"}}></img>
                    <h1 className="search-ride-headerText">Booking Confirmed</h1>
                </div>
                <div className="search-ride-body" style={{border:"solid"}} >
                    Booking Confirmed Successfully       
                </div>
                <button onClick = {closeWindow}>Go to MyRides</button>
            </div>
        
        )

    }

    return(
        <div>
             {step === "Search" ? SearchRide() : step === "Book"? <DisplayBooking parentCallBack = {handleCallBack}/> : <DisplayComplete parentCallBack = {handleComplete}/>}       
        </div>
    )
}