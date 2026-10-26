import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/AllRoutes'
import ThemeProvider from './components/ThemeProvider'
import SmoothScroll from './components/SmoothScroll'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SmoothScroll>
          <ScrollToTop />
          <a className="skip" href="#main">Skip to content</a>
          <div className="ambient" aria-hidden="true"><i></i><i></i></div>
          <div className="grain" aria-hidden="true"></div>
          <Header />
          <Routes />
          <Footer />
          <BackToTop />
        </SmoothScroll>
      </ThemeProvider>
    </BrowserRouter>
  )
}
