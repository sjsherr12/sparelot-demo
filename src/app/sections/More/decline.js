import MKBox from "components/MKBox";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useState } from "react";
import colors from "assets/theme/base/colors";
import { Close } from "@mui/icons-material";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import decline_reservation from "app/backend/cloud/decline_reservation";
import AdaptiveModal from "../Modal/Adaptive";
import WarnedAction from "../Options/Action";

const DeclineReservationModal = ({open, onClose, reservationId, disabled}) => {
    const [decliningStatus, setDecliningStatus] = useState(null);

    const handleDeclineRequest = async () => {
        if (reservationId && !disabled) {
            const res = await decline_reservation({
                reservationId
            });
            if (res?.data?.message) {
                setDecliningStatus(res?.data?.message)
            }
            else {
                window.location.reload();
            }
        }
    }

    return (
        <WarnedAction
            color='error'
            open={open}
            onClose={() => {
                if (decliningStatus) window.location.reload();
                onClose();
            }}
            onClick={handleDeclineRequest}
            status={decliningStatus}
            warningTitle={'Are you sure you want to decline this reservation?'}
            warningDescription={'Once this reservation is declined, it cannot be approved later. The renter will have to fill out a new reservation request if they want to request this listing later.'}
        />
    )
}

export default DeclineReservationModal;