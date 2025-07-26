import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import BlogList from '../Components/BlogList'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
 
function Home() {
  return (
    <>
      <Navbar/>
      <Header/>
     <BlogList/>
     <Newsletter/>
     <Footer/>
    </>
  )
}

export default Home
