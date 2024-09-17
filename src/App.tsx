import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Queue from './pages/public/Queue';
import Home from './pages/public/Home';
import AddQueue from './pages/user/AddQueue';
import LocketPaud from './pages/locket/LocketPaud';
import LocketSmp from './pages/locket/LocketSmp';
import LocketUmpeg from './pages/locket/LocketUmpeg';
import LocketKeuangan from './pages/locket/LocketKeuangan';
import Welcome from './pages/locket/Welcome';
import Login from './pages/public/Login';
import LocketTk from './pages/locket/LocketTk';
import LocketSd from './pages/locket/LocketSd';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/queue" element={<Queue />} />
                <Route path="/locket/welcome" element={<Welcome />} />
                <Route path="/locket/paud" element={<LocketPaud />} />
                <Route path="/locket/tk" element={<LocketTk />} />
                <Route path="/locket/sd" element={<LocketSd />} />
                <Route path="/locket/smp" element={<LocketSmp />} />
                <Route path="/locket/umpeg" element={<LocketUmpeg />} />
                <Route path="/locket/keuangan" element={<LocketKeuangan />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/queue/add" element={<AddQueue />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
