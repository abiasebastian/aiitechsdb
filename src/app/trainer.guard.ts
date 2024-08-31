import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const trainerGuard: CanActivateFn = (route, state) => {
  const user = sessionStorage.getItem('user');
  let parsedUser
  if(user){
   parsedUser= JSON.parse(user)
  }
  if (parsedUser.role==='trainer') {
    console.log('entry allowed')
    return true;
    
  } else {
    console.log('entry restricted')
    const router = inject (Router); // Inject the Router
    router.navigate(['']);
    return false;
  }
  
};
