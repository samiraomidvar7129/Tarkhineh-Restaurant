"use scrict";

const form1=document.getElementById('form1');
const form2=document.getElementById('form2');
// const userName=document.getElementById('userName');
// const userEmail=document.getElementById('userEmail');
// const userNumbar=document.getElementById('userNumbar');
// const userPassword=document.getElementById('userPassword');

const progress=document.getElementById('progress');
const circles=document.querySelectorAll('.circle');

let currentActive=1;

//* ===============================nextOne

const nextOne=()=>{
    form1.style.left="-450px";
    form2.style.left="25px";


    currentActive++;

    if(currentActive > circles.length){
        currentActive= circles.length;
    }


    //*update progress

    update();
}

//* =============================== backOne

const backOne=()=>{
    form1.style.left="25px";
    form2.style.left="450px";

    currentActive--;

    if(currentActive < 1){
        currentActive = 1;
    }

     //*update progress

      update();

      progress.style.width = "0%";
}


//* =============================== update

const update=()=>{

    circles.forEach((circle , index)=>{

if( index < currentActive){
    circle.classList.add('active')
}else{
    circle.classList.remove('active')
} 

//* get all of active classes

const actives=document.querySelectorAll('.active');

progress.style.width= ((actives.length - 1 ) / (circles.length - 1)) * 100 + "%";

});

}


const userName=document.getElementById('userName');
const userEmail=document.getElementById('userEmail');
const userNumber=document.getElementById('userNumber');
const userPassword=document.getElementById('userPassword');


const validation=()=>{

const userNameValidate=userName.value.trim()
const userEmailValidate=userEmail.value.trim()
const userNumberValidate=userNumber.value.trim()
const userPasswordValidate=userPassword.value.trim()

    if(userName.value =="" || userName.value.length < 3 ){
        let validFeedback=document.querySelector('.error-message');
        validFeedback.style.display="block";
        validFeedback.innerHTML="لطفا فیلدهای خالی را پر کنید"
        // alert('فیلدها را پر کنید')

        return false
    }else{
        location.href="https://www.google.com/search?q=%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86+%DA%A9%D8%B1%D8%AF%D9%86+%D9%BE%D8%B1%D9%88%DA%98%D9%87+%D8%AF%D8%B1+netlify&rlz=1C1GCEA_enIR1044IR1044&oq=&gs_lcrp=EgZjaHJvbWUqCQgBEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQs2OTY1MDQ2ajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8"
    }

    console.log(userNameValidate)
    console.log(userEmailValidate)
    console.log(userNumberValidate)
    console.log(userPasswordValidate)
  
}
//* =============================== sendForm

const sendForm=(e)=>{
e.preventDefault();

validation();
}


// * ============================= btn events

const btnEvents=()=>{
    const next1=document.getElementById('next1')
    const send=document.getElementById('send')
    const back=document.getElementById('back')

    // *  next1 btn

    next1.addEventListener('click',nextOne)
    back.addEventListener('click',backOne)
    send.addEventListener('click',sendForm)

}

document.addEventListener('DOMContentLoaded',btnEvents)
