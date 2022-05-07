import React, {useState} from 'react'
import HomePage from './HomePage'
import Analytics from './Analytics'
import NavBar from '../../globals/NavBar'

import { Container, Box } from '@mui/material';

const HomeFinalPage = () => {

    const [tab, setTab] = useState('analytic');

    const changeTab = (newTab) => {
        setTab(newTab);
      }

  return (
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
  )
}

export default HomeFinalPage