import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Queue from "./pages/public/Queue"
import Home from "./pages/public/Home"
import AddQueue from "./pages/user/AddQueue"
import LocketPaud from "./pages/locket/LocketPaud"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/queue/add" element={<AddQueue />} />
        <Route path="/locket/paud" element={<LocketPaud />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
