import React, { useState } from 'react';
import GetBucket from './componenets/GetBucket';
import CreateBucket from './componenets/CreateBucket';
import HeaderComponent from './fileManager/HeaderComponent';
import MenuItem from './fileManager/MenuItem';
import MainComponent from './fileManager/MainComponent';
import mc from './mc';

function App() {

  const [popup, setPopup] = useState(false)
  console.log("popup", popup);
  const createBucket = () => {
    setPopup(true)
  }

  const createBkt = () => {
    mc.makeBucket("bucketName", 'us-east-1', function (err) {
      if (err) return console.log('Error creating bucket.', err)
      console.log('Bucket created successfully in "us-east-1".')
    })
  }

  return (
    <div className="relative">
      <div>
        {/* <GetBucket /> */}
        <HeaderComponent setPopup={setPopup} />
        <div className='w-full h-screen flex'>
          <MenuItem />
          {/* <MainComponent /> */}
        </div>
      </div>

      {popup && <div className='absolute bg-white top-[50%] right-[25%] w-2/6 h-[120px] duration-75 ease-in-out transition-all transform flex flex-col justify-center px-6 shadow-lg rounded'>
        <h1 className='text-center'>Create a New Folder</h1>
        <input type="text" className='border border-gray-500 my-1 p-1 indent-3' placeholder='Enter Your FolderName ...' />
        <div className='w-1/2 my-1 '>
          <button className='border border-gray-500 px-4 py-1 hover:bg-green-600 hover:text-white rounded'>Create</button>
          <button className='border border-gray-500 px-4 py-1 hover:bg-red-600 hover:text-white float-right rounded' onClick={setPopup(false)}>Cancel</button>
        </div>
      </div>}

    </div>
  );
}

export default App;
