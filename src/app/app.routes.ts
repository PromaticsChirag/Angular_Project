import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { AboutUs } from './about-us/about-us';
import { LoginComponent } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'homepage',
        component: Homepage
    },
    {
        path: 'about-us',
        component: AboutUs
    },
    {
        path: 'signup',
        component: Signup
    },
];
