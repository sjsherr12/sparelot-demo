function getTimeAgo(timestamp) {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInMilliseconds = now - messageDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    // Return abbreviated time format
    if (diffInSeconds < 1) {
        return 'now'
    }
    if (diffInMinutes < 1) {
        return `${diffInSeconds}s`
    }
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`; // minutes
    } else if (diffInHours < 24) {
        return `${diffInHours}h`; // hours
    } else if (diffInDays < 7) {
        return `${diffInDays}d`; // days
    } else if (diffInWeeks < 52) {
        return `${diffInWeeks}w`; // weeks
    } else if (diffInYears < 2) {
        return `${diffInYears}y`; // years
    } else {
        return `${diffInYears}y`; // years
    }
}

export default getTimeAgo;