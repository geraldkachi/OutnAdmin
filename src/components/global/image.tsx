import React, {useEffect, useState} from 'react';
// import http, {storagePath} from "../../utils/service";
import Svg from "./svg";
// import {camera} from "./svg/icons";

interface ImageProps {
    setImage:any
    name:string
    image:string
}

const Image: React.FC<ImageProps> = ({setImage,name,image}) => {
    const [loading,setLoading] = useState(false);

    const imageHandler=(files:any)=>{
        setLoading(true);
        let formData = new FormData();
        formData.append('image', files[0]);

        /*http(formData,storagePath+"api/upload").then((res:any)=>{
            if (res.success){
                setImage(res.url);
                sessionStorage.setItem(name,res.url);
            }
            setLoading(false);
        }).catch((e)=>{
            setLoading(false);
        })*/
    };

    useEffect(()=>{
        if (name){
            setImage(sessionStorage.getItem(name) || "")
        }
        const form = document.getElementById("upload");
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            form?.addEventListener(eventName,action,false);
        });
    },[]);

    const action=(e:any)=>{
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "drop"){
            imageHandler(e.dataTransfer.files);
        }
    };

    return (
        <div className="relative z-100">
            <input type="file" id="image" onChange={(e)=>imageHandler(e.target.files)} className="hidden"/>
            <label htmlFor="image" className="text-green-600 text-sm cursor-pointer w-full">
                {/*<div id="upload" className="mb-2 border-2 border-dashed h-52 w-full flex items-center justify-center bg-cover rounded bg-shade" style={{backgroundImage: `url(${storagePath+image+"?w=250&h=300"})`, backgroundSize:"100% 100%"}}>
                    <button onClick={()=>document.getElementById("image")?.click()}>
                        <IonIcon className="text-2xl text-medium" icon={cameraReverseOutline}/>
                        <Svg icon={camera} className="w-8 text-medium"/>
                    </button>
                </div>*/}
            </label>
            {loading&&(
                <div className="absolute inset-0">
                    {/*<Loader/>*/}
                </div>
            )}
        </div>
    );
};

export default Image;
