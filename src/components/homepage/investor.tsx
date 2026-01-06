"use client"
import React from 'react'
import Leftbar from '../ui/Leftbar'
import Rightbar from '../ui/rightbar'
import { useState } from 'react'
import { InvestorProvider } from '../context/InvestorContext'
const Investor = () => {
    return (
        <InvestorProvider >
            <div className='min-h-screen md:h-screen flex flex-col gap-4 md:gap-0  md:flex-row overflow-hidden'>
                <div className='w-full md:w-1/4 bg-zinc-50 md:h-screen shrink-0'>
                    <div className='h-full overflow-auto md:[&::-webkit-scrollbar]:hidden md:[-ms-overflow-style:none] md:[scrollbar-width:none]'>
                        <Leftbar />
                    </div>
                </div>

                <div className='w-full md:h-screen  md:overflow-y-auto'>
                    <Rightbar />
                </div>
                
            </div>
        </InvestorProvider>
    )
}

export default Investor