import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from "react-router-dom";
import { Auth_Provider } from "./providers/Auth_Provider.tsx";

// Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// Check Clerk publishable key is present
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Auth_Provider> {/* Makes it so that evertime the app opens or refreshes, checks the authentication */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth_Provider>
    </ClerkProvider>
  </StrictMode>,
)
