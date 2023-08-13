import swal from "sweetalert";

type SweetAlert = {
	title:string
	text:string
	cancel?: {
		text: string,
		className?: string,
	},
	confirm?: {
		text: string,
		className?: string,
	}
}
const sweetalert=async (props:SweetAlert):Promise<boolean>=>{
	return await swal({
		title: props.title,
		text: props.text,
		// @ts-ignore
		buttons: {
			cancel: {
				text: props.cancel?.text||"Cancel",
				value: null,
				visible: true,
				className: props.cancel?.className,
				closeModal: true,
			},
			confirm: {
				text: props.confirm?.text||"Ok",
				value: true,
				visible: true,
				className: props.confirm?.className,
				closeModal: true
			}
		},
	})
}

export default sweetalert
