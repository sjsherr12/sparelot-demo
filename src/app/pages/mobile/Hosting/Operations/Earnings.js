import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import { Container, MenuItem, Select, FormControl, useMediaQuery, Typography, Box, Icon, IconButton, Snackbar, Skeleton, Modal, Fade, Paper, Alert, AlertTitle, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import get_all_stripe_transactions from 'app/backend/cloud/get_all_stripe_transactions';
import { useModal } from 'app/sections/Modal/Parent/context';
import { useStripeTransactions } from './stripeTransactions';
import { Helmet } from 'react-helmet-async';
import AdaptiveModal from 'app/sections/Modal/Adaptive';
import Taxes from './Taxes';
import PaymentInfo from 'app/pages/web/Account/Payments';
import { AccountBalance, AccountBalanceOutlined, Add, AttachMoney, AutoGraph, ContentCopy, DocumentScannerOutlined, ExpandLess, ExpandMore, Info, MoreHoriz, OpenInNew, QueryStats, Receipt, SsidChart, SupervisorAccount, TrendingUp, WarningAmber } from '@mui/icons-material';
import isStandalone from 'isStandalone';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import MKButton from 'components/MKButton';
import { MoreOptionsMenu } from 'app/sections/More';
import { BasicMenuItem } from 'app/sections/More';
import Hr from 'app/utils/Hr';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from 'app/backend/fb_cfg';
import { getFunctions, httpsCallable } from 'firebase/functions';
import HostContentWrapper from 'app/utils/wrapper/host/content';
import { ReservationStatus } from 'app/utils/optimize/utils';
import TransactionInfoDisplay from './Transaction';
import { useSpareLotHostData } from '../Bookings/context';
import Filler from 'app/sections/Filler';
import colors from 'assets/theme/base/colors';

const now = (new Date()).getTime()

const renderCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { x, y } = payload[0].payload; // Extract x (date) and y (amount) from the data point
    return (
      <div
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '8px',
          borderRadius: '5px',
          fontSize: '12px',
        }}
      >
        <p><strong>Date:</strong> {new Date(x).toLocaleDateString()}</p>
        <p><strong>Amount:</strong> ${y.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const WidgetBox = ({children, sx}) => (
  <Box
    sx={{
      px:3,
      py:2,
      width:'100%',
      boxShadow: '1px 1px 6px 0px rgba(0,0,0,0.125)',
      borderRadius:'.5rem',
      display:'flex',
      flexDirection:'column',
      ...sx,
    }}
  >
    {children}
  </Box>
)

const TransactionsList = ({transactions}) => {
  const [menuAlign, setMenuAlign] = useState(null);
  const [moreOptionsMenu, setMoreOptionsMenu] = useState(false);
  const [focusedTransaction, setFocusedTransaction] = useState('')
  const [viewingMoreInfo, setViewingMoreInfo] = useState(false);

  return (<>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e5e5e5',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems:'center',
          width: '100%',
          py: 1,
          px:2,
          backgroundColor: '#f9f9f9',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        {['Date','Type','Amount'].map((it, idx) => (
          <Typography
            sx={{
              color: '#737373',
              width: '30%',
              fontSize: {xs:11,lg:14},
              fontWeight: 550,
              textAlign: 'center',
            }}
          >
            {it}
          </Typography>
        ))}
        <Icon
          sx={{
            width:30,
            height:24,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            ml: 'auto',
            color:'#737373',
          }}
        >
          <Info sx={{scale:.875}} />
        </Icon>
      </Box>

      {transactions?.map((transaction, index) => (
        <Box
          key={transaction.id}
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent:'space-between',
            py: 1,
            px: 2,
            alignItems: 'center',
            borderBottom: index === transactions.length - 1 ? '0' : '1px solid #e5e5e5',
            '&:last-child': {
              borderRadius: '0 0 0.5rem 0.5rem',
            },
          }}
        >
          {
            [
              `${(new Date(transaction?.created)).toLocaleDateString('en-US', {month:'2-digit',day:'2-digit',year:'2-digit'}) || 'No date'}`,
              `${transaction?.type?.capitalize() || 'No type provided'}`,
              `${transaction?.net > 0 ? `+$${transaction?.net.toFixed(2)}` : `-$${(transaction?.net*-1).toFixed(2)}`}`
            ].map((it, idx) => (
              <Typography
                sx={{
                  width:'30%',
                  fontSize:idx===2?'.875rem':'.75rem',
                  fontWeight:550,
                  color: idx===2?'#000':'#737373',
                  textAlign: 'center',
                }}
              >
                {it}
              </Typography>
            ))
          }
          <Icon
            sx={{
              width:30,
              height:30,
              ml: 'auto',
              color: '#000',
              display: 'flex',
              alignItems:'center',
              borderRadius:'.25rem',
              justifyContent: 'center',
              cursor:'pointer',
              '&:hover':{
                bgcolor:'#ededed',
                color:'#000',
              },
              '&:active':{
                bgcolor:'#ababab',
                color:'#000',
              },
              transition:'all .25s ease'
            }}
            onClick={(e) => {
              setMenuAlign(e.currentTarget)
              setMoreOptionsMenu(true);
              setFocusedTransaction(transaction)
            }}
          >
            <MoreHoriz sx={{scale:.875}} />
          </Icon>
        </Box>
      ))}
    </Box>

    <MoreOptionsMenu
      open={moreOptionsMenu}
      menuAlign={menuAlign}
      onClose={() => setMoreOptionsMenu(false)}
    >
      <BasicMenuItem
        title='Copy ID'
        onClick={() => {
          navigator.clipboard.writeText(focusedTransaction?.id)
        }}
        BMIcon={Receipt}
      />
      <BasicMenuItem
        title='View Info'
        onClick={() => {
          setViewingMoreInfo(true)
        }}
        BMIcon={Info}
      />
    </MoreOptionsMenu>

    <AdaptiveModal
      open={viewingMoreInfo}
      onClose={() => setViewingMoreInfo(false)}
      title='Transaction Info'
      sx={{
        px:0,
      }}
      moreOptions={
        <BasicMenuItem
          title='Copy ID'
          onClick={() => {
            navigator.clipboard.writeText(focusedTransaction?.id)
          }}
          BMIcon={Receipt}
        />
      }
    >
      <TransactionInfoDisplay data={focusedTransaction} />
    </AdaptiveModal>
  </>)
}

