// import { saveUserToLocalStorage } from "./storage.js";




document.addEventListener('DOMContentLoaded',()=>{
  const registerForm = document.getElementById("register-form");
  const loginForm=document.getElementById('login-form');
 

if(registerForm){
  registerForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    validateRegisterForm();
  })
}

if(loginForm){
  loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    validateLoginForm();
  })
}
})


 const validateRegisterForm = () => {
 

  const userNameElem = document.getElementById("FullName").value.trim();
  const userAddressElem = document.getElementById("Address").value.trim();
  const userNumber = document.getElementById("Number").value.trim();
  const userPasswordElem = document.getElementById("Password").value.trim();
  const subscriptionElem=document.getElementById('Subscription').value.trim() 
  const fullNameError=document.querySelector('.FullName-error');
  const numberError=document.querySelector('.number-error');
  const addressError=document.querySelector('.Address-error');
  const PasswordError=document.querySelector('.password-error');
  const subscriptionError=document.querySelector('.subscription-error');



  if(userNameElem.trim()==="" || userNameElem.length < 4 ){

        fullNameError.textContent="نام باید بین ۳  تا ۱۰ و شامل حروف و اعداد و زیرخط باشد";
  } 
  else{
    fullNameError.textContent="";
  }
  if(userNumber.trim()==="" || isNaN(userNumber) || userNumber.length  > 11 || userNumber.length  < 11 ){
    numberError.textContent="شماره تماس باید ۱۱ رقمی باشد";
  }
  else{
    numberError.textContent="";
  }
  if(userPasswordElem.trim() ==="" || userPasswordElem.length > 16 || userPasswordElem.length < 8 ||
 !/[A-Z]/.test(userPasswordElem) || !/[a-z]/.test(userPasswordElem) || !/[0-9]/.test(userPasswordElem) || !/[!@#$%^&*(),.?":{}|<>]/.test(userPasswordElem)
)
    {
    PasswordError.textContent="رمز عبور باید حداقل ۸ و حداکثر ۱۶ کاراکتر و شامل کاراکترهای خاص و اعداد باشد";
  }
  else{
    PasswordError.textContent="";
  }

  if(userAddressElem.trim()===""){
    addressError.textContent="لطفا آدرس را واردکنید";
  }
  else{
    addressError.textContent="";
  }
  if(subscriptionElem.trim()===""){
    subscriptionError.textContent="لطفا اشتراک را دریافت کنید";
  }
  else{
    subscriptionError.textContent="";
  }

  const generateSubscription=()=>{
    const subscription=Math.floor(10000 + Math.random() * 90000).toString();
    document.getElementById('Subscription').value=subscription;
  }
  
  document.getElementById('Subscription-btn').addEventListener('click',generateSubscription)


  if(userNameElem && userAddressElem && userNumber && userPasswordElem && subscriptionElem){
 
    const newUser={
      userNameElem,
      userAddressElem,
      userNumber,
      userPasswordElem,
      subscriptionElem
      
    }

    localStorage.setItem('userRegisterDB',JSON.stringify(newUser))
    // saveUserToLocalStorage(newUser);
    
    swal({
      title: "(: موفق باشید",
      text: "کاربرگرامی ! ثبت نام شما با موفقیت انجام شد  ",
      icon: "success",
      button:"ورود"
    }).then(()=>{
      window.location.href="login.html"
      document.getElementById("register-form").reset();//Reset RegisterForm
    
    });
  }
 

}

const validateLoginForm = () => {
 

  const loginFullName = document.getElementById("loginFullName").value.trim();
  const loginPassword = document.getElementById("loginPassword").value.trim();
  const loginFullNameError=document.querySelector('.loginFullName-error');
  const loginPasswordError=document.querySelector('.loginPassword-error');



  if(!loginFullName || !loginPassword){
    loginFullNameError.textContent="نام کاربری را وارد کنید ";
    loginPasswordError.textContent="رمز عبور را وارد کنید"
  }else{
    loginFullNameError.textContent="";
    loginPasswordError.textContent=""
  }
  
  
  let storedUser=JSON.parse(localStorage.getItem('userRegisterDB'))

  if (!storedUser) {
    swal({
      title: "خطا",
      text: "متاسفانه کاربر یافت نشد",
      icon: "error",
      button: "دوباره امتحان میکنم",
    })
    return; 
  }

  if (
    storedUser.userNameElem === loginFullName &&
    storedUser.userPasswordElem === loginPassword
  ) {
    swal({
      title: "خوش آمدید",
      text: "با موفقیت وارد شدید   ",
      icon: "success",
      button: "  آخ جوووووون",
    }).then(()=>{
      window.location.href="myAccont.html"
    })
    return; 
  } else {
    swal({
      title: "لطفا دقت کنید   ",
      text: " نلم کاربری یا رمز عبور نادرست است",
      icon: "error",
      button: "دوباره تلاش میکنم ",
    })
    return 
   }

}






// if (
//   getStoredUser.fullName === fullName &&
//   getStoredUser.password === password
// ) {
//   swal({
//     title: "خوش آمدید",
//     text: "با موفقیت وارد شدید   ",
//     icon: "success",
//     button: "  آخ جوووووون",
//   }).then(()=>{
//     window.location.href="index.html"
//   })
//   return; 
// } else {
//   swal({
//     title: "لطفا دقت کنید   ",
//     text: " نلم کاربری یا رمز عبور نادرست است",
//     icon: "error",
//     button: "دوباره تلاش میکنم ",
//   })
//   return 
//  }