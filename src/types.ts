export type ModalProps = {
	modal:boolean
	setModal:(value:boolean)=>void
}

export type ColorModes = 'light'|'dark'

export type Weight = 'Regular'|'Bold'|'SemiBold'|'ExtraBold'|'Light'|'Italic';

export type InputProps = {
	setValue:(value:string)=>void
	value:string
}

export type SignupProps = {
	next:(values:any)=>void
	values:any
}

export type Auth = {
	user_id?:string
	session_token?:string
	customerID?:string
}

export type User = {
	Address?: string
	AlternateMobile?: string
	ApprovedBy?: string
	CustomerID?: string
	DateApproved?: string
	DateCreated?: string
	DateLastLogin?: string
	DateOfBirth?: string
	Designation?: string
	Email?: string
	Firstname?: string
	Lastname?: string
	Middlename?: string
	Mobile?: string
	ResetStatus?: string
	Role?: Role
	Sex?: string
	State?: string
	Status?: string
	Type?: Type
	UserID?: string
}

export type Role = 'Vendor'|'Compliance'|'Executive'|'Finance'
export type Type = 'BackOffice'|'Vendor'|'FundingPartner'|'Issuer'
export type Module = 'vendor'|'compliance'|'executive'|null

export type NewRequest = {
	next:()=>void
	previous?:()=>void
	values?:()=>{}
	setFieldValue?:(key:string,value:any)=>void
	errors?:any
}

export type RequestStatus = 'Pending'|'Issuer-Verified'|'Issuer-Declined'|'UnderReview'|'Approved'|'Declined'|'Disbursed'|'OfferAccepted'|'OfferDeclined'|'Closed'|'IssuerPaid'

export type AlertProps = {
	show?:boolean
	title:string
	text:string
	btn: {
		text:string,
		href?:string,
		onClick?:()=>void
		closeOnClick?:boolean
	}
	color?:string
}

export type RequestVariables = {
	transactionID:string
	type:"LPO"|"IDF"
}