const HostEarnings = () => {
  const {user, userImpl} = useUserAuthState();
  const navigate = useNavigate();
  const {loading, transactions, setTransactions} = useStripeTransactions();
  const [data, setData] = useState([])
  const [viewingTransactions, setViewingTransactions] = useState(false);
  const isMobile = useMediaQuery('(max-width:1000px)')
  const [viewingTaxInfo, setViewingTaxInfo] = useState(false);
  const [stripeConnecting, setStripeConnecting] = useState(false);
  const [creationWarningVisible, setCreationWarningVisible] = useState(false);
  const {reservations} = useSpareLotHostData('reservations');

  const createStripeAccountLink = async () => {
    setStripeConnecting(true);
    const functions = getFunctions();
    const createLink = httpsCallable(functions, 'createStripeAccountLink');
    try {
      const result = await createLink();  // You can pass data here if needed
      const { url } = result.data;
      setStripeConnecting(false);

      window.location.href = url
    } catch (error) {
      alert("Error creating Stripe account link:", error);
      setStripeConnecting(false);
    }
  };

  const openStripeDashboard = () => {
    if (userImpl?.stripeAccountId) {
      window.open(`https://dashboard.stripe.com/${userImpl.stripeAccountId}`, '_blank');
    } else {
      console.error("Stripe Account is not available.");
    }
  }; 

  useEffect(() => {
    if (!loading && transactions.length > 0) {
      const formattedData = transactions
        .filter((transaction) => transaction.type === 'payment')
        .map((transaction) => ({
          x: new Date(transaction.created).toISOString(),
          y: transaction.net,
        }))
        .sort((a, b) => new Date(a.x) - new Date(b.x));
  
      setData(formattedData);
    }
  }, [transactions, loading]);

  return (
    <HostContentWrapper>
      <Helmet>
        <title>SpareLot | Host Earnings</title>
        <meta name="description" content="Manage your host earnings." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Box
        sx={{
          mb:2,
          gap:2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading && 
          <>
            <Box
              sx={{
                gap:2,
                display: 'grid',
                gridTemplateColumns:{xs:'repeat(1, 1fr)',md:'repeat(2, 1fr)', xl:'repeat(4, 1fr)'}
              }}
            >
              {[1,1,1,1].map((_, idx) => (
                <Skeleton
                  sx={{
                    width:'100%',
                    borderRadius:'.5rem',
                    height:140,
                  }}
                  animation='wave'
                  variant='rectangular'
                />
              ))}
            </Box>

            <Box
              sx={{
                gap:2,
                display:'flex',
                flexDirection:{xs:'column',lg:'row'},
              }}
            >
              {[1,1].map((_, idx) => (
                <Skeleton
                  sx={{
                    width:'100%',
                    borderRadius:'.5rem',
                    height:140,
                  }}
                  animation='wave'
                  variant='rectangular'
                />
              ))}
            </Box>
          </>
        }
        {!loading && <>
          <Box
            sx={{
              gap:2,
              display: 'grid',
              gridTemplateColumns:{xs:'repeat(1, 1fr)',md:'repeat(2, 1fr)', xl:'repeat(4, 1fr)'}
            }}
          >
            <WidgetBox>
              <Box
                sx={{
                  gap:1,
                  display:'flex',
                }}
              >
                <Typography
                  sx={{
                    color:'#000',
                    fontSize:'1rem',
                    fontWeight:550,
                  }}
                >
                  Total Earnings
                </Typography>
                <Icon
                  sx={{
                    ml:'auto',
                    color:'#ababab',
                  }}
                >
                  <AttachMoney />
                </Icon>
              </Box>

              <Typography
                sx={{
                  mt:1,
                  color:'#000',
                  fontSize:'2rem',
                  fontWeight:650,
                }}
              >
                ${(
                  transactions
                    ?.filter(tx => tx.type === "payment") // Adjust conditions as necessary
                    .map(tx => tx.net)
                    .reduce((sum, amount) => sum + amount, 0)
                ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>

              <Typography
                sx={{
                  color:'#ababab',
                  fontSize:'.75rem',
                  fontWeight:500,
                }}
              >
                {transactions[0]?.created && transactions[transactions.length-1]?.created && transactions.length > 1 ?
                  `From ${(new Date(transactions[transactions.length-1]?.created)).toLocaleDateString()} to ${(new Date(transactions[0]?.created)).toLocaleDateString()}`
                  : 'Total revenue of transactions.'
                }
              </Typography>
            </WidgetBox>

            <WidgetBox>
              <Box
                sx={{
                  gap:1,
                  display:'flex',
                }}
              >
                <Typography
                  sx={{
                    color:'#000',
                    fontSize:'1rem',
                    fontWeight:550,
                  }}
                >
                  Active Renters
                </Typography>
                <Icon
                  sx={{
                    ml:'auto',
                    color:'#ababab',
                  }}
                >
                  <SupervisorAccount />
                </Icon>
              </Box>

              <Typography
                sx={{
                  mt:1,
                  color:'#000',
                  fontSize:'2rem',
                  fontWeight:650,
                }}
              >
                {reservations?.filter((res) => (new Date(res?.reservationInfo?.startDate)) <= (new Date()) && (new Date(res?.reservationInfo?.endDate)) > (new Date()) && res?.reservationInfo?.status === ReservationStatus.Approved).length}
              </Typography>

              <Typography
                sx={{
                  color:'#ababab',
                  fontSize:'.75rem',
                  fontWeight:500,
                }}
              >
                Approved or active reservations.
              </Typography>
            </WidgetBox>

            <WidgetBox>
              <Box
                sx={{
                  gap:1,
                  display:'flex',
                  alignItems:'center',
                }}
              >
                <Typography
                  sx={{
                    color:'#000',
                    fontSize:'1rem',
                    fontWeight:550,
                  }}
                >
                  Stripe Account
                </Typography>
                <Icon
                  sx={{
                    ml:'auto',
                    height:20,
                    display:'flex',
                    alignItems:'center',
                    color:'#ababab',
                  }}
                >
                  <AccountBalanceOutlined />
                </Icon>
              </Box>

              <Typography
                sx={{
                  color:'#ababab',
                  fontSize:'.75rem',
                  fontWeight:500,
                }}
              >
                {userImpl?.stripeAccountId ? 'Manage your Stripe bank connection.' : 'Connect your bank to Stripe.'}
              </Typography>

              <MKButton
                disabled={stripeConnecting}
                color={stripeConnecting ? 'light' : userImpl?.stripeAccountId ? 'dark' : 'info'}
                onClick={userImpl?.stripeAccountId ? openStripeDashboard : () => setCreationWarningVisible(true)}
                sx={{
                  mt:2,
                  fontWeight:550,
                  display:'flex',
                  width:'100%',
                  gap:1,
                }}
              >
                {stripeConnecting ?
                  <LoadingComponent compact/>
                  :
                  <>
                    {userImpl?.stripeAccountId ? 'Go to Stripe' : 'Connect Stripe'}
                    <Icon
                      sx={{
                        height:20,
                        display:'flex',
                        alignItems:'center',
                      }}
                    >
                      <OpenInNew />
                    </Icon>
                  </>
                }
              </MKButton>
            </WidgetBox>

            <WidgetBox>
              <Box
                sx={{
                  gap:1,
                  display:'flex',
                  alignItems:'center',
                }}
              >
                <Typography
                  sx={{
                    color:'#000',
                    fontSize:'1rem',
                    fontWeight:550,
                  }}
                >
                  Tax Information
                </Typography>
                <Icon
                  sx={{
                    ml:'auto',
                    height:20,
                    display:'flex',
                    alignItems:'center',
                    color:'#ababab',
                  }}
                >
                  <DocumentScannerOutlined />
                </Icon>
              </Box>

              <Typography
                sx={{
                  color:'#ababab',
                  fontSize:'.75rem',
                  fontWeight:500,
                }}
              >
                Review SpareLot tax policies
              </Typography>

              <MKButton
                color='secondary'
                onClick={() => setViewingTaxInfo(true)}
                sx={{
                  mt:2,
                  fontWeight:550,
                  display:'flex',
                  width:'100%',
                  gap:1,
                }}
              >
                Tax Information
                <Icon
                  sx={{
                    height:20,
                    display:'flex',
                    alignItems:'center',
                  }}
                >
                  <Info />
                </Icon>
              </MKButton>
            </WidgetBox>
          </Box>

          <Box
            sx={{
              gap:2,
              display:'flex',
              flexDirection:{xs:'column',lg:'row'},
            }}
          >
            <WidgetBox>
              <Box
                sx={{
                  gap:1,
                  display:'flex',
                }}
              >
                <Typography
                  sx={{
                    color:'#000',
                    fontSize:'1rem',
                    fontWeight:550,
                  }}
                >
                  Overview
                </Typography>
                <Icon
                  sx={{
                    ml:'auto',
                    height:30,
                    color:'#ababab',
                  }}
                >
                  <TrendingUp />
                </Icon>
              </Box>
              <Typography
                sx={{
                  mt:-.5,
                  mb:2,
                  color:'#ababab',
                  fontSize:'.75rem',
                  fontWeight:500,
                }}
              >
                View a cumulative graph of renter payments.
              </Typography>
              
              {transactions?.length < 1 &&
                <Filler
                    LargeIcon={QueryStats}
                    desc={'Not enough transactional data.'}
                    sx={{
                      width:'100%'
                    }}
                />
              }
              {transactions?.length > 1 &&
                <ResponsiveContainer width='100%' height={isMobile?200:'100%'}>
                  <AreaChart
                    data={data}
                    margin={{ top: 10, right: 0, left: -20, bottom: -5, }}
                  >
                    <defs>
                      <linearGradient id="colorPayment" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#ababab" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="x"
                      tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', {month:'2-digit',day:'2-digit',year:'2-digit'})}
                      stroke="#000"
                      tick={{fontSize:12, fontWeight:500}}
                    />
                    <YAxis 
                      stroke="#000" 
                      tickFormatter={(tick) => `$${tick}`}
                      tick={{fontSize:12, fontWeight:500,}}
                    />
                    <Tooltip content={renderCustomTooltip} />
                    <Area
                      type="monotone"
                      dataKey="y"
                      stroke="#000"
                      fillOpacity={1}
                      fill="url(#colorPayment)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              }
            </WidgetBox>
            <WidgetBox>
              <Box
                sx={{
                  gap:1,
                  display:'flex',
                }}
              >
                <Typography
                  sx={{
                    color:'#000',
                    fontSize:'1rem',
                    fontWeight:550,
                  }}
                >
                  Recent Transactions
                </Typography>
                <Icon
                  sx={{
                    ml:'auto',
                    height:30,
                    color:'#ababab',
                  }}
                >
                  <Receipt />
                </Icon>
              </Box>
              <Typography
                sx={{
                  mt:-.5,
                  mb:2,
                  color:'#ababab',
                  fontSize:'.75rem',
                  fontWeight:500,
                }}
              >
                View recent transactions from Stripe.
              </Typography>
              {transactions?.length < 1 &&
                <Filler
                    LargeIcon={QueryStats}
                    desc={'Not enough transactional data.'}
                    sx={{
                      width:'100%'
                    }}
                />
              }
              {transactions?.length > 0 && 
              <>
                <TransactionsList transactions={transactions?.slice(0,5) || []} />
                <MKButton
                  color='dark'
                  sx={{
                    mt:2,
                    width:'100%',
                    fontWeight:550,
                  }}
                  onClick={() => setViewingTransactions(true)}
                >
                  View all transactions
                </MKButton>
              </>
              }
            </WidgetBox>
          </Box>
        </>}
      </Box>

      <AdaptiveModal
        sideSwipeMobile={{
          customExtension:'transactions'
        }}
        open={viewingTransactions}
        onClose={() => setViewingTransactions(false)}
        title='Transactions'
      >
        <TransactionsList transactions={transactions}/>
      </AdaptiveModal>

      <AdaptiveModal
        open={viewingTaxInfo}
        onClose={() => setViewingTaxInfo(false)}
        title='Tax Information'
      >
        <Taxes/>
      </AdaptiveModal>

      <Modal
        open={creationWarningVisible}
        onClose={() => {
          if (!stripeConnecting) {
            setCreationWarningVisible(false)
          }
        }}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Fade in={creationWarningVisible} timeout={300}>
          <Box
            sx={{
              maxWidth:480,
              width: '100%',
              borderRadius: 3,
              p: 4,
              backgroundColor:'#fff',
              textAlign: 'center',
            }}
          >
            {/* Warning Icon */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  bgcolor: colors.background.theme,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <WarningAmber sx={{ scale:1.5, color: '#fff' }} />
              </Box>
            </Box>

            {/* Warning Text */}
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Important: Do Not Exit
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
              You are about to set up your Stripe account. <strong>Please do not close the tab that opens or navigate away</strong> during the signup process, especially while creating your email and password.
            </Typography>

            <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
              <AlertTitle>Warning</AlertTitle>
              Exiting during account creation may cause you to lose access to your account permanently. Please contact support if this happens.
            </Alert>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <MKButton
                disabled={stripeConnecting}
                color='light'
                onClick={() => setCreationWarningVisible(false)}
                sx={{ flex: 1, py: 1.5 }}
              >
                Cancel
              </MKButton>
              <MKButton
                disabled={stripeConnecting}
                color={stripeConnecting ? 'light' : 'sparelot'}
                onClick={createStripeAccountLink}
                sx={{ flex: 1, py: 1.5, fontWeight: 600 }}
              >
                {stripeConnecting ? 
                  <LoadingSpinner compact/> : 
                  <>
                    I Understand, Continue
                  </>
                }
              </MKButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </HostContentWrapper>
  );
}

export default HostEarnings;
