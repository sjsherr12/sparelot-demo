const isStandalone = () => {
    const isIOSStandalone = window.navigator.standalone === true;

    // Check for Android or other platforms
    const isAndroidStandalone = window.matchMedia('(display-mode: standalone)').matches;

    return isIOSStandalone || isAndroidStandalone;
};

export default isStandalone;