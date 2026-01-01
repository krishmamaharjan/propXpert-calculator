"use client"
import React, { useState } from 'react'
// import { lvr, grossYield, monthlyRepayment, annualCashFlow, stampDuty, deposit } from '../../utils/calculation';
import { useInvestor } from '../context/InvestorContext';
import Image from 'next/image';
const Leftbar = () => {

    const [propertyOpen, setPropertyOpen] = useState(true);
    const [IncomeOpen, setIncomeOpen] = useState(true);
    const [costOpen, setCostOpen] = useState(true);
    const [acquisitionOpen, setAcquisitionOpen] = useState(true);
    const [annualHoldingOpen, setAnnualHoldingOpen] = useState(true);

    const { formData, setFormData, depositValue, stampDutyValue, totalAcquisition, lvrValue, grossYieldValue } = useInvestor();

    const toNumber = (v: string) => Number(v) || 0;

    const propertyValue = toNumber(formData.propertyValue);
    const loanAmount = toNumber(formData.loanAmount);
    const interestRate = toNumber(formData.interestRate);
    const loanTerm = toNumber(formData.loanTerm);
    const lmi = toNumber(formData.lmi);

    const statePostcodeRanges = {
        "New South Wales (NSW)": [[1000, 1999], [2000, 2599], [2619, 2899], [2921, 2999]],
        "Victoria (VIC)": [[3000, 3999], [8000, 8999]],
        "Queensland (QLD)": [[4000, 4999], [9000, 9999]],
        "South Australia (SA)": [[5000, 5799], [5800, 5999]],
        "Western Australia (WA)": [[6000, 6797], [6800, 6999]],
        "Tasmania (TAS)": [[7000, 7799]],
    };

    // const [postCodeData, setPostCodeData] = useState({ state: "", postcode: "" });
    const [error, setError] = useState("");

    const validatePostcode = (state: string, postcode: string) => {
        if (!state || !postcode) return true;

        const ranges = statePostcodeRanges[state as keyof typeof statePostcodeRanges];
        const postcodeNum = Number(postcode);

        if (!ranges) return false;

        for (let [start, end] of ranges) {
            if (postcodeNum >= start && postcodeNum <= end) return true;
        }
        return false;
    };

    const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, postcode: value });

        if (!validatePostcode(formData.state, value)) {
            setError("Postcode does not match the selected state.");
        } else {
            setError("");
        }
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, state: value });

        if (!validatePostcode(value, formData.postcode)) {
            setError("Postcode does not match the selected state.");
        } else {
            setError("");
        }
    };


    return (
        <div className='w-full h-full md:h-500 pb-4 md:pb-0'>
            <div className='py-6 px-6 bg-primary text-white md:sticky md:left-0 md:top-0 z-100'>
                <Image 
                    src="/propsWhiteLogo.webp"
                    width={100}
                    height={100}
                    alt="propexpert logo"
                />
            </div>

            <div className='px-6 pt-6 space-y-2'>
                <h1 className=' font-semibold text-xl'>Property Details</h1>
                <div className='bg-white rounded-xl'>

                    <div
                        onClick={() => setPropertyOpen(prev => !prev)}
                        className='flex items-center justify-between bg-primary text-white py-4 px-4'
                    >
                        <h1 className='text-xl'>Property Details</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6" /></svg>
                    </div>
                    {
                        (propertyOpen &&
                            <form action="" className='px-4 py-4 space-y-4'>
                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Street Address</label>
                                    <input
                                        type="text"
                                        className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={formData.streetAddress}
                                        onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                                    />
                                </div>

                                <div className='flex w-full gap-2'>
                                    <div className='w-1/2'>
                                        <label htmlFor="" className=' text-zinc-500'>State</label>
                                        <select className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.state}
                                            onChange={handleStateChange}
                                        >
                                            <option >Select State</option>
                                            {Object.keys(statePostcodeRanges).map((state) => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='w-1/2'>
                                        <label htmlFor="" className=' text-zinc-500'>Postcode</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.postcode}
                                            // onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                            onChange={handlePostcodeChange}
                                        />
                                        {error && <p className="text-red-500  mt-1">{error}</p>}

                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Property Type</label>
                                    <select className='rounded-sm border border-primary w-full py-2 px-2'>
                                        <option >Residential</option>
                                        <option >Commercial</option>
                                        <option >Land</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Property Value</label>
                                    <input
                                        type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={formData.propertyValue}
                                        onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                                    />
                                </div>

                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Weekly Rent</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.weeklyRent}
                                            onChange={(e) => setFormData({ ...formData, weeklyRent: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Gross Yield</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={grossYieldValue.toFixed(2) + '%'}
                                        />
                                        {/* <p>{grossYieldValue.toFixed(2)}%</p> */}
                                    </div>
                                </div>

                                {/* <div className='mt-6 bg-gray-50 p-4 rounded-lg space-y-2'>
                                    <p>Deposit: ${depositValue.toLocaleString()}</p>
                                    <p>LVR: {lvrValue.toFixed(2)}%</p>
                                    <p>Gross Yield: {grossYieldValue.toFixed(2)}%</p>
                                    <p>Monthly Loan Repayment: ${monthlyLoanRepayment.toLocaleString()}</p>
                                    <p>Annual Cash Flow: ${annualCashFlowValue.toLocaleString()}</p>
                                </div> */}
                            </form>
                        )
                    }


                </div>
            </div>

            <div className='px-6 pt-4 space-y-2'>
                <h1 className='font-semibold text-xl'>Income</h1>
                <div className='bg-white rounded-xl '>
                    <div className='flex items-center justify-between bg-primary text-white py-4 px-4'
                        onClick={() => setIncomeOpen(prev => !prev)}

                    >
                        <h1 className=''>Individual Income</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6" /></svg>
                    </div>

                    {(IncomeOpen &&
                        <form action="" className='px-4 py-4 space-y-4'>
                            {/* <div className='flex justify-between items-center'>
                                <p className=' pt-4'>Self-Managed Superfund</p>
                                <p>toggle</p>
                            </div> */}


                            <div>
                                <label htmlFor="" className=' text-zinc-500'>Employment Income</label>
                                <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                    value={formData.income}
                                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="" className=' text-zinc-500'>Other taxable income</label>
                                <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                    value={formData.taxIncome}
                                    onChange={(e) => setFormData({ ...formData, taxIncome: e.target.value })}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <div className='px-6 pt-4 space-y-2'>
                <h1 className=' font-semibold text-lg'>Property Costs</h1>
                <div className='bg-white rounded-xl'>
                    <div className='flex items-center justify-between bg-primary text-white py-4 px-4'
                        onClick={() => setCostOpen(prev => !prev)}
                    >
                        <h1 className=''>Funding Structure</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6" /></svg>
                    </div>
                    {
                        (costOpen &&
                            <form action="" className='px-4 py-4 space-y-4'>
                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Loan Amount</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.loanAmount}
                                            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>LVR</label>
                                        <input
                                            value={lvrValue.toFixed(2) + "%"}
                                            readOnly
                                            type="text"
                                            className='rounded-sm border border-primary w-full py-2 px-2'
                                        />

                                    </div>
                                </div>

                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Interest Rate</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.interestRate}
                                            onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                                        />

                                    </div>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Loan Term</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.loanTerm}
                                            onChange={(e) => setFormData({ ...formData, loanTerm: e.target.value })}
                                        />

                                    </div>
                                </div>

                                <hr className='my-6 text-zinc-200 ' />
                                <h1>Lenders Mortgage Insurance</h1>

                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>LMI Premium (Varies by Bank)</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={lmi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        readOnly
                                    // onChange={(e) => setFormData({ ...formData, lmi: e.target.value })}
                                    />

                                </div>
                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Additional Stamp Duty on LMI</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        // value={`$${stampDutyValue.toLocaleString()}`}
                                        readOnly
                                    // onChange={(e) => setFormData({ ...formData, stampDuty: e.target.value })}
                                    />
                                    {/* <p>${stampDutyValue.toLocaleString()}</p> */}

                                </div>
                            </form>
                        )
                    }


                </div>
            </div>

            <div className='px-6 pt-6'>
                <div className='bg-white rounded-xl'>
                    <div className='flex items-center justify-between bg-primary text-white py-4 px-4'
                        onClick={() => setAcquisitionOpen(prev => !prev)}
                    >
                        <h1 className=''>Acquisition Costs</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6" /></svg>
                    </div>
                    {
                        (acquisitionOpen &&
                            <form action="" className='px-4 py-4 space-y-4'>
                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Deposit</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={`${depositValue.toLocaleString()}`}
                                        readOnly
                                    />
                                </div>


                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Build & Pest Inspection</label>
                                    <input
                                        type="text"
                                        className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={formData.inspection}
                                        onChange={(e) => setFormData({ ...formData, inspection: e.target.value })}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Stamp Duty</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={`$${stampDutyValue.toLocaleString()}`}
                                        readOnly
                                    />
                                </div>


                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Conveyancing Fees</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={formData.conveyancingFees}
                                        onChange={(e) => setFormData({ ...formData, conveyancingFees: e.target.value })}

                                    />
                                </div>

                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Transfer Registration Fee</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={formData.transferFees}
                                        onChange={(e) => setFormData({ ...formData, transferFees: e.target.value })}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Miscellaneous costs</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={formData.miscellaneousCosts}
                                        onChange={(e) => setFormData({ ...formData, miscellaneousCosts: e.target.value })}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Total Acquisition</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={`$${(totalAcquisition).toLocaleString()}`}
                                        readOnly
                                    />
                                </div>
                            </form>
                        )
                    }


                </div>
            </div>

            <div className='px-6 pt-6 space-y-2'>
                <div className='bg-white rounded-xl'>
                    <div className='flex items-center justify-between bg-primary text-white py-4 px-4'
                        onClick={() => setAnnualHoldingOpen(prev => !prev)}
                    >
                        <h1 className=''>Annual Holding Costs</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6" /></svg>
                    </div>
                    {
                        (annualHoldingOpen &&
                            <form action="" className='px-4 py-4 space-y-4'>
                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Property Management Fee</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={formData.propertyManagementFee}
                                        onChange={(e) => setFormData({ ...formData, propertyManagementFee: e.target.value })}
                                    />
                                </div>

                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Letting Fee</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.lettingFee}
                                            onChange={(e) => setFormData({ ...formData, lettingFee: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Vacancy Period (wks)</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.vacancyWeeks}
                                            onChange={(e) => setFormData({ ...formData, vacancyWeeks: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className=' text-zinc-500'>Maintenance Costs</label>
                                    <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                        value={formData.maintenanceCosts}
                                        onChange={(e) => setFormData({ ...formData, maintenanceCosts: e.target.value })}
                                    />
                                </div>

                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Council Rates</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.councilRates}
                                            onChange={(e) => setFormData({ ...formData, councilRates: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Water Rates</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.waterRates}
                                            onChange={(e) => setFormData({ ...formData, waterRates: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Insurance</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.insurance}
                                            onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="" className=' text-zinc-500'>Land Tax</label>
                                        <input type="text" className='rounded-sm border border-primary w-full py-2 px-2'
                                            value={formData.landTax}
                                            onChange={(e) => setFormData({ ...formData, landTax: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </form>
                        )
                    }


                </div>
            </div>


        </div>
    )
}

export default Leftbar
