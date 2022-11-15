import React, { useEffect, useState } from 'react'
import mc from '../mc'
const CreateBucket = ({ createBkt, setBucketName }) => {
    const [viweInput, setViweInput] = useState(false)

    const addBucket = () => {
        setViweInput(true)
    }
    // useEffect(() => {

    // }, [viweInput])

    return (
        <div>
            <h1>CreateBucket</h1>
            <button onClick={() => addBucket()}>add</button>
            {viweInput && <div>
                <input type="text" onChange={(e) => setBucketName(e.target.value)} />
                <input type="button" value="create" onClick={() => createBkt()} />
            </div>}
        </div>
    )
}

export default CreateBucket