import React, { useContext, useState, useEffect, useRef, useMemo } from "react"
import "../styles/EntranceScreen.css"
import "../styles/Settings.css"
import { UserContext, ProfileContext } from "./Usercontext"
import { Navigate } from "react-router-dom"


export default function Settings() {
  const { user, setUser } = useContext(UserContext);
  const [settingselection, setSettingselection] = useState("Settings");
  return (
    <div className="settings-body">
      {!user.token && <Navigate to='/' />}
      <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>
        <div className="settings-leftnav">
          <ul style={{ listStyle: "none", margin: "0px" }}>
            <li className={settingselection === "Settings" ? "settings-leftnav-listitems-selected" : "settings-leftnav-listitems"}
              onClick={() => { setSettingselection("Settings") }}>
              <h3 style={{ margin: "0px" }}>Settings</h3>
            </li>
          </ul>
        </div>
        <div className="settings-rightbody" style={{ marginLeft: "5px" }}>
          {settingselection === "Settings" && <Configurations />}
        </div>
      </div>
    </div>
  )
}

function Configurations() {
  const { user, setUser } = useContext(UserContext);
  const [editprofile, setEditprofile] = useState(false);
  const [profile, setProfile] = useState({ user: {} });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/core/userprofile/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + user.token
      }
    })
      .then(response => response.json())
      .then(data => { setProfile(data) })
      .catch(error => console.error(error));
  }, [editprofile])

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);




  return (
    <>
      <ProfileContext.Provider value={{ profile, setProfile ,setEditprofile}}>
        {editprofile ? <SettingEdit /> : <SettingDef />}
      </ProfileContext.Provider>
    </>
  )
}
const SettingDef = () => {
  const { profile, setProfile , setEditprofile} = useContext(ProfileContext)
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", }}>
        <img src="assets/IconSetting.png"></img>
        <h4 style={{ margin: "0px", marginLeft: "10px", display: "flex", alignItems: "center" }}>Settings</h4>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
        <img src="assets/IconSettingsProfile.png" style={{ width: "50px", height: "50px" }}></img>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", marginLeft: "10px" }}>
          <h3 style={{ margin: "0px" }}>
            {profile.user.first_name + ' ' + profile.user.last_name}
          </h3>
          <p style={{ margin: "0px" }}>
            {profile.phonenumber}
          </p>
        </div>
      </div>
      <div className="settings-profileinfo">
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
          <h4 style={{ margin: "0px" }}>Email:</h4>
          <p style={{ margin: "0px", marginLeft: "10px" }}>{profile.user.email}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
          <h4 style={{ margin: "0px" }}>Date of Birth:</h4>
          <p style={{ margin: "0px", marginLeft: "10px" }}>{profile.date_of_birth}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
          <h4 style={{ margin: "0px" }}>Home Address:</h4>
          <p style={{ margin: "0px", marginLeft: "10px" }}>{profile.address}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
          <h4 style={{ margin: "0px" }}>Bio:</h4>
          <p style={{ margin: "0px", marginLeft: "10px" }}>{profile.bio}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
          <button onClick={() => { setEditprofile(true) }}>Edit Profile</button>
        </div>
      </div>
      <button onClick={() => { setUser({ token: null }) }}>Logout</button>
    </>
  )
}

const SettingEdit = () => {
  const { profile, setProfile, setEditprofile } = useContext(ProfileContext)
  console.log(profile)
  const updateProfile = () => {
    fetch()
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", }}>
        <img src="assets/IconSetting.png"></img>
        <h4 style={{ margin: "0px", marginLeft: "10px", display: "flex", alignItems: "center" }}>Settings</h4>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
        <img src="assets/IconSettingsProfile.png" style={{ width: "50px", height: "50px" }}></img>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", marginLeft: "10px" }}>
          <h3 style={{ margin: "0px" }}>
            {profile.user.first_name + ' ' + profile.user.last_name}
          </h3>
          <p style={{ margin: "0px" }}>
            {profile.phonenumber}
          </p>
        </div>
      </div>
      <div className="settings-profileinfo">
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
          <h4 style={{ margin: "0px" }}>Email:</h4>
          <p style={{ margin: "0px", marginLeft: "10px" }}>{profile.user.email}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
          <h4 style={{ margin: "0px" }}>Date of Birth:</h4>
          <input style={{ margin: "0px", marginLeft: "10px" }} value={profile.date_of_birth} onChange={(event) => { setProfile({ ...profile, date_of_birth: event.target.value }) }} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
          <h4 style={{ margin: "0px" }}>Home Address:</h4>
          <p style={{ margin: "0px", marginLeft: "10px" }}>{profile.address}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", marginLeft: "10px" }}>
          <h4 style={{ margin: "0px" }}>Bio:</h4>
          <p style={{ margin: "0px", marginLeft: "10px" }}>{profile.bio}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row-reverse", marginBottom: "10px", marginRight: "10px" }}>
          <button onClick={() => { updateProfile(); setEditprofile(false) }}>Done</button>
        </div>
      </div>
    </>
  )
}