import React, {useState,useEffect} from 'react';

type TabBarProps = {
	options:{label:string, value:string}[]
	tab: string
	setTab:(value:string)=>void
}

const TabBar: React.FC<TabBarProps> = (props) => {
    const {options,tab, setTab} = props;
    return (
	    <div className="flex gap-5">
		    {options.map((item,i)=>(
			    <div
				    onClick={()=>setTab(item.value)}
				    key={"liste"+i}
				    className={`py-3 font-semibold px-2 cursor-pointer flex-center flex-col text-sm ${tab===item.value?'text-primary':'text'}`}
			    >
				    <p className="whitespace-nowrap">{item.label}</p>
					{tab===item.value&&(
						<div className="w-1.5 h-1.5 bg-primary rounded mt-1 self-center"/>
					)}
			    </div>
		    ))}
	    </div>
    );
};

export default TabBar;
