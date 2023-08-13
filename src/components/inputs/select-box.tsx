import React, {useState,useEffect} from 'react';
import {Checkbox, Svg} from "@/components/rn-alpha";

type SelectBoxProps = {
	selected:boolean
	setSelected:(value:boolean)=>void
	icon: string
	iconClass?: string
	text: string
}

const SelectBox: React.FC<SelectBoxProps> = (props) => {
    const {selected, setSelected, icon, iconClass, text} = props;
    return (
	    <div className={`box ${selected?'box-checked':'box-uncheck'}`} onClick={()=>setSelected(true)}>
		    <div className="absolute top-2 right-2">
			    <Checkbox selected={selected} setSelected={setSelected} color={"secondary"}/>
		    </div>
		    <Svg icon={icon} className={`${iconClass||'w-10'} ${selected?'text-secondary':'text-[#667085]'}`}/>
		    <p className={`text-center text-sm mt-5 ${selected?'text-secondary':'text-[#667085]'}`}>
			    {text}
		    </p>
	    </div>
    );
};

export default SelectBox;
