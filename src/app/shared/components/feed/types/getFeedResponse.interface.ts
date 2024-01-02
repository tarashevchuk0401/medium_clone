import { ArticleInterface } from "./articleinterface"

export interface GetFeedResponseInterface {
    articles : ArticleInterface[],
    artticlesCount: number
}