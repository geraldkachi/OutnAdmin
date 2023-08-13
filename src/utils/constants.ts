export const browser = typeof window !== 'undefined'
export const currency = [
    {value:"NGN",label:"Nigerian Naira", sign:"₦"},
    {value:"USD",label:"US Dollar", sign:"$"},
    {value:"GBP",label:"Pound sterling", sign:"₦"},
    {value:"EUR",label:"Euro", sign:"₦"},
]

export const marital = [
    { label:"Married", value:"Married"},
    { label:"Single", value:"Single"},
    { label:"Widowed", value:"Widowed"},
    { label:"Divorced", value:"Divorced"},
]
export const idTypes = [
    { label:"International Passport", value:"International Passport"},
    { label:"Driver's License", value:"Driver's License"},
    { label:"National ID Card", value:"National ID Card"},
]

export const sign=(currency:string)=>{
    switch (currency){
        case "NGN":
            return "₦";
        case "USD":
            return "$";
        case "GBP":
            return "£";
        case "EUR":
            return "€";
        case "CNY":
            return "¥";
        case "GHS":
            return "GH₵";

    }
}

