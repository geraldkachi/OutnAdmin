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
        href?:string,
        onClick?:()=>void
    }
}

const SuccessModal: React.FC<SignUpSuccessProps&ModalProps> = (props) => {
    const {modal, title, text, btn} = props;
    const router = useRouter();

    return (
        <>
            {modal&&(
                <div className="fixed inset-0 z-1000 flex-center px-2 bg-modal">
                    <div className="container bg rounded-lg px-5 lg:px-10 py-10 max-w-md flex-center flex-col">
                        <div className="w-20 h-20 bg-success rounded-full flex-center">
                            <Svg icon={check} className="w-10 text-white"/>
                        </div>
                        <h1 className="text-center text-2xl mt-4">{title}</h1>
                        <p className="text-center mt-4 text-[#667085]">{text}</p>
                        <Button
                            title={btn.text}
                            className={"mt-5 btn-primary"}
                            onClick={()=> {
                                if (btn.href) {
                                    router.push(btn.href)
                                }else {
                                    btn.onClick?.()
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SuccessModal;
