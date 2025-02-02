import { auth } from '@/auth'
import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    const session = await auth()

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })

    if (!user) {
        return notFound()
    }
    return (
        <div>UserPage</div>
    )
}

export default UserPage
