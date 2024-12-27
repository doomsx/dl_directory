// import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'
import Link from 'next/link'
import React from 'react'

async function Navbar() {
    const session = await auth()
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href="/">Logo</Link>
                {/* <Image src='/logo.png' alt='' width={144} height={30} /> */}

                <div className='flex items-center gap-5'>
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server";

                                await signOut({ redirectTo: "/" });
                            }}>
                                <button type="submit">Logout</button>
                            </form>

                            <Link href={`user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server"
                            await signIn('github')
                        }}>
                            <button>Login</button>
                        </form>
                    )}
                </div>
            </nav>

        </header >
    )
}

export default Navbar
