import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { AuthProvider } from './components/AuthContext.tsx'
import { UserProvider } from './components/UserContext.tsx'
import { FavoriteRoomsProvider } from './components/FavoriteRoomsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <AuthProvider>
    <FavoriteRoomsProvider>
    <App />
    </FavoriteRoomsProvider>
    </AuthProvider>
    </UserProvider>
  </React.StrictMode>,
)
