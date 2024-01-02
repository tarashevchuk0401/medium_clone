import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {feedActions} from './store/actions';
import {selectError, selectFeedData, selectIsLoading} from './store/reducer';
import e from 'express';
import {distinct} from 'rxjs';
import { RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss',
    standalone: true,
    imports: [RouterLink, ErrorMessageComponent]
})
export class FeedComponent implements OnInit {
    @Input() apiUrl: string = '';

    isLoading$: boolean = false;
    error$: string | null  = 'TEST';
    feed$: any;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(feedActions.getFeed({url: this.apiUrl}));
        this.store
            .select(selectIsLoading)
            .subscribe((d) => (this.isLoading$ = d));
        this.store
            .select(selectError)
            .subscribe((d) => (this.error$ = d));
        this.store.select(selectFeedData).subscribe((d) => this.feed$ = (d?.articles));

    }
}
