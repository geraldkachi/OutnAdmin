import React from 'react';
import Layout from "@/components/layouts";
import {useRouter} from "next/router";
import {withAuth} from "@/hoc/with-auth";
import {useApp} from "@/store/contexts/app-context";
import Link from "next/link";
import Table from "@/components/global/table";
import {useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Analytics from "@/components/home/analytics";

type DashboardProps = {}

const Home: React.FC<DashboardProps> = (props) => {
    const {} = props;
    const router = useRouter();
    const {user} = useApp();
    const {loading,error,data, fetchMore} = useQuery(PATHS.events, {variables:{approved:false}, networkPolicy:"network-and-cache"})

    return (
        <Layout title={"Home"}>
            <Analytics/>
            <div className="mt-10">
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
                    title={"Pending Events"}
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
            </div>
        </Layout>
    );
};

export default withAuth(Home);
