import React, {useState,useEffect} from 'react';
import Logo from "@/components/layouts/logo";
import {Button, Input} from "@/components/rn-alpha";

type EventProps = {}

const Event: React.FC<EventProps> = (props) => {
    const {} = props;
    return (
        <div className="fixed inset-0 overflow-y-auto py-10 px-2" style={{background:"linear-gradient(170.9deg, #5e4ff1 -16.98%, #4f9df1 128.65%)"}}>
            <div className="container max-w-3xl py-5 px-5 lg:px-10 bg rounded">
                <div className="relative">
                    <Logo/>
                    <div className="absolute inset-0 py-2">
                        <h1 className="text-2xl text-center">Create an Event</h1>
                    </div>
                </div>
                <div className="py-10 flex flex-col gap-5">

                    <Input
                        setValue={()=>{}}
                        value={""}
                        label={"Name"}
                    />

                    <Input
                        setValue={()=>{}}
                        value={""}
                        label={"Organizer"}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <Input
                            setValue={()=>{}}
                            value={""}
                            label={"Name"}
                        />
                        <Input
                            setValue={()=>{}}
                            value={""}
                            label={"Organizer"}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <Input
                            setValue={()=>{}}
                            value={""}
                            label={"Name"}
                        />
                        <Input
                            setValue={()=>{}}
                            value={""}
                            label={"Organizer"}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <Input
                            setValue={()=>{}}
                            value={""}
                            label={"Name"}
                        />
                        <Input
                            setValue={()=>{}}
                            value={""}
                            label={"Organizer"}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <Input
                            setValue={()=>{}}
                            value={""}
                            label={"Name"}
                        />
                        <Input
                            setValue={()=>{}}
                            value={""}
                            label={"Organizer"}
                        />
                    </div>

                    <Button title={"Submit"} className={"btn-primary mt-10"}/>

                </div>
            </div>
        </div>
    );
};

export default Event;
