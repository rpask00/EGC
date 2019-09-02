import { Observable } from 'rxjs';

export interface News {
    image: string | File | Observable<string>,
    title: string,
    desc: string,
    game: string,
    date: number,
}