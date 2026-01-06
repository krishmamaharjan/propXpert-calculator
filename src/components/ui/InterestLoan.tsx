"use client"
import React, { useRef } from 'react'
import Button from './button'
import { title } from 'process'
import { useState } from 'react'
import { useInvestor } from '../context/InvestorContext';
import InterestLineChart from './charts/InterestLineChart'
import CashflowProjectionChart from './charts/InterestCashflow'
import GrowthProjectionChart from './charts/InterestGrowthProjection'
import DraggableTableWrapper from './Draggabletable'

const categories = [
    {
        title: "Key Assumptions",
        subtitle: [
            "Capital Growth Rate",
            "Rental Growth Rate",
            "Inflation Rate",
            "Employment Income",
        ]
    },
    {
        title: "Acquisition Costs",
        subtitle: [""]
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
            "Offset Amount",
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
            "Interest Saved",
            "Before Tax Cash Flow",
            "After Tax Cash FLow",
        ]
    }
]

const InterestLoan = () => {

    const tableWrapperRef = useRef<HTMLDivElement>(null);

    const { formData, setFormData, depositValue, stampDutyValue, totalAcquisition, lvrValue, grossYieldValue, grossRentValue, annualHoldingCostValue } = useInvestor();

    const loanYears = Number(formData?.loanTerm) || 0;
    const [assumptions, setAssumptions] = useState({
        capitalGrowthRate: 5,
        rentalGrowthRate: 4,
        inflationRate: 3,
        employmentIncome: 0,
        offsetAmount: 0,
        depreciation: 0
    });

    const capitalPresentEquity = Number(formData.propertyValue) - Number(formData.loanAmount);

    const handleChange = (key: keyof typeof assumptions, value: string) => {
        let numericValue = Number(value)

        if (key === "depreciation" && numericValue > 0) numericValue = 0;

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

        const interestYear =
            (Number(formData.loanAmount) - assumptions.offsetAmount) *
            Number(formData.interestRate) /
            100;

        const rentalExpensesYear =
            annualHoldingCostValue * Math.pow(1 + inflationRate, year - 1);

        const expenses =
            annualHoldingCostValue * Math.pow(1 + inflationRate, year - 1);

        const cashflow = grossRent - interestYear - expenses;

        const beforeTaxYear =
            grossRent - rentalExpensesYear - interestCharged;


        interestArr.push(interestCharged);

        totalPerformance.push(equity + beforeTaxYear);

        propertyValues.push(propertyValue);
        beforeTax.push(cashflow);
        afterTax.push(cashflow);
    });

    const COLUMN_WIDTH = 160;
    const SLIDE_COLUMNS = 4;

    const slideLeft = () => {
        tableWrapperRef.current?.scrollBy({
            left: -COLUMN_WIDTH * SLIDE_COLUMNS,
            behavior: "smooth",
        });
    };

    const slideRight = () => {
        tableWrapperRef.current?.scrollBy({
            left: COLUMN_WIDTH * SLIDE_COLUMNS,
            behavior: "smooth",
        });
    };

    return (
        <div>
            <div className='bg-background'>

                <div ref={tableWrapperRef} className="rounded-lg overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x">

                    <table className='min-w-full sticky left-0 top-0 rounded-xl'>
                        <thead className='relative bg-primary text-white'>
                            <tr>

                                <th className='sticky left-0 z-30  p-4  text-left bg-primary'>Year</th>
                                <th className='p-2 text-center bg-primary text-white'>Present</th>

                                {
                                    Array.from({ length: loanYears }, (_, i) => (
                                        <th key={i} className='p-2 min-w-40 text-center bg-primary text-white'>{i + 1}</th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((cat, index) => (
                                <React.Fragment key={index}>
                                    <tr >
                                        <td className={`text-primary font-bold min-w-40 sticky left-0 z-30 bg-white px-4 ${cat.title === "Key Assumptions" ? "pt-4" : "pt:0"}`} >
                                            {cat.title}
                                        </td>
                                    </tr>

                                    <tr className=''>
                                        <td className="p-0 sticky left-0 z-30 bg-white ">
                                            <div className="relative  py-4 pt-4  bg-white">

                                                <tr>
                                                    <div className=" space-y-0">
                                                        {cat.subtitle?.map((sub, subIndex) => (
                                                            <div
                                                                key={subIndex}
                                                                className={`
                                                                min-w-40 md:min-w-50 pl-4 flex items-center h-10 text-sm font-light
                                                                ${cat.title === "Acquisition Costs" ? "bg-transparent text-secondary -my-2" : subIndex % 2 === 0 ? "bg-zinc-200" : "bg-zinc-100"}
                                                        `}
                                                            >

                                                                {cat.title === "Acquisition Costs"
                                                                    ? `$${totalAcquisition.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                                    : sub

                                                                }

                                                            </div>
                                                        ))}
                                                    </div>
                                                </tr>

                                            </div>
                                        </td>



                                        {/* Present value */}
                                        <td className='font-light'>

                                            {cat.title === "Key Assumptions" && (
                                                <div className="flex flex-col">
                                                    {cat.subtitle?.map((_, subIndex) => (
                                                        <div
                                                            key={subIndex}
                                                            className={`
                                                h-10
                                                ${subIndex % 2 === 0 ? "bg-zinc-200" : "bg-zinc-100"}
                                            `}
                                                        />
                                                    ))}
                                                </div>
                                            )}


                                            <div>
                                                {cat.title === "Capital Growth" && (
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <p className='h-10 w-full px-10 flex items-center bg-zinc-200'>${Number(formData.propertyValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                        <p className='h-10 w-full px-10 flex items-center bg-zinc-100'>${Number(formData.loanAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                        <p className='h-10 w-full px-10 flex items-center bg-zinc-200'>${capitalPresentEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                    </div>
                                                )}

                                            </div>

                                            <div>
                                                {cat.title === "Income" && (
                                                    <div className=''>
                                                        <p className='h-10 w-full px-10 flex items-center bg-zinc-200'>${grossRentValue.toLocaleString()}</p>

                                                    </div>
                                                )}

                                            </div>

                                            {cat.title === "Cash Deduction" && (
                                                <div className="flex flex-col">
                                                    {cat.subtitle?.map((_, subIndex) => (
                                                        <div
                                                            key={subIndex}
                                                            className={`
                                                h-10
                                                ${subIndex % 2 === 0 ? "bg-zinc-200" : "bg-zinc-100"}
                                            `}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {cat.title === "Estimate" && (
                                                <div className="flex flex-col">
                                                    {cat.subtitle?.map((_, subIndex) => (
                                                        <div
                                                            key={subIndex}
                                                            className={`
                                                                h-10
                                                                ${subIndex % 2 === 0 ? "bg-zinc-200" : "bg-zinc-100"}
                                                            `}
                                                        />
                                                    ))}
                                                </div>
                                            )}



                                        </td>



                                        {/* Loan years */}
                                        {Array.from({ length: loanYears }).map((_, i) => {
                                            const year = i + 1;
                                            const capitalGrowthRate = assumptions.capitalGrowthRate / 100;
                                            const propertyValueYear = Number(formData.propertyValue) * Math.pow(1 + capitalGrowthRate, year)
                                            const loanAmount = Number(formData.loanAmount)
                                            const equity = propertyValueYear - loanAmount

                                            const rentalGrowthRate = assumptions.rentalGrowthRate / 100;
                                            const grossRentYear = grossRentValue * Math.pow(1 + rentalGrowthRate, year - 1)

                                            const effectiveLoan = Number(formData.loanAmount) - assumptions.offsetAmount
                                            const interestedCharge = effectiveLoan * Number(formData.interestRate) / 100

                                            const inflationRate = assumptions.inflationRate / 100;
                                            const rentalExpensesYear = annualHoldingCostValue * Math.pow(1 + inflationRate, year - 1)

                                            const BeforeTaxCashFlowYear = grossRentYear - rentalExpensesYear - interestedCharge;
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

                                            const totalInterestSaved = years.reduce((sum, year) => {
                                                const effectiveLoan = Number(formData.loanAmount) - assumptions.offsetAmount;
                                                const interestCharged = effectiveLoan * Number(formData.interestRate) / 100;
                                                const interestWithoutOffset = Number(formData.loanAmount) * Number(formData.interestRate) / 100;
                                                return sum + (interestWithoutOffset - interestCharged);
                                            }, 0);


                                            return (
                                                <td key={i} className={` w-24 py-2 text-center font-light `}>



                                                    {cat.title === "Key Assumptions" && (
                                                        <div className="flex flex-col">

                                                            {/* Capital Growth */}
                                                            <div className="flex items-center justify-center bg-zinc-200 h-10 px-4">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                        <span>{assumptions.capitalGrowthRate || "0.00"}%</span>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="w-full border border-secondary rounded-full text-center  bg-white text-transparent  focus:outline-none"
                                                                        value={assumptions.capitalGrowthRate}
                                                                        onChange={(e) =>
                                                                            handleChange("capitalGrowthRate", e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Rental Growth */}
                                                            <div className="py-4 flex items-center justify-center bg-zinc-100 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                        <span>{assumptions.rentalGrowthRate || "0.00"}%</span>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="w-full border border-secondary rounded-full text-center  bg-white text-transparent focus:outline-none "
                                                                        value={assumptions.rentalGrowthRate}
                                                                        onChange={(e) =>
                                                                            handleChange("rentalGrowthRate", e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Inflation */}
                                                            <div className="py-4 flex items-center justify-center bg-zinc-200 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                        <span>{assumptions.inflationRate || "0.00"}%</span>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="w-full border border-secondary rounded-full text-center  bg-white text-transparent focus:outline-none "
                                                                        value={assumptions.inflationRate}
                                                                        onChange={(e) =>
                                                                            handleChange("inflationRate", e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Employment Income */}
                                                            <div className="py-4 flex items-center justify-center bg-zinc-100 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                        <span>$</span>
                                                                        <span>
                                                                            {formData.income || assumptions.employmentIncome}
                                                                        </span>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="w-full border border-secondary rounded-full text-center  bg-white text-transparent focus:outline-none "
                                                                        onChange={(e) =>
                                                                            handleChange("employmentIncome", e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}

                                                    {/* {cat.title === "Acquisition Costs" && (
                                                        <div className="flex flex-col">
                                                            {cat.subtitle?.map((_, subIndex) => (
                                                                <div
                                                                    key={subIndex}
                                                                    className={`
                                                                h-10
                                                                ${subIndex % 2 === 0 ? "bg-zinc-200" : "bg-zinc-100"}
                                                            `}
                                                                />
                                                            ))}
                                                        </div>
                                                    )} */}


                                                    {cat.title === "Capital Growth" && (
                                                        <div className='flex flex-col items-center justify-center'>
                                                            <p className='h-10 w-full flex items-center justify-center bg-zinc-200'>${propertyValueYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                            <p className='h-10 w-full flex items-center justify-center bg-zinc-100'>${loanAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                            <p className='h-10 w-full flex items-center justify-center bg-zinc-200'>${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                        </div>
                                                    )}

                                                    {/* gross rent */}

                                                    {cat.title === "Income" && (
                                                        <div className=''>
                                                            <p className='h-10 w-full px-10 flex items-center bg-zinc-200'>${grossRentYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                                                        </div>
                                                    )}

                                                    {/* offset */}





                                                    {cat.title === "Cash Deduction" && (
                                                        <div className="flex flex-col">

                                                            <div className="flex items-center justify-center bg-zinc-200 h-10 px-4">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                        <span>$</span>
                                                                        <span>{assumptions.offsetAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}</span>

                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="w-full border border-secondary rounded-full text-center  bg-white text-transparent focus:outline-none "
                                                                        value={`${assumptions.offsetAmount}`}
                                                                        onChange={(e) => handleChange("offsetAmount", e.target.value)}
                                                                        placeholder="offsetvalue"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="py-4 flex items-center justify-center bg-zinc-100 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                        <span>{formData.interestRate + "%"}</span>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="w-full border border-secondary rounded-full text-center  bg-white text-transparent focus:outline-none "
                                                                        value={assumptions.rentalGrowthRate}
                                                                        onChange={(e) => handleChange("offsetAmount", e.target.value)}
                                                                        placeholder="OA"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="py-4 flex items-center justify-center bg-zinc-200 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        ${interestedCharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="py-4 flex items-center justify-center bg-zinc-100 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        ${rentalExpensesYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                    </div>

                                                                </div>
                                                            </div>



                                                            <div className="py-4 flex items-center justify-center bg-zinc-200 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                        <span>$</span>
                                                                        <span>
                                                                            {`${assumptions.depreciation}`}
                                                                        </span>
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        className="w-full border border-secondary rounded-full text-center  bg-white text-transparent focus:outline-none "
                                                                        value={assumptions.depreciation}
                                                                        onChange={(e) => {
                                                                            let value = Number(e.target.value);
                                                                            if (value > 0) value = 0;
                                                                            handleChange("depreciation", String(value));
                                                                        }}
                                                                        placeholder="Depreciation"
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}




                                                    {cat.title === "Estimate" && (

                                                        <div>
                                                            <div className="py-4 flex items-center justify-center bg-zinc-200 h-10 text-sm text-green-500">
                                                                <div className="relative w-24">
                                                                    <div className=" absolute inset-0 flex items-center justify-center">
                                                                        <p className='h-10 w-full flex items-center bg-zinc-200'>${estimateEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="py-4 flex items-center justify-center bg-zinc-100 h-10">
                                                                <div className="relative w-24">
                                                                    <div className=" absolute inset-0 flex items-center justify-center text-green-600 text-sm">
                                                                        <span>$</span>
                                                                        <span>
                                                                            {totalInterestSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                        </span>
                                                                        <span>
                                                                            {/* {`${assumptions.interestSaved}`} */}
                                                                        </span>
                                                                    </div>

                                                                </div>
                                                            </div>



                                                            <div className="flex items-center justify-center bg-zinc-200 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex gap-2 w-full items-center justify-center text-xs ">
                                                                        <p className={BeforeTaxCashFlowWeek < 0 ? 'text-red-600' : 'text-green-600'}>
                                                                            ${BeforeTaxCashFlowWeek.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                            <span className='text-[0.5rem]'>per week</span>
                                                                        </p>
                                                                        <p
                                                                            className={BeforeTaxCashFlowWeek < 0 ? 'text-red-600' : 'text-green-600'}
                                                                        >${BeforeTaxCashFlowYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                            <span className='text-[0.5rem]'>per year</span>
                                                                        </p>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-center bg-zinc-100 h-10">
                                                                <div className="relative w-24">
                                                                    <div className="pointer-events-none absolute inset-0 flex gap-2 w-full items-center justify-center text-xs ">
                                                                        <p className={AfterTaxCashFlowWeek < 0 ? 'text-red-600' : 'text-green-600'}>
                                                                            ${AfterTaxCashFlowWeek.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                            <span className='text-[0.5rem]'>per week</span>
                                                                        </p>
                                                                        <p
                                                                            className={AfterTaxCashFlowWeek < 0 ? 'text-red-600' : 'text-green-600'}
                                                                        >${AfterTaxCashFlowYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                            <span className='text-[0.5rem]'>per year</span>
                                                                        </p>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            {/* <div className="py-4 flex items-center justify-center bg-zinc-100 h-10">
                                                                <div className="relative w-42">
                                                                    <div className="pointer-events-none absolute inset-0 flex gap-2 items-center justify-center text-xs">
                                                                        <p className={AfterTaxCashFlowWeek < 0 ? 'text-red-600 w-full' : 'text-green-600 w-full'}>
                                                                            ${AfterTaxCashFlowWeek.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                            <span className='text-[0.5rem]'>per week</span>
                                                                        </p>
                                                                        <p
                                                                            className={AfterTaxCashFlowWeek < 0 ? 'text-red-600 w-full' : 'text-green-600 full'}
                                                                        >${AfterTaxCashFlowYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  <br />
                                                                            <span className='text-[0.5rem]'>per year</span>
                                                                        </p>
                                                                    </div>

                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    )}



                                                </td>
                                            )



                                        })}

                                        {/* {Array.from({ length: loanYears }).map((_, i) => (
                                        <td key={i}>
                                                {cat.title === "Capital Growth" && (
                                                    <div className='space-y-2'>
                                                        <p>${Number(formData.propertyValue).toLocaleString()}</p>
                                                        <p>${Number(formData.loanAmount).toLocaleString()}</p>
                                                        <p>${depositValue}</p>
                                                    </div>
                                                )}
        
                                            </td>
                                        ))} */}
                                    </tr>
                                </React.Fragment>

                            ))}
                        </tbody>

                    </table>

                </div>

                {/* <div className="flex justify-end gap-3 mb-4">
                    <button
                        onClick={slideLeft}
                        className="px-3 py-1 rounded bg-primary text-white"
                    >
                        Prev 4
                    </button>

                    <button
                        onClick={slideRight}
                        className="px-3 py-1 rounded bg-secondary text-white"
                    >
                        Next 4
                    </button>
                </div> */}


                <div className='my-20'>

                    <InterestLineChart
                        years={years}

                        beforeTax={beforeTax}
                        afterTax={afterTax}
                        interest={interestArr}
                        totalPerformance={totalPerformance}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                        <div>
                            <h3 className="text-primary font-semibold mb-2">
                                Cashflow Projections
                            </h3>
                            <CashflowProjectionChart
                                years={years}
                                beforeTax={beforeTax}
                                afterTax={afterTax}
                            />
                        </div>

                        <div>
                            <h3 className="text-primary font-semibold mb-2">
                                Growth Projections
                            </h3>
                            <GrowthProjectionChart
                                years={years}
                                capitalGrowth={propertyValues}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default InterestLoan