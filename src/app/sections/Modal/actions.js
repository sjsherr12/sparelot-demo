import SignIn from "app/sections/Modal/UserAuth/SignIn";
import SignUp from "app/sections/Modal/UserAuth/SignUp";
import ReauthComponent from "./UserAuth/Reauth";
import MKBox from "components/MKBox";
import { Typography } from "@mui/material";

export const userauth_title = "Welcome back!"

export const userauth_actions = [
    {
      title:'Welcome back!',
      component:[() => <SignIn /> , "Login"],
    },
    {
      title:'Create Account',
      component:[() => <SignUp />, "Register"],
    },
]

export const reauth_title = 'Reauthorize'

export const reauth_email_action = [
  {
    title:'Update with password',
    component:[() => <ReauthComponent description='Enter your password to authenticate this change. Once authenticated, a verification email will be sent to the new email you want to verify.'/>, ]
  }
]

export const reauth_password_action = [
  {
    title:'Update with password',
    component:[() => <ReauthComponent description='This is a sensitive change. Please enter your old password to verify it is you trying to make this change.'/>, ]
  }
]

export const delete_account_action = [
  {
    title:'Delete Account',
    component:[() => <ReauthComponent description='This is an irreversible action. Please enter your password to verify it is you trying to delete your account.'/>, ]
  }
]

export const delete_listing_action = [
  {
    title:'Delete your Listing',
    component:[() => <ReauthComponent description='This is a sensitive change. Please enter your password to verify it is you trying to delete this listing.'/>, ]
  }
]