import React, {useState,useEffect} from 'react';

type StatusViewProps = {
	text:string
	color?:'warning'|'success'|'primary'|'danger'|'sencondary'
}

const StatusView: React.FC<StatusViewProps> = (props) => {
    let {text, color} = props;
	const defaultColor =()=>{
		text = text.toLowerCase();
		switch (text) {
			case "pending": return "warning";
			case "verified": return "success";
			case "active": return "primary";
			case "inactive": return "warning";
			case "underreview": return "secondary";
			case "approved": return "primary";
			case "open": return "success";
			case "new": return "warning";
			case "confirmed": return "success";
			case "paid": return "green-800";
			case "issuer-verified": return "primary";
			case "issuer-declined": return "danger";
			case "disbursed": return "success";
			case "offeraccepted": return "primary";
			case "offerdeclined": return "danger";
			case "declined": return "danger";
			default: return "medium";
		}
	}

    return (
        <>
	        <div className="flex-item gap-2">
		        <div className={`w-1.5 h-1.5 rounded bg-${color||defaultColor()}`}/>
		        <p className={`text-sm text-${color||defaultColor()} capitalize`}>{text}</p>
		        <div className="bg-warning bg-success bg-danger text-warning text-success text-danger bg-medium text-green-800 bg-green-800"/>
	        </div>
        </>
    );
};

export default StatusView;
