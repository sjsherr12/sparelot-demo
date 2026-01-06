import colors from "assets/theme/base/colors"
import { userauth_actions, userauth_title } from "../Modal/actions"

export const home_actions = [
  {
    type: "external",
    onclick: () => {window.location.href = '/hosting'},
    label: "Become a Host",
    color: 'sparelot',
    loggedIn: "Switch to Hosting",
    loggedInPage: "/hosting/operations/earnings",
  },
];


export const checkout_actions = [
  {
    type: "external",
    onclick: 'custom_impl_checkout',
    label: "Back to Listing",
    color: 'info'
  },
]

export const create_actions = [
  {
    type: "internal",
    onclick: () => window.history.back(),
    label: "Exit",
    color: 'info'
  },
]