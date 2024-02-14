
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
