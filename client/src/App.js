import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import api from './utils/api'
import { Route, Switch } from 'react-router-dom'
import Header from './header/header';
import TabBar from './components/tabBar/tabBar';
import Home from './components/home/home';
import Page from './components/page/page';
import { Context } from './Provider'

function App() {
  const { setUpdateState, updateTabItems } = useContext(Context)

  const [isLoading, setIsLoading] = useState(true)
  const [tabs, setTabs] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  setUpdateState.current = setTabs

  //component did mount
  useEffect(() => {
    //get data on load
    const fetchData = async () => {
      await updateTabItems()
      setIsLoading(false)
    }

    //window event resize handler
    const handleResize = () => {
      if (window.innerWidth <= 680) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    fetchData()
    window.addEventListener('resize', handleResize)
  }, []);

  const openNav = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (isLoading) return (
    <div>
      dab on em
    </div>
  );
  else
    return (
      <div className="App">
          <Header />
          <button onClick={openNav} className="openbtn">open</button>
          <TabBar data={tabs} sidebar={isSidebarOpen} />
          <div id="main">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/page/:category/:title" component={Page} />
            </Switch>
          </div>
      </div>
    );
}

export default App;
