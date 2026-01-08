"use client"
import React from 'react'
import Leftbar from '../ui/Leftbar'
import Rightbar from '../ui/rightbar'
import { useState } from 'react'
import { InvestorProvider } from '../context/InvestorContext'
import Link from 'next/link'
import ClientPage from '@/src/app/client/[id]/page'
import ClientPagePopup from '@/src/app/clientpopup/[id]/page'

// const users = [
//     { id: "user1", name: "User 1" },
//     { id: "user2", name: "User 2" },
//     { id: "user3", name: "User 3" },
// ];

const Investor = () => {
    const [openPopup, setOpenPopup] = useState(false);
    // const [selectedUser, setSelectedUser] = useState<string | null>(null);
    // const [showUserList, setShowUserList] = useState(false);

    const clientId = "user1";
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

                <div className='fixed bottom-4 right-8 flex items-end'>
                    <button
                        onClick={() => setOpenPopup(true)}
                        className="z-9999 bg-secondary p-2 rounded-full cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-white' width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.587-1.112l-3.826 1.067a1.25 1.25 0 0 1-1.54-1.54l1.068-3.823A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2m0 1.5A8.5 8.5 0 0 0 3.5 12c0 1.47.373 2.883 1.073 4.137l.15.27l-1.112 3.984l3.987-1.112l.27.15A8.5 8.5 0 1 0 12 3.5M8.75 13h4.498a.75.75 0 0 1 .102 1.493l-.102.007H8.75a.75.75 0 0 1-.102-1.493zh4.498zm0-3.5h6.505a.75.75 0 0 1 .101 1.493l-.101.007H8.75a.75.75 0 0 1-.102-1.493zh6.505z" /></svg>

                    </button>

                    <div className='z-99999'>
                        {openPopup && (
                            <ClientPagePopup
                                clientId={clientId}
                                onClose={() => setOpenPopup(false)}
                            />
                        )}
                    </div>


                </div>

                {/* <div className="fixed bottom-1 right-8 z-50  gap-2">

                    {showUserList && (
                        <div className="bg-white rounded-xl w-12 z-200 px-2">
                            {users.map((user) => (
                                <button
                                    key={user.id}
                                    className="w-full text-left px-3 py-2 my-2 space-y-2   cursor-pointer hover:bg-secondary/10 hover:rounded-2xl rounded-md text-sm"
                                    onClick={() => {
                                        setSelectedUser(user.id);
                                        setOpenPopup(true);
                                        setShowUserList(false);
                                    }}
                                >
                                    <div className='flex items-center gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 1.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5M8.75 6a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0M12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662c.629.512 1.51.877 2.7 1.117c1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117c1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836c-1.58-.888-3.711-1.414-6.025-1.414M4.75 17.5c0-.851.622-1.775 1.961-2.528c1.316-.74 3.184-1.222 5.29-1.222c2.104 0 3.972.482 5.288 1.222c1.34.753 1.961 1.677 1.961 2.528c0 1.308-.04 2.044-.724 2.6c-.37.302-.99.597-2.05.811c-1.057.214-2.502.339-4.476.339s-3.42-.125-4.476-.339c-1.06-.214-1.68-.509-2.05-.81c-.684-.557-.724-1.293-.724-2.601" clip-rule="evenodd" /></svg>
                                        {user.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="fixed bottom-4 right-8 z-50  gap-2">
                        <button
                            onClick={() => setShowUserList(!showUserList)}
                            className="bg-secondary p-2 rounded-full cursor-pointer text-white fixed bottom-4 right-8"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className='text-white' width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.587-1.112l-3.826 1.067a1.25 1.25 0 0 1-1.54-1.54l1.068-3.823A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2m0 1.5A8.5 8.5 0 0 0 3.5 12c0 1.47.373 2.883 1.073 4.137l.15.27l-1.112 3.984l3.987-1.112l.27.15A8.5 8.5 0 1 0 12 3.5M8.75 13h4.498a.75.75 0 0 1 .102 1.493l-.102.007H8.75a.75.75 0 0 1-.102-1.493zh4.498zm0-3.5h6.505a.75.75 0 0 1 .101 1.493l-.101.007H8.75a.75.75 0 0 1-.102-1.493zh6.505z" /></svg>
                        </button>
                    </div>
                </div> */}

                {/* <div className="fixed bottom-4 right-8 z-50">
                    {showUserList && (
                        <div className="bg-zinc-100 rounded-xl w-48 mb-2">
                            {users.map((user) => (
                                <button
                                    key={user.id}
                                    className="w-full text-left px-3 py-2 border-black cursor-pointer hover:bg-secondary/10 hover:rounded-2xl rounded-xl"
                                    onClick={() => {
                                        setSelectedUser(user.id);
                                        setOpenPopup(true);
                                        setShowUserList(false);
                                    }}
                                >
                                    {user.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => setShowUserList(!showUserList)}
                        className="bg-secondary p-2 rounded-full cursor-pointer text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className='text-white' width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.587-1.112l-3.826 1.067a1.25 1.25 0 0 1-1.54-1.54l1.068-3.823A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2m0 1.5A8.5 8.5 0 0 0 3.5 12c0 1.47.373 2.883 1.073 4.137l.15.27l-1.112 3.984l3.987-1.112l.27.15A8.5 8.5 0 1 0 12 3.5M8.75 13h4.498a.75.75 0 0 1 .102 1.493l-.102.007H8.75a.75.75 0 0 1-.102-1.493zh4.498zm0-3.5h6.505a.75.75 0 0 1 .101 1.493l-.101.007H8.75a.75.75 0 0 1-.102-1.493zh6.505z" /></svg>

                    </button>
                </div> */}




                {/* {openPopup && selectedUser && (
                    <ClientPagePopup
                        clientId={selectedUser}
                        onClose={() => setOpenPopup(false)}
                    />
                )} */}
            </div>
        </InvestorProvider>
    )
}

export default Investor