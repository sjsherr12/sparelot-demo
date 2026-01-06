import { Box, Icon, IconButton, InputBase, Modal, Typography } from "@mui/material";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import { Close, OpenInNew } from "@mui/icons-material";
import colors from "assets/theme/base/colors";
import MKButton from "components/MKButton";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useState } from "react";
import publish_draft from "app/backend/cloud/publish_draft";
import AdaptiveModal from "../Modal/Adaptive";
import WarnedAction from "../Options/Action";
import conditionalNavigation from "conditionalNavigation";
import { useNavigate } from "react-router-dom";

const PublishModal = ({open, onClose, draftId, disabled}) => {
    const [publishedListingStatus, setPublishedListingStatus] = useState('')
    const navigate = useNavigate();

    const publishDraft = async () => {
        if (!disabled) {
            const res = await publish_draft({draftId})
            if (res?.data?.error) {
                setPublishedListingStatus(res?.data?.message || 'Unknown error while publishing listing.')
            }
            else {
                setPublishedListingStatus(res?.data?.error ? res?.data?.message : `You have successfully published your draft! It is now viewable to other renters on SpareLot. You can always unpublish it as long as there are no pending or active reservations associated with it`)
            }
        }
        else {
            setPublishedListingStatus('You cannot publish this listing.')
        }
    }

    return (
        <WarnedAction
            color='info'
            open={open}
            onClose={() => {
                if (publishedListingStatus) {
                    conditionalNavigation(navigate, '/hosting/listings/published')
                }
                onClose();
            }}
            onClick={publishDraft}
            status={publishedListingStatus}
            warningTitle='Are you sure you want to publish your draft?'
            warningDescription='As soon as your draft is published, it will be available to all renters on SpareLot as a listing. You can always unpublish it as long as there are no pending or active reservations associated with it.'
        />
    )
}

export default PublishModal;