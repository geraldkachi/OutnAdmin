import React, {useState,useEffect} from 'react';
import {Checkbox, Loader, SearchInput, Svg} from "@/components/rn-alpha";
import {filter, issuer as Icon} from "@/svg/icons";
import {bank, chevronDown} from "@/utils/icons/icons";
import {KEY} from "@/config";
import Modal from "@/components/global/modal";
import spinner from "@/svg/spinner";
import modal from "@/components/global/modal";

type CustomSelectProps = {
	placeholder?:string
	value?:string
	setValue:(value:string)=>void
	options:{label:string, value:string}[]
	className?:string
	cs?:string
	label?:string
	error?:string | any
	disabled?:boolean
	mt?:number,
	loading?:boolean
}

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
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
		className,
		loading
	} = props;

	const [selected,setSelected] = useState("");

	const [open,setOpen] = useState(false);
	const [filter,setFilter] = useState("");

	const onSelect=(value:string)=>{
		setSelected(value)
		setValue(value)
		setOpen(false)
	}

	const showSelected=(value?:string)=>{
		const option = options.filter((r)=>r.value === value)?.[0]
		if (option) return option.label;
		return placeholder
	}

	const list = options.filter((r)=>(r.label.toLowerCase().indexOf(filter.toLowerCase()) > -1));

    return (
        <div style={{marginTop:mt}} className={cs}>
	        {label&&(
		        <label htmlFor="" className="label">{label}</label>
	        )}
	        <div
		        className={`${error?"border-danger":""} ${className} border rounded-md flex-item px-4 gap-5 mt-1 cursor-pointer bg h-14`}
		        onClick={()=>setOpen(prevState => !prevState)}
	        >
		        {/*<Svg icon={Icon} className="w-5"/>*/}
		        <div className="flex-1 py-5">
			        <p className={`text-sm text ${selected?"text":"text-medium"}`}>{showSelected(selected)}</p>
		        </div>

		        <div className="shrink-0 flex-center">
			        <button onClick={()=>setOpen(prevState => !prevState)}>
				        {loading?
					        <Svg icon={spinner} className="w-4 text-[#667085]"/>:
					        <Svg icon={chevronDown} className="w-5 text-[#667085]"/>
						}
			        </button>
		        </div>
	        </div>
	        <Modal
		        modal={open}
		        setModal={setOpen}
		        className="py-5 max-w-md"
		        close
	        >
		        <div className="px-5">
			        <h3 className="font-bold mb-5">{placeholder || "Select"}</h3>
			        <SearchInput autoFocus={open} filter={filter} setFilter={setFilter}/>
		        </div>
		        <div className="bg mt-2 max-h-half overflow-y-auto">
			        {loading&&(
				        <Loader loading/>
			        )}
			        {!loading && list.length < 1&&(
				        <p className="text-sm text-medium text-center">No record found</p>
			        )}
			        {list.map((item, i)=>(
				        <div
					        onClick={()=>onSelect(item.value)}
					        key={KEY+i}
					        className={`flex-item ${i!==0&&'border-t'} gap-4 px-5 py-3 cursor-pointer hover:bg-medium-shade`}
				        >
					        <div className="flex-1">
						        <p className="text-sm">{item.label}</p>
					        </div>
					        <Checkbox
						        selected={selected===item.value}
						        setSelected={()=>onSelect(item.value)}
						        color={"secondary"}
					        />
				        </div>
			        ))}
		        </div>
	        </Modal>
        </div>
    );
};

export default CustomSelect;
