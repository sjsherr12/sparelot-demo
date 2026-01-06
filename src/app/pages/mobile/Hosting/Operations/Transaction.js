import { AccountBalance, AccountBalanceOutlined, AccountBalanceWalletOutlined, AttachMoney, AttachMoneyOutlined, Autorenew, AutorenewOutlined, CalendarMonthOutlined, Cancel, CancelOutlined, CheckCircle, CheckCircleOutline, DifferenceOutlined, DocumentScannerOutlined, Error, ErrorOutlineOutlined, EventAvailableOutlined, ExitToAppOutlined, FileDownloadDoneOutlined, FileDownloadOutlined, HourglassEmpty, HourglassEmptyOutlined, LocalAtmOutlined, LogoutOutlined, MoneyOff, MoneyOffOutlined, PaidOutlined, Payment, PaymentOutlined, Receipt, ReceiptOutlined, RequestPageOutlined, SavingsOutlined, SwapHorizOutlined, SwapVertOutlined, SystemUpdateAltOutlined, TodayOutlined, TransferWithinAStation, TransferWithinAStationOutlined } from "@mui/icons-material";
import { Box, Icon, Typography } from "@mui/material";
import Hr from "app/utils/Hr";
import { transactionalFee } from "app/utils/userenv/transaction/prices";

export const TransactionTypeToInfo = {
    payment: {
        icon: FileDownloadOutlined,
        color: "#28a745" // Blue
    },
    charge: {
        icon: AttachMoneyOutlined,
        color: "#007bff" // Green
    },
    refund: {
        icon: MoneyOffOutlined,
        color: "#dc3545" // Red
    },
    adjustment: {
        icon: AutorenewOutlined,
        color: "#ffc107" // Yellow
    },
    payout: {
        icon: ExitToAppOutlined,
        color: "#6f42c1" // Purple
    },
    application_fee: {
        icon: ReceiptOutlined,
        color: "#17a2b8" // Teal
    },
    transfer: {
        icon: SwapHorizOutlined,
        color: "#fd7e14" // Orange
    }
};

export const TransactionStatusToInfo = {
    pending: {
        icon: HourglassEmpty,
        color: "#ffc107" // Yellow
    },
    available: {
        icon: CheckCircle,
        color: "#28a745" // Green
    },
    failed: {
        icon: Cancel,
        color: "#dc3545" // Red
    },
    error: {
        icon: Error,
        color: "#ff5722" // Deep Orange
    }
};

