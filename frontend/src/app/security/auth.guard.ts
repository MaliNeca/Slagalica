
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{

    
    constructor(private router: Router){
    
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        if(localStorage.getItem('user') != null){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
      
    }
}