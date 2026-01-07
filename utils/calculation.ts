export function deposit(propertyValue: number, loanAmount: number) {
    return propertyValue - loanAmount;
}

export function lvr(propertyValue: number, loanAmount: number) {
    return (loanAmount / propertyValue) * 100;
}

export function grossRent(weeklyRent: number){
    return (weeklyRent * 52);
}

export function grossYield(weeklyRent: number, propertyValue: number) {
    return (weeklyRent * 52 / propertyValue) * 100;
}

export function monthlyRepayment(loan: number, rate: number, term: number) {
    const r = rate / 100 /12;
    const n = term * 12;
    // if (type === 'IO')
    //     return loan * r;
    return (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function annualCashFlow(weeklyRent: number, monthlyRepayment: number, otherCosts: number) {
    return weeklyRent * 52 - monthlyRepayment * 12 - otherCosts;
}

// export function stampDuty(propertyValue: number) {
//     if (propertyValue <= 14000) return propertyValue * 0.0125;
//     if (propertyValue <= 30000) return 175 + (propertyValue - 14000) * 0.015;
//     if (propertyValue <= 80000) return 415 + (propertyValue - 30000) * 0.0175;
//     if (propertyValue <= 300000) return 1290 + (propertyValue - 80000) * 0.035;
//     if (propertyValue <= 1000000) return 8990 + (propertyValue - 300000) * 0.045;
//     return 38990 + (propertyValue - 1000000) * 0.055;
// }

export function stampDuty(propertyValue: number) {
    if (propertyValue <= 12000) return propertyValue * 0.01; // $0 – $12,000: $1 per $100 = 1%
    if (propertyValue <= 30000) return 120 + (propertyValue - 12000) * 0.02; // $12,001 – $30,000: $120 + $2 per $100
    if (propertyValue <= 50000) return 480 + (propertyValue - 30000) * 0.03; // $30,001 – $50,000
    if (propertyValue <= 100000) return 1080 + (propertyValue - 50000) * 0.035; // $50,001 – $100,000
    if (propertyValue <= 200000) return 2830 + (propertyValue - 100000) * 0.04; // $100,001 – $200,000
    if (propertyValue <= 250000) return 6830 + (propertyValue - 200000) * 0.0425; // $200,001 – $250,000
    if (propertyValue <= 300000) return 8955 + (propertyValue - 250000) * 0.0475; // $250,001 – $300,000
    if (propertyValue <= 500000) return 11330 + (propertyValue - 300000) * 0.05; // $300,001 – $500,000
    return 21330 + (propertyValue - 500000) * 0.055; // $500,001+ 
}


export function annualHoldingCost(
    grossRent: number, 
    propertyManagementFee: number,
    weeklyRent: number,
    lettingFee: number,
    vacancyWeeks: number,
    maintenanceCosts: number,
    councilRates: number,
    waterRates: number,
    insurance: number,
    landTax: number,
)
{
    const totalManagementCost = grossRent * (propertyManagementFee / 100);
    const totalLettingFee = weeklyRent * lettingFee;
    const vacancyLoss = weeklyRent * vacancyWeeks;
    const fixedCost = maintenanceCosts + councilRates + waterRates + insurance + landTax;

    return totalManagementCost + totalLettingFee + vacancyLoss + fixedCost;
}