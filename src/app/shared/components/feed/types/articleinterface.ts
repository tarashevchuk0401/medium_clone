import { ProfileInterface } from "../../../types/profile.interface";

export interface ArticleInterface {
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
    author: ProfileInterface,
}
