import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

if ('serviceWorker' in navigator) window.addEventListener('load', async () => {
  if (import.meta.env.DEV) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.filter(registration => registration.scope.includes(location.origin)).map(registration => registration.unregister()))
  } else {
    await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
  }
})
