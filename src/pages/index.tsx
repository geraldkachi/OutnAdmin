import React from 'react';
import Layout from "@/components/layouts";
import {useRouter} from "next/router";
import {withAuth} from "@/hoc/with-auth";
import {useApp} from "@/store/contexts/app-context";
import {KEY} from "@/config";
import Link from "next/link";
import Table from "@/components/global/table";

type DashboardProps = {}

const Home: React.FC<DashboardProps> = (props) => {
    const {} = props;
    const router = useRouter();
    const {user} = useApp();

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
                    header={[""]}
                    data={[]}
                    statusIndex={2}
                    title={"New Events"}
                    emptyText={"No new events"}
                />
            </div>
        </Layout>
    );
};

export default withAuth(Home);
