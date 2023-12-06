"use client"
import SideNav from '@/components/DashbordSideNav'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
    const { data: session } = useSession()
  return (
    <section className='flex min-h-screen flex-col items-center justify-between'>
        <SideNav />
        <div className="w-full py-20 px-20">
            <div className="flex justify-between items-center shadow-sm py-10">
                <div className="">
                    <h1 className="text-2xl font-bold">Hello {session?.user?.name}</h1>
                    <small className="">Lorem ipsum dolor sit amet.</small>
                </div>
                <div className="">
                    <Link className="btn btn-primary font-bold" href="/posts">CREATE POST</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Dashboard