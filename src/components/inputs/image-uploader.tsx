import React, {useState, useEffect, useRef} from 'react';
import Svg from "../global/svg";
// import trash from "../../utils/icons/trash";
// import {upload} from "../../utils/icons/icons";
import {useApp} from "@/store/contexts/app-context";

export type ImageUploaderProps = {
    className?:string
    label?:string
    setFiles:any
}

const ImageUploader: React.FC<ImageUploaderProps> = ({className,setFiles,label}) => {
    const ref = useRef<any>();
    const input = useRef<any>();
    const [names,setNames] = useState<string[]>([]);
    // const {setAlert} = useApp();

    const convertBase64 = (file:any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const imageHandler=async (files:any)=>{
        for (const file of files) {
            if (file.size <= 500000){
                const base64 = await convertBase64(file)
                setFiles((prev:any)=>[...prev,base64])
                setNames((prev:any)=>[...prev,file.name])
            }else {
                // setAlert("File too big; max 500kb","red")
            }
        }
    };

    useEffect(()=>{
        const events = ['dragenter', 'dragover', 'dragleave', 'drop'];
        events.forEach(eventName => {
            ref.current?.addEventListener(eventName,action,false);
        });
        return()=>{
            events.forEach(eventName => {
                ref.current?.removeEventListener(eventName,action);
            });
        }
    },[]);

    const action=(e:any)=>{
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "drop"){
            imageHandler(e.dataTransfer.files);
        }
    };

    return (
        <div className={className}>
            {!!label&&(
                <label htmlFor="" className="text-gray-800 text-sm">{label}</label>
            )}
            <label htmlFor="image" className="">
                <div ref={ref} className="flex-center cursor-pointer px-5 py-8 bg-shade border border-dashed border-2 rounded-md mt-1">
                    {/*<Svg icon={upload}/>*/}
                    <p className="text-sm text-medium ml-2">Click to upload - PNG, JPG or PDF</p>
                </div>
            </label>
            <input
                id="image"
                ref={input}
                onChange={(e)=>imageHandler(e.target.files)}
                type="file"
                accept=".png,.jpg,.pdf"
                className="hidden"
                multiple
            />
            <div className="mt-1">
                {names.map((name,i)=>(
                    <div key={"file"+i} className="flex-between py-2">
                        <p className="text-xs text-primary">{name}</p>
                        <button onClick={()=> {
                            setNames(prevState => {
                                const spr = [...prevState];
                                spr.splice(i,1)
                                return spr
                            })
                            setFiles((prevState:any) => {
                                const spr = [...prevState];
                                spr.splice(i,1)
                                return spr
                            })
                            input.current.value=null
                        }}>
                            {/*<Svg icon={trash}/>*/}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
