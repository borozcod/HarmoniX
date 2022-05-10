import React, {useState} from 'react'
import GetRequest from './components/GetRequest'
import Table from './components/Table';
import InputFile from './components/Import';
import HomePage from './components/HomePage';
import Analytics from './components/Analytics';
import NavBar from './components/globals/NavBar';

import SearchAPI from './components/SearchAPI';

import { Container, Box } from '@mui/material';

const App = () => {

  const [tab, setTab] = useState('analytic');

  const changeTab = (newTab) => {
    setTab(newTab);
  }

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
              <HomePage/>
            </Box>
          )
        }
        {/* [+]---adding a tab for search, will update with spotify api later */}
        {
          tab === 'search' && (
            <Box sx={{margin: '20px'}}>
              <SearchAPI/>
            </Box>
          )
        }
        {/* {
          tab === 'table' && (
            <Box sx={{margin: '20px'}}>
              // add table
            </Box>
          )
        } */}
        
        <Box sx={{margin: '20px'}}>
          <NavBar changeTab={changeTab} active={tab} />
        </Box>
      </Container>
      {/* <InputFile/>
      <GetRequest/>
      <Table/> */}
    </div>
  );
}

export default App;