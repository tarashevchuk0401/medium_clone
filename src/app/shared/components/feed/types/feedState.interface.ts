import { GetFeedResponseInterface } from "./getFeedResponse.interface";

export interface FeedState {
    isLoading: boolean,
    error: string | null,
    data: GetFeedResponseInterface | null,
}