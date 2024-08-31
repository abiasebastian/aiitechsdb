import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  const user = sessionStorage.getItem('user');

  if (user) {
    console.log('entry allowed')
    return true;
    
  } else {
    console.log('entry restricted')
    const router = inject(Router); // Inject the Router
    router.navigate(['']);
    return false;
  }
};
