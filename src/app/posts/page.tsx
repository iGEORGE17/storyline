"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useEffect, useState } from 'react'



const PostCreatePage = () => {
    const { data: session } = useSession()

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [tags, setTags] = useState("")
    const [category, setCategory] = useState("")

    const [cats, setCats] = useState([])

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:3000/api/categories")
    setCats(response?.data?.categories)
  }

  useEffect(() => {
    fetchCategories()
  }, [])



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        await axios.post("http://localhost:3000/api/posts",
            {
                "title": title,
                "category": category,
                "tags": tags,
                "text": text,
                "author": session?.user?.id
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
                console.log(response);
            })
            .catch((err) => console.log(err));
        

        setTitle("")
        setCategory("")
        setTags("")
        setText("")

    }

  return (
    <section className='min-h-screen flex flex-col justify-center min-w-full'>
        <div className="mx-10"> 
            <div className="flex space-x-5">
                <div className="w-9/12 border">
                    <form className='' onSubmit={handleSubmit} method='POST'>
                        <div className="mb-3">
                            <input type="text" placeholder="Title" name="title" className="input input-bordered w-full" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <select className="select select-bordered w-full" value={category} defaultValue="Select Category"
                            onChange={(e) => setCategory(e.target.value)}
                            >
                            {
                                cats?.map((cat: string) => <option key={cat?._id} value={cat?._id}>{cat?.name}</option>)
                            }
                            </select>                        
                        </div>
                        <textarea className="textarea textarea-bordered w-full mb-3" placeholder="Write Story Here..." rows={10}
                        value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <div className="mb-3">
                            <input type="text" placeholder="Tags" className="input input-bordered w-full" 
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            />
                        </div> 
                        <button type='submit' className="btn text-bold bg-slate-400">POST</button>                                                                       
                    </form>
                </div>
                <div className="border w-1/3">
                    <h3 className="">NEW POSTS</h3>
                </div>
            </div>
        </div>
    </section>
  )
}

export default PostCreatePage