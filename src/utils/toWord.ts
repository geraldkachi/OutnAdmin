export default (text:string)=>{
	return text.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g," ")
}
