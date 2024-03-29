import React, {useState,useEffect} from 'react';
import Head from "next/head";

export type HtmlHeadProps = {
    title?:string
}

const HtmlHead: React.FC<HtmlHeadProps> = (props) => {
    const {title} = props;

    return (
        <>
            <Head>
                <title>{title||"Out N About"}</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"/>
            </Head>
        </>
    );
};

export default HtmlHead;
