/* eslint-disable @typescript-eslint/no-unused-vars */
function ErrorMessage({message, id}) {
    return (
        <p id={id} data-test={`error_${id}`}
        className="text-red-600 text-[85%] whitespace-pre-wrap mt-1">
            {message}
        </p>
    );
}

export function TextInput({name, label, value, onChange, error_msg}) {
    const error = false;
    const error_style = "border-red-600 bg-red-100";

    return (
        <div className="my-1.5">
            <label for={name} 
            className="text-dark-green-A">
                {label}
            </label><br />
            <input type="text" id={name} name={name} 
            data-test={`input_${name}`}
            value={value}
            onChange={onChange}
            className={`border-[1px] ${error_msg && error_style} border-dark-green rounded-md w-[95%]`}
            />
            {error_msg &&
            <ErrorMessage message={error_msg} id={name} />}
        </div>
    );
}

export function EmailInput({name, label, onChange}) {
    const error = false;
    const error_style = "border-red-600 bg-red-100";
    const error_message = "Please fill out this field.";

    return (
        <div className="my-1.5">
            <label for={name}
            className="text-dark-green-A">
                {label}
            </label>
            <input type="email" id={name} name={name}
            data-test={`input_${name}`}
            onChange={onChange} 
            className={`border-[1px] ${error && error_style} border-dark-green rounded-md w-[95%]`}/>
            {error_msg &&
            <ErrorMessage message={error_message} id={name} />}
        </div>
    );
}

export function TelNumInput({name, label, regex, onChange}) {
    const error = false;
    const error_style = "border-red-600 bg-red-100";
    const error_message = "Please fill out this field.";

    return (
        <div className="my-1.5">
            <label for={name}
            className="text-dark-green-A">{label}</label>
            <input type="tel" id={name} name={label} pattern={regex} 
            data-test={`input_${name}`}
            onChange={onChange}
            className={`border-[1px] ${error && error_style} border-dark-green rounded-md w-[95%]`} /> {/* Using the landline and cellphone PH phone number format. */}
            {error_msg &&
            <ErrorMessage message={error_message} id={name} />}
        </div>
    );
}

export function CheckboxInput({name, label, options, values, onChange, error_msg}) {
    const error = false;
    const error_style = "border-red-600 bg-red-100 hover:bg-red-50";

    const optionList = options.map((option, index) => (
        <div key={index} className="flex flex-row self-center">
            {/*
            References for checkbox designs:
            https://www.geeksforgeeks.org/how-to-style-checkboxes-in-tailwind-css/
            https://www.npmjs.com/package/@tailwindcss/forms?activeTab=readme
             */}
            <input
            type="checkbox"
            id={`${name}-${option}`} // Unique ID for each checkbox
            name={name} // Consistent name for form submission
            value={option}
            data-test={`input_${name}_${option.replaceAll(" ", "_").toLowerCase()}`}
            checked={values.includes(option)}
            /*className="mx-2 my-1 
            peer relative appearance-none 
            w-5 h-5 border 
            rounded-md border-dark-green-A
            cursor-pointer  
            checked:bg-lime-500 
            checked:border-lime-500"*/
            onChange={onChange}
            className={`form-checkbox mx-2 my-1 w-4 h-4
            cursor-pointer 
            border-3 rounded-sm ${
            error_msg &&
            error_style
            }
            border-dark-green-A
            hover:bg-slate-100
            focus:ring-0 focus:ring-offset-0
            checked:focus:bg-lime-500 
            checked:bg-lime-500 
            checked:border-lime-500
            checked:hover:bg-lime-400`}
            />
            <label key={`${index}-label`} for={`${name}-${option}`}
            className="text-dark-green-A">
                {option}
            </label>
        </div>
    ));

    return (
        <div className="my-1.5">
            <p id={name}
            className="text-dark-green-A">
                {label}
            </p>
            {optionList}
            {error_msg &&
            <ErrorMessage message={error_msg} id={name} />}
        </div>
    );
}

export function DropDownInput({name, label, options, value, onChange, error_msg}) {
    const error = false;
    const error_style = "border-red-600 bg-red-100";

    const optionList = options.map((option, index) =>
        <option key={index + 1} value={option} selected={option == value}>{option}</option>
    );

    return (
        <div className="my-1.5">
            <label for={name}
            className="text-dark-green-A">
                {label}
            </label> 
            <br />
            <select name={name} id={name}
            data-test={`input_${name}`}
            onChange={onChange}
            className={`border-[1px] ${error_msg && error_style} border-dark-green rounded-md w-[50%]`}>
                 <option disabled selected={!value} value>Select {name}</option>
                {optionList}
            </select>
            {error_msg &&
            <ErrorMessage message={error_msg} id={name} />}
        </div>
    );
}

export function SubmitButton({ onClick, isForEdit }) {
    return (
        <input type="submit" value={isForEdit ? "Edit Client" : "+ Add Client"} disabled={false}
        data-test="submit_button" 
        onClick={onClick}
        className="btn text-white text-center bg-lime-500 border-[1px] rounded-md px-2 py-1 w-max self-end mr-2
        hover:bg-yellow-700"/>
    );
}