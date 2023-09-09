import React, {useState,useEffect} from 'react';
import Layout from "@/components/layouts";
import {useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Link from "next/link";
import Table from "@/components/global/table";

type EventsProps = {}

const Events: React.FC<EventsProps> = (props) => {
	const {loading,error,data, fetchMore} = useQuery(PATHS.events, {variables:{approved:true}, networkPolicy:"network-and-cache"})
	return (
        <Layout title={""}>
	        <Table
		        header={["title","date","organiser","category","views","clicks","shares","location","Action"]}
		        data={data?.events.map((item:any)=>(
			        [
				        item.title,
				        item.date,
				        item.organiser,
				        <div style={{background:item.category.color}} className="text-white py-1 px-3 rounded-full text-center">{item.category.name}</div>,
				        item.views,
				        item.clicks,
				        item.shares,
				        item.location,
				        <div className="flex-item gap-5">
					        <Link href={`/event/${item._id}`}>
						        <span className="text-primary">View</span>
					        </Link>
					        <Link href={`/event/${item._id}/reviews`}>
						        <span className="text-primary">Reviews</span>
					        </Link>
				        </div>
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
			        paginationKey:"events"
		        }}
	        />
        </Layout>
    );
};

export default Events;
