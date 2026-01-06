import { AccountCircle, AttachMoney, Help, Home, Inventory, Shield, ShieldMoonOutlined, ShieldOutlined } from "@mui/icons-material"
import colors from "assets/theme/base/colors";

export const help_card_routes = [
  {
      icon: Help,
      title: "FAQs",
      onclick: () => {window.location.href='/help/faqs/'}
  },
  {
      icon: Home,
      title: "Hosting",
      onclick: () => {window.location.href='/help/hosting/'}
  },
  {
      icon: Inventory,
      title: "Renting",
      onclick: () => {window.location.href='/help/renting/'}
  },
  //
  {
    icon: ShieldOutlined,
    title: "Security",
    onclick: () => {window.location.href='/help/security/'}
  },
  {
    icon: AccountCircle,
    title: "Account",
    onclick: () => {window.location.href='/help/account/'}
},
{
  icon: AttachMoney,
  title: "SpareLot",
  onclick: () => {window.location.href='/help/sparelot/'}
},
  
]

export const help_actions = [
  {
    type: "internal",
    onclick: () => {window.location.href='/'},
    label: "Back to SpareLot",
    color: "info",
    background: colors.info.main,
  },
]

export const help_mobile_routes = [
  {
    name: "Back to SpareLot",
    icon: null,
    onclick: () => {window.location.href="/"},
    color: colors.background.theme
  },
];