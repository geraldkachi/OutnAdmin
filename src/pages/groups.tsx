import React, {useState,useEffect} from 'react';
import {useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Layout from "@/components/layouts";
import Table from "@/components/global/table";

type GroupsProps = {}

const Groups: React.FC<GroupsProps> = (props) => {
    const {loading,error,data, fetchMore} = useQuery(PATHS.groups, {networkPolicy:"network-and-cache"})
    return (
        <Layout title={"Groups"}>
            <Table
                header={["Name","Members", "Events"]}
                data={data?.data?.map((item:any)=>(
                    [
                        item.name,
                        item.members||"N/A",
                        item.events||"N/A",
                    ]
                ))}
                title={"Groups"}
                emptyText={"No records found"}
                loading={(loading && (!data || data?.pagination?.dataCount < 1))}
                offsetType={"paginate"}
                pagination={{
                    limit: data?.pagination?.limit,
                    total: data?.pagination?.total,
                    dataCount: data?.pagination?.dataCount,
                    fetchMore,
                }}
            />
        </Layout>
    );
};

export default Groups;
