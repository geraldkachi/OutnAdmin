import React, {useState,useEffect} from 'react';
import money from "@/utils/money";

type AmountInputProps = {
	label?: string
	error?: any
	setValue:(value:any)=>void
	value?:any
	cs?:string
	disabled?:boolean
}

const AmountInput: React.FC<AmountInputProps> = (props) => {
    const {label, setValue, value, cs, error, disabled} = props;
    return (
	    <div className={cs}>
		    <label htmlFor="" className="text-gray-800 text-sm">{label||"Amount"}</label>
		    <div className="border flex-item rounded-md">
			    <p className="text-medium pl-5 pr-3">NGN</p>
			    <div className="flex-1">
					<input
						className="py-3 font-bold text-xl w-full"
						onChange={(e)=> {
							setValue(Number(e.target.value.replace(/[,.]/g,''))/100)
						}}
						value={money(Number(value),2)}
						placeholder={"0.00"}
						disabled={disabled}
					/>
				</div>
		    </div>
		    <p className="text-xs text-danger pl-2 pt-1">{error}</p>
	    </div>
    );
};

export default AmountInput;
