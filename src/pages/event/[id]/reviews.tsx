import React, {useState,useEffect} from 'react';
import Layout from "@/components/layouts";
import {Svg} from "@/components/rn-alpha";
import {star} from "@/utils/icons/icons";

type ReviewsProps = {}

const Reviews: React.FC<ReviewsProps> = (props) => {
    const {} = props;
    return (
        <Layout>
	        <div className="container">
		        <div className="">
			        <div className="flex-item gap-4">
				        <p className="font-bold text-lg">Name</p>
				        <div className="flex-item gap-2">
					        <Svg icon={star} className="w-5 text-primary"/>
					        <p>5</p>
				        </div>
			        </div>
			        <p className="text-base text mt-4">comment</p>
		        </div>
	        </div>
        </Layout>
    );
};

export default Reviews;
