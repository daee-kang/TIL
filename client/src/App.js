import React, { useState, useEffect } from 'react';
import './App.scss';
import api from './utils/api'
import TabBar from './components/tabBar/tabBar';
import Header from './header/header';


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [tabs, setTabs] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  //component did mount
  useEffect(() => {
    //get data on load
    const fetchData = async () => {
     const result = await api.get('http://localhost:5000/api/tabs')
     console.log(result.data)
     setTabs(result.data)
     setIsLoading(false)
    }

    fetchData()
  }, []);

  const openNav = () => {
    let val = isSidebarOpen
    if(val == true) {
      val = false
    } else {
      val = true
    }

    console.log(val)
    setIsSidebarOpen(val)
  }

  if(isLoading) return (
    <div>
      dab on em
    </div>
  ); 
  else
  return (
    <div className="App">
      <Header />
      <button onClick={openNav} className="openbtn">open</button>
      <TabBar data={tabs} sidebar={isSidebarOpen}/>
      <div id="main">
        dab central dawg
      </div>
    </div>
  );
}

export default App;
