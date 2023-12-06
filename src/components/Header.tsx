"use client"
import axios from "axios"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Header = () => {
  const { data: session } = useSession()
  const [cats, setCats] = useState([])

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:3000/api/categories")
    setCats(response?.data?.categories)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <header className="fixed min-w-full z-30">
      <div className="navbar bg-base-100 px-20">
    <div className="flex-1">
      <a className="text-2xl font-bold"><span className="text-orange-500 ">Story</span>Line</a>
    </div>
    <div className="flex-none gap-5">
      <div className="form-control">
        <input type="text" placeholder="Search by tags or categories....." className="input input-bordered w-24 lg:w-72 md:w-auto" />
      </div>

      {
        session ? 
        (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={session?.user?.image} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><a>Settings</a></li>
                <li><button onClick={() => signOut()}>Sign out</button></li>
              </ul>
            </div>        
          </>
        )
        :
        (
          <ul>
            <li>
              <button onClick={() => signIn()}>Signin</button>
            </li>
          </ul>
        )
        
      }
    </div>
    </div>
    <div className="bg-base-200 min-w-full px-20 flex justify-between items-center">
    <ul className="menu menu-vertical lg:menu-horizontal">
      {
        cats?.map((cat: string) => <li key={cat?._id}><a className="text-bold uppercase">{cat?.name}</a></li>)
      }
    </ul>
    <ul className="menu menu-vertical lg:menu-horizontal">
      <li>
        <Link href=""><FaFacebookF /></Link>
      </li>
      <li>
        <Link href=""><FaXTwitter /></Link>
      </li>
      <li>
        <Link href=""><FaYoutube /></Link>
      </li>
    </ul>
    </div>
    </header>
  )
}

export default Header