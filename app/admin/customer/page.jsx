/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect } from 'react';
import ClientRow from '@/app/components/admin/customerRow';
import CustomerForm from '@/app/components/admin/customerForm';
import Image from 'next/image';

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
const extractTimeForInput = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const Accordion = ({ title, children, isOpen, onClick, isAddButtonVisible }) => {
  return (
    
    <div className="border-b border-gray-300 mb-2">
      <button className="flex justify-between w-full p-4 text-md font-bold text-dark-green focus:outline-none" onClick={onClick}>
        {title}
        <span>
          {isAddButtonVisible && !isOpen ? (<button className="bg-light-green text-white font-semibold py-1 px-4 rounded hover:bg-dark-green-C" onClick={onClick}>ADD</button>) : (isOpen ? '-' : '+')}</span>
      </button>
          {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};
const DetailModal = ({ isOpen, onClose, customerData, refetchTrigger, loading, setLoading, setFetching }) => {
  const [openSection, setOpenSection] = useState('customerInformation');
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [isEditingContract, setIsEditingContract] = useState(false);
  const [isEditingInvoice, setIsEditingInvoice] = useState(false);
  const [isEditingAcknowledgement, setIsEditingAcknowledgement] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, section: null });

  const servicesList = [
    { id: 'Hygienic Pest Control', label: 'Hygienic Pest Control' },
    { id: 'Termite Control', label: 'Termite Control' },
    { id: 'Rodent Control', label: 'Rodent Control' },
  ];
  
  function convertTo12HourFormat(time24) {
    const [hourString, minuteString] = time24.split(':');
    const hour = parseInt(hourString, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${minuteString} ${period}`;
  }

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      setOpenSection('customerInformation');
    }
  }, [isOpen]);
  // Dis to keep track of input values
  const [customerFields, setCustomerFields] = useState({
    name: '',
    contact_person: '',
    address: '',
    type: '',
    status: '',
    contact_number: '',
    services: []
  });

  console.log(customerFields.services)
  const [proposalFields, setProposalFields] = useState({
    product: '',
    frequency: '',
    quotation_total: ''
  });

  const [contractFields, setContractFields] = useState({
    services: '',
    start_date: '',
    end_date: '',
    frequency: '',
    quotation_total: ''
  });

  const [invoiceFields, setInvoiceFields] = useState({
    tin: '',
    pwd_id_no: '',
    terms: ''
  });

  const [acknowledgementFields, setAcknowledgementFields] = useState({
    date: '',
    servicedAreas: [],
  });

  const fetchProposalForCustomer = async (customerId) => {
    try {
      const response = await fetch(`/api/customers/proposals/${customerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok && data.proposals && data.proposals.length > 0) {
        setProposalFields(data.proposals[0]);
      } else {
        setProposalFields({
          product: '',
          frequency: '',
          quotation_total: ''
        });
        console.error('No proposals found for this customer');
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    }
  };

  const deleteProposalForCustomer = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/customers/proposals/${customerData._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        setOpenSection('customerInformation');
        fetchProposalForCustomer(customerData._id)
        console.log('Proposals deleted successfully:', data);
      } else {
        console.error('Failed to delete proposals:', data.message);
      }
    } catch (error) {
      console.error('Error deleting proposal:', error);
    }
    setLoading(false)
  };

  const fetchContractforCustomer = async (customerId) => {
    try {
      const response = await fetch(`/api/customers/contracts/${customerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok && data.contracts && data.contracts.length > 0) {
        setContractFields(data.contracts[0]);
      } else {
        setContractFields({
          services: '',
          start_date: '',
          end_date: '',
          quotation_total: '',
          frequency: '',
        });
        console.error('No contracts found for this customer');
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    }
  };

  const deleteContractForCustomer = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/customers/contracts/${customerData._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        setOpenSection('customerInformation');
        fetchContractforCustomer(customerData._id)
        console.log('Contract deleted successfully:', data);
      } else {
        console.error('Failed to delete Contract:', data.message);
      }
    } catch (error) {
      console.error('Error deleting Contract:', error);
    }
    setLoading(false)
  };
  const deleteInvoicesForCustomer = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/customers/invoices/${customerData._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Invoices deleted successfully:', data);
        setOpenSection('customerInformation');
        fetchInvoiceForCustomer(customerData._id);
      } else {
        console.error('Failed to delete invoices:', data.message);
      }
    } catch (error) {
      console.error('Error deleting invoices:', error);
    }
    setLoading(false)
  };

  const fetchArticlesForInvoice = async (siId) => {
    try {
      const response = await fetch(`/api/customers/invoices/articles/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ si_id: siId })
      });
      const data = await response.json();
      if (response.ok && data.articles) {
        return data.articles;
      } else {
        console.error('No articles found for this invoice');
        return [];
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  };

  const fetchInvoiceForCustomer = async (customerId) => {
    try {
      const response = await fetch(`/api/customers/invoices/${customerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok && data.invoices && data.invoices.length > 0) {
        const invoiceData = data.invoices[0];
        const articles = await fetchArticlesForInvoice(invoiceData._id);

        setInvoiceFields({
          ...invoiceData,
          date: new Date(invoiceData.date), 
          articles: articles
        });
      } else {
        setInvoiceFields({
          clientName: '',
          tin: '',
          pwd_id_no: '',
          date: '',
          terms: '',
          address: '',
          quantity: '',
          unit: '',
          articles: [],
          unitPrice: '',
          amount: '',
        });
        console.error('No invoices found for this customer');
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };
  
  const handleAddArticle = () => {
    setInvoiceFields((prevState) => ({
      ...prevState,
      articles: [
        ...prevState.articles,
        { quantity: '', unit: '', article_name: '', unit_price: '', amount: '' },
      ],
    }));
  };

  const handleRemoveArticle = (index) => {
    setInvoiceFields((prevState) => {
      const articles = [...prevState.articles];
      articles.splice(index, 1); 
      return { ...prevState, articles };
    });
  };

  const isArticleEmpty = (article) => {
    return (
      !article.quantity ||
      !article.unit ||
      !article.article_name ||
      !article.unit_price ||
      !article.amount
    );
  };
  const handleArticleChange = (e, index) => {
    const { name, value } = e.target;
    setInvoiceFields((prevState) => {
      const articles = [...prevState.articles];
      articles[index] = {
        ...articles[index],
        [name]: value,
      };
      return { ...prevState, articles };
    });
  };

  const fetchServicedAreasForAcknowledgement = async (acknowledgementId) => {
    try {
      const response = await fetch(`/api/customers/acknowledgements/servicedArea/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sa_id: acknowledgementId }),
      });
      const data = await response.json();
      if (response.ok && data.servicedAreas) {
        setAcknowledgementFields((prevState) => ({
          ...prevState,
          servicedAreas: data.servicedAreas,
        }));
      } else {
        console.error('No serviced areas found');
      }
    } catch (error) {
      console.error('Error fetching serviced areas:', error);
    }
  };

  const handleAcknowledgementChange = (e, index) => {
    const { name, value } = e.target;
    setAcknowledgementFields((prevState) => {
      const servicedAreas = [...prevState.servicedAreas];
      servicedAreas[index] = {
        ...servicedAreas[index],
        [name]: value,
      };
      return { ...prevState, servicedAreas };
    });
  };

  const handleAddServicedArea = () => {
    setAcknowledgementFields((prevState) => ({
      ...prevState,
      servicedAreas: [
        ...prevState.servicedAreas,
        { area_name: '', time_in: '', time_out: '', acknowledged_by: '', remarks: '' },
      ],
    }));
  };
  
  const handleRemoveServicedArea = (index) => {
    setAcknowledgementFields((prevState) => {
      const servicedAreas = [...prevState.servicedAreas];
      servicedAreas.splice(index, 1);
      return { ...prevState, servicedAreas };
    });
  };

  const isServicedAreaEmpty = (area) => {
    return (
      !area.area_name ||
      !area.time_in ||
      !area.time_out ||
      !area.acknowledged_by ||
      !area.remarks
    );
  };

  const fetchAcknowledgementForCustomer = async (customerId) => {
    try {
      const response = await fetch(`/api/customers/acknowledgements/${customerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok && data.acknowledgments && data.acknowledgments.length > 0) {
        const acknowledgementData = data.acknowledgments[0];
        
        setAcknowledgementFields({
          ...acknowledgementData,
          date: new Date(acknowledgementData.date),
          servicedAreas: acknowledgementData.service_areas,
        });

        if (acknowledgementData._id) {
          fetchServicedAreasForAcknowledgement(acknowledgementData._id);
        }
      } else {
        setAcknowledgementFields({
          date: '',
          address: '',
          time_in: '',
          time_out: '',
          servicedAreas: [],
          acknowledged_by: '',
          remarks: '',
        });
        console.error('No acknowledgements found for this customer');
      }
    } catch (error) {
      console.error('Error fetching acknowledgement:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!customerData) return;

      setLoading(true);
      try {
        await fetchProposalForCustomer(customerData._id);
        await fetchContractforCustomer(customerData._id);
        await fetchInvoiceForCustomer(customerData._id);
        await fetchAcknowledgementForCustomer(customerData._id);
        setCustomerFields({
          name: customerData.name || '',
          contact_person: customerData.contact_person || '',
          address: customerData.address || '',
          type: customerData.type || '',
          status: customerData.status || '',
          contact_number: customerData.contact_number || '',
          services: customerData.services || [] 
        });
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [customerData, isOpen, refetchTrigger]);
  
  const areAllArticlesFilled = (articles) => {
    const isArticleFilled = (article) => {
      return (
        String(article.quantity).trim() !== '' &&
        String(article.unit).trim() !== '' &&
        String(article.article_name).trim() !== '' &&
        String(article.unit_price).trim() !== '' &&
        String(article.amount).trim() !== ''
      );
    };

    return articles.every(isArticleFilled);
  };
  
  const isServiceInvoiceFormFilled = (invoiceFields) => {
    return (
      String(invoiceFields.tin).trim() !== '' &&
      String(invoiceFields.pwd_id_no).trim() !== '' &&
      String(invoiceFields.terms).trim() !== '' &&
      String(invoiceFields.date).trim() !== '' &&
      areAllArticlesFilled(invoiceFields.articles) 
    );
  };

  const isAcknowledgementFormFilled = (acknowledgementFields) => {
    const isServicedAreaFilled = (area) => {
      return (
        String(area.area_name).trim() !== '' &&
        String(area.time_in).trim() !== '' &&
        String(area.time_out).trim() !== '' &&
        String(area.acknowledged_by).trim() !== '' &&
        String(area.remarks).trim() !== ''
      );
    };
  
    return acknowledgementFields.servicedAreas.every(isServicedAreaFilled) && acknowledgementFields.date != '';
  };


  const isFormFilled = (formFields) => {
      return Object.values(formFields).every(field => field !== '');
  };
  
  const selectedServices = contractFields.services || [];

  const handleServiceChange = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      const updatedServices = selectedServices.filter((id) => id !== serviceId);
      handleInputChange({ target: { name: 'services', value: updatedServices } }, 'contract');
    } else {
      const updatedServices = [...selectedServices, serviceId];
      handleInputChange({ target: { name: 'services', value: updatedServices } }, 'contract');
    }
  };

  const saveProposal = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/customers/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerData._id,
          product: proposalFields.product,
          quotation_total: proposalFields.quotation_total,
          frequency: proposalFields.frequency,
          file: proposalFields.file || null, 
        }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        console.log('Proposal saved successfully:', data);
        setProposalFields(data.proposal); 
        setIsEditingProposal(false);
      } else {
        console.error('Error saving proposal:', data.message);
      }
    } catch (error) {
      console.error('Error during save proposal process:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const saveContract = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/customers/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerData._id,
          services: contractFields.services,
          start_date: contractFields.start_date,
          end_date: contractFields.end_date,
          quotation_total: contractFields.quotation_total,
          frequency: contractFields.frequency, 
          file: contractFields.file || null,
        }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        console.log('Contract saved successfully:', data);
        fetchContractforCustomer(customerData._id)
        setIsEditingContract(false);
      } else {
        console.error('Error saving contract:', data.message);
      }
    } catch (error) {
      console.error('Error during save contract process:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveInvoice = async () => {
    setLoading(true);
    try {
      const invoiceData = {
        customer_id: customerData._id,
        tin: invoiceFields.tin,
        terms: invoiceFields.terms,
        pwd_id_no: invoiceFields.pwd_id_no,
        date: invoiceFields.date, 
        business_style: "SERVICE INVOICE",
      };
      
      const invoiceResponse = await fetch('/api/customers/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
  
      const invoiceResult = await invoiceResponse.json();
      if (!invoiceResponse.ok) {
        throw new Error(`Invoice Error: ${invoiceResult.message}`);
      }
  
      const si_id = invoiceResult.invoice._id;
  
      const deleteResponse = await fetch('/api/customers/invoices/articles/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ si_id }),
      });
  
      const deleteResult = await deleteResponse.json();
      if (!deleteResponse.ok) {
        throw new Error(`Delete Error: ${deleteResult.message}`);
      }

      for (const article of invoiceFields.articles) {
        const articleData = { ...article, si_id };
        
        const articleResponse = await fetch('/api/customers/invoices/articles/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
        });
  
        const articleResult = await articleResponse.json();
  
        if (!articleResponse.ok) {
          throw new Error(`Article Error: ${articleResult.message}`);
        }
      }
  
      console.log('Invoice and articles saved successfully');
      setIsEditingInvoice(false);
      fetchInvoiceForCustomer(customerData._id);
    } catch (error) {
      console.error('Error during save invoice process:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async () => {
    try {
      const response = await fetch('/api/customers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerData._id,
          ...customerFields,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsEditingCustomer(false);
        setFetching(true)
      } else {
        console.error('Error updating customer:', result.message);
      }
    } catch (error) {
      console.error('Error during customer update:', error.message);
    } finally {
    }
  };

  const saveAcknowledgements = async () => {
    setLoading(true);
    try {
      const acknowledgmentResponse = await fetch(`/api/customers/acknowledgements/${customerData._id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const acknowledgmentDataResponse = await acknowledgmentResponse.json();
      let acknowledgmentId = null;
      let isNewAcknowledgment = true;

      if (acknowledgmentResponse.ok && acknowledgmentDataResponse.acknowledgments && acknowledgmentDataResponse.acknowledgments.length > 0) {
        const currentAcknowledgment = acknowledgmentDataResponse.acknowledgments[0];
        acknowledgmentId = currentAcknowledgment._id;
        isNewAcknowledgment = false;
      } else {
        const newAcknowledgmentPayload = {
          customer_id: customerData._id,
          date: acknowledgementFields.date, 
          file: null,
          service_areas: []
        };

        console.log(newAcknowledgmentPayload)

        const acknowledgmentCreationRes = await fetch('/api/customers/acknowledgements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAcknowledgmentPayload),
        });

        const newAcknowledgmentResult = await acknowledgmentCreationRes.json();
        if (!acknowledgmentCreationRes.ok) {
          throw new Error(`Acknowledgment Creation Error: ${newAcknowledgmentResult.message}`);
        }
        acknowledgmentId = newAcknowledgmentResult.acknowledgment._id;
      }
  
      if (!isNewAcknowledgment) {
        await fetch(`/api/customers/acknowledgements/servicedArea/delete`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sa_id: acknowledgmentId })
        });
      }
  
      const convertTimeToTodayDate = (timeString) => {
        const today = new Date();
        const [hours, minutes] = timeString.split(':');
        today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        return today;
      };
  
      for (const area of acknowledgementFields.servicedAreas) {
        const areaData = {
          ...area,
          sa_id: acknowledgmentId,
          date: acknowledgementFields.date, 
          time_in: convertTimeToTodayDate(area.time_in),
          time_out: convertTimeToTodayDate(area.time_out)
        };
  
        const areaResponse = await fetch('/api/customers/acknowledgements/servicedArea/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(areaData),
        });
  
        const areaResult = await areaResponse.json();
        if (!areaResponse.ok) {
          throw new Error(`Serviced Area Error: ${areaResult.message}`);
        }
      }
  
      console.log('Acknowledgment and serviced areas saved successfully');
      setIsEditingAcknowledgement(false);
      fetchAcknowledgementForCustomer(customerData._id);
    } catch (error) {
      console.error('Error during save acknowledgment process:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteAcknowledgmentsForCustomer = async () => {
    try {
      setLoading(true);
      const acknowledgmentResponse = await fetch(`/api/customers/acknowledgements/${customerData._id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const acknowledgmentData = await acknowledgmentResponse.json();
      if (!acknowledgmentResponse.ok || !acknowledgmentData.acknowledgments) {
        console.error('No acknowledgments found or failed to fetch:', acknowledgmentData.message);
        return;
      }
      for (const acknowledgment of acknowledgmentData.acknowledgments) {
        await fetch(`/api/customers/acknowledgements/servicedArea/delete`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sa_id: acknowledgment._id })
        });
      }
      const deleteAcknowledgmentsResponse = await fetch(`/api/customers/acknowledgements/${customerData._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const deleteAcknowledgmentsData = await deleteAcknowledgmentsResponse.json();
      if (deleteAcknowledgmentsResponse.ok) {
        console.log('Acknowledgments and serviced areas deleted successfully:', deleteAcknowledgmentsData);
        setOpenSection('customerInformation');
        fetchAcknowledgementForCustomer(customerData._id); 
      } else {
        console.error('Failed to delete acknowledgments:', deleteAcknowledgmentsData.message);
      }
    } catch (error) {
      console.error('Error deleting acknowledgments:', error);
    }
    setLoading(false);
  };

  const handleAccordionClick = (section) => {
    switch (section) {
      case 'customerInformation':
        setIsEditingCustomer(!isFormFilled(customerFields));
        break;
      case 'proposalForm':
        setIsEditingProposal(!isFormFilled(proposalFields));
        break;
      case 'contract':
        setIsEditingContract(!isFormFilled(contractFields));
        break;
      case 'serviceInvoice':
        setIsEditingInvoice(!isFormFilled(invoiceFields));
        break;
      case 'serviceAcknowledgement':
        setIsEditingAcknowledgement(!isFormFilled(acknowledgementFields));
        break;
    }
    setOpenSection(openSection === section ? null : section);
  };

  const handleInputChange = (event, section) => {
    const { name, value } = event.target;
    
    switch (section) {
      case 'customerInformation':
        setCustomerFields(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'proposalForm':
        setProposalFields(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'contract':
        setContractFields(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'serviceInvoice':
        setInvoiceFields(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'serviceAcknowledgement':
        setAcknowledgementFields(prevState => ({ ...prevState, [name]: value }));
        break;
    }
  };

  const formatDateForInput = (date) => {
   if (!date) return "";
    try{
      const d = new Date(date);
      return d.toISOString().split('T')[0]; 
    } catch {
      return ""
    }
  };

  
  const typeOptionList = ['Industrial', 'Residential', 'Commercial', 'Service', 'Retail', 'Other'].map((type, index) => (
    <option key={index + 2} value={type}>
      {type}
    </option>
  ));

  const statusOptionList = ['Completed', 'Ongoing', 'Terminated', 'Pending'].map((status, index) => (
    <option key={index + 1} value={status}>
      {status}
    </option>
  ));

  if (!isOpen) return null;
  
  const closeModal = () => {
    onClose
    setLoading(true)
  }
  return (
    <div>
```jsx
{
  confirmDelete.isOpen && (
    <dialog open className="fixed inset-0 z-[1050] flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50 z-[1040]"></div>
      <div className="bg-white rounded-lg shadow-lg z-[1050] p-5">
        <h3 className="text-center mb-4 text-xl font-bold text-black">Confirm Delete</h3>
        <p className="text-center mb-6 text-black">
          Are you sure you want to delete this {confirmDelete.section}?
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setConfirmDelete({ isOpen: false, section: null })}
            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setConfirmDelete({ isOpen: false, section: null });
              if (confirmDelete.section === "proposal") deleteProposalForCustomer();
              if (confirmDelete.section === "contracts") deleteContractForCustomer();
              if (confirmDelete.section === "invoice") deleteInvoicesForCustomer();
              if (confirmDelete.section === "acknowledgment") deleteAcknowledgmentsForCustomer();
            }}
            className="bg-light-green text-white font-semibold py-2 px-4 rounded hover:bg-dark-green-C"
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  )
}

    {(loading) ? (
      <dialog className="modal w-screen z-1" open>
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-content flex items-center justify-center min-h-screen">
        <div className="modal-box w-[1050px] p-6 bg-white rounded-lg shadow-lg relative z-10">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
            ✕
          </button>
          <div className="text-center">Loading...</div>
      </div>
      </div>
      </dialog>
    ) : (
      isOpen && (        
        <dialog className="modal w-screen" open>
        <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
        <div className="modal-content flex items-center justify-center min-h-screen">
          <div className="modal-box w-[1050px] p-6 bg-white rounded-lg shadow-lg relative z-10">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
              ✕
            </button>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <>
             <Accordion title="Customer Information" isOpen={openSection === 'customerInformation'} onClick={() => handleAccordionClick('customerInformation')} isAddButtonVisible={!isFormFilled(customerFields)}>
              <div className="flex flex-row">
                <div className="basis-8/12 pr-12">
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
                    {isEditingCustomer ? 
                      <input
                        type="text"
                        name="name"
                        value={customerFields.name}
                        onChange={(e) => handleInputChange(e, 'customerInformation')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      /> : 
                      <div>{customerFields.name}</div>
                    }
                  </div>
  
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Contact Person</label>
                    {isEditingCustomer ? 
                      <input
                        type="text"
                        name="contact_person"
                        value={customerFields.contact_person}
                        onChange={(e) => handleInputChange(e, 'customerInformation')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      /> :
                      <div>{customerFields.contact_person}</div>
                    }
                  </div>
  
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Address</label>
                    {isEditingCustomer ? 
                      <input
                        type="text"
                        name="address"
                        value={customerFields.address}
                        onChange={(e) => handleInputChange(e, 'customerInformation')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      /> : 
                      <div>{customerFields.address}</div>
                    }
                  </div>
  
                  <div className="mb-4">
                  <label className="block text-md font-semibold text-dark-green pb-2">Type of Service</label>
                  {isEditingCustomer ? (
                    <select
                      name="services"
                      multiple 
                      value={customerFields.services}
                      onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                        setCustomerFields(prevState => ({ ...prevState, services: selectedOptions }));
                      }}
                      className="w-full border border-normal-green text-normal-green bg-white py-2 px-3 rounded-md hover:border-green-700 hover:shadow focus:border-green-700"
                    >
                      {servicesList.map((service) => (
                        <option key={service.id} value={service.label}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div>{customerFields.services.join(', ')}</div> 
                  )}
                </div>
                </div>
  
                <div className="basis-4/12">
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Status</label>
                    {isEditingCustomer ? 
                      <select
                        name="status"
                        value={customerFields.status}
                        onChange={(e) => handleInputChange(e, 'customerInformation')}
                        className="w-full border border-normal-green bg-white py-2 px-3 text-normal-green rounded-md hover:border-green-700 hover:shadow focus:border-green-700"
                      >
                        <option disabled value="">Status</option>
                        <option key={1} value="">
                          None
                        </option>
                        {statusOptionList}
                      </select> : 
                      <div>{customerFields.status}</div>
                    }
                  </div>
  
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Type</label>
                    {isEditingCustomer ? 
                      <select
                        name="type"
                        value={customerFields.type}
                        onChange={(e) => handleInputChange(e, 'customerInformation')}
                        className="w-full border border-normal-green text-normal-green bg-white py-2 px-3 rounded-md hover:border-green-700 hover:shadow focus:border-green-700"
                      >
                        <option disabled value="">Type:</option>
                        <option key={1} value="">
                          None
                        </option>
                        {typeOptionList}
                      </select> :
                      <div>{customerFields.type}</div>
                    }
                  </div>
  
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Contact Number</label>
                    {isEditingCustomer ? 
                      <input
                        type="text"
                        name="contact_number"
                        value={customerFields.contact_number}
                        onChange={(e) => handleInputChange(e, 'customerInformation')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      /> : 
                      <div>{customerFields.contact_number}</div>
                    }
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                {isEditingCustomer ? (
                  <button
                    onClick={() => updateCustomer()}
                    disabled={!isFormFilled(customerFields)}
                    className={`bg-light-green text-white font-semibold py-1 px-4 rounded ${
                      isFormFilled(customerFields) ? 'hover:bg-dark-green-C' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    SAVE
                  </button>
                ) : (
                  <div>
                    <button onClick={() => setIsEditingCustomer(true)} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
                      <Image
                        src="/Customer/EditIcon.png"
                        alt="Edit"
                        width={24}
                        height={24}
                      />
                  </button>
                  </div>
                )}
              </div>
            </Accordion>
  
            <Accordion title="Proposal Form" isAddButtonVisible={!isFormFilled(proposalFields)} isOpen={openSection === 'proposalForm'} onClick={() => handleAccordionClick('proposalForm')}>
              <div className="flex flex-row">
                <div className="basis-6/12">
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
                    {isEditingProposal ? (
                      <input
                        type="text"
                        name="clientName"
                        value={customerFields.name}
                        onChange={(e) => handleInputChange(e, 'proposalForm')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      />
                    ) : (
                      <div>{customerFields.name}</div>
                    )}
                  </div>
  
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Product</label>
                    {isEditingProposal ? (
                      <input
                        type="text"
                        name="product"
                        value={proposalFields.product}
                        onChange={(e) => handleInputChange(e, 'proposalForm')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      />
                    ) : (
                      <div>{proposalFields.product}</div>
                    )}
                  </div>
                </div>
  
                <div className="basis-6/12 pl-6">
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Contact Number</label>
                    {isEditingProposal ? (
                      <input
                        type="text"
                        name="contactNumber"
                        value={customerFields.contact_number}
                        onChange={(e) => handleInputChange(e, 'proposalForm')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      />
                    ) : (
                      <div>{customerFields.contact_number}</div>
                    )}
                  </div>
  
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Quotation Total</label>
                    {isEditingProposal ? (
                      <input
                        type="number"
                        name="quotation_total"
                        value={proposalFields.quotation_total}
                        onChange={(e) => handleInputChange(e, 'proposalForm')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      />
                    ) : (
                      <div> ₱{proposalFields.quotation_total}</div>
                    )}
                  </div>
                </div>
              </div>
  
              <div className="mb-4">
                <label className="block text-md font-semibold text-dark-green pb-2">Frequency</label>
                {isEditingProposal ? (
                  <textarea
                    name="frequency"
                    value={proposalFields.frequency}
                    onChange={(e) => handleInputChange(e, 'proposalForm')}
                    className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                    rows="3"
                  ></textarea>
                ) : (
                  <div>{proposalFields.frequency}</div>
                )}
              </div>
  
              <div className="flex justify-end">
                {isEditingProposal ? (
                  <button
                    onClick={() => saveProposal()}
                    disabled={!isFormFilled(proposalFields)}
                    className={`bg-light-green text-white font-semibold py-1 px-4 rounded ${
                      isFormFilled(proposalFields) ? 'hover:bg-dark-green-C' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    SAVE
                  </button>
                ) : (
                  <div>
                  <button onClick={() => setIsEditingProposal(true)} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
                    <Image
                      className='w-full h-[24px]'
                      src="/Customer/EditIcon.png"
                      alt="Edit"
                      width={22}
                      height={22}
                    />
                  </button>
                  <button onClick={() => setConfirmDelete({ isOpen: true, section: 'proposal' })} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
                    <Image
                      className='w-full h-[24px]'
                      src="/Customer/DeleteIcon.png"
                      alt="Delete"
                      width={22}
                      height={22}
                    />
                  </button>
                  </div>
                )}
              </div>
            </Accordion>
  
            <Accordion title="Contract" isAddButtonVisible={!isFormFilled(contractFields)} isOpen={openSection === 'contract'} onClick={() => handleAccordionClick('contract')}>
              <div className="mb-4">
                <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
                {isEditingContract ? (
                  <input
                    type="text"
                    name="clientName"
                    value={customerFields.name}
                    onChange={(e) => handleInputChange(e, 'contract')}
                    className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                  />
                ) : (
                  <div>{customerFields.name}</div>
                )}
              </div>
  
              <div className="flex flex-row">
              <div className="basis-6/12 pr-6">
                <p className="block text-md font-semibold text-dark-green pb-2">Services To Be Provided</p>
  
                {isEditingContract ? (
                  <div>
                    {servicesList.map((service) => (
                      <div key={service.id} className="mb-4 flex items-center">
                        <input
                          type="checkbox"
                          id={service.id}
                          className="mr-2"
                          checked={contractFields.services.includes(service.id)}
                          onChange={() => handleServiceChange(service.id)}
                        />
                        <label htmlFor={service.id}>{service.label}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                      {servicesList.map((service) => (
                      <div key={service.id} className="mb-4 flex items-center">
                        <input
                          type="checkbox"
                          id={service.id}
                          className="mr-2"
                          checked={contractFields.services.includes(service.id)}
                          disabled
                        />
                        <label htmlFor={service.id}>{service.label}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                <div className="basis-6/12 pl-6">
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Date Start</label>
                    {isEditingContract ? (
                      <input
                        type="date"
                        name="start_date"
                        value={formatDateForInput(contractFields.start_date)}
                        onChange={(e) => handleInputChange(e, 'contract')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      />
                    ) : (
                      <div>{formatDateForInput(contractFields.start_date)}</div>
                    )}
                  </div>
  
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Date End</label>
                    {isEditingContract ? (
                      <input
                        type="date"
                        name="end_date"
                        value={formatDateForInput(contractFields.end_date)}
                        onChange={(e) => handleInputChange(e, 'contract')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      />
                    ) : (
                      <div>{formatDateForInput(contractFields.end_date)}</div>
                    )}
                  </div>
                </div>
              </div>
  
              <div className="mb-4">
                <label className="block text-md font-semibold text-dark-green pb-2">Quotation Total</label>
                {isEditingContract ? (
                  <input
                    type="number"
                    name="quotation_total"
                    value={contractFields.quotation_total}
                    onChange={(e) => handleInputChange(e, 'contract')}
                    className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                  />
                ) : (
                  <div>{contractFields.quotation_total}</div>
                )}
              </div>
  
              <div className="mb-4">
                <label className="block text-md font-semibold text-dark-green pb-2">Frequency</label>
                {isEditingContract ? (
                  <textarea
                    name="frequency"
                    value={contractFields.frequency}
                    onChange={(e) => handleInputChange(e, 'contract')}
                    className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                    rows="3"
                  ></textarea>
                ) : (
                  <div>{contractFields.frequency}</div>
                )}
              </div>
  
              <div className="flex justify-end">
                {isEditingContract ? (
                  <button
                    onClick={() => saveContract()}
                    disabled={!isFormFilled(contractFields)}
                    className={`bg-light-green text-white font-semibold py-1 px-4 rounded ${
                      isFormFilled(contractFields) ? 'hover:bg-dark-green-C' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    SAVE
                  </button>
                ) : (
                  <div>
                    <button onClick={() => setIsEditingContract(true)} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
                      <Image
                        className='w-full h-[24px]'
                        src="/Customer/EditIcon.png"
                        alt="Edit"
                        width={22}
                        height={22}
                      />
                    </button>
                    <button onClick={() => setConfirmDelete({ isOpen: true, section: 'contracts' })} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
                      <Image
                        className='w-full h-[24px]'
                        src="/Customer/DeleteIcon.png"
                        alt="Delete"
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                )}
              </div>
            </Accordion>
  
            <Accordion
    title="Service Invoice"
    isAddButtonVisible={!isFormFilled(invoiceFields)}
    isOpen={openSection === 'serviceInvoice'}
    onClick={() => handleAccordionClick('serviceInvoice')}
  >
    <div className="flex flex-row mb-4">
      <div className="basis-1/2">
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
          {isEditingInvoice ? (
            <input
              type="text"
              name="clientName"
              value={customerFields.name}
              onChange={(e) => handleInputChange(e, 'serviceInvoice')}
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          ) : (
            <div>{customerFields.name}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">TIN</label>
          {isEditingInvoice ? (
            <input
              type="text"
              name="tin"
              value={invoiceFields.tin}
              onChange={(e) => handleInputChange(e, 'serviceInvoice')}
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          ) : (
            <div>{invoiceFields.tin}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">PWD ID No.</label>
          {isEditingInvoice ? (
            <input
              type="text"
              name="pwd_id_no"
              value={invoiceFields.pwd_id_no}
              onChange={(e) => handleInputChange(e, 'serviceInvoice')}
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          ) : (
            <div>{invoiceFields.pwd_id_no}</div>
          )}
        </div>
      </div>
      <div className="basis-1/2 pl-4">
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Date</label>
          {isEditingInvoice ? (
            <input
              type="date"
              name="date"
              value={formatDateForInput(invoiceFields.date)}
              onChange={(e) => handleInputChange(e, 'serviceInvoice')}
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          ) : (
            <div>{formatDateForInput(invoiceFields.date)}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Terms</label>
          {isEditingInvoice ? (
            <input
              type="text"
              name="terms"
              value={invoiceFields.terms}
              onChange={(e) => handleInputChange(e, 'serviceInvoice')}
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          ) : (
            <div>{invoiceFields.terms}</div>
          )}
        </div>
      </div>
    </div>
    <div className="mb-8">
      <label className="block text-md font-semibold text-dark-green pb-2">Address</label>
      {isEditingInvoice ? (
        <input
          type="text"
          name="address"
          value={customerFields.address}
          onChange={(e) => handleInputChange(e, 'serviceInvoice')}
          className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
        />
      ) : (
        <div>{customerFields.address}</div>
      )}
    </div>
  
    {(invoiceFields.articles.length === 0 && isEditingInvoice) && (
    <div className="border border-black p-4 mb-4 rounded-lg">
      <div className="flex flex-row mb-2">
        <div className="basis-3/12 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          </div>
        </div>
        <div className="basis-3/12 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Unit</label>
            <input
              type="number"
              name="unit"
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          </div>
        </div>
        <div className="basis-6/12">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Article Name</label>
            <input
              type="text"
              name="article_name"
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Unit Price</label>
            <input
              type="number"
              name="unit_price"
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          </div>
        </div>
        <div className="basis-1/2 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Amount</label>
            <input
              type="number"
              name="amount"
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleAddArticle()}
          className="bg-light-green text-white font-semibold py-1 px-4 rounded hover:bg-dark-green-C"
        >
          ADD
        </button>
      </div>
    </div>
  )}
  
  {invoiceFields.articles.map((article, index) => (
    <div key={article._id || index} className="border border-black p-4 mb-4 rounded-lg">
      <div className="flex flex-row mb-2">
        <div className="basis-3/12 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Quantity</label>
            {isEditingInvoice ? (
              <input
                type="number"
                name="quantity"
                value={article.quantity}
                onChange={(e) => handleArticleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
              />
            ) : (
              <div>{article.quantity}</div>
            )}
          </div>
        </div>
        <div className="basis-3/12 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Unit</label>
            {isEditingInvoice ? (
              <input
                type="text"
                name="unit"
                value={article.unit}
                onChange={(e) => handleArticleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
              />
            ) : (
              <div>{article.unit}</div>
            )}
          </div>
        </div>
        <div className="basis-6/12">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Article Name</label>
            {isEditingInvoice ? (
              <input
                type="text"
                name="article_name"
                value={article.article_name}
                onChange={(e) => handleArticleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
              />
            ) : (
              <div>{article.article_name}</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/2 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Unit Price</label>
            {isEditingInvoice ? (
              <input
                type="number"
                name="unit_price"
                value={article.unit_price}
                onChange={(e) => handleArticleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
              />
            ) : (
              <div>{article.unit_price}</div>
            )}
          </div>
        </div>
        <div className="basis-1/2 pr-4">
          <div className="mb-4">
            <label className="block text-md font-semibold text-dark-green pb-2">Amount</label>
            {isEditingInvoice ? (
              <input
                type="number"
                name="amount"
                value={article.amount}
                onChange={(e) => handleArticleChange(e, index)}
                className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
              />
            ) : (
              <div>{article.amount}</div>
            )}
          </div>
        </div>
      </div>
      {isEditingInvoice && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleRemoveArticle(index)}
            className="bg-red-500 text-white font-semibold py-1 px-4 rounded hover:bg-red-700"
          >
            REMOVE
          </button>
          {index === invoiceFields.articles.length - 1 && (
            <button
              onClick={handleAddArticle}
              disabled={isArticleEmpty(article)} 
              className={`bg-light-green text-white font-semibold py-1 px-4 rounded ${
                isArticleEmpty(article) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-green-C'
              }`}
            >
              ADD
            </button>
          )}
        </div>
      )}
    </div>
  ))}
  
    <div className="flex justify-end">
      {isEditingInvoice ? (
        <button
          onClick={() => saveInvoice()}
           disabled={!isServiceInvoiceFormFilled(invoiceFields)}
          className={`bg-light-green text-white font-semibold py-1 px-4 rounded ${
            isServiceInvoiceFormFilled(invoiceFields) ? 'hover:bg-dark-green-C' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          SAVE
        </button>
      ) : (
        <div>
         <button onClick={() => setIsEditingInvoice(true)} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
          <Image
            className='w-full h-[24px]'
            src="/Customer/EditIcon.png"
            alt="Edit"
            width={22}
            height={22}
          />
          </button>
          <button onClick={() => setConfirmDelete({ isOpen: true, section: 'invoice' })} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
          <Image
            className='w-full h-[24px]'
            src="/Customer/DeleteIcon.png"
            alt="Delete"
            width={22}
            height={22}
          />
          </button>
        </div>
      )}
    </div>
  </Accordion>
  
                <Accordion
    isAddButtonVisible={!isFormFilled(acknowledgementFields)}
    title="Service Acknowledgement"
    isOpen={openSection === 'serviceAcknowledgement'}
    onClick={() => handleAccordionClick('serviceAcknowledgement')}
  >
                <div className="basis-6/12">
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Client Name</label>
                    {isEditingAcknowledgement ? (
                      <input
                        type="text"
                        name="clientName"
                        value={customerFields.name}
                        onChange={(e) => handleInputChange(e, 'serviceAcknowledgement')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      />
                    ) : (
                      <div>{customerFields.name}</div>
                    )}
                  </div>
                </div>
  
                <div className="basis-6/12">
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-dark-green pb-2">Date</label>
                    {isEditingAcknowledgement ? (
                      <input
                        type="date"
                        name="date"
                        value={formatDateForInput(acknowledgementFields.date)}
                        onChange={(e) => handleInputChange(e, 'serviceAcknowledgement')}
                        className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                      />
                    ) : (
                      <div>{formatDateForInput(acknowledgementFields.date)}</div>
                    )}
                  </div>
                </div>
  
              <div className="mb-8">
                <label className="block text-md font-semibold text-dark-green pb-2">Address</label>
                {isEditingAcknowledgement ? (
                  <input
                    type="text"
                    name="address"
                    value={customerFields.address}
                    onChange={(e) => handleInputChange(e, 'serviceAcknowledgement')}
                    className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
                  />
                ) : (
                  <div>{customerFields.address}</div>
                )}
              </div>
  
       {(acknowledgementFields.servicedAreas.length === 0 && isEditingAcknowledgement) && (
      <div className="border border-black p-4 mb-4 rounded-lg">
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Area Name</label>
          <input
            type="text"
            name="area_name"
            className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
          />
        </div>
        <div className="flex flex-row">
          <div className="basis-1/2 pr-4">
            <div className="mb-4">
              <label className="block text-md font-semibold text-dark-green pb-2">Time In</label>
              <input
                type="time"
                name="time_in"
                className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
              />
            </div>
          </div>
          <div className="basis-1/2 pr-4">
            <div className="mb-4">
              <label className="block text-md font-semibold text-dark-green pb-2">Time Out</label>
              <input
                type="time"
                name="time_out"
                className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Acknowledged By</label>
          <input
            type="text"
            name="acknowledged_by"
            className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Remarks</label>
          <input
            type="text"
            name="remarks"
            className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddServicedArea()}
            className={`bg-light-green text-white font-semibold py-1 px-4 rounded `}
          >
            ADD
          </button>
        </div>
      </div>
    )}
  
  {acknowledgementFields.servicedAreas.map((area, index) => (
  <div key={area._id} className="border border-black p-4 mb-4 rounded-lg">
    <div className="mb-4">
      <label className="block text-md font-semibold text-dark-green pb-2">Area Name</label>
      {isEditingAcknowledgement ? (
        <input
          type="text"
          name="area_name"
          value={area.area_name}
          onChange={(e) => handleAcknowledgementChange(e, index)}
          className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
        />
      ) : (
        <div>{area.area_name}</div>
      )}
    </div>
    <div className="flex flex-row">
      <div className="basis-1/2 pr-4">
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Time In</label>
          {isEditingAcknowledgement ? (
            <input
              type="time"
              name="time_in"
              value={extractTimeForInput(area.time_in) || area.time_in}
              onChange={(e) => handleAcknowledgementChange(e, index)}
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          ) : (
            <div>{convertTo12HourFormat(extractTimeForInput(area.time_in))}</div>
          )}
        </div>
      </div>
      <div className="basis-1/2 pr-4">
        <div className="mb-4">
          <label className="block text-md font-semibold text-dark-green pb-2">Time Out</label>
          {isEditingAcknowledgement ? (
            <input
              type="time"
              name="time_out"
              value={extractTimeForInput(area.time_out) || area.time_out}
              onChange={(e) => handleAcknowledgementChange(e, index)}
              className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
            />
          ) : (
            <div>{convertTo12HourFormat(extractTimeForInput(area.time_out))}</div>
          )}
        </div>
      </div>
    </div>
    <div className="mb-4">
      <label className="block text-md font-semibold text-dark-green pb-2">Acknowledged By</label>
      {isEditingAcknowledgement ? (
        <input
          type="text"
          name="acknowledged_by"
          value={area.acknowledged_by}
          onChange={(e) => handleAcknowledgementChange(e, index)}
          className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
      />
      ) : (
        <div>{area.acknowledged_by}</div>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-md font-semibold text-dark-green pb-2">Remarks</label>
      {isEditingAcknowledgement ? (
        <input
          type="text"
          name="remarks"
          value={area.remarks}
          onChange={(e) => handleAcknowledgementChange(e, index)}
          className="block w-full rounded-md border-0 py-1.5 px-4 mb-4 ring-1 ring-inset ring-light-green focus:ring-2"
        />
      ) : (
        <div>{area.remarks}</div>
      )}
    </div>
    {isEditingAcknowledgement && (
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleRemoveServicedArea(index)}
          className="bg-red-500 text-white font-semibold py-1 px-4 rounded hover:bg-red-700"
        >
          REMOVE
        </button>
        {index === acknowledgementFields.servicedAreas.length - 1 && (
          <button
            onClick={handleAddServicedArea}
            disabled={isServicedAreaEmpty(area)}
            className={`bg-light-green text-white font-semibold py-1 px-4 rounded ${
              isServicedAreaEmpty(area) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-green-C'
            }`}
          >
            ADD
          </button>
        )}
      </div>
    )}
  </div>
))}
    <div className="flex justify-end mt-4">
    {isEditingAcknowledgement ? (
      <button
        onClick={() => saveAcknowledgements()}
        disabled={!isAcknowledgementFormFilled(acknowledgementFields)}
        className={`bg-light-green text-white font-semibold py-1 px-4 rounded ${
          isAcknowledgementFormFilled(acknowledgementFields) ? 'hover:bg-dark-green-C' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        SAVE
      </button>
    ) : (
      <div>
        <button onClick={() => setIsEditingAcknowledgement(true)} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
          <Image
            className='w-full h-[24px]'
            src="/Customer/EditIcon.png"
            alt="Edit"
            width={22}
            height={22}
          />
        </button>
        <button onClick={() => setConfirmDelete({ isOpen: true, section: 'acknowledgment' })} className="bg-light-green text-white font-semibold py-1 px-5 ml-2 rounded hover:bg-dark-green-C">
          <Image
            className='w-full h-[24px]'
            src="/Customer/DeleteIcon.png"
            alt="Delete"
            width={22}
            height={22}
          />
        </button>
      </div>
    )}
  </div>
  </Accordion>
              </>
            )}
          </div>
        </div>
      </dialog>
      )
    )}
  </div>
  );
};


const Page = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [fetching, setFetching] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (fetching) {
      fetch(`/api/customers`)
        .then((response) => response.json())
        .then((data) => setCustomers(data.results))
        .catch((error) => console.error('Error fetching customers:', error));
      setFetching(false);
    }
  }, [fetching]);

  const handleRowClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setDetailModalOpen(true);
    setRefetchTrigger(prev => !prev);
    setLoading(true)
  };


  return (
    <div className='mx-16 mt-10 pb-6'>
      {addModalOpen && <CustomerForm onOpenModel={setAddModalOpen} onFetchCustomerData={setFetching} />}
      <div className="w-screen">
        <DetailModal 
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          customerData={customers.find(customer => customer._id === selectedCustomerId)}
          refetchTrigger={refetchTrigger} 
          loading = {loading}
          setLoading = {setLoading}
          setFetching={setFetching}
        />
      </div>
      
      <div className='w-full grid grid-cols-5 text-normal-green text-xl font-bold'>
        <div className='flex justify-center'>Client Name</div>
        <div className='flex justify-center'>Type</div>
        <div className='flex justify-center'>Status</div>
        <div className='flex justify-center w-11/12'>Created At</div>
      </div>
      <hr className='bg-normal-green h-[2px] w-full mt-3'></hr>
      {customers.map((customer) => (
        <div key={customer._id} className="cursor-pointer" onClick={() => handleRowClick(customer._id)}>
          <ClientRow name={customer.name} type={customer.type} status={customer.status} createdAt={formatDate(customer.date)} />
        </div>
      ))}
      <div className='flex justify-end'>
        <button className='btn border-none hover:bg-yellow-700 font-bold text-xl w-[201px] h-14 bg-light-green text-white mt-6 rounded-md' onClick={() => setAddModalOpen(true)}>
          + Add Client
        </button>
      </div>
    </div>
  );
};

export default Page;