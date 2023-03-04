import React, { useState } from "react";
import {Link} from "react-router-dom"
import "../styles/RideCreation.css"
import DateTimePicker from "react-datetime-picker";



const CreateRide = (props) =>{
    const [details, setDetails] = useState({
        start : "",
        end : "",
        time: new Date(),
        model: "",
        seats: "",
        type : props.type
    }) 
    const [value, onChange] = useState(new Date())
    

    const text = ["Enter your drive details","Enter your ride details"]

    const handleSubmit = (event)=>{
        event.preventDefault();
        setDetails({...details, time : value})
        console.log(details)

    }
    
    return (
        <form className="ride-creation-body" onSubmit={handleSubmit}>
            
            <h1 className="ride-creation-body-header">{props.type=== "drive"? text[0] : text[1]}</h1>
            <input type= "text" className = "ride-creation-input" placeholder="Add a pick-up location"value = {details.start} onChange={e => {setDetails({...details, start : e.target.value})}}/>
            
             <input type= "text" className = "ride-creation-input" placeholder="Enter your destination" value = {details.end} onChange={e => {setDetails({...details, end : e.target.value})}}/>
             
            <DateTimePicker className = "ride-creation-time" value = {value} onChange= {onChange} calendarIcon ={null} disableClock clearIcon={null}/> 
            { props.type === "drive" ?
            <div className="ride-creation-misc">
                
                <input type= "text" className = "ride-creation-model" placeholder="model" value = {details.model} onChange={e => {setDetails({...details, model : e.target.value})}}/> 
                <input type= "text" className = "ride-creation-model"placeholder="seats" value = {details.seats} onChange={e => {setDetails({...details, seats : e.target.value})}}/>
            </div> 
            :
            <div className="rid-creation-misc">
            <input type= "text" className = "ride-creation-model"placeholder="passengers" value = {details.seats} onChange={e => {setDetails({...details, seats : e.target.value})}}/>
            </div>
            }
            <button className = "ride-creation-submit" type = "submit">
                Submit
            </button> 

        </form>
    )
    }
export default function RideCreation() {

    const handleSubmit = (event) =>{
        event.preventDefault();
        
    }
    const [type, setType] = useState("drive")  

    
    return (
        
        <div className="form-group" >
            <div className = "ride-creation-header">
                <button type ="button"className={type === "drive" ? "ride-header-button-selected" :"ride-header-button"  }onClick = {() => setType("drive")} >
                    <img className = "img" src='assets/steeringWheel.png'/>
                    Drive
                </button>  
                <button type ="button" className={type === "taxi" ? "ride-header-button-selected" :"ride-header-button"  }onClick = {() => setType("taxi")}>
                    <img className = "img" src='assets/rideHailing.png'/>
                    Ride
                </button>
            </div>
            <div>
              <CreateRide type = {type}/>   
            </div>
        

        </div>
        
    );
  
}