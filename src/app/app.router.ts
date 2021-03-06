import { DeconfigComponent } from './deconfig/deconfig.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { UsereditComponent } from './useredit/useredit.component';
import { LogoutComponent } from './logout/logout.component';
import { AdmingradService } from './admingrad.service';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { Home } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
    // Root
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, },
    { path: 'home', component: Home, },
    { path: 'useredit', component: UsereditComponent, },
    { path: 'users', component: UsersComponent },
    { path: 'reg', component: UserregisterComponent, },
    { path: 'logout', component: LogoutComponent, },
    { path: 'dbconfig', component: DeconfigComponent, },

];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });