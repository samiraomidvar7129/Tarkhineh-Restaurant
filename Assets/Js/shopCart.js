
// * LoadData----------------------------------------->

var myData;

loadData=()=>{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/assets/Json/products.json", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       let result=this.responseText;
       let jsObject=JSON.parse(result)
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


document.addEventListener("DOMContentLoaded", ()=>{
    loadData();
    update_shopCart_number();
    update_shopCart_Total();
    create_ShopCart_table();
})

// ?--------------------------------------------------------------------------------------------------------->

// *  Fetch all memory information----------------------->

getFoodsFromLocalStorage=()=>{


}

// * Return current food information--------------------->

getCurrentFood=(index)=>{
    var currentFood;


if(index == -1){
    const urlParams=new URLSearchParams(window.location.search);
    const group=urlParams.get("group");
    const product_id=urlParams.get("product")
    currentFood= myData.foods_group[group].group_products[product_id]
    return currentFood;

}else{
    const foods=getFoodsFromLocalStorage();
    currentFood=foods[index]
}
 return currentFood;

}
