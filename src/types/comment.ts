import { Author } from './author';

export type Comment = {
    text: string,
    author?: Author,
    sentiment?: number
}