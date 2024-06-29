

// * LoadData----------------------------------------->

var myData;

loadData=()=>{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/assets/Json/products.json", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       let jsObject=JSON.parse(this.responseText)
       valueCallBack(jsObject)
      }
    };
    
    xhttp.send();
}


// ?--------------------------------------------------------------------------------------------------------->

// * variable fill myData-------------------------------->

valueCallBack =(jsObject)=>{
myData=jsObject;
}

// ?--------------------------------------------------------------------------------------------------------->

// *  Fetch all memory information----------------------->

getFoodsFromLocalStorage=()=>{
let foods;
let jsonStrFoods= localStorage.getItem('foods');
if(jsonStrFoods === null){
    foods=[]
}else{
    foods=JSON.parse(jsonStrFoods)
}
return foods;
}

// * Return current product information--------------------->

getCurrentFood=(index)=>{

    var product;

if(index == -1){
    const urlParams=new URLSearchParams(window.location.search);
    const group_id=urlParams.get("group");
    const product_id=urlParams.get("product")
    product= myData.foods_group[group_id].group_products[product_id]

}else{
    const foods=getFoodsFromLocalStorage();
    product=foods[index]
}
 return product;

}


// * Add product to cart-------------------------------->

var shopCart = []

addToShopCart=(type_index)=>{

    var product=getCurrentFood(-1);

    var select_food={
        id:product.id,
        name:product.product_name,
        image:product.product_imgs[0],
        typt:product.product_type[type_index],
        price:product.product_price[type_index],
        qty:1
    }

    addToMemory(select_food, 1)

}




// *  Store products in memory----------------------------->


addToMemory=(select_food, count)=>{
    const foods=getFoodsFromLocalStorage();
    var index= -1;

    for(let i=0 ; i < foods.length; i++){
        const food=foods[i]

        if(food.id === select_food.id && food.price === select_food.price){
            index = i;
            break;
        }
    }


    if(index === -1){
        foods.push(select_food);
    }else{
        foods[index].qty +=count;
    }

    jsonStrFoods =JSON.stringify(foods);
    localStorage.setItem('foods', jsonStrFoods);
    update_shopCart_number();
    update_shopCart_Total();
}


// *  Delete product from memory--------------------------->

removeFromMemory=(index)=>{
const foods=getFoodsFromLocalStorage();

for(let i = 0; i < foods.length; i++){
    if(i === index){
        foods.splice(i , 1)
    }
}

jsonStrFoods=JSON.stringify(foods);
localStorage.setItem('foods', jsonStrFoods);
update_shopCart_number();
create_ShopCart_table();
update_shopCart_Total();
}

// *  Update shopping cart number----------------------->

update_shopCart_number=()=>{
    let jsonStrFoods=localStorage.getItem('foods')

    foods=JSON.parse(jsonStrFoods);
    var len=0;
    if(foods !== null){
        len=foods.length;
    }
    document.getElementById('shopCart-count-1').innerText='(' + len +')';
    document.getElementById('shopCart-count-2').innerText='(' + len +')';
}


// * Update the total price of the shopping cart-------->

update_shopCart_Total=()=>{

    foods=getFoodsFromLocalStorage();
    var sum=0;
    for(let i=0; i < foods.length; i++){
        
        const element=foods[i];
        sum +=element.price * element.qty;
    }

    document.getElementById('total-price').innerText=sum;
}

// * Add product to memory--------------------------------->
// * Build a line -------------------------------------->

create_ShopCart_row=(rowIndex,id, name, image, type, price, qty )=>{

    var tr=document.createElement('tr');
    
    var td1=document.createElement('td');
    td1.classList.add('td1');

  

    var div1=document.createElement('div')
    div1.classList.add('number');

    var span1=document.createElement('span')
    span1.setAttribute('id', 'plus-' +rowIndex);
    span1.setAttribute('class', 'plus');
    span1.setAttribute('style', 'cursor:pointer')

    span1.innerHTML="+";
    span1.setAttribute('onclick', 'plusNumber('+ rowIndex +')');

    var input1=document.createElement('input')
    input1.setAttribute('type', 'number')
    input1.setAttribute('id', 'number_' + rowIndex)
    input1.setAttribute('readonly', '')
    input1.setAttribute('value', qty)
    



    var span2=document.createElement('span')
    span2.setAttribute('id', 'minus-' + rowIndex)
    span2.setAttribute('class', 'minus')
    span2.setAttribute('style', 'cursor:pointer')
    span2.innerHTML="-";
    span2.setAttribute('onclick', 'minusNumber('+ rowIndex +')');



    div1.appendChild(span1);
    div1.appendChild(input1);
    div1.appendChild(span2);
    td1.appendChild(div1);
    tr.appendChild(td1);

    var td2=document.createElement('td')
    td2.classList.add('td2')

    var img1=document.createElement('img')
    img1.setAttribute('src', image)
    img1.setAttribute('width', '130');
    img1.setAttribute('height', '110');


    td2.appendChild(img1);

    tr.appendChild(td2);


    var td3=document.createElement('td')
    td3.classList.add('td3')
    td3.appendChild(document.createTextNode(name + '('+ type +')'));
    tr.appendChild(td3);

    var td4=document.createElement('td') 
    td4.classList.add('td4')
    td4.appendChild(document.createTextNode(price + "تومان"));
    tr.appendChild(td4);

    var td5=document.createElement('td')
    td5.classList.add('td5')
    td5.appendChild(document.createTextNode(qty +  "عدد"));
    tr.appendChild(td5);

    var td6=document.createElement('td')
    td6.classList.add('td6')
    td6.appendChild(document.createTextNode(qty * price));
    tr.appendChild(td6);

    var td7=document.createElement('td')
    td7.classList.add("td7")

    var aLink=document.createElement('a')

    var icon=document.createElement('i')
    icon.setAttribute('style', 'cursor:pointer;')

    icon.classList.add('fa')
    icon.classList.add('fa-trash')


    aLink.setAttribute('onclick', 'removeFromMemory('+ rowIndex +')');
    aLink.appendChild(icon);
    td7.appendChild(aLink);


    tr.appendChild(td7);
    

    return tr;

}



plusNumber=(index)=>{
var select_food = getCurrentFood(index);

var number=Number(document.getElementById("number_" + index).value);

number++;

document.getElementById("number_" + index).value = number;

addToMemory(select_food, 1);
create_ShopCart_table();

}

// * Subtract product from memory ------------------------->

minusNumber=(index)=>{

    select_food=getCurrentFood(index);
    var number=Number(document.getElementById("number_" + index).value);
    if(number > 1){
        number--;
        document.getElementById("number_" + index).value=number;

        addToMemory(select_food, -1);
        create_ShopCart_table();
    }


}




// * Creating a shopping cart table -------------------->

create_ShopCart_table=()=>{

    var shopCartTable=document.getElementById('shopCartTable');

    shopCartTable.innerHTML='';

    const foods=getFoodsFromLocalStorage();
    for(let i=0; i < foods.length; i++){
        const element=foods[i];
        var tr=create_ShopCart_row(i, element.id, element.name, element.image, element.typt, element.price, element.qty )
        shopCartTable.appendChild(tr);
    }
}


// ?--------------------------------------------------------------------------------------------------



document.addEventListener("DOMContentLoaded", ()=>{
    loadData();
    update_shopCart_number();
    update_shopCart_Total();
    create_ShopCart_table();
})

