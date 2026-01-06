import Footer from "app/sections/Footer";
import Navbar from "app/sections/Navbar";
import { home_actions } from "app/sections/Navbar/actions";
import { home_mobile_routes } from "app/sections/Navbar/routes";
import { home_web_routes } from "app/sections/Navbar/routes";
import colors from "assets/theme/base/colors";
import * as c from 'const'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const WebWrapper = ({Content, actions, web_routes, mobile_routes, noFooter}) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'})
    }, [location?.pathname])
    return (
        <>
            <Navbar
                actions={actions || home_actions}
                web_routes={web_routes || home_web_routes}
                mobile_routes={mobile_routes || home_mobile_routes}
                sticky={true} // add if you want the navbar to stay with you while you scroll
                shadow={true}
                imglogo={c.company_logo_themed}
                nav_text_color={colors.background.theme}
                backgroundColor={colors.white.main}
                contained={true}
            />

            <div style={{minHeight:'calc(100dvh - 82px)'}}>
                <Content/>
            </div>

            {!noFooter && <Footer/>}
        </>
    )
}

export default WebWrapper;