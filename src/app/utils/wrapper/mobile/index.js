import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { useAppModeState } from "app/pages/mobile/Hosting/context";
import MobileHeader from "app/sections/Header/Mobile";
import FooterOptions from "app/sections/Options/Footer";
import { footer_option_routes_renter, footer_option_routes_host } from "app/sections/Options/routes";
import { FOOTER_HEIGHT } from "app/utils/optimize/utils";
import MKBox from "components/MKBox";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MobileWrapper = ({title, Content, noFooter, noBack, customBack}) => {
    const {user} = useUserAuthState();
    const {isHostMode} = useAppModeState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'})
    }, [location?.pathname])

    useEffect(() => {
        const navEntry = performance.getEntriesByType('navigation')[0];
        const isReload = navEntry?.type === 'reload';
    
        if (isHostMode && (!isReload || user)) {
            navigate('/hosting/operations/earnings');
        }
    }, [isHostMode, user]);
    
    return (
        <div style={{height:'100dvh', overflow:'hidden'}}>
            {/* { title && <MobileHeader header={title} noBack={true} customBack={customBack || null}/>} */}

            <div
                style={{
                    width:'100%',
                    minHeight:`calc(100dvh - ${noFooter ? 0 : FOOTER_HEIGHT}px)`,
                    maxHeight:`calc(100dvh - ${noFooter ? 0 : FOOTER_HEIGHT}px)`,
                    overflow:'auto',
                }}
            >
                <Content/>
            </div>

            {!noFooter &&
                <FooterOptions
                    tabs={isHostMode ? footer_option_routes_host : footer_option_routes_renter}
                />
            }
        </div>
    )
}

export default MobileWrapper;