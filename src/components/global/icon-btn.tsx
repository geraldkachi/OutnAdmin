import React, {useState} from 'react';
import Svg from "@/components/global/svg";

interface Interface {
    icon:any
    className?:string
    onClick?:any
    id?:string
}
const IconBtn: React.FC<Interface> = ({icon,className,onClick,id}) => {
    return (
        <>
            <button id={id} onClick={onClick} className={`hover:bg-medium-shade icon-btn ${className}`}>
                <Svg icon={icon} className="w-4"/>
            </button>
        </>
    );
};

export default IconBtn;
