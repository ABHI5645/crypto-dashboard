import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {createTheme,ThemeProvider} from "@mui/material";
import Grid from '../Grid/grid';
import List from "../List/list";
import Button from "../../Common/Button/button";
import "./style.css";

function TabsComponent({coins,setSearch,isWatchlistPage}) {
  const [tabValue, setTabValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const theme=createTheme({
    palette:{
        primary:{
            main:"#3a80e9"
            
        },
    },
  });
  const style={
    color:"var(--white)",
    fontSize:'1.2rem',
    fontWeight:600,
    fontFamily:'Inter',
    textTransform:'uppercase'
  }
  return (
    <div >
      <ThemeProvider theme={theme}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList variant='fullWidth' onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Grid" value="grid" sx={style}/>
            <Tab label="List" value="list" sx={style}/>
            
          </TabList>
        </Box>
        <TabPanel value="grid" className='tab-pannel'> 
        <Box className="grid-flex">
              {coins.length == 0 ? (
                <div>
                  <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                    No Items Found
                  </h1>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      text={"Clear Search"}
                      onClick={(e) => {
                        setSearch("");
                      }}
                    />
                  </div>
                </div>
              ) :
        (coins?.map((coin,i)=>(
        <Grid coin={coin} key={i} delay={((i+5)%5)*0.1} isWatchlistPage={isWatchlistPage}/>))
        )}
      </Box>
     
      </TabPanel>
        <TabPanel value="list" className='tabPannel'>
          <table className='list-flex'>
          {coins.length == 0 ? (
                <div>
                  <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                    No Items Found
                  </h1>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      text={"Clear Search"}
                      onClick={(e) => {
                        setSearch("");
                      }}
                    />
                  </div>
                </div>
              ) :
            (
              coins.map((coin,i)=>(
               
                <List coin={coin} key={i} delay={(i%10)*0.1} isWatchlistPage={isWatchlistPage}/>
            
              ))
            )
              }
          </table>


        </TabPanel>
        
      </TabContext>
      </ThemeProvider>
      
    </div>
  )
}

export default TabsComponent;
