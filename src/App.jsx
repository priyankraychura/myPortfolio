import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/AllRoutes'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import { ReactLenis } from 'lenis/react'
import LoginRegisterPopup from './components/LoginRegisterPopup'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './config/firebaseConfig'
import toast from 'react-hot-toast';
import Todos from './test/Todos'
import AddTodo from './test/AddTodo'
import SplashScreen from './components/SplashScreen'

export default function App() {
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    })
  }, [])

  useEffect(() => {
    setIsLoading(true);
    if (uid) {
      fetchUser();
    } else {
      setUserData(null);
      setIsLoading(false);
    }
  }, [uid])

  const fetchUser = async () => {
    try {
      const res = await getDoc(doc(db, 'users', uid));
      setUserData(res.data());
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = async () => {
    await auth.signOut();
    setUserData(null)
    toast.success('Logged out successfully!')
  }

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <ReactLenis root>
        <ScrollToTop />
        <Header onLoginRegisterClick={() => setIsPopupOpen(true)} userData={userData} onLogout={handleLogout} isLoading={isLoading} />
        <Routes />
        <LoginRegisterPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </ReactLenis>
      {/* <AddTodo /> */}
      {/* <Todos /> */}
    </BrowserRouter>
  )
}
