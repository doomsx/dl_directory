import { auth, signOut, signIn } from '@/auth'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

async function Navbar() {
    const session = await auth()
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href="/" className='text-2xl font-bold'>
                    <span className='text-black'>
                        DL {" "}
                    </span>
                    <span className='text-pink-500'>
                        Directory
                    </span>
                </Link>

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
                                <Button type="submit">Logout</Button>
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
                            <Button>Login</Button>
                        </form>
                    )}
                </div>
            </nav>

        </header >
    )
}

export default Navbar
