export const svg =(icon:any,color:string)=>{
    return icon.replace(/fill="([(^#\w-)]+)"/g, `fill="${color}"`).replace(/stroke="([(^#\w-)]+)"/g, `stroke="${color}"`)
}
