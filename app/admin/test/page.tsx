/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react';

// Accordion component
const Accordion = ({ title, children, isOpen, onClick }) => {
  return (
  <div className="border-b border-gray-300 mb-2">
    <button className="flex justify-between w-full p-4 text-md font-bold text-dark-green focus:outline-none"
            onClick={onClick}>
      {title}
      <span>{isOpen ? '-' : '+'}</span>
    </button>
    {isOpen && <div className="p-4">{children}</div>}
  </div>
  );
};

const Page = () => {
  
  const [openSection, setOpenSection] = useState(null);

  const handleAccordionClick = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const typeOptions = ["Industrial", "Residential", "Commercial", "Service", "Retail", "Other"];
  const statusOptions = ["Completed", "Ongoing", "Terminated", "Pending"];
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  //Contract formData
  const [proposalFormData, setProposalFormData] = useState({
    customer_id: "",
    product: "",
    quotation_total: 0,
    frequency: "",
  });
  
  const [contractFormData, setContractFormData] = useState({
    customer_id: "",
    services: [],
    start_date: null,
    end_date: null,
    quotation_total: 0,
    frequency: "",
  });

  const [serviceInvoiceFormData, setServiceInvoiceFormData] = useState({
    service_id: "",
    tin: 0,
    terms: "",
    pwd_id_no: "",
    business_style: ""
  });

  const [serviceAckFormData, setServiceAckFormData] = useState({
    service_id: "",
    tin: 0,
    terms: "",
    pw_id_no: "",
    business_style: ""
  });

  const typeOptionList = typeOptions.map((type, index) =>
    <option key={index + 2} value={type}>{type}</option>
  );

  const statusOptionList = statusOptions.map((status, index) =>
    <option key={index + 1} value={status}>{status}</option>
  );

  return (
  <>
  
  {/* NOTE: Remove this and replace it with the edit button. */}
  <button className="btn" onClick={() => document.getElementById('reveal_modal').showModal()}>open modal</button>

  <dialog id="reveal_modal" className="modal w-full">
  <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
  <div className="modal-content flex items-center justify-center min-h-screen">
  <div className="modal-box w-[800px] p-6 bg-white rounded-lg shadow-lg relative z-10">

    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <Accordion  title="Customer Information" isOpen={openSection === 'customerInformation'} onClick={() => handleAccordionClick('customerInformation')}>
    <div className="flex flex-row">

      <div className="basis-8/12 pr-12">

        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
          <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>

        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Contact Person</label>
          <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>

        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Address</label>
          <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>

        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Type of Service</label>
          <select className="w-full border border-normal-green text-normal-green bg-white py-2 px-3 rounded-md hover:border-green-700 hover:shadow focus:border-green-700"
                  onChange={(e) => setTypeFilter(e.target.value)}>
            <option disabled selected>Type:</option>
            <option key={1} value="">None</option>
            {typeOptionList}
          </select>
        </div>

      </div>

      <div className="basis-4/12">

        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Status</label>
          <select className="w-full border border-normal-green bg-white py-2 px-3 text-normal-green rounded-md hover:border-green-700 hover:shadow focus:border-green-700"
                  onChange={(e) => setStatusFilter(e.target.value)}>
            <option disabled selected>Status</option>
            <option key={1} value="">None</option>
            {statusOptionList}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Type</label>
          <select className="w-full border border-normal-green text-normal-green bg-white py-2 px-3 rounded-md hover:border-green-700 hover:shadow focus:border-green-700"
                  onChange={(e) => setTypeFilter(e.target.value)}>
            <option disabled selected>Type:</option>
            <option key={1} value="">None</option>
            {typeOptionList}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Contact Number</label>
          <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>
      </div>

    </div>
    </Accordion>

    <Accordion title="Proposal Form" isOpen={openSection === 'proposalForm'} onClick={() => handleAccordionClick('proposalForm')}>

      <div className="flex flex-row">

        <div className="basis-6/12">

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

          {/* TODO: FIX TYPES */}
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Product</label>
            <select className="w-full border h-9 text-normal-green bg-white py-2 px-3 rounded-md hover:shadow">
              <option disabled selected></option>
              <option key={1} value="">None</option>
              {typeOptionList}
            </select>
          </div>

        </div>

        <div className="basis-6/12 pl-6">

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Contact Number</label>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Quotation Total</label>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

        </div>

      </div>

      <div className="mb-4">
        <label className="block text-md font-semibold text-dark-green pb-2">Frequency</label>
        <textarea className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" rows="3"></textarea>
      </div>

    </Accordion>

    <Accordion title="Contract" isOpen={openSection === 'contact'} onClick={() => handleAccordionClick('contact')}>

      <div className="mb-4">
        <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
        <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
      </div>

      <div className="flex flex-row">

        <div className="basis-6/12 pr-6">

          <p className='pb-4'>Services To Be Provided</p>
        
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="hygienicPestControl" className="mr-2" />
            <label htmlFor="hygienicPestControl">Hygienic Pest Control</label>
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" id="termiteControl" className="mr-2" />
            <label htmlFor="termiteControl">Termite Control</label>
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" id="rodentControl" className="mr-2" />
            <label htmlFor="rodentControl">Rodent Control</label>
          </div>

        </div>

        <div className="basis-6/12 pl-6">

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Date Start</label>
            <input type="date" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Date End</label>
            <input type="date" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>
          
        </div>

      </div>

      <div className="mb-4">
        <label className="block text-md font-semibold text-dark-green pb-2">Quotation Total</label>
        <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
      </div>

      <div className="mb-4">
        <label className="block text-md font-semibold text-dark-green pb-2">Frequency</label>
        <textarea className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" rows="3"
        ></textarea>
      </div>
    </Accordion>

    <Accordion title="Service Invoice" isOpen={openSection === 'serviceInvoice'} onClick={() => handleAccordionClick('serviceInvoice')}>
      
      <div className="flex flex-row mb-4">

        <div className="basis-1/2">

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">TIN</label>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">PWD ID No.</label>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

        </div>

        <div className="basis-1/2 pl-4">

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Date</label>
            <input type="date" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Terms</label>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>

        </div>

      </div>

      <div className="mb-8">
        <label className="block text-md font-semibold text-dark-green pb-2">Address</label>
        <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
      </div>

      <div className="border border-black p-4 mb-4 rounded-lg">

        <div className="flex flex-row mb-2">

          <div className="basis-3/12 pr-4">
            <div className="mb-4">
              <label className="block text-md font-semibold text-dark-green pb-2">Quantity</label>
              <input type="number" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
            </div>
          </div>

          <div className="basis-3/12 pr-4">
            <div className="mb-4">
              <label className="block text-md font-semibold text-dark-green pb-2">Unit</label>
              <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
            </div>
          </div>

          <div className="basis-6/12">
            <div className="mb-4">
              <label className="block text-md font-semibold text-dark-green pb-2">Articles</label>
              <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
            </div>
          </div>

        </div>

        <div className="flex flex-row">

          <div className="basis-1/2 pr-4">
            <div className="mb-4">
              <label className="block text-md font-semibold text-dark-green pb-2">Unit Price</label>
              <input type="number" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
            </div>
          </div>

          <div className="basis-1/2 pr-4">
            <div className="mb-4">
              <label className="block text-md font-semibold text-dark-green pb-2">Amount</label>
              <input type="number" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
            </div>
          </div>

        </div>

        <div className="flex justify-end mt-4">
          <button className="bg-light-green text-white font-semibold py-1 px-4 rounded hover:bg-dark-green-C">ADD</button>
        </div>

      </div>

    </Accordion>

    <Accordion title="Service Acknowledgement" isOpen={openSection === 'serviceAcknowledgement'} onClick={() => handleAccordionClick('serviceAcknowledgement')}>
 
      <div className="flex flex-row">

        <div className="basis-6/12">
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
          <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>
        </div>

        <div className="basis-6/12 pl-4">
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Date</label>
          <input type="date" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>
        </div>

      </div>

      <div className="mb-8">
        <label className="block text-md font-semibold text-dark-green pb-2">Address</label>
        <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
      </div>

      <div className="border border-black rounded-md p-6">

        <div className="flex flex-row">

          <div className="basis-1/2 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Time In</label>
            <input type="time" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>
          </div>

          <div className="basis-1/2 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Time Out</label>
            <input type="time" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
          </div>
          </div>

        </div>

        <div className="basis-6/12">
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Area Serviced</label>
          <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>
        </div>

        <div className="">
          <label className="block text-md font-semibold text-dark-green pb-2">Acknowledged By</label>
          <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>

        <div className="">
          <label className="block text-md font-semibold text-dark-green pb-2">Remarks</label>
          <input type="text" className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2" />
        </div>

        <div className="flex justify-end mt-4">
          <button className="bg-light-green text-white font-semibold py-1 px-4 rounded hover:bg-dark-green-C">ADD</button>
        </div>

      </div>

    </Accordion>

    <div className="flex justify-end mt-4">
      <button className="bg-light-green text-white font-semibold py-1 px-4 rounded hover:bg-dark-green-C">SAVE</button>
    </div>

    </div>
    </div>
    </dialog>
  </>
  );
};

export default Page;
