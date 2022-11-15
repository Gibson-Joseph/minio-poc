import React, { useEffect, useState } from 'react'
import mc from '../mc';
import pdfImg from "../assets/images.png"

const MainComponent = ({ listBucketObject, listObjectsOfBucket }) => {
    console.log("listBucketObject?.bucketname --- ", listBucketObject[1]?.bucketname);
    // const [listBucketObject, setListBucketObject] = useState([{ obj: "", bucketnam: "" }])
    const [singleObjData, setSingleObjData] = useState()
    const [objInfo, setObjInfo] = useState()
    // const listObjectsOfBucket = async (bucketName) => {
    //     console.log("bucketName", bucketName);
    //     var stream = mc.listObjects(bucketName, '', true)
    //     stream.on('data', function (obj) {
    //         setListBucketObject((prev) => {
    //             return [...prev, { obj: obj, bucketnam: bucketName }]
    //         })
    //     })
    //     stream.on('error', function (err) { console.log(err) })
    // };

    const [popup, setPopup] = useState(false)

    const viewMetaData = (i) => {
        console.log("i", i);
        setPopup(true)
        setObjInfo(singleObjData[i])
        console.log("objInfo", objInfo);
    }

    const removeObj = (objName) => {
        console.log("objName---", objName);
        mc.removeObject(objInfo.bucketname, objName, function (err) {
            if (err) {
                return console.log('Unable to remove object', err)
            }
            console.log('Removed the object')
        })

        listObjectsOfBucket(objInfo.bucketname)
        // var stream = mc.listObjects(bucketName, '', true)
        // stream.on('data', function (obj) {
        //     minioBuckets.push({ ...obj })
        //     console.log("obj", obj);
        //     setListBucketObject((prev) => {
        //         return [...prev, { obj: obj, bucketname: bucketName }]
        //     })
        // })
        // stream.on('error', function (err) { console.log(err) })
    }
    const closePopup = () => {
        setPopup(false)
    }
    useEffect(() => {
        setSingleObjData(listBucketObject)
        console.log("singleObjData", singleObjData);
    })
    return (
        <div className='w-full h-screen p-3 mx-3 bg-gray-50 flex'>
            <div className={`${popup ? "w-2/3" : "w-full"}`}>
                <h1 className='text-center py-2 border-b border-b-slate-400 mb-2 bg-gray-100 text-gray-600'>{listBucketObject[1]?.bucketname}</h1>
                <div className='w-full'>
                    <div className='grid grid-cols-4 gap-2'>
                        {listBucketObject.map((val, i) => {
                            return <button key={i} className='w-[80px]' onClick={() => viewMetaData(i)}>
                                <img src={pdfImg} alt="pdfImage" height={80} width={80} />
                                <li key={i} className="list-none mt-2 text-center w-full">{val.obj.name}</li>
                            </button>
                        })}
                    </div>
                </div>
            </div>
            <div className={`${popup ? "w-1/3" : "hidden"} bg-gray-100 shadow-lg rounded-lg h-full`}>
                <header className='flex justify-between border-2 border-b-red-300 px-2 py-1 rounded-t-lg w-full'>
                    <h1>File Info</h1> <button className='hover:bg-red-500 px-2' onClick={() => closePopup()}>X</button>
                </header>
                <main>
                    <div className='flex justify-center my-2'>
                        <img src={pdfImg} alt="image" height={80} width={80} />
                    </div>
                    <div className='flex flex-col '>
                        <span className='py-1 px-3 m-1'>Type : file</span>
                        <span className='py-1 px-3 m-1'>Name : {objInfo?.obj.name}</span>
                        <span className='py-1 px-3 m-1'>Size : {objInfo?.obj.size}</span>
                        <span className='py-1 px-3 m-1'>Last Modified : {objInfo?.obj.etag}</span>
                    </div>
                    <div className='mt-3 px-3'>
                        <h2 className='text-center'>Action</h2>
                        <button className='w-full border border-gray-500 hover:bg-green-600 py-1 hover:text-white rounded-lg bg-green-500'>Download</button>
                        <button className='w-full border border-gray-500 hover:bg-red-600 py-1 mt-2 hover:text-white rounded-lg bg-red-500' onClick={() => removeObj(objInfo?.obj.name)}>Delete</button>
                    </div>
                </main>
            </div>

        </div>
    )
}

export default MainComponent