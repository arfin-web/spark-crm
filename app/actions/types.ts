export interface AIStatsOut {
  total_interactions: number;
  total_input_tokens: number;
  total_output_tokens: number;
  interactions_by_type: any;
  tokens_by_type: any;
}

export interface ActivityCreate {
  type: string;
  title: string;
  description: string;
  client_id?: string | null;
  project_id?: string | null;
}

export interface ActivityOut {
  type: string;
  title: string;
  description: string;
  id: string;
  user_id: string;
  client_id?: string | null;
  project_id?: string | null;
  created_at: string;
}

export interface Body_login_api_v1_auth_login_post {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
}

export interface ClientAISummaryOut {
  summary: string;
  recommendations: string;
}

export interface ClientCreate {
  name: string;
  email: string;
  phone?: string | null;
  company_name?: string | null;
  industry?: string | null;
  status?: string;
  tags?: string[] | null;
  notes?: string | null;
  source?: string;
}

export interface ClientHealthScoreOut {
  health_score: number;
  explanation: string;
}

export interface ClientOut {
  name: string;
  email: string;
  phone?: string | null;
  company_name?: string | null;
  industry?: string | null;
  status?: string;
  tags?: string[] | null;
  notes?: string | null;
  source?: string;
  id: string;
  user_id: string;
  health_score: number;
  last_contact_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientUpdate {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company_name?: string | null;
  industry?: string | null;
  status?: string | null;
  tags?: string[] | null;
  notes?: string | null;
  source?: string | null;
}

export interface EmailDraftCreate {
  subject: string;
  body: string;
  purpose?: string;
  status?: string;
  client_id?: string | null;
}

export interface EmailDraftGenerateRequest {
  client_id?: string | null;
  purpose: string;
  notes?: string | null;
}

export interface EmailDraftOut {
  subject: string;
  body: string;
  purpose?: string;
  status?: string;
  id: string;
  user_id: string;
  client_id?: string | null;
  ai_generated: boolean;
  created_at: string;
}

export interface EmailDraftUpdate {
  subject?: string | null;
  body?: string | null;
  purpose?: string | null;
  status?: string | null;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export type ProjectStatus =
  | "prospect"
  | "proposal_sent"
  | "in_progress"
  | "completed"
  | "paused";

export interface ProjectCreate {
  name: string;
  description?: string | null;
  status?: ProjectStatus;
  budget?: number | string | null;
  estimated_hours?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  client_id: string;
}

export interface ProjectOut {
  name: string;
  description?: string | null;
  status?: ProjectStatus;
  budget?: string | null;
  estimated_hours?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  id: string;
  user_id: string;
  client_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectUpdate {
  name?: string | null;
  description?: string | null;
  status?: ProjectStatus | null;
  budget?: number | string | null;
  estimated_hours?: number | null;
  start_date?: string | null;
  end_date?: string | null;
}

export interface ProposalCreate {
  title: string;
  brief_description: string;
  scope: string;
  deliverables: string;
  timeline: string;
  cost?: number | string | null;
  status?: string;
  client_id: string;
  project_id?: string | null;
}

export interface ProposalGenerateRequest {
  client_id: string;
  project_id?: string | null;
  title: string;
  brief_description: string;
}

export interface ProposalOut {
  title: string;
  brief_description: string;
  scope: string;
  deliverables: string;
  timeline: string;
  cost?: string | null;
  status?: string;
  id: string;
  user_id: string;
  client_id: string;
  project_id?: string | null;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProposalUpdate {
  title?: string | null;
  brief_description?: string | null;
  scope?: string | null;
  deliverables?: string | null;
  timeline?: string | null;
  cost?: number | string | null;
  status?: string | null;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface UserOut {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  agency_name: string;
  subscription_tier: string;
  subscription_status: string;
  created_at: string;
  updated_at: string;
}

export interface UserRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  agency_name: string;
}

export interface ValidationError {
  loc: string | number[];
  msg: string;
  type: string;
  input?: any;
  ctx?: any;
}
