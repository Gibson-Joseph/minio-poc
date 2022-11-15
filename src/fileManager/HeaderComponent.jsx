import React, { useState } from 'react'
import mc from '../mc'

const HeaderComponent = ({setPopup}) => {
    const createBucket=()=>{
        console.log("call create folder");
        setPopup(true)
    }
const uploadFile=()=>{
    
}
    

    // const createBkt = () => {
    //     mc.makeBucket("bucketName", 'us-east-1', function (err) {
    //         if (err) return console.log('Error creating bucket.', err)
    //         console.log('Bucket created successfully in "us-east-1".')
    //     })
    // }
    return (
        <header className=' h-28 border border-gray-400 py-5 px-3 m-2'>
            <div className='w-full flex flex-row justify-between'>
                <div className='w-1/2 flex justify-between'>
                    <button className='border border-gray-200 px-3 py-1 bg-gray-200 rounded-sm' onClick={()=>createBucket()}>New Folder</button>
                    <button className='border border-gray-200 px-3 py-1 bg-gray-200 rounded-sm' >Upload</button>
                    <span>
                        <button className='border border-gray-200 px-3 py-1 bg-red-400 rounded-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" /></svg></button>
                        <button className='border border-gray-200 px-3 py-1 bg-gray-200 rounded-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 17.586V4h-2v13.586l-6.293-6.293-1.414 1.414L12 21.414l8.707-8.707-1.414-1.414L13 17.586z" /></svg>
                        </button>
                    </span>
                    <label htmlFor="" className='border border-gray-200 px-3 py-1 bg-gray-200 rounded-sm'>Sort By
                        <select name="" id="" >
                            <option value="">Name</option>
                            <option value="">Size</option>
                        </select>
                    </label>
                    <span>
                        <button className='border border-gray-200 px-3 py-1 bg-red-400 rounded-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10 10H3V4a1 1 0 0 1 1-1h6zm11-6a1 1 0 0 0-1-1h-6v7h7zM4 21h6v-7H3v6a1 1 0 0 0 1 1zm17-1v-6h-7v7h6a1 1 0 0 0 1-1z" /></svg></button>
                        <button className='border border-gray-200 px-3 py-1 bg-gray-200 rounded-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g data-name="46-List"><path d="M25 0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 25a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5z" /><rect x="7" y="7" width="4" height="4" rx="1" ry="1" /><rect x="7" y="14" width="4" height="4" rx="1" ry="1" /><rect x="7" y="21" width="4" height="4" rx="1" ry="1" /><path d="M13 8h12v2H13zM13 15h12v2H13zM13 22h12v2H13z" /></g></svg></button>
                    </span>
                </div>
                <label htmlFor="">View Details
                    <input type="checkbox" name="" id="" className='ml-2' />
                </label>
            </div>
            <div className='w-full mt-2 flex'>
                <div className='border border-gray-200 w-1/4 flex'>
                    <input type="text" placeholder='search ...' className=' indent-3 w-full py-1' />
                </div>
                <div className='border border-gray-200 px-1'> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" data-name="49-Search" /></svg></div>
            </div>
        </header>
    )
}

export default HeaderComponent