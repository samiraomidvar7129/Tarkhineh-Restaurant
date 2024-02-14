// * Foods Fetch----------------------------------------->

document.addEventListener('DOMContentLoaded',()=>{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/assets/Json/products.json", true);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       let result=this.responseText;
       let myData=JSON.parse(result)
       valueCallBack(myData)
      }
    };
    
    xhttp.send();
})
