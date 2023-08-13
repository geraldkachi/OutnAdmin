import React from 'react';
import {useRouter} from "next/router";

export type GoBackProps = {
    text:string
    href?:string
    className?:string
}

const GoBack: React.FC<GoBackProps> = ({text,href,className}) => {
    const router = useRouter();

    return (
        <>
            <div
                onClick={()=> {
                    href?router.push(href):router.back()
                }}
                role={"button"}
                className={`${className} flex-item`}
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4406 7.50002H1.77393M1.77393 7.50002L7.60726 13.3334M1.77393 7.50002L7.60726 1.66669" stroke="#002B44" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="ml-2 text-sm text2">{text}</p>
            </div>
        </>
    );
};

export default GoBack;
