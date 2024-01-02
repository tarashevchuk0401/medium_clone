import { createFeature, createReducer, on } from "@ngrx/store";
import { FeedState } from "../types/feedState.interface";
import { feedActions } from "./actions";
import { state } from "@angular/animations";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: FeedState = {
    isLoading: false,
    error: null,
    data: null,
}

const feedFeature = createFeature({ 
    name: 'feed', 
    reducer: createReducer(
        initialState,
        on(feedActions.getFeed, state => ({
            ...state,
            isLoading: true,
        })),
        on(feedActions.getFeedSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.feed
        })),
        on(feedActions.getFeedFailure, (state) => ({
            ...state,
            isLoading: false,
            // data: null,
        })),
        on(routerNavigationAction, () => initialState)

    )
})

export const  {
    name: feedFeatureKey,
    reducer: feedReducer,
    selectIsLoading, 
    selectError, 
    selectData: selectFeedData,
} = feedFeature