import Image from 'next/image';
import React from 'react';

const ClientRow = ({ name, type, status, createdAt, /*onClickEdit*/ onClickDelete }) => {
  return (
    <div className='flex items-center justify-between bg-dark-green-C rounded-lg shadow-md p-4 mt-6 hover:bg-opacity-90'>
      <div className='h-24 font-bold grid grid-cols-5 text-white text-xl w-full'>
        <div className='flex justify-center items-center italic'>{name}</div>
        <div className='flex justify-center items-center'>{type}</div>
        <div className='flex justify-center items-center'>{status}</div>
        <div className='flex justify-center items-center '>{createdAt}</div>
        <div className='flex space-x-2'>
          <div className='flex gap-5 items-center'>
            <button 
            className='btn border-none hover:bg-yellow-700 w-24 bg-light-green h-10 flex items-center justify-center rounded'>
            {/*onClickEdit will be added when I focus on the edit function*/}
            <Image
                className='mr-2'
                src="/Customer/EditIcon.png"
                alt="Edit"
                width={24}
                height={24}
              />
            </button>
            <button 
            className='btn border-none hover:bg-yellow-700  w-24 bg-light-green h-10 flex items-center justify-center rounded'
            onClick={onClickDelete}>
              <Image
                  className='mr-2'
                  src="/Customer/DeleteIcon.png"
                  alt="Delete"
                  width={24}
                  height={24}
                />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientRow;