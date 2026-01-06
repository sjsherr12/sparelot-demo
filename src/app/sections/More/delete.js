import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useMoreOptions } from ".";
import { useState } from "react";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";
import colors from "assets/theme/base/colors";
import { Close } from "@mui/icons-material";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import delete_listing from "app/backend/cloud/delete_listing";
import AdaptiveModal from "../Modal/Adaptive";
import WarnedAction from "../Options/Action";
import { useNavigate } from "react-router-dom";
import conditionalNavigation from "conditionalNavigation";

const { Modal, IconButton, Box, Typography } = require("@mui/material");

const DeleteModal = ({open, onClose, draftId, listingId, disabled}) => {
    const [loading, setLoading] = useState(false);
    const [deletedListingStatus, setDeletedListingStatus] = useState('')
    const navigate = useNavigate();

    const typeThatIsBeingDeleted = draftId ? 'draft' : 'listing'

    const delete_draft = async () => {
        const draft_ref = doc(getFirestore(), `/drafts/${draftId}`);
        await deleteDoc(draft_ref);
    }

    const deleteContent = async () => {
        if (!disabled) {
            const deleteFunction = typeThatIsBeingDeleted === 'draft' ? delete_draft : delete_listing;
            const res = await deleteFunction({listingId})
            if (res?.data?.error) {
                setDeletedListingStatus(res?.data?.message)
            }
            else {
                conditionalNavigation(navigate, typeThatIsBeingDeleted==='draft'?'/hosting/listings/unpublished':'/hosting/listings/published')
            }
        }
        else {
            setDeletedListingStatus(`You cannot delete this ${typeThatIsBeingDeleted}`)
        }
    }

    return (
        <WarnedAction
            color='error'
            open={open}
            onClose={onClose}
            onClick={deleteContent}
            status={deletedListingStatus}
            warningTitle={`Are you sure you want to delete your ${typeThatIsBeingDeleted}?`}
            warningDescription={typeThatIsBeingDeleted === 'draft' ? `Deleting your draft is an irreversible action. You will not be able to recover it if you delete it. However, you can always create new drafts or listings.` : `Deleting your listing means cancelling all active reservations and declining all pending reservation requests associated with it. Please notify current renters and requesting renters of your decision to delete your listing, so they are not confused by this action. Please consider these implications carefully. If you still wish to proceed with deletion, please click "Delete Listing" below. We appreciate your business with SpareLot.`}
        />
    )
}

export default DeleteModal;