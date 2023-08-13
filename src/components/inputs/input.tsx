import React, {useState,useEffect} from 'react';
import IconBtn from "../global/icon-btn";
import separator from "../../utils/money";
import {eye, eyeOff} from "@/svg/icons";

interface Interface {
    type?:'text'|'number'|'password'|'date'|'email'|'telephone'
    name?:string
    setValue:(value:any)=>void
    value:any
    className?:string
    required?:boolean
    placeholder?:string
    min?:number|string
    label?:string
    mt?:number
    maxLength?:number
    max?:number|string
    cs?:string
    error?:string|any
    autoComplete?:string|"off"
    money?:boolean
    disabled?:boolean
    onBlur?:()=>void
}

const Input:React.FC<Interface>=({mt, onBlur,error,money,disabled,cs,max,autoComplete,maxLength,type="text",name, setValue, value, className, required=false,placeholder,min,label })=> {
    const [show,setShow] = useState(true);

    useEffect(()=>{
        if (name){
            const val = sessionStorage.getItem(name) || "";
            setValue(val)
        }
    },[]);

    const onChange=( {target}:any ) => {
        if (name){
            sessionStorage.setItem(name,target.value);
        }
        if (money){
            setValue(Number(target.value.replace(/[,.]/g,''))/100);
        }else {
            setValue(target.value);
        }
    };
    return (
        <div style={{marginTop:mt}} className={cs}>
            {label&&(
                <label htmlFor="" className="text-gray-800 text-sm">{label}</label>
            )}
            <div className="relative">
                <div className={`bg border rounded-md overflow-hidden mt-1 ${error?"border-danger":""} ${className}`}>
                    <input
                        type={show?type:"text"}
                        name={name}
                        onChange={onChange}
                        min={min}
                        max={max}
                        maxLength={maxLength}
                        required={required}
                        className={`input text`}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        value={money?value?separator(Number(value),2):"":value}
                        disabled={disabled}
                        onBlur={onBlur}
                    />
                </div>
                {type==="password"&&(
                    <div className="absolute top-0 right-0 bottom-0 flex-center mt-1">
                        <IconBtn
                            icon={show?eyeOff:eye}
                            className="text-lg text-medium"
                            onClick={()=>setShow(prevState => !prevState)}
                        />
                    </div>
                )}
            </div>
            <p className="text-xs text-danger pl-2 pt-1">{error}</p>
        </div>

    );
};

export default Input;
