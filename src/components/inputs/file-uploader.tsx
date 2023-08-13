import React, {useState, useEffect, useRef} from 'react';
import {Loader, Svg} from "@/components/rn-alpha";
import {trash, upload} from "@/svg/icons";
import {useApp} from "@/store/contexts/app-context";

type UploadFileProps = {
	className?:string
	label?:string
	setFiles:(files:any)=>void
	id?:string
	height?:number|string
	multiple?:boolean
	loading?:boolean
}

const FileUploader: React.FC<UploadFileProps> = (props) => {
	let {
		className,
		label,
		setFiles,
		id="image",
		height,
		multiple=true,
		loading
	} = props;

	const ref = useRef<any>();
	const input = useRef<any>();
	const [names,setNames] = useState<string[]>([]);
	const {Toast} = useApp();
	const [data,setData] = useState<any[]>([]);

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
				setData((prev:any)=>{
					const spr = [...prev,base64]
					setFiles(spr)
					return spr
				})
				setNames((prev:any)=>[...prev,file.name])
			}else {
				Toast("File too big; max 500kb","red")
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
			<label htmlFor={id} className="">
				<div ref={ref} style={{height}} className="flex-center gap-5 cursor-pointer px-5 py-8 bg-[#F4F4F4] border-dashed border-2 rounded-md mt-1">
					<Svg icon={upload} className="w-5 gap-5 text-medium"/>
					<p className="text-sm text-medium">Upload Document - PNG, JPG or PDF</p>
				</div>
			</label>
			<input
				id={id}
				ref={input}
				onChange={(e)=>imageHandler(e.target.files)}
				type="file"
				accept=".png,.jpg,.pdf"
				className="hidden"
				multiple={multiple}
			/>
			<div className="mt-1">
				{names.map((name,i)=>(
					<div key={"file"+i} className="flex-between py-2">
						<p className="text-xs text-secondary"> - {name}</p>
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
							<Svg icon={trash}/>
						</button>
					</div>
				))}
			</div>
			{loading&&(
				<Loader loading text={"Please wait..."}/>
			)}
		</div>
	);
};

export default FileUploader;
