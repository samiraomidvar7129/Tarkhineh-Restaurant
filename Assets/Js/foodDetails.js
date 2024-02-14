// *Foods Fetch----------------------------------------->

document.addEventListener('DOMContentLoaded',()=>{
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/assets/Json/products.json", true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     let result=this.responseText;
     let myData=JSON.parse(result)
     detaileFoodBox(myData)
    };
  }
  xhttp.send();
})


// * Product Discounts--------------------------------------->


discount_data=`{
  "Discounts":[
      {"id":"0" , "name":"کباب", "discount":"20"},
      {"id":"1" , "name":"ساندویچ", "discount":"35"},
      {"id":"2" , "name":"پیتزا", "discount":"50"},
      {"id":"3" , "name":"سوشی", "discount":"65"},
      {"id":"4" , "name":"دمنوش", "discount":"80"},
      {"id":"0" , "name":"قهوه", "discount":"40"},
      {"id":"6" , "name":"یخنوش", "discount":"25"}
  ]
}`

//* Food Object------------------------------------------------------>

const food={

  getGroupDiscount:function(group){
    return this.Discounts[group].discount
    // console.log(this.Discounts[group].discount)
  },

  createProductDetails:function(){

    document.getElementById('food-title-4').innerText=this.product_name;
    document.getElementById('food-title-5').innerText=this.product_name;
    document.getElementById('food-title-6').innerText=this.product_name;

    document.getElementById('foodBox_content_info').innerText=this.product_content;

    document.getElementById("energy").setAttribute("data-to", this.product_energy);
    document.getElementById("protein").setAttribute("data-to", this.product_protein);
     

    for(let i= 0; i < this.product_imgs.length; i++){

     const imgUrl=this.product_imgs[i];

     var img1=document.createElement('img')
     img1.setAttribute('src', imgUrl)
     document.getElementById('small-img').appendChild(img1)

     var img2=document.createElement('img')
     img2.setAttribute('src', imgUrl);
     document.getElementById('large-img').appendChild(img2)

    }


    var price_list=document.getElementById('price-list')

    for(let i=0; i< this.product_price.length; i++){

     const price=this.product_price[i];

     const type=this.product_type[i];

     var price_li=document.createElement('li');

     var price_span=document.createElement('span')
     price_span.classList.add('price')

     var delet=document.createElement('del')
     delet.appendChild(document.createTextNode(price + "تومان"))


     final_span=document.createElement('span')
     var final_price= price - (price * this.discount / 100);
     final_span.appendChild(document.createTextNode("تومان" + final_price ))

     

     price_span.appendChild(delet)
     price_span.appendChild(final_span)



     var size_span=document.createElement('span')
     size_span.classList.add('size')
     size_span.appendChild(document.createTextNode(type))

      price_li.appendChild(price_span)
      price_li.appendChild(size_span)

      price_list.appendChild(price_li)
    }


  }
}


// ?-------------------------------------------------------------------------------------------->

document.addEventListener("DOMContentLoaded", detaileFoodBox=(myData)=>{

  const urlParams=new URLSearchParams(window.location.search)
  const group=urlParams.get("group");
  const product_id=urlParams.get("product")

var product= myData.foods_group[group].group_products[product_id];

new_data= JSON.parse(discount_data);

// group_discount=new_data.Discounts[group].discount


group_discount=food.getGroupDiscount.call(new_data, group)

parentProduct={
  discount:group_discount 
}

product.__proto__=parentProduct;

food.createProductDetails.call(product)


// * ShopCart ----------------------------------->

document.getElementById("plus").addEventListener('click', ()=>{
  var number=Number(document.getElementById('number').value)
    number++;
    document.getElementById('number').value=number
});

document.getElementById("minus").addEventListener('click', ()=>{
  var number=Number(document.getElementById('number').value)
    if(number > 1)
    number--;
  document.getElementById('number').value=number
});


})


// *----------------changeProgressBar---------------------------------------------------------------------------->

 function changeProgressBar(element,value_element,value){
var i=0;


var interval=setInterval(
  function() {
  if(i >= Number(value)){
    clearInterval(interval)
  }

  element.style.width=i + "%";
  value_element.innerText=i + "%";
  i++;

}, 10);
}


var flag=true;

window.onscroll=(e)=>{

if(flag){

  var elements=document.getElementsByClassName('progress-bar-fill');
  var value_elements=document.getElementsByClassName('progress-value');

  for(let i =0; i < elements.length; i++){
    const element=elements[i];
    const value_element=value_elements[i];

    var data_to=Number(value_element.getAttribute("data-to"))
    changeProgressBar(element,value_element,data_to)
  }
  flag=false;
  
}
};

// ?-------------------------------------------------------------------------------------------------------------->


