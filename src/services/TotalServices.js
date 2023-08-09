
const KEYS={
    totals:"totals",
    totalId:"totalId"
}

export const getFoodsCollection=()=>([
    {id:'1',totalPrice:'15000',date:'50'},

])

export function insertTotal(data) {
    let totals=getAllTotals();
    data['id']=generateTotalId();
    totals.push(data);
    localStorage.setItem(KEYS.totals,JSON.stringify(totals))
}
export function generateTotalId(data) {
    if(localStorage.getItem(KEYS.totalId)==null)
        localStorage.setItem(KEYS.totalId,'0')
    var id=parseInt(localStorage.getItem(KEYS.totalId))
    localStorage.setItem(KEYS.totalId,(++id).toString())
    return id;
}




export function getAllTotals(data) {
    if(localStorage.getItem(KEYS.totals)==null)
        localStorage.setItem(KEYS.totals,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.totals));
}

export function deleteTotal(id) {
    let totals=getAllTotals();
    totals = totals.filter(x=>x.id!==id);
    localStorage.setItem(KEYS.totals,JSON.stringify(totals))
}
export function deleteAllTotal(id) {
    let totals=[];
    localStorage.setItem(KEYS.totals,JSON.stringify(totals))
}