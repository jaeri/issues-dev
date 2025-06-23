import { Routes } from '@angular/router';
import { IssuesList } from './pages/issues-list/issues-list';
import { Layout } from './layout/layout/layout';
import { About } from './pages/about/about';

export const routes: Routes = [
    { 
        path:'',
        component:Layout,
        children: [
            {path: '', redirectTo: 'issues', pathMatch: 'full'},
            {path: 'issues', component: IssuesList},
            {path: 'about', component: About}
        ]
    },
];
