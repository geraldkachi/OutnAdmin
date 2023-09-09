import React, {useState,useEffect} from 'react';
import Layout from "@/components/layouts";
import {Svg, useQuery} from "@/components/rn-alpha";
import {star} from "@/utils/icons/icons";
import PATHS from "@/paths";

type ReviewsProps = {}

const Reviews: React.FC<ReviewsProps> = (props) => {
    const {} = props;
	const {loading,error,data} = useQuery(PATHS.reviews)

    return (
        <Layout>
	        <div className="container bg max-w-3xl">
		        {data?.map((item:any)=>(
			        <div className="">
				        <div className="flex-item gap-4">
					        <p className="font-bold text-lg">{item.user.name}</p>
					        <div className="flex-item gap-2">
						        <Svg icon={star} className="w-5 text-primary"/>
						        <p>{item.rate}</p>
					        </div>
				        </div>
				        <p className="text-base text mt-4">{item.comment}</p>
			        </div>
		        ))}
	        </div>
        </Layout>
    );
};

export default Reviews;
