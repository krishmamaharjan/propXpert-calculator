"use client"
import React from 'react'
import Button from './button'
import { title } from 'process'
import { useState } from 'react'
import { useInvestor } from '../context/InvestorContext';
import PrincipalLineChart from './charts/PrincipalLineChart'
import PCashflowProjectionChart from './charts/PrincipalCashflow'
import PGrowthProjectionChart from './charts/PrincipalGrowthProjection'


const categories = [
    {
        title: "Key assumptions",
        subtitle: [
            "Capital Growth Rate",
            "Rental Growth Rate",
            "Inflation Rate",
            "Employment Income",
        ]
    },
    {
        title: "Acquisition Costs",
    },
    {
        title: "Capital Growth",
        subtitle: [
            "Property Value",
            "Loan Amount",
            "Equity"
        ]
    },
    {
        title: "Income",
        subtitle: [
            "Gross Rent"
        ]
    },
    {
        title: "Cash Deduction",
        subtitle: [
            "Principal",
            "Extra Principal Repayment",
            "Interest Rate",
            "Interest Charged",
            "Rental Expenses",
            "Depreciation"
        ]
    },
    {
        title: "Estimate",
        subtitle: [
            "Equity",
            "Before Tax Cash Flow",
            "After Tax Cash FLow",
        ]
    }
]

