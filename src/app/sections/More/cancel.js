import MKBox from "components/MKBox";
import { useMoreOptions } from ".";
import { IconButton, Modal } from "@mui/material";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useState } from "react";
import colors from "assets/theme/base/colors";
import { Close } from "@mui/icons-material";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import cancel_reservation from "app/backend/cloud/cancel_reservation";
import WarnedAction from "../Options/Action";

const CancelReservationModal = ({open, onClose, reservationId, isRenterCancelling, disabled}) => {
    const [loading, setLoading] = useState(false);
    const [cancelStatus, setCancelStatus] = useState('');

    const handleCancelRequest = async () => {
        if (!disabled) {
            const res = await cancel_reservation({reservationId});
            setCancelStatus(res?.data?.message)
        }
        else {
            alert('You cannot cancel this reservation. Please try again later.')
        }
    }

    return (
        <WarnedAction
            color='error'
            open={open}
            onClose={onClose}
            onClick={handleCancelRequest}
            status={cancelStatus}
            warningTitle={'Are you sure you want to cancel this reservation?'}
            warningDescription={(
                isRenterCancelling

                ?

                'As a renter, cancelling your reservation is your decision. Refunds will not be provided unless a conflict arises between you and the host, or circumstances beyond your control force you to cancel (e.g., danger to you or your property). Arbitrarily cancelling a reservation disrupts the host’s schedule. Therefore, you will not receive a refund for the unused days during this period. However, you will not incur any additional charges once you cancel.'
            
                :

                'As a host, canceling an active reservation can disrupt your renter’s plans, as they have reserved your space with the expectation that it would be available. If you proceed with this cancellation, the renter will receive a partial refund for the remaining unused days of the current period, which will be deducted from your overall payout.'
                ) + ' Please consider these implications carefully. If you still wish to proceed with cancellation, please click "Cancel Reservation" below. For special circumstances, contact support at admin@sparelot.com for potential compensation. We apologize for the inconvenience and appreciate your business with SpareLot.'
            }
        />
    )
}

export default CancelReservationModal;
