const formatDateUTC = () => {
    const now = new Date(Date.now());
    
    // Define options for the date and time formatting
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    };

    // Create a formatter with the desired locale and options
    const formatter = new Intl.DateTimeFormat('en-US', options);

    // Format the date
    const formattedDate = formatter.format(now);

    // Extract the time zone abbreviation (e.g., EDT) and current time zone offset
    const timeZoneOffset = -now.getTimezoneOffset() / 60;
    const offsetStr = `UTC${timeZoneOffset >= 0 ? `+${timeZoneOffset}` : timeZoneOffset}`;

    return `${formattedDate} ${offsetStr}`;
}

export default formatDateUTC;