import React, {useState,useEffect} from 'react';
import {Button, Formik, Input, useMutation, useQuery, Yup} from "@/components/rn-alpha";
import PATHS from "@/paths";
import {useApp} from "@/store/contexts/app-context";
import Logo from "@/components/layouts/logo";
import Textarea from "@/components/inputs/textarea";
import CustomSelect from "@/components/inputs/custom-select";

type EventProps = {}

const Event: React.FC<EventProps> = (props) => {
	const {} = props;
	const {mutate,loading} = useMutation(PATHS.createEvent)
	const {loading:isLoading,error,data} = useQuery(PATHS.categories)
	const [state,setState] = useState({email:"", organiser:""});
	const [key,setKey] = useState(0);

	const {Toast, showAlert} = useApp();

	const formHandler=(values:any)=>{
		const date = values.date.split("-");
		setState(values)
		mutate({
			...values,
			date: `${date[1]}-${date[2]}-${date[0]}`
		}).then(({data,status,error})=>{
			if (status===201){
				setKey(prevState => prevState+1)
				showAlert({
					title:"Submitted Successfully",
					text:"We have received your request, we will get back to you as soon as possible",
					btn:{text:"Add New Event"},
					color:"bg-primary"
				})
			}else {
				Toast(error||"", "red")
			}
		})
	}

	const Schema = Yup.object().shape({
		title:Yup.string().required('Title is required'),
		email:Yup.string().required('Email is required'),
		date:Yup.string().required('Date is required'),
		startTime:Yup.string().required('Time is required'),
		description:Yup.string().required('Description is required'),
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
		<div key={key} className="fixed inset-0 overflow-y-auto py-10 px-2" style={{background:"linear-gradient(170.9deg, #5e4ff1 -16.98%, #4f9df1 128.65%)"}}>
			<div className="container max-w-3xl py-5 px-5 lg:px-10 bg rounded">
				<div className="relative">
					<Logo/>
					<div className="absolute inset-0 py-2">
						<h1 className="text-xl text-center uppercase">Create an Event</h1>
					</div>
				</div>

				<Formik
					initialValues={{
						title:"",
						email:state.email,
						date:"",
						startTime:"",
						endTime:"",
						description:"",
						category:"",
						location:"",
						organiser:state.organiser,
						theme:"",
						music:"",
						dressCode:"",
						ticketURL:"",
						additionalInfo:""
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

							<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
								<Input
									setValue={(value)=>{setFieldValue("date",value)}}
									label={"Date"}
									required
									type={"date"}
									value={values.date}
									error={errors.date}
									min={new Date().toISOString().slice(0,10)}
								/>
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

							<Button
								title={"Submit"}
								className={"btn-primary mt-10"}
								onClick={handleSubmit}
								loading={loading}
							/>
						</div>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Event;
