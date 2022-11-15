import React, { useEffect, useState } from 'react'
import mc from '../mc'
import CreateBucket from './CreateBucket';

const GetBucket = () => {
    const [buckets, setBuckets] = useState([]);
    const [bucketName, setBucketName] = useState()
    const [listBucketObject, setListBucketObject] = useState([{ obj: "", bucketnam: "" }])
    console.log("listObject", listBucketObject);
    const [listView, setListView] = useState(false)
    const [delObjBucket, setDelObjBucket] = useState()
    const [dedlObjCall, setDelObjCall] = useState(false)

    const getBuckets = async () => {
        const res = await mc.listBuckets();
        setBuckets(res);
    };

    const deleteBkt = (delBkt) => {
        mc.removeBucket(delBkt, function (err) {
            if (err) return console.log('unable to remove bucket.', err)
            console.log('Bucket removed successfully.')
        })
    }
    const createBkt = () => {
        mc.makeBucket(bucketName, 'us-east-1', function (err) {
            if (err) return console.log('Error creating bucket.', err)
            console.log('Bucket created successfully in "us-east-1".')
        })
    }

    const listObjectsOfBucket = async (bucketName) => {
        console.log("bucketName", bucketName);
        var stream = mc.listObjects(bucketName, '', true)
        stream.on('data', function (obj) {
            setListBucketObject((prev) => {
                return [...prev, { obj: obj, bucketnam: bucketName }]
            })
            setListView(true)
            setDelObjBucket(bucketName)
        })
        stream.on('error', function (err) { console.log(err) })
    };

    const delObj = (objName, i) => {
        console.log("listBucketObject[i].bucketnam", listBucketObject[i].bucketnam);
        setDelObjCall(true)
        mc.removeObject(listBucketObject[i].bucketnam, objName, function (err) {
            if (err) {
                return console.log('Unable to remove object', err)
            }
            console.log('Removed the object')
        })
    }
    useEffect(() => {
        if (dedlObjCall) {
            console.log("listBucketObject.bucketnam",);
            listObjectsOfBucket(listBucketObject.bucketnam)
        }
    }, [delObj])

    useEffect(() => {
        getBuckets();
    }, []);

    return (
        <div>
            <h1 className='bg-slate-600'>List Bucket</h1>
            <table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>Bucket Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        buckets.map((bucket, index) => {
                            return <tr key={bucket.name}>
                                <td>{index + 1}</td>
                                <td >{bucket.name}</td>
                                <td>
                                    <button onClick={() => listObjectsOfBucket(bucket.name)}>list obj</button>
                                    <button onClick={() => deleteBkt(bucket.name)}>delete</button>

                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div>
                <h3>list obj</h3>
                {listView && <div>
                    {listBucketObject.map((val, i) => {
                        return <li key={i}>{val.obj.name} <button key={val.name} onClick={() => delObj(val.obj.name, i)}>delete</button></li>
                    })}
                </div>}
            </div>
            <div>
                <CreateBucket createBkt={createBkt} setBucketName={setBucketName} />
            </div>
        </div>
    )
}

export default GetBucket