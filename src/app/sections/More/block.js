import { IconButton, Modal, Typography } from "@mui/material";
import MKTypography from "components/MKTypography";
import isStandalone from "isStandalone";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import { Close } from "@mui/icons-material";
import Hr from "app/utils/Hr";
import MKButton from "components/MKButton";
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useState } from "react";
import { arrayRemove, arrayUnion, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import AdaptiveModal from "../Modal/Adaptive";
import { ReservationStatus } from "app/utils/optimize/utils";
import WarnedAction from "../Options/Action";

const BlockUnblockModal = ({open, onClose, isUnblockingUser, targetUserId, disabled}) => {

    const {user, userImpl} = useUserAuthState();
    const [blockSubmittedStatus, setBlockSubmittedStatus] = useState('');

    const blockCurrentUser = async () => {
        if (user) {
            const thisUserRef = doc(getFirestore(), `users/${user.uid}`)
            const blockedUserId = targetUserId;
            
            // dont even use an extra write if user already blocked user
            if (userImpl?.extra?.blocked?.includes(blockedUserId)) {
                return 'You have already blocked this user'
            }

            try {
                const db = getFirestore();
                const reservationsRef = collection(db, 'reservations');
            
                if (!reservationsRef) {
                    console.log("Reservations collection does not exist.");
                    return;
                }
            
                const reservationsSnapshot = await reservationsRef
                    .where('renter', '==', user?.uid)
                    .where('status', '==', ReservationStatus.Approved)
                    .where('endDate', '>', (new Date()).getTime())
                    .get();
            
                if (reservationsSnapshot.empty) {
                    return;
                }
            
                for (const reservationDoc of reservationsSnapshot.docs) {
                    const reservationData = reservationDoc.data();
                    const listingId = reservationData.listing;
                    const listingDoc = await db.collection('listings').doc(listingId).get();
                    if (!listingDoc.exists) {
                        continue;
                    }
                    const listingData = listingDoc.data();
                    if (listingData.host === targetUserId) {
                        return 'You cannot block this user, as you have an active or upcoming reservation';
                    }
                }
            } catch (error) {
                console.error("Error fetching reservations or listings:", error);
            }            
            
            return setDoc(thisUserRef, {
                extra: {
                    blocked: arrayUnion(blockedUserId)
                }
            }, {merge:true})
            .then(() => '')
            .catch((err) => err.message)
        }
        return 'You must be logged in to block a user'
    }

    const unblockCurrentUser = async () => {
        if (user) {
            const thisUserRef = doc(getFirestore(), `users/${user.uid}`)
            const unblockedUserId = targetUserId;
            
            // dont even use an extra write if user already blocked user
            if (!(userImpl?.extra?.blocked?.includes(unblockedUserId))) {
                return `You don't have this user blocked`
            }
            
            return setDoc(thisUserRef, {
                extra: {
                    blocked: arrayRemove(unblockedUserId)
                }
            }, {merge:true})
            .then(() => '')
            .catch((err) => err.message)
        }
        return 'You must be logged in to unblock a user'
    }

    const handleAction = async () => {
        if (!disabled) {
            const action = isUnblockingUser ? unblockCurrentUser : blockCurrentUser;
            const res = await action();
            if (res) {
                setBlockSubmittedStatus(res + '. Click anywhere to close.')
            }
            else {
                window.location.reload();
            }
        }
        else {
            alert(`You cannot ${isUnblockingUser ? 'unblock' : 'block'} this user.`)
        }
    }

    return (
        <WarnedAction
            color={isUnblockingUser ? 'info' : 'error'}
            open={open}
            onClose={onClose}
            onClick={handleAction}
            status={blockSubmittedStatus}
            warningTitle={
                isUnblockingUser ? 'Unblock user' : 'Block user'
            }
            warningDescription={
                isUnblockingUser ?                    
                `Are you sure you want to unblock this user? If they are unblocked, they will be able to view your profile, message you, and create new reservations with you.`
                :
                `Are you sure you want to block this user? If they are blocked, they cannot view your profile, message you, or create new reservations with you.`
            }
        />
    )
}

export default BlockUnblockModal;