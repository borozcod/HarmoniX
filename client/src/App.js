import React, {useState} from 'react'
import GetRequest from './components/GetRequest'
import Table from './components/Table';
import InputFile from './components/Import';
import Analytics from './components/pages/HomePage/Analytics';
import NavBar from './components/globals/NavBar';
import NavPage from './components/globals/NavPage';

import HomeFinalPage from './components/pages/HomePage/HomeFinalPage';
import MoodSearchPage from './components/pages/MoodSearchPage';
import AddTrackPage from './components/pages/HomePage/AddTrackPage';
import AddArtistsPage from './components/pages/AddArtistsPage'
import InputPlayListNamePage from './components/pages/InputPlayListNamePage'
import ResultPage from './components/pages/ResultPage'

import { Container, Box } from '@mui/material';

const App = () => {

  const [tab, setTab] = useState('analytic');

  const [page, setPage] = useState(0);

  const changeTab = (newTab) => {
    setTab(newTab);
  }

  const changePage = (newPage) =>{
    if(newPage < 6 && newPage >= 0){
      setPage(newPage);
    }

  }

  const pages = [
    <HomeFinalPage/>,
    <MoodSearchPage/>,
    <AddArtistsPage/>,
    <AddTrackPage/>,
    <InputPlayListNamePage/>,
    <ResultPage/>
  ]

  return (
    <div className="App">
      {/* <Container maxWidth="lg" sx={{
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
        {/* {
          tab === 'table' && (
            <Box sx={{margin: '20px'}}>
              // add table
            </Box>
          )
        } }
        
        <Box sx={{margin: '20px'}}>
          <NavBar changeTab={changeTab} active={tab} />
        </Box>

      </Container> */}
      

      
      <Container maxWidth="lg" sx={{
        margin: '20px auto'
      }}>
        {pages[page]}
        <Box sx = {{margin: '20px'}}>
          <NavPage changePage={changePage} page={page} />
        </Box>
      </Container>
      {/* <InputFile/>
      <GetRequest/>
      <Table/> */}
    </div>
  );
}

export default App;
