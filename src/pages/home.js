import React from 'react'
import LandingPageComponent from '../components/LandingPage/Intro'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer';
function Home() {
  return (
    <div>
      <Header/>
      <LandingPageComponent/>
      <Footer/>
    </div>
  )
}

export default Home;
