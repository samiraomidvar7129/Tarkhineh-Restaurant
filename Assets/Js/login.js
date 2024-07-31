


const form1 = document.getElementById("form1");

const sendForm = (e) => {
  e.preventDefault();
  validation();

};


form1.addEventListener("submit", sendForm);

const validation = (e) => {
  userNameValidate();
  userEmailValidate();
  userNumberValidate();
  userPasswordValidate(); 

};

const userNameValidate = () => {

    let userNameElem = document.getElementById("Name"); 

  if (
    userNameElem.value == "" ||
    userNameElem.value.length < 5 ||
    userNameElem.value.length > 15
  ) {
    userNameElem.style.backgroundColor="red"
    userNameElem.nextElementSibling.style.display = "block";
    userNameElem.nextElementSibling.innerHTML = " لطفا فیلد را پر کنید ";
    

    return false;

  } else {

        userNameElem.nextElementSibling.style.display = "none";

  }
};
const userEmailValidate=()=>{

    const userEmailElem = document.getElementById("Email");
    const userEmail=userEmailElem.value

    const userEmailRegex=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/g

    const isValidEmail=userEmailRegex.test(userEmail)

    if(!isValidEmail){

        userEmailElem.style.backgroundColor="red";
        userEmailElem.nextElementSibling.style.display = "block"; 
        userEmailElem.nextElementSibling.innerHTML = " Omidvar123@gmail.com :  قالب معتبر";
        return false;
    }
    else{
        userEmailElem.nextElementSibling.style.display = "none"; 
        userEmailElem.style.backgroundColor="green";

    }
}
const userNumberValidate=()=>{
    let userNumber = document.getElementById("Number");
    const userNumberRegex=/^09\d{9}$/

    if( userNumberRegex.test(userNumber) || userNumber.value.length > 11 || userNumber.value.length < 11){
        userNumber.style.backgroundColor = "red";
        userNumber.nextElementSibling.style.display = "block";
        userNumber.nextElementSibling.style.fontSize = "11px";
        userNumber.nextElementSibling.innerHTML = " لطفا فیلد را پر کنید: شماره ۱۱ رقمی باشد";

    return false; 

    }
    else{
        userNumber.nextElementSibling.style.display = "none";
        userNumber.style.backgroundColor="green"

    }
}
const userPasswordValidate=()=>{
    const userPasswordElem=document.getElementById('Password')

    if( userPasswordElem.value == "" ||
        userPasswordElem.value.length < 6 ||
        userPasswordElem.value.length > 16){
        userPasswordElem.style.backgroundColor="red";
        userPasswordElem.nextElementSibling.style.display = "block"; 
        userPasswordElem.nextElementSibling.innerHTML = "رمز عبور حداقل ۶ و حداکثر ۱۶ کاراکتر داشته باشد";
        return false;
    }else{
        userPasswordElem.nextElementSibling.style.display = "none"; 
        userPasswordElem.style.backgroundColor="green";
    }
}



