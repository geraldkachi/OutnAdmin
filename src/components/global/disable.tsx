import React from 'react';

export type DisableProps = {
    disabled:boolean
    className?:string
}

const Disable: React.FC<DisableProps> = ({disabled,className}) => {
    return (
        <div className={`${className} ${disabled?'fixed':''} inset-0`}/>
    );
};

export default Disable;
