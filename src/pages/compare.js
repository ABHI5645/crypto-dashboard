
import React, { useEffect,useState } from 'react'

import Header from '../components/Common/Header';
import List from '../components/Dashboard/List/list'
import SelectCoin from '../components/Compare/SelectCoins/selectCoin';
import { coinObject } from '../functions/coinObject';
import { get100Coins } from '../functions/get100Coins';
import { getCoinData } from '../functions/getCoinData';
import Loader from '../components/Common/Loader/loader';
import CoinInfo from '../components/Coin/CoinInfo/info';
import LineChart from '../components/Coin/LineChart/lineChart';
import { getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartDays';
import PriceToggle from '../components/Coin/PriceToggle/priceToggle';
import Footer from '../components/Common/Footer';

// function ComparePage() {
//   const [allCoins,setAllCoins]=useState([]);
//   const [coin1,setCoin1]=useState(allCoins[0]?.id??"bitcoin");
//   const [coin2,setCoin2]=useState(allCoins[1]?.id??"ethereum");
//   const[days,setDays]=useState(120);
//   const[coin1Data,setCoin1Data]=useState();
//   const[coin2Data,setCoin2Data]=useState();
//   const[loading,setLoading]=useState(false);
//   const[chartData,setChartData]=useState({
//     labels:[],
//     datasets:[],
//   });
//   const handleCoinChange=async (e,isCoin1)=>{
//     if(isCoin1){
//     setCoin1(e.target.value);
//     const data1=await getCoinData(e.target.value);
    
//     coinObject(setCoin1Data,data1);
    
//     }
//     else{
//       setCoin2(e.target.value);
//       const data2=await getCoinData(e.target.value);
//       coinObject(setCoin2Data,data2);
//     }
//   }
//   const handleDaysChange=(e)=>{
//     setDays(e.target.value);
//   }
//   useEffect(()=>{
//     getData()
//   },[]);
//   const getData=async ()=>{
//     setLoading(true);
//     const data=await get100Coins();
//     if(data){
//       setAllCoins(data);
//     }
//     const data1 = await getCoinData(coin1);
//     const data2 = await getCoinData(coin2);
//     coinObject(setCoin1Data, data1);
//     coinObject(setCoin2Data, data2);
//     const prices1=await getCoinPrices(coin1,days);
//     const prices2=await getCoinPrices(coin2,days);
//     settingChartData(setChartData,coin1Data,prices1);
      

    
//     setLoading(false);
//   }
//   return (
//     <div>
//       {loading||!coin1Data?.id||!coin2Data?.id?(<Loader/>):(<><Header/>
//       <SelectCoin allCoins={allCoins} coin1={coin1} coin2={coin2} days={days} handleCoinChange={handleCoinChange} handleDaysChange={handleDaysChange}/>
//       <div className='grey-wrapper'>
//       <List coin={coin1Data} delay={0.1}/>
//       </div>
//       <div className='grey-wrapper'>
//       <List coin={coin2Data} delay={0.2}/>
//       </div>
//       <div className='grey-wrapper'>
//       <LineChart chartData={chartData}/>
//       </div>
//       <CoinInfo name={coin1Data.name} desc={coin1Data.desc}/>
//       <CoinInfo name={coin2Data.name} desc={coin2Data.desc}/>
      
//       </>)}
  
//     </div>
//   )
// }

// export default ComparePage;

function ComparePage() {
  const [allCoins, setAllCoins] = useState([]);
  const [coin1, setCoin1] = useState(allCoins[0]?.id ?? "bitcoin");
  const [coin2, setCoin2] = useState(allCoins[1]?.id ?? "ethereum");
  const [days, setDays] = useState(120);
  const [coin1Data, setCoin1Data] = useState();
  const [coin2Data, setCoin2Data] = useState();
  const [loading, setLoading] = useState(false);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const handlePriceTypeChange = async (e) => {
    setPriceType(e.target.value);
    const prices1 = await getCoinPrices(coin1, days, e.target.value);
    const prices2 = await getCoinPrices(coin2, days, e.target.value);
    settingChartData(setChartData, prices1, coin1Data, coin2Data, prices2);
  };

  const handleCoinChange = async (e, isCoin1) => {
    if (isCoin1) {
      setCoin1(e.target.value);
      const data1 = await getCoinData(e.target.value);
      coinObject(setCoin1Data, data1);
      const prices1 = await getCoinPrices(e.target.value, days, priceType);
      const prices2 = await getCoinPrices(coin2, days, priceType);
      settingChartData(setChartData, prices1, data1, coin2Data, prices2);
    } else {
      setCoin2(e.target.value);
      const data2 = await getCoinData(e.target.value);
      coinObject(setCoin2Data, data2);
      const prices1 = await getCoinPrices(coin1, days, priceType);
      const prices2 = await getCoinPrices(e.target.value, days, priceType);
      settingChartData(setChartData, prices1, coin1Data, data2, prices2);
    }
  };

  const handleDaysChange = async (e) => {
    setDays(e.target.value);
    const prices1 = await getCoinPrices(coin1, e.target.value, priceType);
    const prices2 = await getCoinPrices(coin2, e.target.value, priceType);
    settingChartData(setChartData, prices1, coin1Data, coin2Data, prices2);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const data = await get100Coins();
    if (data) {
      setAllCoins(data);
    }
    const data1 = await getCoinData(coin1);
    const data2 = await getCoinData(coin2);
    coinObject(setCoin1Data, data1);
    coinObject(setCoin2Data, data2);
    const prices1 = await getCoinPrices(coin1, days);
    const prices2 = await getCoinPrices(coin2, days);
    settingChartData(setChartData, prices1, coin1Data, coin2Data, prices2);
    setLoading(false);
  };

  return (
   
    <div>
       <Header />
      {loading || !coin1Data?.id || !coin2Data?.id ? (
        <Loader />
      ) : (
        <>
          <SelectCoin
            allCoins={allCoins}
            coin1={coin1}
            coin2={coin2}
            days={days}
            handleCoinChange={handleCoinChange}
            handleDaysChange={handleDaysChange}
          />
          <div className="grey-wrapper">
            <List coin={coin1Data} delay={0.1} />
          </div>
          <div className="grey-wrapper">
            <List coin={coin2Data} delay={0.2} />
          </div>
          <div className="grey-wrapper">
            <PriceToggle
              handlePriceTypeChange={handlePriceTypeChange}
              priceType={priceType}
            />
            <LineChart
              chartData={chartData}
              multiAxis={true}
              priceType={priceType}
            />
          </div>
          <CoinInfo name={coin1Data.name} desc={coin1Data.desc} />
          <CoinInfo name={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default ComparePage;