import {AnimatePresence, motion} from 'framer-motion'
import { Box, Button, Checkbox, Icon, IconButton, InputAdornment, Skeleton, Typography, useMediaQuery } from '@mui/material';
import { TextField } from '@mui/material';
import { FilterList, Search, Sort, SortByAlpha, Tune } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import colors from 'assets/theme/base/colors';
import { useLocation, useParams } from 'react-router-dom';
import SearchFlow from 'app/sections/Modal/SearchFlow';
import AdaptiveModal from 'app/sections/Modal/Adaptive';
import Filters from './Filters/wrapper';
import { useFilters } from './Filters/context';
import { getConformingListings } from 'app/utils/listings/utils';
import Sorting from './Sorting';
import * as c from "const"

const ExploreHeader = ({
    loading, 
    listings,
    viewingMap,
    setViewingMap,
    selectedSpaceType,
    setSelectedSpaceType,
}) => {
    const {filters} = useFilters();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search')
    const isMobile = useMediaQuery('(max-width:991px)')
    const [searchFlow, setSearchFlow] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sortingOpen, setSortingOpen] = useState(false);
    const [conformingListings, setConformingListings] = useState(getConformingListings(listings, filters))

    useEffect(() => {
        setConformingListings(getConformingListings(listings, filters, isMobile && selectedSpaceType !== 'All' && selectedSpaceType));
    }, [listings, filters])

    return (<>
        <Box
            sx={{
                pt:2,
                pb:{xs:0,lg:2},
                gap:1,
                zIndex:10,
                width:'100%',
                display:'flex',
                flexDirection:'column',
                maxWidth:'100%',
                overflow:'hidden',
                boxShadow:'0px 6px 12px rgba(0,0,0,0.1)',
            }}
        >
            <Box
                sx={{
                    minHeight:50,
                    maxHeight:50,
                    px:{xs:2.5,lg:3},
                    gap:1.5,
                    display:{xs:'none',lg:'flex'},
                    alignItems:'center',
                    textOverflow:'ellipsis',
                    overflow:'hidden',
                }}
            >
                <Typography
                    sx={{
                        color:'#000',
                        fontWeight:600,
                        fontSize:{xs:'1.5rem',lg:'2rem'},
                        whiteSpace:'nowrap',
                    }}
                >
                    {loading ? 
                        <>
                            <Skeleton
                                animation='wave'
                                width={150}
                                height={isMobile?40:52}
                            />
                        </>
                        :
                        <>
                            {conformingListings || 'No'} Listing{(conformingListings!==1) && 's'}
                        </>
                    }
                </Typography>
                <Typography
                    sx={{
                        maxWidth:'100%',
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap',
                        overflow:'hidden',
                        mt:{xs:0.5,lg:1},
                        color:'#ababab',
                        fontWeight:450,
                        fontSize:{xs:'1rem',lg:'1.2rem'}
                    }}
                >
                    {loading ? 
                        <>
                            <Skeleton
                                animation='wave'
                                width={200}
                                height={25}
                            />
                        </>
                        :
                        <>
                            near {search ? 'your search' : 'you'}
                        </>
                    }
                    
                </Typography>
            </Box>
            <Box
                sx={{
                    width:'100%',
                    pb:1,
                    px:{xs:2,lg:2.5},
                    gap:{xs:1,lg:2},
                    display:'flex',
                    alignItems:'center',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                }}
            >
                <Button
                    sx={{
                        px:2,
                        height:{xs:50,lg:44},
                        color:'#737373',
                        fontWeight:500,
                        fontSize:'1rem',
                        width:{xs:'100%',lg:350},
                        borderRadius:{xs:16,lg:2},
                        border: '1px solid #efefef',
                        boxShadow: '0px 2px 2px rgba(0,0,0,0.05) !important',
                        '&:active':{scale:.95},
                        transition:'all .25s ease-in-out',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'space-between',
                        overflow:'hidden',
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap',
                    }}
                    onClick={() => setSearchFlow(true)}
                >
                    <Typography
                        sx={{
                            textAlign:'left',
                            width:'90%',
                            whiteSpace:'nowrap',
                            overflow:'hidden',
                            textOverflow:'ellipsis',
                        }}
                    >
                        {search || 'Search by location...'}
                    </Typography>
                    <Search sx={{ color: colors.info.main, scale: 1.5, ml:'auto'}} />
                </Button>
                <IconButton
                    sx={Styles.IconButtonStyle}
                    onClick={() => setFiltersOpen(true)}
                >
                    <Typography
                        sx={Styles.IconButtonTextStyle}
                    >
                        Filters
                    </Typography>
                    <Tune sx={{color:colors.info.main}}/>
                </IconButton>
                
                <IconButton
                    sx={Styles.IconButtonStyle}
                    onClick={() => setSortingOpen(true)}
                >
                    <Typography
                        sx={Styles.IconButtonTextStyle}
                    >
                        Sort by
                    </Typography>
                    <FilterList sx={{color:colors.info.main, transform:'scale(-1, -1), rotate(180deg)'}}/>
                </IconButton>

                <Box
                    sx={{
                        pl:2,
                        gap:1,
                        pr:.5,
                        height:44,
                        borderRadius:2,
                        alignItems:'center',
                        '&:active':{scale:.98},
                        border: '1px solid #efefef',
                        display:{xs:'none',lg:'flex'},
                        boxShadow: '0px 2px 2px rgba(0,0,0,0.05)',
                    }}
                >

                    <Typography
                        sx={{
                            color:'#737373',
                            fontSize:'1rem',
                            fontWeight:500,
                            userSelect:'none',
                        }}
                    >
                        Map View
                    </Typography>
                    <Checkbox
                        checked={viewingMap}
                        onClick={(e) => {
                            e.stopPropagation();
                            setViewingMap(!viewingMap);
                        }}
                        size='medium'
                    />
                </Box>
            </Box>

            <Box
                key={filters}
                sx={{
                    width:'100%',
                    px:2,
                    gap:1,
                    display:{xs:'flex',lg:'none'},
                    overflowX:'auto',
                    gap:2,
                    scrollbarWidth:'none',
                    msOverflowStyle:'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                {Object.entries({ All: true, ...filters[2] }).map(([key, value], idx) => {
                    const DIcon = c?.spaceTypeToIcon[key];
                    const selected = key===selectedSpaceType
                    if (value) {
                        return (
                            <Box
                                onClick={() => setSelectedSpaceType(key)}
                                key={idx}
                                sx={{
                                    px: 1,
                                    pb: 1,
                                    minWidth:key?.length>6?'fit-content':75,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 0.3,
                                    borderBottom: `2px solid ${selected ? '#333' : '#fff'}`,
                                    transition:'all .15s ease-in-out',
                                }}
                            >
                                <Icon
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        color: selected ? '#333' : '#737373',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <DIcon sx={{ scale: 1.5 }} />
                                </Icon>
                                <Typography
                                    sx={{
                                        fontSize: '.75rem',
                                        fontWeight: 550,
                                        color: selected ? '#333' : '#737373',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {key.replaceAll('_', ' ')}
                                </Typography>
                            </Box>
                        )
                    }
                })}
            </Box>
        </Box>

        <AdaptiveModal
            title='Filters'
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            maxWidth={575}
            sx={{
                pb:{xs:4,lg:2},
            }}
        >
            <Filters listings={listings} onClose={() => setFiltersOpen(false)} />
        </AdaptiveModal>

        <AdaptiveModal
            title='Sort by'
            open={sortingOpen}
            onClose={() => setSortingOpen(false)}
            maxWidth={575}
            sx={{
                pb:{xs:4,lg:2},
            }}
        >
            <Sorting onClose={() => setSortingOpen(false)} />
        </AdaptiveModal>

        {searchFlow && <SearchFlow open={searchFlow} onClose={() => setSearchFlow(false)}/>}
    </>)
}

export default ExploreHeader;

const Styles = {
    IconButtonStyle: {
        px:{xs:1,lg:2},
        gap:1.5,
        width:{xs:50,lg:'fit-content'},
        height:{xs:50,lg:44},
        borderRadius:{xs:16,lg:2},
        border: '1px solid #efefef',
        boxShadow: '0px 2px 2px rgba(0,0,0,0.05)',
        display:'flex',
        alignItems:'center',
    },
    IconButtonTextStyle: {
        color:'#737373',
        fontWeight:500,
        fontSize:'1rem',
        display:{xs:'none',lg:'flex'}
    }
}