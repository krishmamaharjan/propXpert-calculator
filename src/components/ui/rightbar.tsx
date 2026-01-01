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
        <div className='px-2 md:px-12 md:mt-0'>
            {/* <div className='flex gap-4 justify-end py-4 px-4'>
                <Button text='New' primary />
                <Button text='Share' secondary />
            </div> */}

            {/* <pre className="">
                {JSON.stringify(formData, null, 2)}
            </pre> */}

            {/* <div className='flex items-center md:h-screen sticky top-0  md:fixed md:bg-white w-full pt-12 pb-4 md:z-50'> */}
            {/* <div className='flex items-center md:sticky md:top-0 md:left-0 bg-white pt-12 pb-4 md:z-50'> */}
            <div className='flex items-center
                bg-white
                py-4
                md:pt-12
                md:sticky md:top-0
                md:z-40'>
                <div
                    className={`border border-r-0 rounded-l-lg py-2 px-8 cursor-pointer ${activeTab === 'interest' ? 'bg-primary border border-primary  text-white' : 'bg-white'}`}
                    onClick={() => setActiveTab('interest')}
                >
                    Interest Only Loan
                </div>
                <div
                    className={`border border-l-0 rounded-r-lg py-2 px-8 cursor-pointer ${activeTab === 'principal' ? 'bg-secondary border border-primary text-white' : 'bg-white'}`}
                    onClick={() => setActiveTab('principal')}
                >
                    Principal & Interest Loan
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

