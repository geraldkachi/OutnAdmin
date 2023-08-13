import React, {useState, useEffect, ReactElement} from 'react';
import {ModalProps} from "@/types";
import {Svg} from "@/components/rn-alpha";
import {close as closeIcon} from "@/svg/icons";

type Props = {
    children: React.ReactNode
    close?:boolean
    className?:string
    align?:"flex-center"|"py-10"|"py-20"
}

const Modal: React.FC<Props&ModalProps> = (props) => {
    const {
        children,
        modal,
        setModal,
        close,
        className,
        align="flex-center"
    } = props;

    useEffect(()=>{
        if (modal){
            document.body.classList.add("overflow-hidden")
        }else {
            document.body.classList.remove("overflow-hidden")
        }
    },[modal]);

    return (
        <>
            {modal&&(
                <div className={`fixed inset-0 bg-modal z-2000 px-2 ${align} overflow-y-auto`}>
                    <div className={`${className} container bg rounded-lg z-10 relative`}>
                        {close&&(
                            <div className="absolute top-5 right-2">
                                <div
                                    role={"button"}
                                    onClick={()=>{setModal(false)}}
                                    className="w-8 h-8 flex-center rounded-full"
                                >
                                    <Svg icon={closeIcon} className="w-5 text"/>
                                </div>
                            </div>
                        )}
                        {children}
                    </div>
                    <div className="absolute inset-0" onClick={()=>setModal(false)}/>
                </div>
            )}
        </>
    );
};

export default Modal;
