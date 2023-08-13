import React from 'react';
import Layout from "@/components/layouts";
import {useRouter} from "next/router";
import {withAuth} from "@/hoc/with-auth";
import {useApp} from "@/store/contexts/app-context";
import Visibility from "@/components/layouts/visibility";

type DashboardProps = {}

const Home: React.FC<DashboardProps> = (props) => {
    const {} = props;
    const router = useRouter();
    const {user} = useApp();

    return (
        <Layout title={"Home"}>
            <div></div>
        </Layout>
    );
};

export default withAuth(Home);
