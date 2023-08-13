import React, {useState,useEffect} from 'react';

export type AlertColors = 'blue'|'red'|'green'|'yellow'|'gray'

export type AlertProps = {
    alert:{key:any, message:string, color?:AlertColors, seconds:number}|any
}

const Alert: React.FC<AlertProps> = ({alert}) => {
    const [data,setData] = useState<any>({});

    useEffect(()=>{
        if (!!alert){
            setData((prevState:any) => ({
                ...prevState,
                [alert.key]:alert
            }))
            setTimeout(()=>(
                close(alert.key)
            ),1000*alert.seconds)
        }
    },[alert]);

    const close =(key:number)=>{
        setData((prevState:any) => {
            const spr = {...prevState}
            delete spr[key];
            return spr;
        })
    }

    return (
        <div className="fixed top-0 right-0 z-3000 gap-4 pt-5">
            {Object.keys(data).map((key:any,i)=>(
                <div key={"alert-border-"+i} className={`animate__animated animate__backInRight flex p-4 mb-4 bg-${data[key].color||'green'}-100 border-t-4 border-${data[key].color||'green'}-500 dark:bg-${data[key].color||'green'}-200`} role="alert">
                    <svg className={`flex-shrink-0 w-5 h-5 text-${data[key].color||'green'}-700`} fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"></path>
                    </svg>
                    <div className={`mx-3 text-sm font-medium text-${data[key].color||'green'}-700`}>
                        {data[key].message}
                    </div>
                    <button
                        type="button"
                        className={`ml-auto -mx-1.5 -my-1.5 bg-${data[key].color||'green'}-100 dark:bg-${data[key].color||'green'}-200 text-${data[key].color||'green'}-500 rounded-lg focus:ring-2 focus:ring-${data[key].color||'green'}-400 p-1.5 hover:bg-${data[key].color||'green'}-200 dark:hover:bg-${data[key].color||'green'}-300 inline-flex h-8 w-8`}
                        data-dismiss-target="#alert-border-1"
                        aria-label="Close"
                        onClick={()=>close(key)}
                    >
                        <span className="sr-only">Dismiss</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            ))}

            <div className="bg-blue-100 border-blue-500 dark:bg-blue-200 text-blue-700 text-blue-700 bg-blue-100 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-300"></div>
            <div className="bg-red-100 border-red-500 dark:bg-red-200 text-red-700 text-red-700 bg-red-100 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-300"></div>
            <div className="bg-green-100 border-green-500 dark:bg-green-200 text-green-700 text-green-700 bg-green-100 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-300"></div>
            <div className="bg-yellow-100 border-yellow-500 dark:bg-yellow-200 text-yellow-700 text-yellow-700 bg-yellow-100 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-300"></div>
            <div className="bg-gray-100 border-gray-500 dark:bg-gray-200 text-gray-700 text-gray-700 bg-gray-100 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-300"></div>
        </div>
    );
};

export default Alert;
