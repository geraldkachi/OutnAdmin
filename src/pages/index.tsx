import React from 'react';
import Layout from "@/components/layouts";
import {useRouter} from "next/router";
import RecentRequests from "@/components/dashboard/recent-requests";
import Support from "@/components/support";
import TitleSection from "@/components/dashboard/title-section";
import {withAuth} from "@/hoc/with-auth";
import {useApp} from "@/store/contexts/app-context";
import Analytics from "@/components/dashboard/analytics";
import Visibility from "@/components/layouts/visibility";
import FundingRequest from "@/components/dashboard/funding-request";

type DashboardProps = {}

const Home: React.FC<DashboardProps> = (props) => {
    const {} = props;
    const router = useRouter();
    const {user} = useApp();

    return (
        <Layout title={"Home"}>
            <TitleSection
                title={`Welcome back, ${user?.Firstname}`}
                text={"Let’s help your business thrive"}
                btn={user.Type==="Vendor"?"Create Request":""}
                onClick={()=>{router.push("/requests/new")}}
            />

            <Analytics/>

            <Visibility types={["Vendor", "BackOffice", "Issuer"]} roles={[]}>
                <RecentRequests/>
            </Visibility>

            <Visibility types={["FundingPartner"]}>
                <FundingRequest/>
            </Visibility>

            <Support/>
        </Layout>
    );
};

export default withAuth(Home);
