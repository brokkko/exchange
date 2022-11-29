import { useState } from 'react'
import './App.css'
import SideBar from "./components/SideBar";
import {
    Route,
    Routes
} from "react-router-dom";
import BrokersList from "./components/BrokersList";
import WatchList from "./components/WatchList";
import Exchange from "./components/Exchange";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <SideBar/>
        <Routes>
            <Route path="/" element={<WatchList/>}/>
            <Route path="/brokers" element={<BrokersList/>}/>
            <Route path="/exchange" element={<Exchange/>}/>
        </Routes>
    </div>
  )
}

export default App
