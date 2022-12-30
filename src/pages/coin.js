import { getFormHelperTextUtilityClasses } from '@mui/material';
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/Coin/CoinInfo/info';
import LineChart from '../components/Coin/LineChart/lineChart';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader/loader';
import List from "../components/Dashboard/List/list"
import SelectDays from '../components/SelectDays/selectDays';
import PriceToggle from '../components/Coin/PriceToggle/priceToggle';
import { coinObject } from '../functions/coinObject';
import { convertDate } from '../functions/convertDate';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrice, getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartDays';
import Footer from '../components/Common/Footer';



function CoinPage() {
 const {id}=useParams();
 const [coin,setCoin]=useState();
 
 const [loading,setLoading]=useState(false);
 const [days, setDays] = useState(120);
 const [priceType,setPriceType]=useState("prices");
 const[chartData,setChartData]=useState({
  labels:[],
  datasets:[],
 });

 useEffect(()=>{
  getData();
  
},[id]);
                                            
 const handleDaysChange = async (event) => {
   setDays(event.target.value);
   const prices=await getCoinPrices(id,event.target.value,priceType);
    if(prices){
    settingChartData(setChartData,prices,coin);
    }
    //  setLoading(false);
  
 };
 
 const handlePriceTypeChange = async (event) => {
   setPriceType(event.target.value);
   const prices=await getCoinPrices(id,days,event.target.value);
    if(prices){
    settingChartData(setChartData,prices,coin);
    }
  
 };
 
 const getData=async()=>{
 
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoin, data); //For Coin Obj being passed in the List
      const prices = await getCoinPrices(id, days, priceType);
      if (prices) {
        settingChartData(setChartData, prices, data);
        setLoading(false);
      }
    }

 };
 
  return (
    <div>
      <Header/> 
      {loading || !coin?.id || !chartData ?(<Loader/>):(
      <>
      
      <div className='grey-wrapper'>
      <List coin={coin} delay={0.1}/>
      </div>
      <div className='grey-wrapper'>
      <SelectDays days={days} handleDaysChange={handleDaysChange}/>
      <PriceToggle handlePriceTypeChange={handlePriceTypeChange} priceType={priceType}/>
      <LineChart chartData={chartData} priceType={priceType} />
      </div>
      <CoinInfo name={coin.name} desc={coin.desc}/>
      </>
      )}
      <Footer />
   
    </div>
  )
}

export default CoinPage
