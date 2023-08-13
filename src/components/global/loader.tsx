import React, {useState,useEffect} from 'react';
import Svg from "./svg";
import spinner from "@/svg/spinner";

export type LoaderProps = {
    loading:boolean
    text?:string
}

const Loader: React.FC<LoaderProps> = ({loading, text}) => {
    return (
        <>
            {loading&&(
                <div className="flex-col-center py-4 flex-1">
                    <Svg icon={spinner} className="w-8 text-primary"/>
                    {text&&(
                        <p className="text-sm text-center mt-2">{text}</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Loader;
