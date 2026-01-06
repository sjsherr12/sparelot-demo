import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const AppModeContext = createContext();

export const useAppModeState = () => useContext(AppModeContext);

export const AppModeStateProvider = ({ children }) => {
    const [isHostMode, setIsHostMode] = useState(false);
    const { user, userImpl } = useUserAuthState();

    const inverseMode = async () => {
        if (user) {
            await setDoc(doc(getFirestore(), `users`, user.uid), {
                hosting: {
                    isHostMode: !userImpl?.hosting?.isHostMode
                }
            }, { merge: true });
        }
    };

    useEffect(() => {
        setIsHostMode(userImpl?.hosting?.isHostMode);

        
    }, [user, userImpl]);

    return (
        <AppModeContext.Provider value={{ isHostMode, setIsHostMode, inverseMode }}>
            {children}
        </AppModeContext.Provider>
    );
};
