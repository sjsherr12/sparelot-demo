import { Info } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const Taxes = () => (
  <Box
    sx={{
      p:1,
      pt:0,
      gap:2.5,
      display:'flex',
      flexDirection:'column',
    }}
  >
    <Box>
      <Typography
        sx={{
          fontSize:'1.5rem',
          fontWeight:700,
          color:'#000',
        }}
      >
        Determining tax reports:
      </Typography>
      <Typography
        sx={{
          fontSize:'1rem',
          fontWeight:500,
          color:'#737373',
        }}
      >
        Please note that you are responsible for determining the reporting of your SpareLot earnings and associated expense deductions on your tax filings. Please consult your tax professional for tax advice. All transactions are available through your Stripe bank connection.
      </Typography>
    </Box>

    <Box>
      <Typography
        sx={{
          fontSize:'1.5rem',
          fontWeight:700,
          color:'#000',
        }}
      >
        Check when tax season arrives!
      </Typography>
      <Typography
        sx={{
          fontSize:'1rem',
          fontWeight:500,
          color:'#737373',
        }}
      >
        SpareLot is required to issue each host that makes over $20,000 from over 200 transactions per year using our platform a form 1099-K. If you are in this range, we will notify you at the beginning of the year.
      </Typography>
    </Box>
  </Box>
)

export default Taxes;