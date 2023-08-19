import React from 'react';
import Layout from "@/components/layouts";
import {useRouter} from "next/router";
import {withAuth} from "@/hoc/with-auth";
import {useApp} from "@/store/contexts/app-context";
import {KEY} from "@/config";
import Link from "next/link";
import Table from "@/components/global/table";
import {Button, useQuery} from "@/components/rn-alpha";
import PATHS from "@/paths";

type DashboardProps = {}

const Home: React.FC<DashboardProps> = (props) => {
    const {} = props;
    const router = useRouter();
    const {user} = useApp();
    const {loading,error,data, fetchMore} = useQuery(PATHS.events, {variables:{approved:false}, networkPolicy:"network-and-cache"})

    const list = [
        { name:"Users", value:"23", path:"" },
        { name:"Events", value:"23", path:"" },
        { name:"New Events", value:"23", path:"" },
        { name:"Groups", value:"23", path:"" },
    ]

    return (
        <Layout title={"Home"}>
            <section className="grid gap-5 grid-cols-2 lg:grid-cols-4 py-5">
                {list.map((item,i)=>(
                    <Link href={""}>
                        <div key={KEY+i} className="shadow px-5 py-4 bg rounded-md">
                            <h4 className="text-2xl text-primary">{item.value}</h4>
                            <p className="text-bold mt-2 text-sm">{item.name}</p>
                        </div>
                    </Link>
                ))}
            </section>

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
                                <Link href={""}>
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
                        total: data?.pagination.limit,
                        dataCount: data?.pagination.dataCount,
                        fetchMore
                    }}
                />
            </div>
        </Layout>
    );
};

export default withAuth(Home);
