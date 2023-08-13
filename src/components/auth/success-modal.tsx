import React from 'react';
import {ModalProps} from "@/types";
import {Button, Svg} from "@/components/rn-alpha";
import {useRouter} from "next/router";
import {check} from "@/utils/icons/icons";

type SignUpSuccessProps = {
    title:string
    text:string
    btn: {
        text:string,
        href:string
    }
}

const SuccessModal: React.FC<SignUpSuccessProps&ModalProps> = (props) => {
    const {modal, title, text, btn} = props;
    const router = useRouter();

    return (
        <>
            {modal&&(
                <div className="fixed inset-0 z-1000 flex-center px-2" style={{background:"linear-gradient(170.9deg, #00B7DD -16.98%, #083473 128.65%)"}}>
                    <div className="container bg rounded-lg px-5 lg:px-10 py-10 max-w-md flex-center flex-col">
                        <div className="w-20 h-20 bg-success rounded-full flex-center">
                            <Svg icon={check} className="w-10 text-white"/>
                        </div>
                        <h1 className="text-center text-2xl mt-4">{title}</h1>
                        <p className="text-center mt-4 text-[#667085]">{text}</p>
                        <Button
                            title={btn.text}
                            className={"mt-5 btn-primary"}
                            onClick={()=>router.push(btn.href)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SuccessModal;
