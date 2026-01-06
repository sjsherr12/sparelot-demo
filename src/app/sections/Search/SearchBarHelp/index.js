import React, { useState } from 'react';
import MKBox from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import colors from 'assets/theme/base/colors';
import { useNavigate } from 'react-router-dom';

const SearchBarHelp = ({ placeholder, AdornmentIcon }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <MKBox
            sx={{
                borderRadius: 50,
                background: '#fff',
                width: '100%',
                height: { xs: '70px', md: 'auto' },
                position: 'relative', // Make sure the parent container is relative
            }}
        >
            <MKBox
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: { xs: '70px', md: 'auto' },
                    position: 'relative', // Ensure the child items are positioned relative to this container
                }}
            >
                <TextField
                    fullWidth
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                    InputProps={
                        AdornmentIcon
                            ? {
                                  startAdornment: (
                                      <InputAdornment position="start" sx={{ fontSize: '32px' }}>
                                          {AdornmentIcon && <AdornmentIcon />}
                                      </InputAdornment>
                                  ),
                              }
                            : {}
                    }
                    sx={{
                        flexGrow: 1,
                        borderRadius: 32,
                        '.MuiOutlinedInput-root': {
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '25px',
                            margin: 1,
                            userSelect: 'none',
                            pr: 10,
                            '& fieldset': {
                                border: 'none',
                            },
                            '& input': {
                                color: '#000',
                            },
                        },
                    }}
                />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%', // Center vertically
                        right: 8,
                        transform: 'translateY(-50%)', // Adjust vertical alignment
                        height: 'auto',
                        width: 'auto',
                        backgroundColor: colors.gradients.info.main,
                        '&:hover': {
                            backgroundColor: colors.gradients.info.main,
                        },
                        fontSize: 42,
                    }}
                    onClick={handleSearch}
                >
                    <Search
                        sx={{
                            color: colors.white.main,
                            '&:hover': {
                                color: colors.white.main,
                            },
                        }}
                    />
                </IconButton>
            </MKBox>
        </MKBox>
    );
};

export default SearchBarHelp;
