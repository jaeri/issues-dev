import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Issue } from './models/issue.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SupabaseService } from './services/supabase-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'issues-in-dev';

  issueList: Issue[] = [];

  issue:Partial< Issue> = {};

  constructor(private cdr: ChangeDetectorRef, private supabaseService: SupabaseService) {
   
  }

  ngOnInit(): void {
    this.getIssues();
    console.log('Issue List:', this.getIssues());
  }

  async getIssues() {
     const { data, error } = await this.supabaseService.getIssueList('issues');
    if (error) {
      console.error('Error loading issues:', error.message);
    } else {
      this.issueList = data || [];
      this.cdr.detectChanges();
    }
  }

  async createItem() {
    const { data, error } = await this.supabaseService.createIssue('issues', this.issue);
    if (error) {
      console.error('Error creating item:', error.message);
    } else {
      console.log('Item created successfully:', data);
      this.issue.issue = ''; //???
      this.issue.description = '';
      this.issue.fix = '';
      this.issue.technology = '';
      this.getIssues();  // ???
    }
  }

  

  async deleteIssue(id: number) {
    const { data, error } = await this.supabaseService.deleteIssue('issues', id);
    if (error) {
      console.error('Error deleting item:', error.message);
    } else {
      console.log('Item deleted successfully:', data);
      this.getIssues();
    }
  }

  async updateIssue(id: number) {
    const { data, error } = await this.supabaseService.updateIssue('issues', id, this.issue);
    if (error) {
      console.error('Error updating item:', error.message);
    } else {
      console.log('Item updated successfully:', data);
      this.getIssues();
    }
  }


}
