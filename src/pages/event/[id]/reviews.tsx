import React, {useState,useEffect} from 'react';
import Layout from "@/components/layouts";
import {Loader, Svg, useQuery} from "@/components/rn-alpha";
import {star} from "@/utils/icons/icons";
import PATHS from "@/paths";
import {useRouter} from "next/router";

type ReviewsProps = {}

const Reviews: React.FC<ReviewsProps> = (props) => {
    const {} = props;
	const router = useRouter();
	const {loading,error,data} = useQuery(PATHS.reviews, {variables:{eventId: router.query.id}, networkPolicy:"network-and-cache"})

    return (
        <Layout>
	        <div className="container max-w-3xl">
		        <h1 className="text-2xl">Reviews</h1>
		        {data?.map((item:any)=>(
			        <div className="mt-5 bg p-5">
				        <div className="flex-item gap-4">
					        <div className="w-10 h-10 bg-shade rounded-full"/>
					        <p className="font-bold text-base -ml-2">{item.user.name}</p>
					        <div className="flex-item gap-2">
						        <Svg icon={star} className="w-5 text-primary"/>
						        <p>{item.rate}</p>
					        </div>
					        <p className="font-bold text-base mt-2">Attended: {item.attended?"Yes":"No"}</p>
				        </div>
				        <p className="text-base text mt-2">{item.comment}</p>
			        </div>
		        ))}
		        <Loader loading={(loading && (!data || data?.length < 1))}/>
	        </div>
        </Layout>
    );
};

export default Reviews;

export async function getServerSideProps({query}:any) {
	return {
		props: { query }
	}
}
