export const transactionalFee = (input) => {
    // Convert input to a number if it's a string
    const x = typeof input === 'string' ? parseFloat(input) : input;
    
    // Calculate the fee using the equation
    const percentage = 14 + (10 * (Math.exp(-0.013 * x))) - (0.012 * x)

    const fee = (percentage/100) * x;

    // Format the fee to 2 decimal places
    const formattedFee = fee.toFixed(2);

    // Return the fee in $dd.cc format
    return formattedFee
}

export const getDayPricing = (input, price) => {
    const x = typeof input === 'string' ? parseInt(input) : input; // represents # of days

    if (x <= 0) return 0;

    const percentage = ((100*(1 - (Math.pow(2, (-3 * Math.pow(x/32, 0.82)))))) + (0.38 * x) + 2.5)/100.00

    return percentage * price; // percentage of total fee to charge
}