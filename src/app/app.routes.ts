import { Routes } from '@angular/router';
import { IssuesList } from './pages/issues-list/issues-list';
import { Layout } from './layout/layout/layout';

export const routes: Routes = [
    { 
        path:'',
        component:Layout,
        children: [
            {path: '', redirectTo: 'issues', pathMatch: 'full'},
            {path: 'issues', component: IssuesList}
        ]
    },
];
