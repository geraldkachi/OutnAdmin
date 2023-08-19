import React, {useState,useEffect} from 'react';
import Layout from "@/components/layouts";
import {useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Table from "@/components/global/table";
import Link from "next/link";

type UsersProps = {}

const Users: React.FC<UsersProps> = (props) => {
    const {loading,error,data, fetchMore} = useQuery(PATHS.users, {networkPolicy:"network-and-cache"})
    return (
        <Layout title={"Users"}>
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
                title={"Users"}
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

export default Users;
