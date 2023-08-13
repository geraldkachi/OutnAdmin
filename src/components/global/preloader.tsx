import React, {useState,useEffect} from 'react';
import Image from "next/image";
import Svg from "@/components/global/svg";
import spinner from "@/svg/spinner";

export type PreloaderProps = {
    loading:boolean
}

const Preloader: React.FC<PreloaderProps> = ({loading}) => {
    return (
        <>
            {loading&&(
                <div className="fixed z-2000 inset-0 font-sans bg-[#FFFFFFC6]">
                    <div className="w-full h-full flex-center px-5">
                        <Svg icon={spinner} className="w-10 text-primary"/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Preloader;
