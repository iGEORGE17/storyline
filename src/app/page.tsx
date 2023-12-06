"use client"
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LiaCommentSolid } from "react-icons/lia";
import { VscEye } from "react-icons/vsc";

export default function Home() {
  const [posts, setPosts] = useState([])

  const fetchPosts = async() => {
    const response = await axios.get("http://localhost:3000/api/posts")
    console.log(response?.data)
    setPosts(response?.data?.posts)    
  }

  useEffect(() => {
    fetchPosts()
  },[])

  return (
    <section className="flex min-h-screen flex-col items-center justify-between">
      <div className="mx-10 py-20">
        <div className="flex justify-between items-center space-x-5">
          <div className="flex-1">
            <div className="carousel w-full">
              <div id="slide1" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">❮</a> 
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide2" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a> 
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide3" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a> 
                  <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide4" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">❮</a> 
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>            
          </div>
          <div className="">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>            
          </div>
        </div>

        <hr className='my-10' />

        <div className="lg:flex lg:flex-wrap">
        {
          posts ? 
          (
            posts.map((post): any => {
              return (
          <div className="card card-compact w-[450px] bg-base-100 shadow-xl border-r-0 mb-3 mr-3" key={post?._id}>
            <figure><img src="https://img.chelseafc.com/image/upload/f_auto,c_fill,ar_16:9,q_90/video/2019/09/28/190928_CFC_v_Brighton_HLTS_SQUARE.jpg" alt="Shoes" /></figure>
            <div className="card-body">
              <h4 className="card-title text-sm"><Link href={`/posts/${post?._id}`}>{post?.title}</Link></h4>
              {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, cum? 
                Fuga iusto explicabo eius non eaque, velit perspiciatis nihil saepe.</p> */}
              <div className="card-actions justify-between">
                <p className=' text-gray-400'>#{post?.tags}</p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex items-center justify-center space-x-1">
                    <LiaCommentSolid className="text-xl"/><span className="text-sm">22</span>                      
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-gray-400">
                    <VscEye className="text-sm"/><span className="text-sm">33.5k</span>                      
                  </div>                  
                </div>
              </div>
            </div>
          </div>                
              )
            })
          )
          :
          (<>
            <h1 className='text-3xl'>No Posts available!!</h1>
          </>)
        }                   
        </div>
      </div>
    </section>
  )
}
