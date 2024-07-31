// 

document.addEventListener('DOMContentLoaded',()=>{
  const form1 = document.getElementById("form1");

if(form1){
  form1.addEventListener('submit',(e)=>{
    e.preventDefault();
    validation();
  })
}
})


const validation = () => {
  const userNameElem = document.getElementById("Name").value;
  const userEmailElem = document.getElementById("Email").value;
  const userNumber = document.getElementById("Number").value;
  const userPasswordElem = document.getElementById("Password").value;

  if(!userNameElem || !userEmailElem || !userNumber || !userPasswordElem){
    swal({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question"
    });

  }else{

    const test={
      userNameElem,
      userEmailElem,
      userNumber,
      userPasswordElem
    }
    localStorage.setItem('testuser',JSON.stringify(test));

    alert('موفق بود')
  }

  
window.location.href="login.html"


};