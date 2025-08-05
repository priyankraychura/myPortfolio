import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { auth, db, provider } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';

// SVG Icon for Google
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56,12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26,1.37-1.04,2.53-2.21,3.31v2.77h3.57c2.08-1.92,3.28-4.74,3.28-8.09Z" fill="#4285F4" />
    <path d="M12,23c2.97,0,5.46-.98,7.28-2.66l-3.57-2.77c-.98.66-2.23,1.06-3.71,1.06-2.86,0-5.29-1.93-6.16-4.53H2.18v2.84C3.99,20.53,7.7,23,12,23Z" fill="#34A853" />
    <path d="M5.84,14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43,8.55,1,10.22,1,12s.43,3.45,1.18,4.93l3.66-2.84Z" fill="#FBBC05" />
    <path d="M12,5.16c1.55,0,2.94.54,4.04,1.58l3.15-3.15C17.45,1.8,14.97,1,12,1,7.7,1,3.99,3.47,2.18,7.07l3.66,2.84c.87-2.6,3.3-4.53,6.16-4.53Z" fill="#EA4335" />
  </svg>
);


const LoginRegisterPopup = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  if (!isOpen) {
    return null;
  }

  const toggleMode = () => {
    setIsLoginMode(prevMode => !prevMode);
    // Reset form fields when switching modes
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      console.log('Login data submitted:', { email: formData.email, password: formData.password });
    } else {
      console.log('Register data submitted:', formData);
    }
    onClose();
  };

  const handleGoogleSignIn = async () => {
    await signInWithPopup(auth, provider)
      .then((res) => {
        const user = res.user.providerData[0]
        console.log(user)
        setDoc(doc(db, 'users', res.user.uid), { email: user.email, name: user.displayName, profileImg: user.photoURL })
        // toast.success(`Rregistration successful!`)
      })
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-zinc-900 p-8 rounded-2xl shadow-lg w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-rounded">close</span>
        </button>

        <h2 className="text-2xl font-semibold text-white mb-7">
          {isLoginMode ? 'Welcome Back' : 'Step Into My World'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required={!isLoginMode} // Only required when registering
                value={formData.firstName}
                onChange={handleInputChange}
                className="text-field"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required={!isLoginMode} // Only required when registering
                value={formData.lastName}
                onChange={handleInputChange}
                className="text-field"
              />
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="text-field"
            />
          </div>

          <div className="relative mb-6">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="text-field pr-12"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400 hover:text-white"
            >
              <span className="material-symbols-rounded">
                {isPasswordVisible ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary [&]:max-w-full w-full justify-center"
          >
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-zinc-600"></div>
          <span className="flex-shrink mx-4 text-zinc-400 text-sm">or</span>
          <div className="flex-grow border-t border-zinc-600"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn btn-outline [&]:max-w-full w-full justify-center hover:bg-zinc-700 active:bg-zinc-800"
        >
          <GoogleIcon />
          <span className="ml-2">Continue with Google</span>
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleMode} className="font-medium text-sky-400 hover:text-sky-300 ml-1">
              {isLoginMode ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

LoginRegisterPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginRegisterPopup;