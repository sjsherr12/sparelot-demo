import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { useState } from "react";
import { useAlertState } from "app/sections/Alert/context";
import { deleteUser, getAuth, updatePassword } from "firebase/auth";
import colors from "assets/theme/base/colors";
import { reauth_title } from "app/sections/Modal/actions";
import { reauth_password_action } from "app/sections/Modal/actions";
import { useModal } from "app/sections/Modal/Parent/context";
import { useReauth } from "app/sections/Modal/UserAuth/Reauth/context";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Hr from "app/utils/Hr";
import { delete_account_action } from "app/sections/Modal/actions";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import BlockedUser from "./blockedUser";

// const account_security_tabs = [
//     {
//         title: 'Login',
//         Render: () => {
//             const { openModal } = useModal();
//             const { user } = useUserAuthState();
//             const { openAlert } = useAlertState();
//             const { requestReauth } = useReauth();

//             return (
//                 <>
//                     <EditField
//                         key={1}
//                         title='Password'
//                         description='Set New Password'
//                         type='password'
//                         preview='Set New Password'
//                         disclaimer='Note: Updating password requires signing in again.'
//                         onSave={async (newPass) => {
//                             try {
//                                 openModal(reauth_title, reauth_password_action)
//                                 await requestReauth();
//                                 updatePassword(user, newPass).then(() => {
//                                     openAlert('New password saved successfully.', colors.success.main)
//                                 }).catch((err) => {
//                                     openAlert(`Error saving new password: ${err.message}`, colors.error.main)
//                                 })
//                             } catch (err) {
//                                 openAlert(`Error updating Password: ${err.message}`, colors.error.main)
//                             }
//                         }}
//                     />
//                 </>
//             )
//         },
//     },
//     // {
//     //     title: 'Services',
//     //     Render: null,
//     // },
//     {
//         title:'Blocked',
//         Render: () => {
//             const { user, userImpl } = useUserAuthState();

//             return (<>
//                 <MKTypography
//                     variant='h6'
//                     sx={{
//                         my:2,
//                         fontWeight:500,
//                         fontFamily:'Montserrat, sans-serif',
//                     }}
//                 >
//                     {userImpl?.extra?.blocked?.length ? `Here, you can view all users you have blocked. You can unblock them or view their profiles.` : `You have not blocked any users. If you do, they will appear here.`}
//                 </MKTypography>

//                 {user && userImpl?.extra?.blocked?.length > 0 && userImpl?.extra?.blocked?.map((bu, idx) => (
//                     <BlockedUser
//                         blockedUserId={bu}
//                     />
//                 ))}
//             </>)
//         }
//     },
//     {
//         title: 'Account',
//         Render: () => {
//             const { openModal } = useModal();
//             const { user } = useUserAuthState();
//             const { openAlert } = useAlertState();
//             const { requestReauth } = useReauth();

//             return (
//                 <>
//                     <MKBox
//                         sx={{
//                             my:2,
//                             display:'flex',
//                             alignItems:'center',
//                             justifyContent:'left',
//                         }}
//                     >
//                         <MKBox
//                             sx={{
//                                 display:'block',
//                                 gap:2,
//                                 width:'100%',
//                             }}
//                         >
//                             <MKTypography
//                                 variant='h6'
//                                 sx={{
//                                     fontWeight:600,
//                                     fontSize:20,
//                                     fontFamily:'Montserrat, sans serif'
//                                 }}
//                             >
//                                 Account Deletion
//                             </MKTypography>
//                             <MKTypography
//                                 variant='body1'
//                                 sx={{
//                                     fontSize:18,
//                                     fontFamily:'Montserrat, sans serif'
//                                 }}
//                             >
//                                 Delete your account
//                             </MKTypography>
//                         </MKBox>

//                         <MKButton
//                             color='error'
//                             sx={{
//                                 fontFamily: 'Montserrat, sans-serif',
//                                 fontSize: '15px',
//                                 textTransform:'none',
//                                 marginLeft:'auto',
//                                 height:'fit-content',
//                                 borderRadius:'8px',
//                                 border:'none',
//                             }}
//                             onClick={async () => {
//                                 try {
//                                     openModal('Delete your Account', delete_account_action)
//                                     await requestReauth();
//                                     deleteDoc(doc(getFirestore(), 'users', user.uid)).then(() => {
//                                         deleteUser(user).then(() => {
//                                             window.location.href='/feedback'
//                                         }).catch((err) => {
//                                             openAlert(`Error deleting account: ${err.message}`, colors.error.main)
//                                         })
//                                     })
//                                 } catch (err) {
//                                     openAlert(`Error deleting account: ${err.message}`, colors.error.main)
//                                 }
//                             }}
//                         >
//                             Delete
//                         </MKButton>
//                     </MKBox>

//                     <Hr/>
//                 </>
//             )
//         },
//     },
// ]

const account_security_tabs = []
export default account_security_tabs;