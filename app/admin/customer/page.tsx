/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import ClientRow from '@/app/components/admin/customerRow'
import CustomerForm from '@/app/components/admin/customerForm'
import DeleteCustomerModal from '@/app/components/admin/DeleteCustomerModal'
import React, { useState, useEffect } from 'react';

const Page = () => {
  const typeOptions = ["Industrial", "Residential", "Commercial", "Service", "Retail", "Other"];
  const statusOptions = ["Completed", "Ongoing", "Terminated", "Pending"];
  
  const typeOptionList = typeOptions.map((type, index) =>
    <option key={index + 2} value={type}>{type}</option>
  );

  const statusOptionList = statusOptions.map((status, index) =>
    <option key={index + 1} value={status}>{status}</option>
  );

  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [fetching, setFetching] = useState(true);
  const [customers, setCustomers] = useState([]);

  const [selectedCustomerID, setSelectedCustomerID] = useState("");
  const [customerModalOpen,       setcustomerModalOpen] =       useState(false);
  const [deleteCustomerModalOpen, setDeleteCustomerModalOpen] = useState(false);

  const printFilters = () => {
    console.log(nameFilter);
    console.log(typeFilter);
    console.log(statusFilter);
    console.log(dateFilter);
  }

  function formatDate(dateString) {
    if (!dateString) return "N/A"; 
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const handleRowClick = (customerId) => {
    console.log('Clicked customer ID:', customerId);
    alert('Clicked customer ID: ' + customerId)
  };

  useEffect(() => {
    if (fetching) {
      console.log("Fetching...");

      let filterParams = [
        nameFilter ? `name=${nameFilter}` : "",
        typeFilter ? `type=${typeFilter}` : "",
        statusFilter ? `status=${statusFilter}` : "",
        dateFilter ? `date=${dateFilter}` : ""
      ];

      filterParams = filterParams.filter(param => param !== "");
      const urlStr = (filterParams.length > 0 ? "?" : "") + filterParams.join("&")

      console.log(filterParams);
      console.log(urlStr);

      fetch(`/api/customers${urlStr}`)
      .then((response) => response.json())
      .then((data) => setCustomers(data.results))
      .catch((error) => console.error('Error fetching customers:', error));
    }

    setFetching(false);    
  }, [nameFilter, typeFilter, statusFilter, dateFilter, fetching]);

  return (
    <div className='mx-16 mt-10 pb-6'>
        {customerModalOpen && <CustomerForm onOpenModel={setcustomerModalOpen} onFetchCustomerData={setFetching} />}
        {deleteCustomerModalOpen && <DeleteCustomerModal customerID={selectedCustomerID} onOpenModel={setDeleteCustomerModalOpen} onFetchCustomerData={setFetching}/>}
        <div className='text-normal-green text-5xl italic font-bold'>Clients</div>
        <div className='flex items-center space-x-4 mt-5'>
        <svg width="22" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="7" width="16" height="2" fill="#8A9E79"/>
        <rect x="8" y="11" width="8" height="2" fill="#8A9E79"/>
        <rect x="10" y="15" width="4" height="2" fill="#8A9E79"/>
        </svg>
        <div className='flex items-center border border-normal-green rounded-md px-3 py-2 hover:border-green-700 hover:shadow-lg focus-within:border-green-700'>
            <input type="text" placeholder="Search" 
            className='border-0 focus:ring-0 focus:ring-offset-0 text-normal-green w-[236px] outline-none bg-white' 
            onChange={(e) => {
              e.stopPropagation();
              setNameFilter(e.target.value);
            }} />
            <svg className='text-normal-green w-5 h-5 mr-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4a6 6 0 100 12 6 6 0 000-12zm13 15l-7.5-4.5" />
            </svg>
        </div>
        <select 
        className='w-[169px] border border-normal-green text-normal-green bg-white py-2 px-3 rounded-md hover:border-green-700 hover:shadow focus:border-green-700'
        onChange={(e) => {
          e.stopPropagation();
          //console.log(e.target.value);
          setTypeFilter(e.target.value);
        }}>
            <option disabled selected>Type</option>
            <option key={1} value="">None</option>
            {typeOptionList}
        </select>
        <select 
        className='w-[169px] border border-normal-green bg-white py-2 px-3 text-normal-green rounded-md hover:border-green-700 hover:shadow focus:border-green-700'
        onChange={(e) => {
          e.stopPropagation();
          //console.log(e.target.value);
          setStatusFilter(e.target.value);
        }}>
            <option disabled selected>Status</option>
            <option key={1} value="">None</option>
            {statusOptionList}
        </select>
        <input type="date" 
        className='w-[224px] border border-normal-green py-2 px-3 text-normal-green rounded-md bg-white hover:border-green-700 hover:shadow focus:border-green-700' 
        onChange={(e) => {
          e.stopPropagation();
          setDateFilter(e.target.value);
        }} />
        <button 
        className='btn border-none hover:bg-yellow-700 active:bg-green-900 w-[202px] bg-light-green text-white py-2 px-5 rounded-md'
        onClick={() => {
          printFilters();
          setFetching(true);
        }}>
            Filter
        </button>
      </div>
      <div className='flex w-full flex-col mt-5'>
            <div className='w-full grid grid-cols-5 text-normal-green text-xl font-bold'>
                <div className='flex justify-center'>Client Name</div>
                <div className='flex justify-center'>Type</div>
                <div className='flex justify-center'>Status</div>
                <div className='flex justify-center w-11/12'>Created At</div>
            </div>
            <hr className='bg-normal-green h-[2px] w-full mt-3'></hr>
            {customers.map((customer) => (
              <div
                key={customer._id}
                className="cursor-pointer"
              >
                <ClientRow
                  id={customer._id}
                  name={customer.name}
                  type={customer.type}
                  status={customer.status}
                  createdAt={formatDate(customer.date)}
                  onClickDelete={() => {
                    setSelectedCustomerID(customer._id);
                    setDeleteCustomerModalOpen(true);
                  }}
                />
              </div>
            ))}
        </div>
        <div className='flex justify-end'>
            <button 
            className='btn border-none hover:bg-yellow-700  font-bold text-xl w-[201px] h-14 bg-light-green text-white mt-6 rounded-md'
            onClick={() => setcustomerModalOpen(true)}>
                + Add Client
            </button>
        </div>
    </div>
  )
}

export default Page