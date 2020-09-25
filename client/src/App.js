import React, { useState, useEffect } from 'react';
import './App.css';
import api from './utils/api'
import TabBar from './components/tabBar';


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [tabs, setTabs] = useState(null)

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

  if(isLoading) return (
    <div>
    </div>
  ); 
  else
  return (
    <div className="App">
      <TabBar data={tabs}/>
    </div>
  );
}

export default App;