const PrincipalInterestLoan = () => {

    const { formData, setFormData, depositValue, stampDutyValue, totalAcquisition, lvrValue, grossYieldValue, grossRentValue, annualHoldingCostValue, monthlyRepaymentValue } = useInvestor();

    const loanYears = Number(formData?.loanTerm) || 0;
    const [assumptions, setAssumptions] = useState({
        capitalGrowthRate: 5,
        rentalGrowthRate: 4,
        inflationRate: 3,
        employmentIncome: 0,
        offsetAmount: 0,
        depreciation: 0,
        extraPrincipal: 0,
    });

    const P = Number(formData.loanAmount);
    const annualRate = Number(formData.interestRate) / 100;
    const r = annualRate / 12;
    const extraPrincipalMonthly = Number(assumptions.extraPrincipal || 0);

    let balance = P;

    const yearlyLoan: Array<{ year: number; balance: number; interestYear: number; principalYear: number, extraPrincipalYear: number }> = [];

    for (let year = 1; year <= loanYears; year++) {
        let interestYear = 0;
        let principalYear = 0;
        let extraPrincipalYear = 0;

        for (let m = 0; m < 12; m++) {
            const interestMonth = balance * r;
            const principalMonth = monthlyRepaymentValue - interestMonth;
            const extraPrincipalMonth = extraPrincipalMonthly;
            interestYear += interestMonth;
            principalYear += principalMonth;
            extraPrincipalYear += extraPrincipalMonth;

            balance -= principalMonth + extraPrincipalMonth;
        }

        yearlyLoan.push({
            year,
            balance,
            interestYear,
            principalYear,
            extraPrincipalYear,
        });
    }


    const handleChange = (key: keyof typeof assumptions, value: string) => {
        // const numericValue = Number(value.replace(/[^0-9.]/g, "")) || 0

        setAssumptions({
            ...assumptions,
            // [key]: numericValue,
            [key]: Number(value),
        });
    };

    const years = Array.from({ length: loanYears }, (_, i) => i + 1);

    const beforeTax: number[] = [];
    const afterTax: number[] = [];
    const interestArr: number[] = [];
    const totalPerformance: number[] = [];
    const propertyValues: number[] = [];

    years.forEach((year) => {
        const capitalGrowthRate = assumptions.capitalGrowthRate / 100;
        const rentalGrowthRate = assumptions.rentalGrowthRate / 100;
        const inflationRate = assumptions.inflationRate / 100;

        const propertyValue =
            Number(formData.propertyValue) *
            Math.pow(1 + capitalGrowthRate, year);

        const loanAmount = Number(formData.loanAmount);
        const equity = propertyValue - loanAmount;

        const grossRent =
            grossRentValue * Math.pow(1 + rentalGrowthRate, year - 1);

        const effectiveLoan = loanAmount - assumptions.offsetAmount;
        const interestCharged =
            effectiveLoan * Number(formData.interestRate) / 100;

        const interest =
            (Number(formData.loanAmount) - assumptions.offsetAmount) *
            Number(formData.interestRate) /
            100;

        const rentalExpensesYear =
            annualHoldingCostValue * Math.pow(1 + inflationRate, year - 1);

        const expenses =
            annualHoldingCostValue * Math.pow(1 + inflationRate, year - 1);

        const cashflow = grossRent - interest - expenses;

        const beforeTaxYear =
            grossRent - rentalExpensesYear - interestCharged;


        interestArr.push(interestCharged);

        totalPerformance.push(equity + beforeTaxYear);

        propertyValues.push(propertyValue);
        beforeTax.push(cashflow);
        afterTax.push(cashflow); // same for now
    });



    return (
        <div>
            <div className='py-12 bg-background'>
                {/* <h1 className='py-8'>Principal and Interest only Loan</h1> */}
                <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <table className='border mt-4 min-w-full'>
                        <thead className='border relative bg-secondary text-white'>
                            <tr>
                                <th className='sticky left-0 z-30 bg-secondary w-64 p-4 ml-1 text-left'>Year</th>
                                <th className='w-44 p-2 text-left bg-secondary'>Present</th>
                                {
                                    Array.from({ length: loanYears }, (_, i) => (
                                        <th key={i} className='p-2 min-w-20 text-center bg-secondary'>{i + 1}</th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((cat, index) => (
                                <tr key={index}>
                                    {/* Category & title */}
                                    {/* <td className='border p-4 sticky left-0 z-30 bg-white w-64'>
                                        <div>
                                            <span className='text-secondary font-semibold'>{cat.title}</span>
                                            {cat.subtitle?.map((sub, subIndex) => (
                                                <div key={subIndex} className='py-1'>{sub}</div>
                                            ))}
                                        </div>
                                    </td> */}

                                    {/* <td className="p-0 sticky left-0 z-30 bg-white">
                                        <div className="relative px-4 p-4 border-b bg-white">

                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-black" />
                                            <div className="absolute right-0 top-0 bottom-0 w-px bg-black" />

                                            <span className="text-primary font-bold min-w-40">
                                                {cat.title}
                                            </span>

                                            <div className="mt-6 space-y-4">
                                                {cat.subtitle?.map((sub, subIndex) => (
                                                    <div key={subIndex} className="py-1 min-w-40">
                                                        {sub}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </td> */}

                                    <td className='p-0 sticky left-0 z-30 '>
                                        <div className='relative px-4 p-4 bg-white border-b'>
                                            <div className='absolute border left-0 top-0 bottom-0 w-px bg-black'></div>
                                            <div className='absolute border right-0 top-0 bottom-0 w-px bg-black'></div>
                                            <div className='space-y-4 '>
                                                <span className='text-secondary font-bold min-w-40'>{cat.title}</span>
                                                <div className={`space-y-4 ${cat.title === "Acquisition Costs" ? "mt-0" : "mt-6"}`}>
                                                    {cat.subtitle?.map((sub, subIndex) => (
                                                        <div key={subIndex} className='py-1 min-w-40'>{sub}</div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>

                                    </td>

                                    {/* Present value */}
                                    <td className=' px-8 border-b '>
                                        {/* Acquisition cost */}
                                        {cat.title === "Acquisition Costs" && (
                                            <div className=''>
                                                ${totalAcquisition.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                        )}

                                        <div>
                                            {cat.title === "Capital Growth" && (
                                                <div className='space-y-1 flex flex-col gap-6 mt-12 items-center justify-center'>
                                                    <p>${Number(formData.propertyValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    <p>${Number(formData.loanAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    <p>${Number(formData.propertyValue) - Number(formData.loanAmount)}</p>
                                                </div>
                                            )}

                                        </div>

                                        <div>
                                            {cat.title === "Income" && (
                                                <div className='pt-12'>
                                                    <p>${grossRentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                                                </div>
                                            )}

                                        </div>


                                    </td>



                                    {/* Loan years */}
                                    {Array.from({ length: loanYears }).map((_, i) => {
                                        const year = i + 1;
                                        const capitalGrowthRate = assumptions.capitalGrowthRate / 100;
                                        const propertyValueYear = Number(formData.propertyValue) * Math.pow(1 + capitalGrowthRate, year)
                                        const loanAmount = Number(formData.loanAmount)

                                        const rentalGrowthRate = assumptions.rentalGrowthRate / 100;
                                        const grossRentYear = grossRentValue * Math.pow(1 + rentalGrowthRate, year - 1)

                                        // const effectiveLoan = Number(formData.loanAmount) - assumptions.offsetAmount
                                        // const interestedCharge = effectiveLoan * Number(formData.interestRate) / 100



                                        const loanYear = yearlyLoan[i];
                                        const remainingLoanBalance = loanYear.balance;

                                        const equity = propertyValueYear - remainingLoanBalance;

                                        const interestedCharge = remainingLoanBalance * Number(formData.interestRate);

                                        const inflationRate = assumptions.inflationRate / 100;
                                        const rentalExpensesYear = annualHoldingCostValue * Math.pow(1 + inflationRate, year - 1)

                                        const BeforeTaxCashFlowYear = grossRentYear - rentalExpensesYear - loanYear.interestYear;
                                        const BeforeTaxCashFlowWeek = BeforeTaxCashFlowYear / 52;

                                        const marginalTaxRate = 0.3;
                                        const taxableIncome = BeforeTaxCashFlowYear - assumptions.depreciation;
                                        const tax = taxableIncome > 0 ? taxableIncome * marginalTaxRate : 0;

                                        const AfterTaxCashFlowYear = BeforeTaxCashFlowYear - tax;
                                        const AfterTaxCashFlowWeek = AfterTaxCashFlowYear / 52;

                                        const purchasePrice = Number(formData.propertyValue);

                                        const previousYearValue =
                                            purchasePrice * Math.pow(1 + capitalGrowthRate, year - 1);

                                        const estimateEquity =
                                            propertyValueYear - previousYearValue;


                                        return (
                                            <td key={i} className='border w-20  text-center'>

                                                {cat.title === "Key assumptions" && (
                                                    <div className='flex flex-col gap-6 mt-12 items-center justify-center '>

                                                        <div className="relative w-24">

                                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center ">

                                                                <span>{assumptions.capitalGrowthRate || "0.00"}</span>
                                                                <span>%</span>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                className="w-full border border-blue-300 py-1 rounded-lg text-center bg-transparent text-transparent  focus:outline-none"

                                                                value={assumptions.capitalGrowthRate}
                                                                onChange={(e) => handleChange("capitalGrowthRate", e.target.value)}
                                                                placeholder="Cap Growth"
                                                            />
                                                        </div>

                                                        <div className="relative w-24">

                                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center ">

                                                                <span>{assumptions.rentalGrowthRate || "0.00"}</span>
                                                                <span>%</span>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                className="w-full border border-blue-300 py-1 rounded-lg text-center bg-transparent text-transparent  focus:outline-none"

                                                                value={assumptions.rentalGrowthRate}
                                                                onChange={(e) => handleChange("rentalGrowthRate", e.target.value)}
                                                                placeholder="Rental Growth"
                                                            />
                                                        </div>


                                                        <div className="relative w-24">

                                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center ">

                                                                <span>{assumptions.inflationRate || "0.00"}</span>
                                                                <span>%</span>
                                                            </div>

                                                            <input
                                                                type="number"
                                                                className="w-full border border-blue-300 py-1 rounded-lg text-center bg-transparent text-transparent  focus:outline-none"
                                                                value={assumptions.inflationRate}
                                                                onChange={(e) =>
                                                                    handleChange("inflationRate", e.target.value)
                                                                }
                                                                placeholder="0.00"
                                                            />
                                                        </div>


                                                        <div className="relative w-24">

                                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center ">
                                                                <span>$</span>
                                                                <span>{`${formData.income ? Number(formData.income).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : assumptions.employmentIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                                                            </div>

                                                            <input
                                                                type="number"
                                                                className="w-full border border-blue-300 py-1 rounded-lg text-center bg-transparent text-transparent  focus:outline-none"
                                                                value={`$${formData.income ? formData.income : assumptions.employmentIncome}`}
                                                                onChange={(e) =>
                                                                    handleChange("employmentIncome", e.target.value)
                                                                }
                                                                placeholder="0.00"
                                                            />
                                                        </div>

                                                    </div>
                                                )}

                                                {cat.title === "Capital Growth" && (
                                                    <div className='space-y-2 flex flex-col gap-6 mt-12 items-center justify-center'>
                                                        <p>${propertyValueYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                        {/* <p>{PrincipalLoan.toLocaleString()}</p> */}
                                                        <p>${remainingLoanBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                        {/* <p>{monthlyRepaymentValue.toLocaleString()}</p> */}
                                                        {/* <p>${remainingLoanBalance.toLocaleString()}</p> */}
                                                        <p>${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    </div>
                                                )}

                                                {/* gross rent */}

                                                {cat.title === "Income" && (
                                                    <div className='mt-12'>
                                                        <p>${grossRentYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                                                    </div>
                                                )}

                                                {/* offset */}

                                                {cat.title === "Cash Deduction" && (
                                                    <div className='flex flex-col space-y-4 mt-16  items-center justify-center'>
                                                        {/* <p>${grossRentYear.toFixed(2).toLocaleString()}</p> */}
                                                        <p>${loanYear.principalYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                                                        <p className='-mb-4'>${loanYear.extraPrincipalYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>


                                                        <div className='mt-14'>
                                                            <input
                                                                type="text"
                                                                className='w-24 border border-blue-300 rounded-lg py-1 text-center'
                                                                value={formData.interestRate + "%"}
                                                                onChange={(e) => handleChange("offsetAmount", e.target.value)}
                                                                placeholder="OA"
                                                            />
                                                        </div>

                                                        <p className=''>${interestedCharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                                                        <p className='mt-2'>${rentalExpensesYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                                                        <p></p>

                                                        <div className='px-4'>
                                                            <input
                                                                type="text"
                                                                className='w-24 border border-blue-300 rounded-lg py-1 text-center'
                                                                value={`${assumptions.depreciation}`}
                                                                onChange={(e) => handleChange("depreciation", e.target.value)}
                                                                placeholder="Depreciation"
                                                            />
                                                        </div>

                                                    </div>
                                                )}

                                                {cat.title === "Estimate" && (
                                                    <div className='px-4 flex flex-col gap-2  mt-8 items-center justify-center'>
                                                        <p>{estimateEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                                                        {/* <input
                                                            type="text"
                                                            className='w-24 border border-blue-300 rounded-lg py-1 text-center'
                                                            value={formData.interestRate + "%"}
                                                            onChange={(e) => handleChange("offsetAmount", e.target.value)}
                                                            placeholder="OA"
                                                        /> */}

                                                        {/* <p>${Equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p> */}

                                                        <div className='text-xs text-red-600 flex  gap-4'>
                                                            <p className={BeforeTaxCashFlowWeek < 0 ? 'text-red-600' : 'text-green-600'}>
                                                                ${BeforeTaxCashFlowWeek.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                per week
                                                            </p>
                                                            <p
                                                                className={BeforeTaxCashFlowWeek < 0 ? 'text-red-600' : 'text-green-600'}
                                                            >${BeforeTaxCashFlowYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                per year
                                                            </p>
                                                        </div>

                                                        <div className='text-xs text-red-600 flex  gap-4'>
                                                            <p className={AfterTaxCashFlowWeek < 0 ? 'text-red-600' : 'text-green-600'}>
                                                                ${AfterTaxCashFlowWeek.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                per week
                                                            </p>
                                                            <p
                                                                className={AfterTaxCashFlowWeek < 0 ? 'text-red-600' : 'text-green-600'}
                                                            >${AfterTaxCashFlowYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                per year
                                                            </p>
                                                        </div>

                                                        {/* <p>${interestedCharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p> */}

                                                    </div>
                                                )}
                                            </td>
                                        )



                                    })}

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className='mt-20'>
                    <PrincipalLineChart
                        years={years}
                        beforeTax={beforeTax}
                        afterTax={afterTax}
                        interest={interestArr}
                        totalPerformance={totalPerformance}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                        <div>
                            <h3 className="text-blue-500 font-semibold mb-2">
                                Cashflow Projections
                            </h3>
                            <PCashflowProjectionChart
                                years={years}
                                beforeTax={beforeTax}
                                afterTax={afterTax}
                            />
                        </div>

                        <div>
                            <h3 className="text-blue-500 font-semibold mb-2">
                                Growth Projections
                            </h3>
                            <PGrowthProjectionChart
                                years={years}
                                propertyValues={propertyValues}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default PrincipalInterestLoan