// Foods Fetch----------------------------------------->

document.addEventListener('DOMContentLoaded',()=>{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/assets/Json/products.json", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       let result=this.responseText;
       let myData=JSON.parse(result)
       createMainFoods(myData)
      }
    };
    
    xhttp.send();
})


// ----------------createMainFoods--------------------->

const createMainFoods=(myData)=>{

    var main_foods=document.getElementById("main-foods");

    for (const group_index in myData.foods_group) {
       var food_box_element=createGroupBox(
        myData.foods_group[group_index].id,
        myData.foods_group[group_index].name,
        myData.foods_group[group_index].ImageUrl
       )

       main_foods.appendChild(food_box_element)
    }
}

// -------------------createGroupBox------------------->

const createGroupBox=(id,name,ImageUrl)=>{

    var food_box=document.createElement('div')
    food_box.classList.add('Suggested-item')

    var food_img_box=document.createElement('div')
    food_img_box.classList.add('Suggested-item_img')
    
    var food_img=document.createElement('img')
    food_img.setAttribute("src",ImageUrl)

    food_img_box.appendChild(food_img)
    
    var food_caption=document.createElement('div')
    food_caption.classList.add('caption')
    
    var food_title=document.createElement('h6')
    food_title.classList.add('caption-title')
    
    var food_link=document.createElement('a')
    var food_link_text=document.createTextNode(name)
    food_link.appendChild(food_link_text)
    food_link.setAttribute('href',"foodsMenu.html?group=" + id)
    
    food_title.appendChild(food_link)
    
    food_caption.appendChild(food_title)
    
    food_box.appendChild(food_img_box)
    food_box.appendChild(food_caption)
    
    return food_box;

}





