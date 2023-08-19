import React, {useState,useEffect} from 'react';
import Layout from "@/components/layouts";
import {Button, Formik, Input, useMutation, useQuery, Yup} from "@/components/rn-alpha";
import PATHS from "@/paths";
import Table from "@/components/global/table";
import Link from "next/link";
import Modal from "@/components/global/modal";
import {useApp} from "@/store/contexts/app-context";
import Textarea from "@/components/inputs/textarea";

type UsersProps = {}

const Users: React.FC<UsersProps> = (props) => {
    const {loading,error,data, fetchMore} = useQuery(PATHS.users, {networkPolicy:"network-and-cache"})
    const [id,setId] = useState("");
    const {mutate, loading:isLoading} = useMutation(PATHS.notification);
    const {Toast} = useApp();

    const formHandler=(values:any)=>{
        mutate(values).then(({data,status,error})=>{
            if (status===200){
                Toast("Notification Sent")
            }else {
                Toast(error||"")
            }
        })
    }

    const Schema = Yup.object().shape({
        title:Yup.string().required('Title is required'),
        message:Yup.string().required('Message is required'),
    });

    return (
        <Layout title={"Users"}>
            <Table
                header={["Name","Email","Verified","Preference", "Action"]}
                data={data?.data?.map((item:any)=>(
                    [
                        item.name,
                        item.email,
                        item.verified?"Yes":"No",
                        item.preference.length,
                        <div>
                            <Button
                                title={"Send Notification"}
                                className={"btn-primary"}
                                onClick={()=>{setId(item._id)}}
                            />
                        </div>
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
                    paginationKey: "events"
                }}
            />

            <Modal modal={!!id} setModal={()=>setId("")} className="max-w-md">
                <Formik
                    initialValues={{
                        title:"",
                        message:"",
                    }}
                    onSubmit={(values => formHandler(values))}
                    validationSchema={Schema}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors,setFieldValue }) => (
                       <div className="flex flex-col gap-5 p-10">
                           <Input
                               setValue={(value)=>{setFieldValue("title",value)}}
                               value={values.title}
                               error={errors.title}
                               label={"Title"}
                           />
                           <Textarea
                               setValue={(value)=>{setFieldValue("value",value)}}
                               value={values.message}
                               error={errors.message}
                               label={"Message"}
                           />
                           <Button title={"Send"} className={"btn-primary"}/>
                       </div>
                    )}
                </Formik>
            </Modal>
        </Layout>
    );
};

export default Users;
