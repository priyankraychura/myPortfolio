import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/AllRoutes'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import { ReactLenis } from 'lenis/react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import LoginRegisterPopup from './components/LoginRegisterPopup'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './config/firebaseConfig'

gsap.registerPlugin(useGSAP, ScrollTrigger); // register the hook to avoid React version discrepancies 

export default function App() {
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    if (uid) {
      fetchUser();
    }
  }, [uid])

  const fetchUser = async () => {
    await getDoc(doc(db, 'users', uid))
      .then((res) => {
        setUserData(res.data());
      })
      .catch((err) => {
        console.error(err.message);
      })
  }

  const handleLogout = async () => {
    await auth.signOut();
    setUserData(null)
    // toast.success('Logged out successfully!')
    // navigate('/signIn');
  }

  useGSAP(() => {
    const elements = gsap.utils.toArray('.reveal-up');

    elements.forEach(element => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: '-200 bottom',
          end: 'bottom 80%',
          scrub: true,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      });
    })
  })

  return (
    <BrowserRouter>
      <ReactLenis root>
        <ScrollToTop />
        <Header onLoginRegisterClick={() => setIsPopupOpen(true)} userData={userData} onLogout={handleLogout}/>
        <Routes />
        <LoginRegisterPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </ReactLenis>
    </BrowserRouter>
  )
}
