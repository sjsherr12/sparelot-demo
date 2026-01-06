export const isValidDate = (dateString) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateString.match(regex)) {
        return false;
    }

    // Parse the date parts to integers
    const parts = dateString.split("/");
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Check the ranges of year, month and day
    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
        return false;
    }

    const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLengths[1] = 29;
    }

    // Check the day range for the given month
    return day > 0 && day <= monthLengths[month - 1];
};

export const isValidNumber = (number) => {
    return (/^\d{3}\d{3}\d{4}$/).test(number);
}

export const isValidZipCode = (zip) => {
    return (/^\d{5}$/).test(zip);
}

export const isValidEmail = (email) => {
    return (/\S+@\S+\.\S+/).test(email);
}

export const isValidPassword = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[\x20-\x7E]{8,}$/.test(password);
}