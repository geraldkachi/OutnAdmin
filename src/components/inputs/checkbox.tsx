import React from 'react';

export type CheckboxProps = {
    selected:boolean
    setSelected?:(value:boolean)=>void
    color:"secondary"|"primary"|"success"|'danger'|string
    box?:boolean
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    let {box, color="primary", selected, setSelected} = props;

    return (
        <div
            role={"button"}
            className={`h-6 w-6 ${box?'rounded':'rounded-full'} ${selected?`bg-${color}`:'bg'} flex-center border border-gray-600 select-none`}
            onClick={()=>setSelected?.(!selected)}
        >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.990234 4.00001L3.42079 6.43057L8.2819 1.56946" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
};

export default Checkbox;
