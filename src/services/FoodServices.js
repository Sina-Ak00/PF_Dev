
const KEYS={
    foods:"foods",
    foodId:"foodId"
}

export const getFoodsCollection=()=>([
    {id:'1',name:'sib',price:'50'},
    {id:'2',name:'sib2',price:'100'},
    {id:'3',name:'sib3',price:'110'},
    {id:'4',name:'sib4',price:'120'},
])

export function insertFood(data) {
    let foods=getAllFoods();
    data['id']=generateFoodId();
    foods.push(data);
    localStorage.setItem(KEYS.foods,JSON.stringify(foods))
}
export function generateFoodId(data) {
    if(localStorage.getItem(KEYS.foodId)==null)
        localStorage.setItem(KEYS.foodId,'0')
    var id=parseInt(localStorage.getItem(KEYS.foodId))
    localStorage.setItem(KEYS.foodId,(++id).toString())
    return id;
}


export function getAllFoods(data) {
    if(localStorage.getItem(KEYS.foods)==null)
        localStorage.setItem(KEYS.foods,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.foods));
}

export function updateFood(data) {
    let foods=getAllFoods();
    let recordIndex = foods.findIndex(x=>x.id===data.id);
    foods[recordIndex]={...data}
    localStorage.setItem(KEYS.foods,JSON.stringify(foods))
}

export function deleteFood(id) {
    let foods=getAllFoods();
    foods = foods.filter(x=>x.id!==id);
    localStorage.setItem(KEYS.foods,JSON.stringify(foods))
}