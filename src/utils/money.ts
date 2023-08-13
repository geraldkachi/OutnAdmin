function money(num:number, decimal:number) {
    num=num||0;
    return num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export default money;
