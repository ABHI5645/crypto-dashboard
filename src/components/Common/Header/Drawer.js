import * as React from 'react';
import { Switch } from "@mui/material";
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '../Button/button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import "./style.css";

export default function MobileDrawer() {
  

  const[flag,setFlag]=useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") == "dark" ? true : false
  );

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const changeMode = () => {
    setDarkMode(!darkMode);
   
    const mode = localStorage.getItem("theme");
    if (mode == "dark") {
      setLight();
    } else {
      setDark();
    }
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };



  return (
    <div className='drawer-wrapper'>
    
        <React.Fragment >
          <MenuRoundedIcon className='link' onClick={()=>setFlag(true)}/>
          <Drawer
            anchor={"right"}
            open={flag}
            onClose={()=>setFlag(false)}
          >
            <div className='mobile-drawer'>
            <a href="/"> 
            <p className='link'>Home</p>
            </a>
            <a href="/compare">
            <p className='link'>Compare</p>
            </a>
            <a href="/watchlist">
            <p className='link'>Watchlist</p>
            </a>
            <a href="/dashboard">
            <p className='link'>Dashboard</p>
            </a>
            <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <p className="link">{darkMode ? "Light Mode" : "Dark Mode"}</p>
            <Switch
              checked={darkMode}
              onClick={() => {
                changeMode();
              }}
            />
          </div>
        
       
            </div>
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}