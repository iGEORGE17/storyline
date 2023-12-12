"use client"
import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'

const PostDetailPage = ({params}: any) => {
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])

    const [name, setName] = useState("")
    const [text, setText] = useState("")

    const { id } = params

    const fetchPost = async() => {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`)
        console.log(response?.data)
        setPost(response.data?.post)
    }  



    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();

            await axios.post("http://localhost:3000/api/comments", {
                "name": name,
                "text": text,
                "postId": id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                } 
            }           
            ).then((response) => {
                console.log(response);
            })
            .catch((err) => console.log(err));

            setName("")
            setText("")
        
    }

    useEffect(() => {
        fetchPost()
    },[id])

  return (
    <section className='min-h-screen flex flex-col justify-center min-w-full'>
        <div className="mx-20 py-20 flex">
            <div className="flex-1">
                {
                    post ?
                    (
                        <div>
                            <div className="mb-8">
                                <h1 className="text-4xl text-bold">{post?.title}</h1>
                                <hr className='my-4' />
                                <div className="flex space-x-4">
                                    <small>{post?.createdAt}</small>
                                    <small>{post?.tags}</small>
                                    <small>{post?.category?.name}</small>
                                    <small>{post?.author?.name}</small>
                                </div>
                                <p className=''>{post?.text}</p>
                            </div>

                            <div className="lg:w-[600px]">
                                <form onSubmit={handleSubmit} method='POST' className='border p-5 border-r-4 '>
                                    <div className="mb-3">
                                            <input type="text" placeholder="enter your name..." name="name" className="input input-bordered w-full" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <textarea placeholder="Your comment here..." name="text" className="input input-bordered w-full" 
                                            value={text} rows={8}
                                            onChange={(e) => setText(e.target.value)}
                                            ></textarea>
                                        </div> 
                                        <div className="flex justify-end">
                                            <button type='submit' className='btn btn-success text-white text-bold'>Coment</button>
                                        </div>                       
                                </form>
                            </div>

                            <ul>
                                {post.comments?.map((comment: any) => (
                                <li key={comment._id}>
                                    <p>{comment?.name}</p>
                                    <p>{comment.text}</p>
                                </li>
                                ))}
                            </ul>
    
                        </div>
                    )
                    :
                    (
                        <>
                            <h1 className='text 4xl'>No Post Found!</h1>
                        </>
                    )
                }
            </div>
            <div className='w-[400px]'>
                <h1 className="text-2xl text-bold uppercase">Similar Posts</h1>
                <hr className='my-2'/>
            </div>
        </div>
    </section>
  )
}

export default PostDetailPage