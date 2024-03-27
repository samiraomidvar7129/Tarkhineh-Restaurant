"use scrict";

const form1=document.getElementById('form1');
const form2=document.getElementById('form2');

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

const alertBox=()=>{
    alert('send')
}

//* =============================== sendForm

const sendForm=(e)=>{
e.preventDefault();

alertBox();
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
