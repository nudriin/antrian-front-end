import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Queue from './pages/public/Queue';
import Home from './pages/public/Home';
import AddQueue from './pages/user/AddQueue';
import LocketPaud from './pages/locket/LocketPaud';
import LocketSmp from './pages/locket/LocketSmp';
import LocketSma from './pages/locket/LocketSma';
import LocketPt from './pages/locket/LocketPt';
import Welcome from './pages/locket/Welcome';
import Login from './pages/public/Login';
import LocketTk from './pages/locket/LocketTk';
import LocketSd from './pages/locket/LocketSd';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/queue" element={<Queue />} />
                <Route path="/queue/add" element={<AddQueue />} />
                <Route path="/locket/welcome" element={<Welcome />} />
                <Route path="/locket/paud" element={<LocketPaud />} />
                <Route path="/locket/tk" element={<LocketTk />} />
                <Route path="/locket/sd" element={<LocketSd />} />
                <Route path="/locket/smp" element={<LocketSmp />} />
                <Route path="/locket/sma" element={<LocketSma />} />
                <Route path="/locket/perguruan" element={<LocketPt />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
