import React, {useState,useEffect} from 'react';
import {useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Layout from "@/components/layouts";
import Table from "@/components/global/table";

type CategoriesProps = {}

const Categories: React.FC<CategoriesProps> = (props) => {
    const {loading,error,data, fetchMore} = useQuery(PATHS.categories, {networkPolicy:"network-and-cache"})
    return (
        <Layout title={"Categories"}>
            <Table
                header={["Name","Color"]}
                data={data?.map((item:any)=>(
                    [
                        item.name,
                        item.color,
                    ]
                ))}
                title={"Categories"}
                emptyText={"No records found"}
                loading={(loading && !data)}
            />
        </Layout>
    );
};

export default Categories;
