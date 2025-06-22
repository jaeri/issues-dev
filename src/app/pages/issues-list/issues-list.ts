import { ChangeDetectorRef, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SupabaseService } from '../../services/supabase-service';
import { Issue } from '../../models/issue.model';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { Skeleton } from 'primeng/skeleton';


interface Column {
    field: string;
    header: string;
}


@Component({
  selector: 'app-issues-list',
  imports: [CardModule, ButtonModule, TableModule, InputTextModule, Dialog, Skeleton],
  templateUrl: './issues-list.html',
  styleUrl: './issues-list.css'
})
export class IssuesList {
  issues!: Issue[] |  any[] | undefined;

  cols!: Column[];

  visible: boolean = false;
  loading = true;   

  constructor(private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
       this.getIssues();       
    }

   

   async getIssues() {    

        this.getSkeleton();
        const { data, error } = await this.supabaseService.getIssueList('issues');

        if (error) {
            console.error('Error fetching issues:', error);
        } else {
            
            this.issues = data as Issue[];
            this.loading = false;
            this.cdr.detectChanges(); // Ensure the view updates with the new data. recheck
            
        }

        this.cols = [
            { field: 'issue', header: 'Issue' },
            { field: 'technology', header: 'Technology' },
            { field: 'description', header: 'Description' },
            { field: 'fix', header: 'Fix' }
        ];
    }

     getSkeleton() {
        this.issues = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    }

     showDialog() {
        this.visible = true;
    }
}
