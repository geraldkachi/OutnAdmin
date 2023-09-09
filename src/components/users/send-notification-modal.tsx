import React from 'react';
import {Button, Formik, Input, useMutation, Yup} from "@/components/rn-alpha";
import Textarea from "@/components/inputs/textarea";
import Modal from "@/components/global/modal";
import {ModalProps} from "@/types";
import PATHS from "@/paths";
import {useApp} from "@/store/contexts/app-context";

type SendNotificationModalProps = {}

const SendNotificationModal: React.FC<SendNotificationModalProps&ModalProps> = (props) => {
    const {modal, setModal} = props;
	const {mutate, loading:isLoading} = useMutation(PATHS.notification);
	const {Toast} = useApp();

	const formHandler=(values:any)=>{
		mutate(values).then(({data,status,error})=>{
			if (status===200){
				Toast("Notification Sent")
			}else {
				Toast(error||"","red")
			}
		})
	}

	const Schema = Yup.object().shape({
		title:Yup.string().required('Title is required'),
		message:Yup.string().required('Message is required'),
	});

    return (
        <>
	        <Modal modal={modal} setModal={setModal} className="max-w-xl" close>
		        <Formik
			        initialValues={{
				        title:"",
				        message:"",
				        url:"",
				        category:""
			        }}
			        onSubmit={(values => formHandler(values))}
			        validationSchema={Schema}
			        validateOnBlur={false}
			        validateOnChange={false}
		        >
			        {({ handleChange, handleBlur, handleSubmit, values, errors,setFieldValue }) => (
				        <div className="flex flex-col gap-5 p-10">
					        <h1 className="">Send Push Notification</h1>
					        <Input
						        setValue={(value)=>{setFieldValue("title",value)}}
						        value={values.title}
						        error={errors.title}
						        label={"Title"}
					        />
					        <Textarea
						        setValue={(value)=>{setFieldValue("message",value)}}
						        value={values.message}
						        error={errors.message}
						        label={"Message"}
					        />
					        <Button
						        title={"Send"}
						        className={"btn-primary"}
						        onClick={handleSubmit}
						        loading={isLoading}
					        />
				        </div>
			        )}
		        </Formik>
	        </Modal>
        </>
    );
};

export default SendNotificationModal;
