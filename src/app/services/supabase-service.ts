import { Injectable } from '@angular/core';
import { supabase } from '../../supabase/supabase';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor() { }

  getSupabaseClient() {
    return supabase;
  }

  
  async getIssueList(table: string){
    return await this.getSupabaseClient().from(table).select('*');
  }

  async createIssue(table: string, issue: Partial<Issue>) {
    return await this.getSupabaseClient().from(table).insert(issue);
  }

  async deleteIssue(table: string, id: number) {
    return await this.getSupabaseClient().from(table).delete().eq('id', id);  
  }

  async updateIssue(table: string, id: number, issue: Partial<Issue>) {
    return await this.getSupabaseClient().from(table).update(issue).eq('id', id);
  }

}
