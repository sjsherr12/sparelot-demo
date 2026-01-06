import { Close, MoreHoriz, MoreVert } from "@mui/icons-material";
import { Box, Icon, Typography } from "@mui/material";
import UserProfile from "app/pages/web/UserProfile";
import { ShareMenuItem } from "app/sections/More";
import { MoreOptionsMenu } from "app/sections/More";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import AdaptiveModal from "../Adaptive";

const use = (new Date()).getTime()

const UserProfileSheet = ({ open, onClose, userId, userData, customTitle, sideSwipeMobile, }) => (
    <AdaptiveModal
        sideSwipeMobile={sideSwipeMobile ? {
            customExtension: encodeURIComponent(`user_profile_${userId}_${customTitle}_${use}`)
        } : null}
        title={customTitle || 'User Profile'}
        open={open}
        onClose={onClose}
        sx={{
            pt:0,
            px:0,
        }}
    >
        <UserProfile 
            userIdSubstitute={userId} 
            userDataSubstitute={userData}
        />
    </AdaptiveModal>
)

export default UserProfileSheet;