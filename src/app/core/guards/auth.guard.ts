import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  console.log('AuthGuard - Is authenticated:', isAuthenticated); // Log

  if (isAuthenticated) {
    const roles = route.data['roles'] as Array<string>;
    if (roles && roles.length > 0) {
      const userRole = authService.currentUserValue?.role;
      console.log('AuthGuard - User role:', userRole); // Log

      if (userRole && roles.includes(userRole)) {
        console.log('AuthGuard - User has required role'); // Log
        return true;
      } else {
        console.log('AuthGuard - User does not have required role, redirecting to unauthorized'); // Log
        router.navigate(['/unauthorized']);
        return false;
      }
    }

    console.log('AuthGuard - No roles required, access granted'); // Log
    return true;
  }

  console.log('AuthGuard - Not authenticated, redirecting to login'); // Log
  router.navigate(['/login']);
  return false;
};
