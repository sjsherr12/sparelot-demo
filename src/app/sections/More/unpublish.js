import { Box, Icon, IconButton, InputBase, Modal, Typography } from "@mui/material";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import { Close, OpenInNew } from "@mui/icons-material";
import colors from "assets/theme/base/colors";
import MKButton from "components/MKButton";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useState } from "react";
import unpublish_listing from "app/backend/cloud/unpublish_listing";
import AdaptiveModal from "../Modal/Adaptive";
import WarnedAction from "../Options/Action";
import conditionalNavigation from "conditionalNavigation";
import { useNavigate } from "react-router-dom";

const UnpublishModal = ({open, onClose, listingId, disabled}) => {

    const [unpublishedListingError, setUnpublishedListingError] = useState(false);
    const [unpublishedListingStatus, setUnpublishedListingStatus] = useState('')
    const navigate = useNavigate();

    const unpublishListing = async () => {
        if (!disabled) {
            const res = await unpublish_listing({
                listingId
            });
            setUnpublishedListingError(res?.data?.error)
            setUnpublishedListingStatus(res?.data?.message)
        }
        else {
            alert('You cannot unpublish this listing.')
        }
    }

    return (
        <WarnedAction
            color='info'
            open={open}
            onClose={() => {
                if (!unpublishedListingError && unpublishedListingStatus) {
                    conditionalNavigation(navigate, '/hosting/listings/unpublished')
                }
                onClose();
            }}
            onClick={unpublishListing}
            status={unpublishedListingStatus}
            warningTitle='Are you sure you want to unpublish your listing?'
            actionTitle='Unpublish'
            warningDescription={<>
                Only do this to edit minor details and republish the listing after, as your listing will be temporary unavailable to interested renters until you publish again. <span style={{display:'block', marginTop:8}}>(Note that if you already have pending or active reservations associated with this listing, you will not be able to successfully unpublish. If you are not sure, you may try by pressing 'Unpublish' below).</span>
            </>}
        />
    )
}

export default UnpublishModal;