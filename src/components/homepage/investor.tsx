"use client"
import React from 'react'
import Leftbar from '../ui/Leftbar'
import Rightbar from '../ui/rightbar'
import { useState } from 'react'
import { InvestorProvider } from '../context/InvestorContext'
const Investor = () => {
    return (
        <InvestorProvider >
            <div className='min-h-screen md:h-screen flex flex-col  md:flex-row overflow-hidden'>
                <div className='w-full md:w-1/4 bg-zinc-50 h-full md:overflow-y-auto md:[&::-webkit-scrollbar]:hidden d:[-ms-overflow-style:none] md:[scrollbar-width:none]'>
                    <Leftbar />
                </div>

                <div className='w-full md:h-screen  md:overflow-y-auto'>
                    <Rightbar />
                </div>
                
            </div>
        </InvestorProvider>
    )
}

export default Investor