import { Media } from "./media.model";
import { User } from "./user.model";

export interface Review {
    id: number;
    user: User;
    media: Media
    rating: number;
}