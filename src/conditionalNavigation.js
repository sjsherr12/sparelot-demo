const { default: isStandalone } = require("isStandalone")

const conditionalNavigation = (navigate, url, target) => {
    if (isStandalone() && navigate) {
        navigate(url);
        window.location.reload();
    }
    else {
        if (target === '_blank') {
            window.open(url, target)
        }
        else {
            window.location.href=url
        }
    }
}

export default conditionalNavigation;