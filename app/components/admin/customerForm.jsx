/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { TextInput, CheckboxInput, DropDownInput, SubmitButton } from "./formComponents"

export default function CustomerForm({ onOpenModel, onFetchCustomerData, customerID, isForEdit }) {
    const statusOptions = ["Completed", "Ongoing", "Terminated", "Pending"];
    const typeOptions = ["Industrial", "Residential", "Commercial", "Service", "Retail", "Other"];
    const serviceOptions = ["Hygenic Pest Control", "Termite Control", "Rodent Control"];

    //States store inputs.
    console.log(customerID)


    const selected_customer = (isForEdit) ? {
        name: "STSWENG Group 9",
        type: "Other",
        contact_person: "Adriel Fancubit",
        contact_number: "09123456789",
        address: "Taft Manila",
        email_address: "stsweng_group_9@gmail.com",
        status: "Ongoing",
        date: "2024-09-02",
        services: ["Hygenic Pest Control",]
      } : null;

      if (isForEdit) {
        console.log(selected_customer)
      }

    const [formData, setFormData] = useState({
        client_name: (isForEdit) ? selected_customer.name : "",
        contact_person: (isForEdit) ? selected_customer.contact_person : "",
        email_address: (isForEdit) ? selected_customer.email_address : "",
        address: (isForEdit) ? selected_customer.address : "",
        services: (isForEdit) ? selected_customer.services : [],
        status: (isForEdit) ? selected_customer.status : "",
        type: (isForEdit) ? selected_customer.type : "",
        contact_number: (isForEdit) ? selected_customer.contact_number : "",
    });

    const [errors, setErrors] = useState({
        client_name: "",
        contact_person: "",
        email_address: "",
        address: "",
        services: "",
        status: "",
        type: "",
        contact_number: "",
    })

    const printInputs = () => {
        console.log(formData.client_name);
        console.log(formData.contact_person);
        console.log(formData.email_address);
        console.log(formData.address);
        console.log(formData.services);
        console.log(formData.status);
        console.log(formData.type);
        console.log(formData.contact_number);
    };

    const printErrorMessages = () => {
        console.log(errors.client_name);
        console.log(errors.contact_person);
        console.log(errors.email_address);
        console.log(errors.address);
        console.log(errors.services);
        console.log(errors.status);
        console.log(errors.type);
        console.log(errors.contact_number);
    }

    const handleChange = (e) => {
        e.stopPropagation();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation();

        let services = formData.services

        if (e.target.checked && !(services.includes(e.target.value))) {
            services.push(e.target.value)
        }

        if (!e.target.checked) {
            services = services.filter(service => service !== e.target.value);
        }

        //console.log(new_services);

        setFormData({
            ...formData,
            services: services
        });
    };

    const handleSubmit = async () => {
        const new_errors = {
            client_name: "",
            contact_person: "",
            email_address: "",
            address: "",
            services: "",
            status: "",
            type: "",
            contact_number: "",
        };

        let valid = true;

        const email_regex = /^\S+@\S+\.\S+$/
        if (!email_regex.test(formData.email_address)) {
            console.log(`email_address: Please enter a properly formatted email address.`)
            new_errors.email_address = "Please enter a properly formatted email address.";
            valid = false;
        }

        const telephone_regex = /^(09|\+639)\d{9}$|^(02|\+6302)\d{8}$/;
        if (!telephone_regex.test(formData.contact_number)) {
            console.log(`contact_number: Please follow the following formats.`)
            new_errors.contact_number =
            `Please follow one of the following formats:
            09XXXXXXXXX,
            +639XXXXXXXXX,
            02XXXXXXXX,
            +6302XXXXXXXX`;
            valid = false;
        }

        //Handles requirements:
        for (let data in formData) {
            if (data !== "services" && formData[data] === "") {
                console.log(`${data}: Please enter this field.`);
                new_errors[data] = "Please enter this field.";
                valid = false;
            }
        }

        if (formData.services.length <= 0) {
            console.log(`services: Please enter this field.`);
            new_errors.services = "Please enter this field.";
            valid = false;
        }

        //console.log(new_errors);
        setErrors(new_errors);

        if (valid) {
            try {
                console.log("Submitting customer form.");

                const response = await fetch(`/api/customers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                console.log("Submitting customer form successful.")
                onOpenModel(false); //To change the state outside to disable the modal.
                onFetchCustomerData(true);
            } catch (error) {
                console.log(`Error in submitting form: ${error}`);
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col p-5 bg-white mt-[6.5%] w-[47%] flex-shrink-0 rounded-xl">
                <div className="flex justify-between">
                    <h2 className="text-dark-green-A text-[20px] font-bold mb-1 self-center">Customer Information</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960"
                    className="w-6 h-6 text-dark-green-A fill-current mt-[0.3%]"
                    onClick={() => onOpenModel(false)}>
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </div>
                <div className="flex flex-row justify-center px-4">
                    <div className="mx-2 flex flex-col flex-shrink-0 basis-[50%]"> {/* column 1 */}
                        <TextInput name="client_name" label="Client Name" onChange={handleChange}
                        error_msg={errors.client_name} />
                        <TextInput name="contact_person" label="Contact Person" onChange={handleChange}
                        error_msg={errors.contact_person} />
                        <TextInput name="email_address" label="Email Address" onChange={handleChange}
                        error_msg={errors.email_address} />
                        <TextInput name="address" label="Address" onChange={handleChange}
                        error_msg={errors.address} />
                        <CheckboxInput name="services" label="Services" options={serviceOptions} onChange={handleCheckboxChange}
                        error_msg={errors.services} />
                    </div>
                    <div className="mx-2 flex flex-col flex-shrink-0 basis-[50%]"> {/* column 2 */}
                        <div className="flex flex-col h-[90%]">
                            <DropDownInput name="status" label="Status" options={statusOptions} onChange={handleChange}
                            error_msg={errors.status} />
                            <DropDownInput name="type" label="Type" options={typeOptions} onChange={handleChange}
                            error_msg={errors.type} />
                            <TextInput name="contact_number" label="Contact Number" onChange={handleChange}
                            error_msg={errors.contact_number} /> {/* Regex: ^(09|\+639)\d{9}$|^(02|\+6302)\d{8}$*/}
                        </div>
                        <div className="flex flex-col flex-end justify-end">
                            <SubmitButton onClick={() => {
                                printInputs();
                                handleSubmit();
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}