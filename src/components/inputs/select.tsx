import React from 'react';

export type SelectProps = {
    placeholder?:string
    value?:string
    setValue:(value:string)=>void
    options:{label:string, value:string}[]
    className?:string
    cs?:string
    label?:string
    error?:string | any
    disabled?:boolean
    mt?:number
}

const Select: React.FC<SelectProps> = (props) => {
    const {
        placeholder,
        mt,
        disabled,
        value,
        error,
        cs,
        label,
        setValue,
        options,
        className
    } = props;

    return (
        <div style={{marginTop:mt}} className={cs}>
            {label&&(
                <label htmlFor="" className="label">{label}</label>
            )}
            <select
                value={value}
                className={`${error?"border-danger":""} ${className} border px-2 py-4 text text-sm w-full mt-1 rounded-md appearance-none bg bg-[url('/images/down.svg')] bg-right bg-no-repeat `}
                placeholder={placeholder}
                onChange={(e)=>setValue(e.target.value)}
                disabled={disabled}
            >
                <option key={"option"} value={""}></option>
                {options.map(({value,label},i)=>(
                    <option key={"option"+i} value={value}>{label}</option>
                ))}
            </select>
            <p className="text-xs text-danger pl-2 pt-1">{error}</p>
        </div>
    );
};

export default Select;
