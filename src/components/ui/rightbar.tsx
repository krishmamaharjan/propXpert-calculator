"use client"
import React, { useState } from 'react'
import Button from './button'
import { useInvestor } from '../context/InvestorContext';
import InterestLoan from './InterestLoan'
import PrincipalInterestLoan from './Principal_Interest_Loan'

const Rightbar = () => {
    const { formData } = useInvestor();

    const [activeTab, setActiveTab] = useState<'interest' | 'principal'>('interest');

    return (
        <div className='px-2 md:px-4 md:mt-0 '>


            {/* <pre className="">
                {JSON.stringify(formData, null, 2)}


            </pre> */}



            <div className='flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between bg-white
                py-4
                md:pt-12
                md:sticky md:top-0
                md:z-40'>

                <div className='w-full md:w-1/2'>
                    <h1 className='text-3xl font-semibold'>Property Calculator</h1>
                    <p className='text-sm'>Estimate costs, returns, cash flow, and long-term growth to understand the true performance of your property investment.</p>
                </div>
                {/* <div className='flex items-center justify-end
                bg-white
                py-4
                md:pt-7
                md:sticky md:top-0
                md:z-40'>


                    <div
                        className={`border border-r-0 rounded-l-lg py-2 px-8 cursor-pointer  ${activeTab === 'interest' ? 'bg-primary border border-primary  text-white' : 'bg-white hover:bg-primary hover:border-primary hover:text-white'}`}
                        onClick={() => setActiveTab('interest')}
                    >
                        Interest Only Loan
                    </div>
                    <div
                        className={`border border-l-0 rounded-r-lg py-2 px-8 cursor-pointer  ${activeTab === 'principal' ? 'bg-secondary border border-primary text-white' : 'bg-white hover:bg-secondary hover:border-secondary hover:text-white'}`}
                        onClick={() => setActiveTab('principal')}
                    >
                        Principal & Interest Loan
                    </div>

                </div> */}

                <div className="relative flex w-full md:w-96 rounded-xl bg-zinc-100 p-1">
                    {/* Sliding pill */}
                    <div
                        className={`absolute top-1 bottom-1 left-0 w-1/2 rounded-lg transition-transform duration-200 ease-out
                    ${activeTab === 'interest' ? 'translate-x-0 bg-primary' : 'translate-x-full bg-secondary'}
                    `}
                    />

                    {/* Buttons */}
                    <button
                        onClick={() => setActiveTab('interest')}
                        className={`relative z-10 flex-1 text-xs  md:text-sm font-medium py-2 cursor-pointer text-center ${activeTab === 'interest' ? 'text-white' : 'text-black hover:text-primary'
                            }`}
                    >
                        Interest Only Loan
                    </button>

                    <button
                        onClick={() => setActiveTab('principal')}
                        className={`relative z-10 flex-1 text-xs md:text-sm font-medium py-2 cursor-pointer text-center ${activeTab === 'principal' ? 'text-white' : 'text-black hover:text-secondary'
                            }`}
                    >
                        Principal & Interest Loan
                    </button>
                </div>



            </div>

            <div >
                {activeTab === 'interest' && <InterestLoan />}
                {activeTab === 'principal' && <PrincipalInterestLoan />}
            </div>
        </div>
    )
}

export default Rightbar

