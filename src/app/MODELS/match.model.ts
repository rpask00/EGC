export interface Match {
  status: string;
  team_a: string;
  score_team_a?: string;
  team_b: string;
  score_team_b?: string;
  date: string | Date;
  format: string;
  time?: string;
  live?: boolean;
}
