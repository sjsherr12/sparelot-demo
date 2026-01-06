import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Fuse from 'fuse.js'; // Import Fuse.js
import { helpArticlesIndex } from 'app/sections/Search/SearchBarHelp/helpArticlesIndex';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            // Initialize Fuse.js for the fuzzy search
            const fuse = new Fuse(helpArticlesIndex, {
                keys: ['title', 'subtitles.subtitle', 'subtitles.subtitleContent'], // Updated keys
                includeScore: true,
                threshold: 0.3 // Adjust threshold for fuzzy matching
            });
    
            // Perform the fuzzy search
            const fuzzyResults = fuse.search(searchTerm).map(resultItem => resultItem.item);
    
            // Perform the direct text matching search
            const textMatchResults = helpArticlesIndex.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.subtitles.some(subtitle =>
                    subtitle.subtitleContent.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
    
            // Combine the results, ensuring no duplicates
            const combinedResults = [...new Set([...fuzzyResults, ...textMatchResults])];
    
            setResults(combinedResults);
        }
    }, [searchTerm]);
    

    return (
        <>
            <Container>
                <MKBox sx={{ mt: '38px' }}>
                    <MKTypography variant='h1' sx={{
                        color: '#000',
                        fontSize: { xs: '36px', md: '46px' },
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '680',
                        mb: '17px'
                    }}>
                        Search Results
                    </MKTypography>
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div key={index}>
                                <MKBox sx={{ mb: '18px' }}>
                                    <Link to={result.articlePath}>
                                        <MKTypography variant='h2' sx={{
                                            color: '#000',
                                            fontSize: { xs: '22px', md: '28px' },
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: '600',
                                            mb: '8px',
                                            '&:hover': {
                                                color:'#2e89ff'
                                            },
                                            textDecoration: 'underline'
                                        }}>
                                            {result.title}
                                        </MKTypography>
                                    </Link>
                                    <MKTypography variant='body1' sx={{
                                        color: '#656464',
                                        fontSize: { xs: '14px', md: '18px' },
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '540',
                                    }}>
                                        {result.subtitles.map((subtitle, subIndex) => (
                                            <span key={subIndex} style={{ marginRight: '8px' }}>
                                                {subtitle.subtitle}
                                                {subIndex < result.subtitles.length - 1 && ' \u2022 '}
                                            </span>
                                        ))}
                                    </MKTypography>
                                </MKBox>
                                {index < results.length - 1 && (
                                    <hr style={{
                                        border: 'none',
                                        borderTop: '1px solid #ddd',
                                        margin: '20px 0'
                                    }} />
                                )}
                            </div>
                        ))
                    ) : (
                        <MKTypography variant='body1' sx={{
                            color: '#000',
                            fontSize: { xs: '16px', md: '22px' },
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600',
                        }}>
                            No results found
                        </MKTypography>
                    )}
                </MKBox>
            </Container>
        </>
    );
};

export default SearchResults;
