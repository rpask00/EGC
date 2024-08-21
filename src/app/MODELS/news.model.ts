import {Observable} from 'rxjs';

export interface News {
  image: string | File | Observable<string>;
  title: string;
  desc: string;
  game: string;
  date: number;
}

export interface Match {
  team_a: string;
  team_b: string;
  time: string;
  date: string;
  format: string;
}
