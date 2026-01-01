"use client"
import React from 'react'
import Leftbar from '../ui/Leftbar'
import Rightbar from '../ui/rightbar'
import { useState } from 'react'
import { InvestorProvider } from '../context/InvestorContext'
const Investor = () => {
    // const [formData, setFormData] = useState({
    //     streetAddress: "usa",
    //     state: "nsw",
    //     postcode: "12345",
    //     propertyValue: "600000",
    //     weeklyRent: "520",

    //     income: "",
    //     taxIncome: "",

    //     loanAmount: "480000",
    //     interestRate: "6.25",
    //     loanTerm: "5",

    //     loanType: 'IO' as 'IO' | 'PI',

    //     lmi: "",
    //     stampDutyLmi: "",

    //     inspection: "700",
    //     conveyancingFees: "1800",
    //     miscellaneousCosts: "0",

    //     propertyManagementFee: "7.7",
    //     lettingFee: "",  //dropdown ma hunxa 1.1 2.2
    //     vacancyWeeks: "",  //same 0-5
    //     maintenanceCosts: "1000",
    //     councilRates: "2800",
    //     waterRates: "1000",
    //     insurance: "1500",
    //     landTax: "0",



    // });

    return (
        <InvestorProvider >
            <div className='min-h-screen md:h-screen flex flex-col  md:flex-row overflow-hidden'>
                <div className='w-full md:w-1/3 bg-zinc-50 h-full md:overflow-y-auto md:[&::-webkit-scrollbar]:hidden d:[-ms-overflow-style:none] md:[scrollbar-width:none]'>
                    <Leftbar />
                </div>

                <div className='w-full md:h-screen md:w-2/3 md:overflow-y-auto'>
                    <Rightbar />
                </div>
                
            </div>
        </InvestorProvider>
    )
}

export default Investor