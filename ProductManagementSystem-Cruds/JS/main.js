let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood ='create';
let tmp;


// get total fun function
function getTotal()
{
    if (price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value)
    - +discount.value;
    total.innerText = result;
    total.style.background = '#78C8A9';
}
else{
    total.innerText= '';
    total.style.background = '#a52017';
}
}

// create product function 
let dataPro;

if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product);
}
else{
    dataPro=[];
}

submit.onclick=function(){
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        count:count.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerText,
        category:category.value,
    }
    // count
    if(mood === 'create'){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);
        }
        }else{
                dataPro.push(newPro);
            }
    }else{
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }
    
    // save localstorage 
    localStorage.setItem('product', JSON.stringify(dataPro));

    clearData()
    readData()
}

// clear inputs function
function clearData(){
title.value ='';
price.value ='';
ads.value ='';
taxes.value ='';
discount.value ='';
count.value ='';
category.value ='';
total.innerText ='';
}

// read data function
function readData(){

getTotal()
let table = '';
for(let i = 0; i < dataPro.length; i++){
    table += `
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})"id="update">Update</button></td>
        <td><button onclick="deleteData(${i})"id="delete">Delete</button></td>
    </tr>
    `
}

document.getElementById('tbody').innerHTML = table;

let btnDelete =document.getElementById('deleteAll');
if(dataPro.length > 0){
btnDelete.innerHTML=`
<button onclick="deleteAll()"> Delete All (${dataPro.length})</button>`
}
else{
    btnDelete.innerHTML ='';
}
}
readData()

// delete function

function deleteData(i){
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
readData()

}

//delete all data function

function deleteAll(){
localStorage.clear();
dataPro.splice(0);
readData()
}



//update
function updateData(i){
title.value = dataPro[i].title;
price.value = dataPro[i].price;
ads.value = dataPro[i].ads;
taxes.value = dataPro[i].taxes;
discount.value = dataPro[i].discount;
getTotal();
count.style.display='none';
category.value = dataPro[i].category;
submit.innerHTML='Update';
mood = 'update';
tmp = i;
scroll(
    {
        top:0,
        behavior:'smooth',
    }
)
}

//search function
let searchMood = 'title';
let search = document.getElementById('search');

function getSearchMood(id){
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.Placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.Placeholder = 'Search By Category';

    }
    search.focus()
}