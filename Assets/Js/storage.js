export const saveUserToLocalStorage=(user)=>{
    const userRegister=JSON.parse(localStorage.getItem('userRegisterDB')) || [];

    userRegister.push(user);
  
    localStorage.setItem('userRegisterDB',JSON.stringify(userRegister))

}