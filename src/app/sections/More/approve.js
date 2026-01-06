import MKBox from "components/MKBox";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useState } from "react";
import colors from "assets/theme/base/colors";
import { Close } from "@mui/icons-material";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { useModal } from "../Modal/Parent/context";
import cancel_reservation from "app/backend/cloud/cancel_reservation";
import approve_reservation from "app/backend/cloud/approve_reservation";
import AdaptiveModal from "../Modal/Adaptive";
import WarnedAction from "../Options/Action";

const ApproveReservationModal = ({open, onClose, reservationId, disabled}) => {
    const [approvingStatus, setApprovingStatus] = useState(null);

    const handleApproveRequest = async () => {
        if (reservationId && !disabled) {
            const res = await approve_reservation({
                reservationId
            })
            setApprovingStatus(res?.data?.message)
        }
    }

    return (
        <WarnedAction
            color='success'
            open={open}
            onClose={() => {
                if (approvingStatus) window.location.reload();
                onClose();
            }}
            onClick={handleApproveRequest}
            status={approvingStatus}
            warningTitle={'Are you sure you want to approve this reservation?'}
            warningDescription={
                <>
                    Once this reservation is approved, the renter will be able to begin storing items with you after their requested start date.
                    <span style={{display:'block', marginTop:8}}>
                        (Note: You or the renter can cancel this reservation at any time, but it is not recommended unless absolutely necessary)
                    </span>
                </>
            }
        />
    )
}

export default ApproveReservationModal;
