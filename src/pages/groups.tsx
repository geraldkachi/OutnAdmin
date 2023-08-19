import React, {useState,useEffect} from 'react';
import {useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Layout from "@/components/layouts";
import Table from "@/components/global/table";

type GroupsProps = {}

const Groups: React.FC<GroupsProps> = (props) => {
    const {loading,error,data, fetchMore} = useQuery(PATHS.users, {networkPolicy:"network-and-cache"})
    return (
        <Layout title={"Groups"}>
            <Table
                header={["Name","Email","Verified","Preference"]}
                data={data?.data?.map((item:any)=>(
                    [
                        item.name,
                        item.email,
                        item.verified?"Yes":"No",
                        item.preference.length,
                    ]
                ))}
                title={"Groups"}
                emptyText={"No records found"}
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

export default Groups;
