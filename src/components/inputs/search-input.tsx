import React, {useState,useEffect} from 'react';
import IconBtn from "../global/icon-btn";
import {close} from "@/svg/icons";

export type SearchInputProps = {
    filter:string
    setFilter:(value:string)=>void
    placeholder?:string
    autoFocus?:boolean
}

const SearchInput: React.FC<SearchInputProps> = (props) => {

    const {
        setFilter,
        filter,
        placeholder,
        autoFocus
    } = props;

    return (
        <div className="border flex-item pl-2 rounded-md overflow-hidden">
            <div className="w-5">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.89258 1.5C3.85501 1.5 1.39258 3.96243 1.39258 7C1.39258 10.0376 3.85501 12.5 6.89258 12.5C8.05751 12.5 9.13786 12.1378 10.0272 11.5199L13.3144 14.836L14.7347 13.428L11.4361 10.1004C12.0396 9.21764 12.3926 8.15004 12.3926 7C12.3926 3.96243 9.93014 1.5 6.89258 1.5ZM6.89258 3.5C8.82557 3.5 10.3926 5.067 10.3926 7C10.3926 8.933 8.82557 10.5 6.89258 10.5C4.95958 10.5 3.39258 8.933 3.39258 7C3.39258 5.067 4.95958 3.5 6.89258 3.5Z" fill="#667085"/>
                </svg>
            </div>
            <div className="flex-1">
                <input
                    autoFocus={autoFocus}
                    onChange={(e)=>{setFilter(e.target.value)}}
                    className={"text text-sm flex-1 py-3 px-2 w-full appearance-none outline-none"}
                    type={'search'}
                    value={filter}
                    placeholder={placeholder||"Search"}
                />
            </div>
            {filter?.length>0&&(
                <IconBtn
                    icon={close}
                    className="text-medium text-2xl"
                    onClick={()=>setFilter("")}
                />
            )}
        </div>
    );
};

export default SearchInput;
