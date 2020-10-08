import React, { useState, useEffect, useContext } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom'
import Header from './header/header';
import TabBar from './components/tabBar/tabBar';
import Home from './components/home/home';
import Page from './components/page/page';
import { Context } from './Provider'

function App() {
  const { setUpdateState, updateTabItems, toggleSidebar } = useContext(Context)

  const [isLoading, setIsLoading] = useState(true)
  const [tabs, setTabs] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  toggleSidebar.current = (set) => {
    if (window.innerWidth > 680) return

    if(set === undefined) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      setIsSidebarOpen(set)
    }
  }
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
    //add listener for resize
    window.addEventListener('resize', handleResize)
    //resize on load
    if (window.innerWidth <= 680) setIsSidebarOpen(false)
  }, []);

  if (isLoading) return (
    <>
      {/* should i put anything here lol */}
    </>
  );
  else
    return (
      <div className="App">
          <Header/>
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
