// *Foods Fetch----------------------------------------->

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
createMenuBox(myData)
}

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
                    group_products[product_key].product_content,
                    group_index,
                    product_key
                   );
                   
               
            
            }

        }
    }
})


// * ----------createProductBox-------------------------->

 const createProductBox=(product_name,product_imgs,product_content,t1,t2)=>{

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



infoDivision.appendChild(food_link)

var contentDivision=document.createElement('div')
contentDivision.classList.add('food-info_content')
contentDivision.appendChild(document.createTextNode(product_content));


li.appendChild(product_img_div)
food_information.appendChild(infoDivision)
food_information.appendChild(contentDivision)
li.appendChild(food_information)


document.getElementById('food-list').appendChild(li);

}


// *-----------foodsSearch------------------------------->


let search=document.getElementById('search');

search.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        var searchValue=event.target.value;
        event.preventDefault();
        Search(searchValue);
        search.value="";
    }
})

 const Search =(searchValue)=>{

    var searchResultBox=document.getElementById('mainBox-foods_info')
    
    searchResultBox.innerHTML=""
    searchResult= [];
    myData.foods_group.forEach(group => {
       group.group_products.forEach(food=>{
        if(food.product_name === searchValue || food.product_name.includes(searchValue)){
            searchResult.push(food)
           }
       })
    });


    if(searchResult.length > 0){
        let resultText=document.createElement('h1')
        resultText.appendChild(document.createTextNode(' :  نتیجه جستجوی شما  '));
        resultText.classList.add('searchBox-title');

        searchResultBox.appendChild(resultText);

        searchResult.forEach(food=>{
            searchResultBox.appendChild(createFoodBox(food))
        })
    }else{
        let resultText=document.createElement('h1');
        resultText.appendChild(document.createTextNode(' ! نتیجه ای یافت نشد '));
        resultText.classList.add('searchBox-title');
        searchResultBox.appendChild(resultText);
    }}

const createFoodBox=(food)=>{

let div1=document.createElement('div');
div1.classList.add('searchBox_food');

    
let div2=document.createElement('div');
div2.classList.add('searchBox_img-title');

let img= document.createElement('img')
img.classList.add('searchBox-img');
img.setAttribute('src', food.product_imgs[0])

let h3=document.createElement('h3')
h3.appendChild(document.createTextNode(food.product_name))

div2.appendChild(img)
div2.appendChild(h3)

let strong1=document.createElement('div')
strong1.appendChild(document.createTextNode(food.product_type[0]))

let strong2=document.createElement('div')
strong2.classList.add('price-strong')
strong2.appendChild(document.createTextNode(food.product_price[0] + "تومان"))


div1.appendChild(div2)
div2.appendChild(strong1)
div2.appendChild(strong2)

return div1;

}

// ?----------------------------------------------------------------------------------------------------------->

document.addEventListener("DOMContentLoaded", ()=>{
    loadData();
})



