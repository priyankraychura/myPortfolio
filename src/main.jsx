import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'lenis/dist/lenis.css'

createRoot(document.getElementById('root')).render(<App />)

// Firebase Analytics isn't needed for the first paint, so it loads once the page is idle
const loadAnalytics = () => import('./config/firebaseConfig').catch(() => {})
if ('requestIdleCallback' in window) requestIdleCallback(loadAnalytics, { timeout: 5000 })
else setTimeout(loadAnalytics, 3000)
