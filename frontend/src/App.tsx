import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="/auth-callback" element={< AuthCallbackPage />} />
      </Routes>

    </div>
  )
}

export default App