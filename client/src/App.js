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


  const [page, setPage] = useState(0);


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
      
      <Container maxWidth="lg" sx={{
        margin: '20px auto'
      }}>


        {pages[page]}


        <Container>
          <Box sx = {{margin: '20px'}}>
              <NavPage changePage={changePage} page={page} />
          </Box>
        </Container>
        
      
      </Container>
      {/* <InputFile/>
      <GetRequest/>
      <Table/> */}
    </div>
  );
}

export default App;
