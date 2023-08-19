import React, {useState,useEffect} from 'react';
import Link from "next/link";
import {KEY} from "@/config";
import {useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";

type AnalyticsProps = {}

const Analytics: React.FC<AnalyticsProps> = (props) => {
	const events = useQuery(PATHS.events, {variables:{approved:true}})
	const pending = useQuery(PATHS.events, {variables:{approved:false}})

	const list = [
		{ name:"Users", value:"0", path:"" },
		{ name:"Events", value:events.data?.events?.length||0, path:"" },
		{ name:"New Events", value:pending.data?.events?.length||0, path:"" },
		{ name:"Groups", value:"0", path:"" },
	]
    return (
	    <section className="grid gap-5 grid-cols-2 lg:grid-cols-4 py-5">
		    {list.map((item,i)=>(
			    <div key={KEY+i} className="shadow px-5 py-4 bg rounded-md">
				    <h4 className="text-2xl text-primary">{item.value}</h4>
				    <p className="text-bold mt-2 text-sm">{item.name}</p>
			    </div>
		    ))}
	    </section>
    );
};

export default Analytics;
