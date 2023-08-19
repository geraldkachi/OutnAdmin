import React, {useState,useEffect} from 'react';
import Layout from "@/components/layouts";
import {useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Link from "next/link";
import Table from "@/components/global/table";

type EventsProps = {}

const Events: React.FC<EventsProps> = (props) => {
    const {} = props;
	const {loading,error,data, fetchMore} = useQuery(PATHS.events, {variables:{approved:true}, networkPolicy:"network-and-cache"})

	console.log(data);
	return (
        <Layout title={""}>
	        <Table
		        header={["title","date","organiser","email","category","location","Action"]}
		        data={data?.events.map((item:any)=>(
			        [
				        item.title,
				        item.date,
				        item.organiser,
				        item.email,
				        <div style={{background:item.category.color}} className="text-white py-1 px-3 rounded-full text-center">{item.category.name}</div>,
				        item.location,
				        <div>
					        <Link href={`/event/${item._id}`}>
						        <span className="text-primary">View</span>
					        </Link>
				        </div>,
			        ]
		        ))}
		        title={"Events"}
		        emptyText={"No new events"}
		        loading={(loading && (!data || data?.pagination.dataCount < 1))}
		        offsetType={"paginate"}
		        pagination={{
			        limit: data?.pagination.limit,
			        total: data?.pagination.total,
			        dataCount: data?.pagination.dataCount,
			        fetchMore,
			        paginationKey: "events"
		        }}
	        />
        </Layout>
    );
};

export default Events;
