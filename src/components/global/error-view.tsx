import React, {useState,useEffect} from 'react';
import Button from "../inputs/button";
import {Svg} from "@/components/rn-alpha";
import {errorIcon} from "@/svg/icons";

export type ErrorViewProps = {
    onClick:()=>void
    error?:string
    className?:string
}

const ErrorView: React.FC<ErrorViewProps> = ({onClick,error,className}) => {
    return (
        <div className={className}>
            {!!error&&(
                <div className="flex-center flex-col gap-5">
                    <Svg icon={errorIcon} className="w-20"/>
                    <p className="text-center text-base text-danger">
                        {error.includes("fetch")?"Your internet is not stable. Please check your internet and try again":error}
                    </p>
                    <div className="flex-center">
                        <Button
                            title={"Retry"}
                            className={"mt-4 btn-primary"}
                            onClick={onClick}
                            // icon={retry}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ErrorView;
