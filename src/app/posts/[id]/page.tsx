"use client"
import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'

const PostDetailPage = ({params}: any) => {
    const [post, setPost] = useState([])

    const [name, setName] = useState("")
    const [text, setText] = useState("")

    const { id } = params

    const fetchPost = async() => {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`)
        console.log(response?.data)

        setPost(response.data?.post)

    }

    const handleSubmit = async (e:FormEvent) => {

    }

    useEffect(() => {
        fetchPost()
    },[id])

  return (
    <section className='min-h-screen flex flex-col justify-center min-w-full'>
        <div className="mx-20 py-20">
            {
                post ?
                (
                    <>
                        <h1 className="text-4xl text-bold">{post?.title}</h1>
                        <hr className='my-4' />
                        <div className="flex space-x-4">
                            <small>{post?.createdAt}</small>
                            <small>{post?.tags}</small>
                            <small>{post?.category?.name}</small>
                            <small>{post?.author?.name}</small>
                        </div>
                        <p className=''>{post?.text}</p>

                        <div className="">
                            <form onSubmit={handleSubmit} method='POST'>
                                   <div className="mb-3">
                                        <input type="text" placeholder="enter your name..." name="name" className="input input-bordered w-full" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea placeholder="Your comment here..." name="text" className="input input-bordered w-full" 
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        ></textarea>
                                    </div> 
                                    <div className="">
                                        <button type='submit' className='btn btn-success'>Coment</button>
                                    </div>                       
                            </form>
                        </div>
                    </>
                )
                :
                (
                    <>
                        <h1 className='text 4xl'>No Post Found!</h1>
                    </>
                )
            }
        </div>
    </section>
  )
}

export default PostDetailPage