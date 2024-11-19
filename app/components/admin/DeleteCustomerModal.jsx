/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

export default function DeleteCustomerModal({customerID, onOpenModel, onFetchCustomerData}) {
    const handleDelete = async (customerID) => {
        try {
            const response = await fetch(`/api/customers/${customerID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            console.log(`Customer with id: ${customerID} deleted.`)
            onFetchCustomerData(true);
        } catch (error) {
            console.log(`Error in deleting a customer: ${error}`);
        }
        onOpenModel(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col p-5 bg-white mt-[6.5%] w-[30%] h-[26%] flex-shrink-0 rounded-xl">
                <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 -960 960 960"
                    className="w-6 h-6 text-dark-green-A fill-current mt-[0.3%]">
                        <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/>
                    </svg>
                    <h2 className="text-dark-green-A text-[20px] font-bold mb-1 self-center">Confirm Delete?</h2>
                </div>
                <div className="flex flex-col px-4 gap-[10%]">
                    <div className="h-[95%]">
                        <p>Confirming will permanently delete this customer. This cannot be undone.</p>
                    </div>
                    <div className="flex justify-end gap-1">
                        <input type="button" value="Cancel" disabled={false}
                        data-test="button_cancel"
                        onClick={() => {
                            console.log("Cancel button pressed.");
                            onOpenModel(false);
                        }}
                        className="btn text-lime-500 text-center bg-white border-[2px] border-lime-500 rounded-md px-2 py-1 w-max self-end mr-2
                        hover:bg-yellow-700"/>
                        <input type="button" value="Delete" disabled={false}
                        data-test="confirm"
                        onClick={() => {
                            console.log("Confirm button pressed.");
                            handleDelete(customerID);
                        }}
                        className="btn text-white text-center bg-lime-500 border-[1px] rounded-md px-2 py-1 w-max self-end mr-0
                        hover:bg-yellow-700"/>
                    </div>
                </div>
            </div>
        </div>
    );
}