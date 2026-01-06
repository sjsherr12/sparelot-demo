import { Icon } from "@mui/material";

import ViewDay from "@mui/icons-material/ViewDay";
import Article from "@mui/icons-material/Article";
import Dashboard from "@mui/icons-material/Dashboard";
import Login from "@mui/icons-material/Login";
import Help from "@mui/icons-material/Help";
import Logout from "@mui/icons-material/Logout";
import colors from "assets/theme/base/colors";
import { userauth_actions, userauth_title } from "../Modal/actions";
import SearchFlow from "../Modal/SearchFlow";
import { useEffect, useState } from "react";

export const launch_routes = [
  {
    name: "Home",
    icon: null,
    onclick: () => { document.getElementById("Home").scrollIntoView({behavior:"smooth", block:"start"})}
  },
  {
    name: "Benefits",
    icon: null,
    onclick: () => { document.getElementById("Benefits").scrollIntoView({behavior:"smooth", block:"start"})}
  },
  {
    name: "FAQ",
    icon: null,
    onclick: () => { document.getElementById("FAQ").scrollIntoView({behavior:"smooth", block:"start"})}
  }
];

export const home_web_routes = [
  {
    name: "Company",
    icon: null,
    onclick:null,
    color: colors.background.theme,
    
    children:
    [
      { 
        name:'About', 
        onclick: () => {window.location.href='/about/'},
      },
      { 
        name:'Press', 
        onclick: () => {window.location.href='/press/'}
      },
      { 
        name:'Partners', 
        onclick: () => {window.location.href='/partners/'}
      },
    ],
  },
  {
    name: "Resources",
    icon: null,
    onclick:null,
    color: colors.background.theme,

    children:
    [
      { 
        name:'Help Center', 
        onclick: () => {window.location.href='/help/';}
      },
      { 
        name:'Feedback', 
        onclick: () => {window.location.href='/feedback/'}
      },
      { 
        name:'FAQs', 
        onclick: () => {window.location.href='/help/faqs/'}
      },
    ],
  },
  {
    name: "Find Storage",
    icon:null,
    onclick:null,
    Renderable: ({visible}) => {
      const [renderableVisible, setRenderableVisible] = useState(visible);

      useEffect(() => {
        setRenderableVisible(visible);
      }, [visible]);

      return (
        <>
          {renderableVisible && <SearchFlow open={renderableVisible} onClose={() => setRenderableVisible(false)}/>}
        </>
      )
    }
  }
];

export const home_mobile_routes = [
  {
    name:'Hosting',
    onclick: null,
    children:
    [
      { 
        name:'Listings', 
        onclick: () => {window.location.href='/account/'}
      },
      { 
        name:'Messages', 
        onclick: () => {window.location.href='/messages/'}
      },
      { 
        name:'Become a Host', 
        onclick: () => {window.location.href='/hosting/'}
      },
    ],
  },
  {
    name:'Account',
    onclick: null,
    children:
    [
      { 
        name:'Login', 
        onclick: () => {window.location.href='/login/'}
      },
      { 
        name:'Sign up', 
        onclick: () => {window.location.href='/signup/'}
      },
      { 
        name:'My Account', 
        onclick: () => {window.location.href='/account/'}
      },
    ],
  },
  {
    name:'Company',
    icon: null,
    onclick: null,
    color: colors.background.theme,
    children:
    [
      { 
        name:'About', 
        onclick: () => {window.location.href='/about/'}
      },
      { 
        name:'Press', 
        onclick: () => {window.location.href='/press/'}
      },
      { 
        name:'Partners', 
        onclick: () => {window.location.href='/partners/'}
      },
    ],
  },
  {
    name:'Resources',
    icon: null,
    onclick: null,
    color: colors.background.theme,
    children:
    [
      { 
        name:'Help Center', 
        onclick: () => {window.location.href='/help/'}
      },
      { 
        name:'Feedback', 
        onclick: () => {window.location.href='/feedback/'}
      },
      { 
        name:'FAQs', 
        onclick: () => {window.location.href='/help/faqs/'}
      },
    ],
  },
  {
    name: "Get the App",
    icon: null,
    href: "/subscribed/",
    color: colors.background.theme
  },
  {
    name: "Find Storage",
    icon:null,
    onclick:null,
    Renderable: ({visible}) => {
      const [renderableVisible, setRenderableVisible] = useState(visible);

      useEffect(() => {
        setRenderableVisible(visible);
      }, [visible]);

      return (
        <>
          {renderableVisible && <SearchFlow open={renderableVisible} onClose={() => setRenderableVisible(false)}/>}
        </>
      )
    }
  },
  {
    name: "Become a Host",
    icon: null,
    href: "/subscribed/",
    color: colors.background.theme
  },

];