import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import SearchIcon from '@mui/icons-material/Search';
import theme from 'assets/theme';

import React, { useState } from 'react'
import { Container, AppBar, InputBase } from '@mui/material';
import colors from 'assets/theme/base/colors';
import MKTypography from 'components/MKTypography';
import SearchFlow from 'app/sections/Modal/SearchFlow';

const SearchHeader = ({ placeholder, onSearch }) => {
  const [search, setSearch] = useState('');
  const [searchFlowActive, setSearchFlowActive] = useState(false);

  return (
    <>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    </style>
      <AppBar position='relative' sx={{ boxShadow: 'none', }}>
        <Container maxWidth="md">
          <MKBox
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              backgroundColor: '#efefef',
              borderRadius: 16,
              padding: '5px 18px',
              mt:2,
              fontSize:20,
              border:'1px solid #fff',
            }}
            onClick={() => setSearchFlowActive(true)}
          >
            <SearchIcon
              fontSize='inherit'
              sx={{
                  scale: '1.5',
                  color: '#464646',
                  marginRight: "5px"
              }}
            />
            <InputBase
              placeholder={placeholder}
              value={search}
              sx={{
                ml: 1,
                flex: 1,
                fontSize: '1rem',
                color: 'rgb(0,0,0)',
                fontSize: 20,
                fontWeight:'bold',
                fontFamily: "Montserrat, sans-serif",
              }}
            />
            <MKButton type="submit" sx={{ display: 'none' }}>Search</MKButton>
          </MKBox>
        </Container>
      </AppBar>

      {searchFlowActive && <SearchFlow open={searchFlowActive} onClose={() => setSearchFlowActive(false)}/>}
    </>
  );
};

export default SearchHeader;