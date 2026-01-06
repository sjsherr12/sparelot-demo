import React from 'react';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';

const LineSplitter = () => {
  return (
    <MKBox sx={{ display: 'flex', alignItems: 'center' }}>
      <MKBox sx={{ flex: 1, height: '1px', backgroundColor: '#555' }} />
    </MKBox>
  );
};

export default LineSplitter;
