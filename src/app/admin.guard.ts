import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = new Router()
  const user = sessionStorage.getItem('user')
  let parsedUser
  if (user) {
    parsedUser = JSON.parse(user)
  }
  if (parsedUser.role === 'admin') {
    return true
  }
  else {
    router.navigate([''])
    return false
  }
};
