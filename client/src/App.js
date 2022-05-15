import React, {useState} from 'react'
import GetRequest from './components/GetRequest'
import Table from './components/Table';
import InputFile from './components/Import';
import Analytics from './components/pages/Analytics';
import NavBar from './components/globals/NavBar';


import HomePage from './components/pages/HomePage';
import MoodSearchPage from './components/pages/MoodSearchPage';
import AddTrackPage from './components/pages/AddTrackPage';
import InputPlayListNamePage from './components/pages/InputPlayListNamePage'
import ResultPage from './components/pages/ResultPage'
import SearchAPI from './components/SearchAPI';

import { Container, Box } from '@mui/material';

const App = () => {


  const [tab, setTab] = useState('generate');

  const changeTab = (newTab) => {
    setTab(newTab);
  }

  const [page, setPage] = useState(0);

  const [started, setStarted] = useState(false);

  const [playListName, setplayListName] = useState('')


  const changePage = (newPage) =>{
    if(newPage < 6 && newPage >= 1){
      setPage(newPage);
    }

  }

  const onGetStarted = (bool) =>{
    if(bool === true){
      setPage(1)
      setStarted(bool);
    }
    else{
      setPage(0)
      setStarted(false);
    }
  }

  const changePlayListName = (name) => {
    setplayListName(name);
  }

  const pages = [
    <HomePage onGetStarted={onGetStarted}/>,
    <MoodSearchPage onGetStarted={onGetStarted} changePage={changePage} page={page}/>,
    <AddTrackPage onGetStarted={onGetStarted} changePage={changePage} page={page}/>,
    <InputPlayListNamePage onGetStarted={onGetStarted} changePage={changePage} page={page} playListName={playListName} changePlayListName={changePlayListName}/>,
    <ResultPage onGetStarted={onGetStarted} changePage={changePage} page={page}/>
  ]




  return (
    <div className="App">
      
      <Container maxWidth="lg" sx={{
        margin: '20px auto'
      }}>
        {
          tab === 'analytic' && (
            <Box sx={{margin: '20px'}}>
              <Analytics/>
            </Box>
          )
        }
        {
          tab === 'generate' && (
            <Box sx={{margin: '20px'}}>
              {pages[page]}
            </Box>
          )
        }
        {/* [+]---adding a tab for search, will update with spotify api later */}
        {/* {
          tab === 'table' && (
            <Box sx={{margin: '20px'}}>
              // add table
            </Box>
          )
        } */}
        

        <Box sx={{margin: '20px'}}>
          <NavBar changeTab={changeTab} active={tab} changePage={changePage} page={page} started={started} onGetStarted={onGetStarted}/>
        </Box>
        
      
      </Container>
      {/* <InputFile/>
      <GetRequest/>
      <Table/> */}
    </div>
  );
}

export default App;