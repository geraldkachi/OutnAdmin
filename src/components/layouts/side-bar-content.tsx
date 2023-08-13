import React from 'react';
import Svg from "@/components/global/svg";
import {useRouter} from "next/router";
import {
	disburse,
	home, issuers,
	payment,
	profile,
	request,
	settings, vendors,
} from "@/svg/menu";
import {logout} from "@/svg/icons";
import {useApp} from "@/store/contexts/app-context";
import {quick2} from "@/svg/quick";

type SideBarContentProps = {}

const SideBarContent: React.FC<SideBarContentProps> = (props) => {
    const {} = props;
	const router = useRouter();
	const {user} = useApp();

	const list = [
		{
			name:"Home",
			icon:home,
			path:"/",
			width:"w-5",
			roles:"*",
			exclude: ""
		},
		{
			name:"Users",
			icon:vendors,
			path:"/users",
			width:"w-5",
			roles:"BackOffice",
			exclude: ""
		},
		{
			name:"Requests",
			icon:payment,
			path:"/funding-requests",
			width:"w-5",
			roles:"FundingPartner",
			exclude: ""
		},
		{
			name:"Requests",
			icon:quick2,
			path:"/requests",
			roles:"*",
			exclude: "FundingPartner",
			width:"w-5",
		},
		{
			name:"Commitments",
			icon:quick2,
			path:"/commitments",
			roles:"FundingPartner",
			exclude: "",
			width:"w-5",
		},
		{
			name:"Payables",
			icon:payment,
			path:"/payables",
			roles:"Issuer, BackOffice",
			exclude: "",
			width:"w-5",
		},
		{
			name:"Receivables",
			icon:disburse,
			path:"/receivables",
			roles:"BackOffice, FundingPartner",
			exclude: "",
			width:"w-5",
		},
		{
			name:"Repayments",
			icon:disburse,
			path:"/repayments",
			roles:"Vendor",
			exclude: "",
			width:"w-5",
		},
		{
			name:"Profile",
			icon:profile,
			path:"/profile",
			roles:"*",
			exclude: ""
		},
		{
			name:"Settings",
			icon:settings,
			path:"/settings",
			roles:"*",
			exclude: ""
		}
	]

	return (
        <div className="">
	        <div className="flex flex-col gap-3">
		        {list.map((item,i)=>{
			        const active = router.pathname===item.path
			        if ((item.roles.includes(user.Type||"")||item.roles.includes("*"))&&!item.exclude.includes(user.Type||"")) {
				        return (
					        <div key={"menu"+i} role={"button"}
					             onClick={()=>router.push(item.path)}
					             className={`flex-item px-6 lg:px-9 py-5 ${active?"bg-[#E7F7FF] border-r-4":"bg"} hover:bg-medium-shade group border-secondary`}
					        >
						        <Svg className={`${active?"text-secondary":"text-medium"} group-hover:text-medium ${item.width||"w-4"}`} icon={item.icon}/>
						        <p className={`${active?"text-secondary":"text"} group-hover:text-medium ml-4 flex-1`}>{item.name}</p>
					        </div>
				        )
			        }
		        })}
	        </div>

	        {/*<div className="absolute bottom-10">
		        <div role={"button"}
		             onClick={()=>router.push("/logout")}
		             className={`flex-item px-6 lg:px-9 py-5`}
		        >
			        <Svg className={`text-medium w-5`} icon={logout}/>
			        <p className={`text-medium font-semibold ml-4 flex-1`}>Logout</p>
		        </div>
	        </div>*/}
        </div>
    );
};

export default SideBarContent;
