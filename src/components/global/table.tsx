import React, {useEffect, useState} from 'react';
import {Button, Loader, SearchInput, Svg} from "@/components/rn-alpha";
import {empty, filter as filterIcon, plus} from "@/svg/icons";
import {KEY} from "@/config";
import StatusView from "@/components/global/status-view";
import ReactPaginate from "react-paginate";
import {useRouter} from "next/router";

type TableProps = {
	header: string[]
	data: any[][]
	statusIndex: number
	title:string
	headerRight?:React.ReactNode
	headerLeft?:React.ReactNode
	enableFilter?:boolean
	emptyText:string
	offsetType?: "paginate"|"more"
	loading?:boolean
	className?:string
	pagination?:{
		total: number
		dataCount: number
		limit: number
		fetchMore:(variables?:any,concat?:'start'|'end'|'pagination', paginationKey?:string)=>Promise<any>
	}
	btn?:{
		text:string
		href?:string
		onClick?:()=>{}
	}
}

const Table: React.FC<TableProps> = (props) => {
    const {
	    header,
	    data,
	    statusIndex,
	    title,
	    headerRight,
	    enableFilter=true,
	    emptyText,
	    offsetType,
	    loading,
	    className,
	    pagination,
	    btn,
	    headerLeft
    } = props;

	const router = useRouter();

	const [itemOffset, setItemOffset] = useState(0);

	const total = pagination?.total||data?.length||0;
	const itemsPerPage = pagination?.limit||20;
	const endOffset = itemOffset + itemsPerPage;
	const pageCount = Math.ceil(total / itemsPerPage);
	const [filter,setFilter] = useState("");
	const [page,setPage] = useState(0);

	const handlePageClick = (event:any) => {
		const newOffset = (event.selected * itemsPerPage) % total;
		setPage(event.selected)
		setItemOffset(newOffset);

		if (list?.slice(newOffset, newOffset + itemsPerPage).length < 1){
			loadMore(event.selected)
		}
	};

	const list = data?.filter((r)=>{
		for (const item of r) {
			if (String(item).toLowerCase().indexOf(filter.toLowerCase()) > -1){
				return true
			}
		}
	})

	const currentItems = list?.slice(itemOffset, endOffset);

	const [load, setLoad] = useState(false);

	const loadMore=(page:number)=>{
		console.log({page});
		if (!load){
			setLoad(true);
			pagination?.fetchMore({ offset: page }, "pagination").then((data) => {
				console.log({data});
				setLoad(false);
			})
		}
	};

    return (
	    <section className={`${className} bg rounded-lg w-full pb-2`}>
		    <div className="flex-between flex-wrap py-4 px-5">
			    <div className="flex-item gap-2">
				    {title&&(
					    <h3 className="text-xl font-semibold">{title}</h3>
				    )}
				    {headerLeft}
			    </div>
			    <div className="flex-item gap-5 mt-2">
				    {enableFilter && data?.length>0&&(
					    <>
						    <SearchInput filter={filter} setFilter={setFilter}/>
						    {/*<div className="flex gap-2 bg-[#28A2D928] px-4 py-2 rounded">
							    <Svg icon={filterIcon} className="w-4 text-primary"/>
							    <p className="text-sm text-primary" color="rgba(251, 253, 255, 1)">Filter</p>
						    </div>*/}
					    </>
				    )}
				    {headerRight}
			    </div>
		    </div>

		    {loading&&(
				<div className="h-40 flex-center">
					<Loader loading/>
				</div>
		    )}

		    {!loading && total>0&&(
			    <>
				    <div className="px-5 w-full overflow-x-scroll">
					    <table className="w-full text-sm border-t text-[#666867]">
						    <thead>
						    <tr className="border-b font-semibold text">
							    {header.map((item,i)=>(
								    <td key={KEY+i}>{item}</td>
							    ))}
						    </tr>
						    </thead>
						    <tbody>
						    {currentItems?.map((item,i)=>(
							    <tr key={KEY+i} className={`${i % 2 === 0? 'bg-[#FBFDFFFF]':'bg'} border-b`}>
								    {item.map((value,i)=>(
									    <td key={KEY+i}>
										    {i===statusIndex?
											    <StatusView text={value}/>:
											    value
										    }
									    </td>
								    ))}
							    </tr>
						    ))}
						    </tbody>
					    </table>
				    </div>

				    {load&&(
					    <div className="h-40 flex-center">
						    <Loader loading/>
					    </div>
				    )}

				    {offsetType==="more"&&(
					    <div className="flex-center py-5">
						    <Button title={"See more"} className={"btn bg-gray-200 w-auto"}/>
					    </div>
				    )}

				    {offsetType==="paginate"&&(
					    <div className="flex-center py-5">
						    <ReactPaginate
							    breakLabel="..."
							    nextLabel="Next >"
							    onPageChange={handlePageClick}
							    pageRangeDisplayed={1}
							    marginPagesDisplayed={1}
							    pageCount={pageCount}
							    previousLabel="< Back"
							    renderOnZeroPageCount={null}
							    className={"flex-item gap-2"}
							    previousClassName={"border px-2 py-2 rounded-md text-sm"}
							    nextClassName={"border px-2 py-2 rounded-md text-sm"}
							    pageClassName={"px-3 py-2 flex-center border rounded-md"}
							    activeClassName={"bg-primary text-light"}
							    disabledClassName={"opacity-30"}
						    />
					    </div>
				    )}
			    </>
		    )}

		    {(!loading && data?.length< 1) &&(
			    <div className="py-20 flex-col-center gap-5">
				    <Svg icon={empty} className="w-10"/>
				    <p className="text-sm text-center">{emptyText}</p>
				    {btn&&(
					    <Button
						    title={btn.text}
						    className={"btn-primary w-auto"}
						    icon={plus}
						    onClick={()=>{
								if (btn.href){
									router.push(btn.href)
								}else if (btn?.onClick){
									btn.onClick()
								}
						    }}
					    />
				    )}
			    </div>
		    )}
	    </section>
    );
};

export default Table;
