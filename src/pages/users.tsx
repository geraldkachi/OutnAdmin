import React, {useState,useEffect} from 'react';
import Layout from "@/components/layouts";
import {Button, useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Table from "@/components/global/table";
import SendNotificationModal from "@/components/users/send-notification-modal";

type UsersProps = {}

const Users: React.FC<UsersProps> = (props) => {
    const {loading,error,data, fetchMore} = useQuery(PATHS.users, {networkPolicy:"network-and-cache"})
    const [modal,setModal] = useState(false);

    return (
        <Layout title={"Users"}>
            <Table
                headerRight={
                    <Button
                        title={"Send Notification"}
                        className={"btn-primary w-auto"}
                        onClick={()=>{setModal(true)}}
                    />
                }
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
                    paginationKey: "data"
                }}
            />
            <SendNotificationModal modal={modal} setModal={setModal}/>
        </Layout>
    );
};

export default Users;
