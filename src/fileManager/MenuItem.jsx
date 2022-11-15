import React, { useEffect, useState } from 'react'
import mc from '../mc'
import MainComponent from './MainComponent';

const MenuItem = () => {
    const [buckets, setBuckets] = useState([]);
    const [rotatSvg, setRotateSvg] = useState("")
    const [listBucketObject, setListBucketObject] = useState([{ obj: "", bucketname: "" }])
    console.log("listBucketObject", listBucketObject);
    let minioBuckets = []
    console.log("minioBuckets", minioBuckets);

    const getBuckets = async () => {
        const res = await mc.listBuckets();
        setBuckets(res);
    };

    const listObjectsOfBucket = async (bucketName) => {
        setListBucketObject([{ obj: "", bucketname: "" }])
        setRotateSvg(bucketName)
        console.log("bucketName", bucketName);
        var stream = mc.listObjects(bucketName, '', true)
        stream.on('data', function (obj) {
            minioBuckets.push({ ...obj })
            console.log("obj", obj);
            setListBucketObject((prev) => {
                return [...prev, { obj: obj, bucketname: bucketName }]
            })
        })
        stream.on('error', function (err) { console.log(err) })
    };


    // const bucketHandleClick = (index) => {
    // }

    useEffect(() => {
        if (listBucketObject) {
            // listObjectsOfBucket()
        }
    }, [listBucketObject])

    useEffect(() => {
        getBuckets();
    }, []);

    return (
        <div className='w-full h-screen flex'>
            <div className='w-1/5 h-screen bg-gray-200 overflow-hidden flex flex-col'>
                <div className='flex justify-between px-3 py-1 border border-b-slate-400 border-b-2'>
                    <h3>Folder</h3>
                    <button>
                        <svg className='float-right' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg>
                    </button>
                </div>
                <div className='w-full'>
                    {
                        buckets.map((bucket, index) => {
                            return <span className=''>
                                <button key={bucket.name} onClick={() => listObjectsOfBucket(bucket.name)} className='bg-slate-200 w-full buttonst-none py-2 px-3 hover:bg-slate-100 flex focus:bg-red-400 focus:text-white' >
                                    <span>
                                        <svg className={rotatSvg === bucket.name ? "rotate-90 duration-75" : undefined} xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg>
                                    </span> {bucket.name}
                                    {/* <span className=''>
                                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 7a1 1 0 0 1 1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 1 1 2 0v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a1 1 0 0 1 1-1z" fill="#000" /><path fill-rule="evenodd" clip-rule="evenodd" d="M10 8a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zM14 8a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zM4 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zM8 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1z" fill="#000" /></svg>
                                    </span> */}
                                </button>
                            </span>
                        })
                    }
                </div>
            </div>
            <div className='w-full h-screen'>
                <MainComponent listBucketObject={listBucketObject} listObjectsOfBucket={listObjectsOfBucket} />
            </div>
        </div>
    )
}

export default MenuItem