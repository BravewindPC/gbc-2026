"use client"
import { signOut } from 'next-auth/react';

export default function SignIn() {
    return(
        <div className='flex w-full h-[200px] justify-center items-center font-balmy'>
            <button 
                onClick={()=>
                    signOut({
                        redirect: true,
                        callbackUrl:`${window.location.origin}`
                    })
                }
                className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-lg bg-blue-500 text-templateWhite rounded hover:bg-blue-700 transition"
            >
                Sign Out
            </button>
        </div>
    )
}
