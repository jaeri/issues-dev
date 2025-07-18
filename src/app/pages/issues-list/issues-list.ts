import { ChangeDetectorRef, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SupabaseService } from '../../services/supabase-service';
import { Issue } from '../../models/issue.model';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { Skeleton } from 'primeng/skeleton';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { MessageService, MenuItem } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { Chip } from 'primeng/chip';
import { SpeedDial } from 'primeng/speeddial';

interface Column {
    field: string;
    header: string;
}


@Component({
  selector: 'app-issues-list',
  imports: [
    CardModule, 
    ButtonModule, 
    TableModule, 
    InputTextModule, 
    Dialog, 
    Skeleton,
    FloatLabel,
    FormsModule,
    CommonModule,
    ConfirmDialogModule,
    Toast,
    Chip,
    SpeedDial,
    ToastModule  
  ],
  templateUrl: './issues-list.html',
  styleUrl: './issues-list.css'
})
export class IssuesList {
  issues!: Issue[] |  any[] | undefined;
  issue:Partial< Issue> = {};

  cols!: Column[];

  visible: boolean = false;
  loading = true;   

  items: MenuItem[] | undefined;

  constructor(
    private supabaseService: SupabaseService, 
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
   ) {}

    ngOnInit() {
       this.getIssues();    
       //this.speedDialItems(); // Initialize SpeedDial items   
    }

   
   // *** functions for CRUD operations ***
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

    async createIssue() {
        const { data, error } = await this.supabaseService.createIssue('issues', this.issue);
        if (error) {
            console.error('Error creating issue:', error.message);
        } else {
        this.showToast('info', 'Issue created successfully!'); // Show success message
        console.log('Issue created successfully:', data);
        this.cleanForm();
        this.getIssues();  // Refresh the issue list
        this.visible = false; // Close the dialog after creating an issue
        }
    }

    async deleteIssue(id: number) {
    const { data, error } = await this.supabaseService.deleteIssue('issues', id);
    if (error) {
      console.error('Error deleting issue:', error.message);
    } else {
      console.log('Issue deleted successfully:', data);
      this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Issue deleted successfully' });
      this.getIssues();
    }
  }

  async getIssueById(id: number){
    const {data, error} = await this.supabaseService.getIssueById('issues', id);
    if (error) {
        this.showToast('danger', 'error on listing issue');
    }else{
        this.issue = data as Partial<Issue>;
    }
  }


    // *** end functions for CRUD operations ***

     confirmationDialog(){ // Show confirmation dialog after issue creation
        this.confirmationService.confirm({
        message: 'Your issue has been successfully generated!',
        header: 'Success',
        icon: 'pi pi-check',
        acceptLabel: 'OK',
        rejectVisible: false,
        accept: () => {
            // Optional follow-up
            console.log('Confirmed!');
        }
        });
     }

     showToast(severity: string, message: string) { // Show toast messages
        this.messageService.add({ severity: severity, summary: severity, detail: message, life: 3000 });
    }

     getSkeleton() { // Simulate loading state with skeleton items
        this.issues = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    }

    speedDialItems(id:number): MenuItem[] { // Define the items for the SpeedDial component for each issue
        return [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
           
            {
                icon: 'pi pi-trash',
                command: () => {
                    console.log('Delete action triggered');
                    this.deleteIssue(id);
                    //this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                icon: 'pi pi-external-link',
                command: () => this.getIssueById(id) // display issue                     
            }
        ];
    }

     showDialog() {  // Show the dialog for creating a new issue
        this.visible = true;
    }

    cleanForm() { // Reset the form fields
        this.issue = {};    
    }
}
