import React, {useState} from 'react';
import {
	Button,
	Checkbox, dayjs,
	Formik,
	Input,
	Preloader,
	Select,
	Svg,
	useMutation,
	useQuery,
	Yup
} from "@/components/rn-alpha";
import PATHS from "@/paths";
import {useApp} from "@/store/contexts/app-context";
import Textarea from "@/components/inputs/textarea";
import CustomSelect from "@/components/inputs/custom-select";
import {withAuth} from "@/hoc/with-auth";
import {arrowBack} from "@/svg/icons";
import {useRouter} from "next/router";
import HtmlHead from "@/components/layouts/html-head";
import sweetalert from "@/utils/sweetalert";
import {KEY} from "@/config";
import timezones from "@/utils/timezones";

type EventViewProps = {}

const EventView: React.FC<EventViewProps> = (props) => {
	const {} = props;
	const router = useRouter();
	const {mutate,loading} = useMutation(PATHS.updateEvent)
	const {loading:isLoading,error,data} = useQuery(PATHS.categories)
	const event = useQuery(PATHS.event,{variables:{id:router.query.id}, networkPolicy:"network-and-cache"})
	const [key,setKey] = useState(0);

	const {Toast, showAlert} = useApp();

	const formHandler=(values:any)=>{
		sweetalert({
			title:"Approve",
			text:"You are about to approve this event",
			confirm:{text:"Approve"}
		}).then((okay)=>{
			if (okay){
				const date = values.date.split("-");
				mutate({
					...values,
					date: `${date[1]}-${date[2]}-${date[0]}`,
				}).then(({data,status,error})=>{
					if (status===200){
						Toast("Approved successfully")
						router.back()
					}else {
						Toast(error||"", "red")
					}
				})
			}
		})
	}

	const Schema = Yup.object().shape({
		title:Yup.string().required('Title is required'),
		email:Yup.string().required('Email is required'),
		date:Yup.string().required('Date is required'),
		startTime:Yup.string().required('Time is required'),
		description:Yup.string().optional(),
		category:Yup.string().required('Event type is required'),
		location:Yup.string().required('Location is required'),
		organiser:Yup.string().required('Organiser is required'),
		theme:Yup.string().optional(),
		music:Yup.string().optional(),
		dressCode:Yup.string().optional(),
		additionalInfo:Yup.string().optional(),
		ticketURL:Yup.string().required('TicketURL is required'),
	});

	return (
		<div key={loading?KEY:event.data?._id} className="fixed inset-0 overflow-y-auto py-10 px-2" style={{background:"linear-gradient(170.9deg, #5e4ff1 -16.98%, #4f9df1 128.65%)"}}>
			<HtmlHead/>
			<div className="container max-w-3xl py-5 px-5 lg:px-10 bg rounded">
				<div className="relative flex-item gap-10">
					<div onClick={()=>{router.back()}} className="z-10 w-10 h-10 flex-center cursor-pointer">
						<Svg icon={arrowBack} className="w-8"/>
					</div>
					<div className="absolute inset-0 py-2">
						<h1 className="text-xl text-center uppercase">EVENT</h1>
					</div>
				</div>

				<Formik
					initialValues={{
						title:"",
						email:"",
						startTime:"",
						endTime:"",
						description:"",
						category:"",
						location:"",
						organiser:"",
						theme:"",
						music:"",
						dressCode:"",
						ticketURL:"",
						additionalInfo:"",
						paid:false,
						...(event.data||{}),
						date:event?.data?.dateTime.slice(0,10)||"",
						approved:true,
						// @ts-ignore
						timezone:event?.data?.timezone||dayjs.tz.guess()
					}}
					onSubmit={(values => formHandler(values))}
					validationSchema={Schema}
					validateOnBlur={false}
					validateOnChange={false}
				>
					{({ handleChange, handleBlur, handleSubmit, values, errors,setFieldValue }) => (
						<div className="py-10 flex flex-col gap-5">

							<Input
								setValue={(value)=>{setFieldValue("title",value)}}
								label={"Event Title"}
								required
								value={values.title}
								error={errors.title}
							/>

							<Input
								setValue={(value)=>{setFieldValue("organiser",value)}}
								label={"Name of Organiser"}
								required
								value={values.organiser}
								error={errors.organiser}
							/>

							<Input
								setValue={(value)=>{setFieldValue("email",value)}}
								label={"Email Address"}
								type={"email"}
								required
								value={values.email}
								error={errors.email}
							/>

							<Textarea
								setValue={(value)=>{setFieldValue("description",value)}}
								label={"Write a short description about the event"}
								required
								value={values.description}
								error={errors.description}
							/>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
								<Input
									setValue={(value)=>{setFieldValue("theme",value)}}
									label={"Theme"}
									value={values.theme}
									error={errors.theme}
								/>
								<Input
									setValue={(value)=>{setFieldValue("music",value)}}
									label={"Music"}
									value={values.music}
									error={errors.music}
								/>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
								<CustomSelect
									options={data?.map((item:any)=>({label:item.name, value:item._id}))}
									loading={isLoading}
									setValue={(value)=>{setFieldValue("category",value)}}
									label={"Event Type"}
									placeholder={"Select Event Type"}
									required
									value={values.category}
									error={errors.category}
								/>
								<Input
									setValue={(value)=>{setFieldValue("dressCode",value)}}
									label={"Dress code"}
									value={values.dressCode}
									error={errors.dressCode}
								/>
							</div>

							<Input
								setValue={(value)=>{setFieldValue("date",value)}}
								label={"Date"}
								required
								type={"date"}
								value={values.date}
								error={errors.date}
								min={new Date().toISOString().slice(0,10)}
							/>

							<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
								<Input
									setValue={(value)=>{setFieldValue("startTime",value)}}
									label={"From"}
									required
									type={"time"}
									value={values.startTime}
									error={errors.startTime}
								/>
								<Input
									setValue={(value)=>{setFieldValue("endTime",value)}}
									label={"To"}
									type={"time"}
									value={values.endTime}
									error={errors.endTime}
								/>
								<Select
									setValue={(value)=>{setFieldValue("timezone",value)}}
									label={"Timezone"}
									options={timezones.map((item)=>({label:item, value:item}))}
									value={values.timezone}
									error={errors.timezone}
								/>
							</div>

							<Input
								setValue={(value)=>{setFieldValue("location",value)}}
								label={"Location"}
								required
								value={values.location}
								error={errors.location}
							/>

							<Input
								setValue={(value)=>{setFieldValue("ticketURL",value)}}
								label={"Ticket link"}
								required
								value={values.ticketURL}
								error={errors.ticketURL}
							/>

							<Input
								setValue={(value)=>{setFieldValue("additionalInfo",value)}}
								label={"Additional Info"}
								value={values.additionalInfo}
								error={errors.additionalInfo}
							/>

							<div className="flex-item gap-5">
								<p className="label">Paid Event</p>
								<Checkbox selected={values.paid} color={"primary"} box setSelected={(value)=>setFieldValue("paid",value)}/>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
								<Button
									title={"Cancel"}
									className={"bg border mt-10"}
									onClick={()=>router.back()}
									loading={loading}
								/>
								<Button
									title={"Approve"}
									className={"btn-primary mt-10"}
									onClick={handleSubmit}
									loading={loading}
								/>
							</div>
						</div>
					)}
				</Formik>
			</div>
			<Preloader loading={(event.loading && (!event.data))}/>
		</div>
	);
};

export default withAuth(EventView);

export async function getServerSideProps({query}:any) {
	return {
		props: { query }
	}
}
