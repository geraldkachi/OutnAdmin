import React, {useState} from 'react';
import Svg from "@/components/global/svg";
import spinner from "@/svg/spinner";

export type ButtonProps = {
    title:string
    loading?:boolean
    className:string
    onClick?:()=>void
    disabled?:boolean
    icon?:any
    iconClassName?:string
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        title,
        disabled,
        loading,
        icon,
        className,
        onClick,
        iconClassName
    } = props;

    return (
        <>
            <button
                disabled={loading||disabled}
                onClick={onClick}
                type={"button"}
                className={`${className} btn`}
            >
                {loading&&(
                    <Svg icon={spinner} className="w-4"/>
                )}
                {icon&&(
                    <Svg icon={icon} className={`${iconClassName||'w-4'}`}/>
                )}
                {title}
            </button>
        </>
    );
};

export default Button;
