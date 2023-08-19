import React, {useState,useEffect} from 'react';

export type TextareaProps = {
    setValue:(val:any)=>void
    value:any
    className?:string
    cs?:string
    placeholder?:string
    label?:string
    error?:any
    save?:boolean
    required?:boolean
    maxLength?:number
    mt?:number
}

const Textarea: React.FC<TextareaProps> = (props) => {
    const {
        setValue,
        value,
        className,
        cs,
        mt,
        label,
        placeholder,
        maxLength,
        required,
        save,
        error
    } = props;

    useEffect(()=>{
        if (save){
            // const val = sessionStorage.getItem(name) || "";
            // setValue(val)
        }
    },[]);

    const onChange=( {target}:any ) => {
        setValue(target.value);
        if (save){
            // sessionStorage.setItem(name,target.value);
        }
    };

    return (
        <div style={{marginTop:mt}} className={cs}>
            {label&&(
                <label htmlFor="" className="text-gray-800 text-sm">{label} {required&&(<span className="text-danger">*</span>)}</label>
            )}
            <textarea
                onChange={onChange}
                maxLength={maxLength}
                required={required}
                value={value}
                className={`${className} input border rounded-md h-20 text mt-1 resize-none`}
                placeholder={placeholder}
            />
            {error&&(
                <p className="text-xs text-danger pl-2 pt-1">{error}</p>
            )}
        </div>
    );
};

export default Textarea;
