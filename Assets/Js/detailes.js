// *Foods Fetch----------------------------------------->

document.addEventListener('DOMContentLoaded',()=>{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/assets/Json/products.json", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       let result=this.responseText;
       let myData=JSON.parse(result)
       createMenuBox(myData)
      }
    };
    
    xhttp.send();
})

// ?------------------------- createMenuBox -------------------------------------------->

document.addEventListener('DOMContentLoaded',createMenuBox=(myData)=>{

    const urlParams=new URLSearchParams(window.location.search);
    const group=urlParams.get("group");
    
    for (const group_index in myData.foods_group) {

        if (group == myData.foods_group[group_index].id) {

            document.getElementById('food-title-1').innerText=myData.foods_group[group_index].name;
            document.getElementById('food-title-2').innerText=myData.foods_group[group_index].name;

            var group_products=myData.foods_group[group_index].group_products;

            for (const product_key in group_products) {
                createProductBox(
                    group_products[product_key].product_name,
                    group_products[product_key].product_imgs[0],
                    group_products[product_key].product_price + "تومان",
                    group_products[product_key].product_content,
                    group_index,
                    product_key
                   );
                   
               
            
            }

        }
    }
})

// * ----------createProductBox------------------------------------------->

 const createProductBox=(product_name,product_imgs,product_price,product_content,t1,t2)=>{

var li =document.createElement('li')

var product_img_div=document.createElement('div')
product_img_div.classList.add('product_img_div')

var product_img=document.createElement('img')
product_img.setAttribute("src",product_imgs)

product_img_div.appendChild(product_img)

var food_information=document.createElement('div')
food_information.classList.add('food_information')


var infoDivision=document.createElement("div")
infoDivision.classList.add('food-info');

var infoTitle=document.createElement('span')
infoTitle.classList.add('food-info_title')
infoTitle.appendChild(document.createTextNode(product_name));

var food_link=document.createElement("a")
food_link.setAttribute("href", "foodDetails.html?group=" + t1 + "&product=" + t2)
food_link.appendChild(infoTitle)

var foodPrice=document.createElement('span')
foodPrice.classList.add('food-price')
foodPrice.appendChild(document.createTextNode(product_price));

infoDivision.appendChild(food_link)
infoDivision.appendChild(foodPrice)

var contentDivision=document.createElement('div')
contentDivision.classList.add('food-info_content')
contentDivision.appendChild(document.createTextNode(product_content));


li.appendChild(product_img_div)
food_information.appendChild(infoDivision)
food_information.appendChild(contentDivision)
li.appendChild(food_information)


document.getElementById('food-list').appendChild(li);

}