const TransactionInfoDisplay = ({
    data
}) => {
    const transactionTypeInfo = TransactionTypeToInfo[data?.type]
    const transactionStatusInfo = TransactionStatusToInfo[data?.status]
    const basicStructure = [
        {
            name: 'Paid by renter',
            icon: AccountBalanceWalletOutlined,
            text: `$${parseFloat(data?.amount).toFixed(2)}`,
        },
        {
            name: 'SpareLot fee',
            icon: ReceiptOutlined,
            text: `$${parseFloat(data?.fee).toFixed(2)}`,
        },
        {
            name: 'Net gain',
            icon: DifferenceOutlined,
            text: `$${parseFloat(data?.net).toFixed(2)}`,
        },
    ]
    const detailsStructure = [
        {
            name: 'Created',
            icon: TodayOutlined,
            text: `${(new Date(data?.created)).toLocaleDateString('en-US', {month:'short', day: 'numeric', year:'numeric'})}`
        },
        {
            name: 'Est. arrival',
            icon: EventAvailableOutlined,
            text: `${(new Date(data?.available_on*1000)).toLocaleDateString('en-US', {month:'short', day: 'numeric', year:'numeric'})}`
        },
        {
            name: 'Currency',
            icon: LocalAtmOutlined,
            text: `${String(data?.currency).toUpperCase()}`
        },
        {
            name: 'Tax category',
            icon: DocumentScannerOutlined,
            text: `${String(data?.reporting_category).capitalize()}`
        },
    ]

    const fee = transactionalFee(data?.amount)
    const feeDetailsStructure = [
        {
            name: 'Base fee',
            icon: PaidOutlined,
            text: `$${fee}`,
        },
        {
            name: 'Host fee (~4%)',
            icon: SavingsOutlined,
            text: `$${parseFloat(data?.fee - fee).toFixed(2)}`
        },
        {
            name: 'Total fee',
            icon: ReceiptOutlined,
            text: `$${data?.fee}`
        }
    ]
    const items = [
        {
            title:'Basic overview',
            items: basicStructure,
        },
        {
            title:'Transaction info',
            items: detailsStructure
        }
    ].concat(data?.type === 'payment' ? [{
        title:'SpareLot fee breakdown',
        items: feeDetailsStructure,
    }] : [])
    return (
        <Box
            sx={{
                gap:1,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                width:'100%',
            }}
        >
            <Icon
                sx={{
                    color:'#333',
                    width:150,
                    height:130,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <transactionTypeInfo.icon sx={{scale:8,}} />
            </Icon>

            <Typography
                sx={{
                    fontSize:'1rem',
                    fontWeight:500,
                    color:'#fff',
                    bgcolor:transactionTypeInfo.color,
                    borderRadius:8,
                    px:2,
                    py:.25,
                }}
            >
                {String(data?.type).capitalize()}
            </Typography>

            <Typography
                sx={{
                    fontSize:'4rem',
                    fontWeight:650,
                    color:'#000',
                }}
            >
                ${parseFloat(data?.net).toFixed(2)}
            </Typography>

            <Box
                sx={{
                    gap:2,
                    display:'flex',
                    alignItems:'center',
                }}
            >
                <Typography
                    sx={{
                        color:'#737373',
                        boxShadow:'0px 2px 6px rgba(0,0,0,.2)',
                        px:2,
                        py:1,
                        borderRadius:8,
                    }}
                >
                    <CalendarMonthOutlined sx={{color:'#ababab', mb:-.3,mr:1,}} />
                    {(new Date(data?.created)).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}
                </Typography>

                <Typography
                    sx={{
                        color:transactionStatusInfo.color,
                        boxShadow:`0px 2px 6px ${transactionStatusInfo.color}`,
                        pl:2,
                        pr:2.5,
                        py:1,
                        borderRadius:8,
                    }}
                >
                    <transactionStatusInfo.icon sx={{color:transactionStatusInfo.color, mb:-.3,mr:1,}} />
                    {String(data?.status).capitalize()}
                </Typography>
            </Box>

            <Typography
                sx={{
                    mt:1.5,
                    color:'#737373',
                    fontWeight:500,
                    fontSize:'1rem',
                }}
            >
                ID: <span style={{color:'#000',fontWeight:550,}}>{data?.id}</span>
            </Typography>

            <Hr sx={{mt:1}} />

            <Box
                sx={{
                    gap:1.5,
                    width:'100%',
                    display:'flex',
                    flexDirection:'column',
                }}
            >
                {items.map((it, idx) => (
                    <Box
                        sx={{
                            mt:2,
                            width:'100%',
                            px:2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize:'1rem',
                                fontWeight:500,
                                color:'#000',
                                ml:.5,
                                mb:1,
                            }}
                        >
                            {it.title}
                        </Typography>
                        <Box
                            sx={{
                                py:.25,
                                borderRadius:3,
                                display:'flex',
                                flexDirection:'column',
                                bgcolor:'#fff',
                                boxShadow:'0px 2px 6px rgba(0,0,0,.25)'
                            }}
                        >
                            {it.items.map((det, idx) => (
                                <Box
                                    sx={{
                                        gap:1,
                                        px:2,
                                        py:1.75,
                                        display:'flex',
                                        alignItems:'center',
                                        '&:not(:last-child)': {
                                            borderBottom:'1px solid #ededed',
                                        }
                                    }}
                                >
                                    <Icon
                                        sx={{
                                            width:20,
                                            height:24,
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            color:'#333'
                                        }}
                                    >
                                        <det.icon />
                                    </Icon>
                                    <Typography
                                        sx={{
                                            fontSize:'.875rem',
                                            fontWeight:500,
                                            color:'#333',
                                        }}
                                    >
                                        {det.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            ml:'auto',
                                            fontSize:'1rem',
                                            fontWeight:600,
                                            color:'#000',
                                        }}
                                    >
                                        {det.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default TransactionInfoDisplay;