import React from 'react'
import Lottie from 'lottie-react'
import successAnimation from '../assets/success-animation.json'

// Its own file so Lottie (the biggest library on the site) only downloads after a message is sent
const SuccessAnimation = () => (
    <Lottie animationData={successAnimation} loop={false} style={{ width: 150, height: 125 }} />
)

export default SuccessAnimation
