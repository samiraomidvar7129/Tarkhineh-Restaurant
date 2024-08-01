
import  {validateRegisterForm} from './singUp.js';



document.addEventListener('DOMContentLoaded',()=>{

    const loginForm=document.getElementById('login-form')

    loginForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        validateLoginForm()
    })
})

const validateLoginForm=async()=>{
    const loginFullName=document.getElementById('loginFullName').value.trim();
    const loginPassword=document.getElementById('loginPassword').value.trim();
    

    let test= await validateRegisterForm()

    // let storedUser=JSON.parse(localStorage.getItem('userRegisterDB'));

    console.log(test)
}