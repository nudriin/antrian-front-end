import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Queue from "./pages/public/Queue"
import Home from "./pages/public/Home"
import AddQueue from "./pages/user/AddQueue"
import Login from "./pages/public/Login"
import PrivateRoute from "./components/PrivateRoute"
import SignRoute from "./components/SignRoute"
import LocketPrivateRoute from "./components/LocketPrivateRoute"
import Locket from "./pages/locket/Locket"
import Welcome from "./pages/locket/Welcome"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminLocket from "./pages/admin/AdminLocket"
import MetabaseDashboard from "./pages/admin/MetabaseDashboard"
import AdminUsers from "./pages/admin/AdminUsers"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/queue" element={<Queue />} />
                <Route element={<LocketPrivateRoute />}>
                    <Route path="/locket" element={<Welcome />} />
                    <Route path="/locket/:locketName" element={<Locket />} />
                </Route>
                <Route element={<SignRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/queue/add" element={<AddQueue />} />
                </Route>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route
                    path="/dashboard/admin"
                    element={<MetabaseDashboard />}
                />
                <Route path="/dashboard/locket" element={<AdminLocket />} />
                <Route path="/dashboard/users" element={<AdminUsers />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
