import { Component } from "@angular/core";
import { FeedComponent } from "../../../shared/components/feed/feed.component";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { ErrorMessageComponent } from "../../../shared/components/errorMessage/errorMessage.component";

@Component({
    selector: 'app-global-feed',
    templateUrl: './globalFeed.component.html',
    styleUrl: './globalFeed.component.scss',
    standalone: true,
    imports:[ErrorMessageComponent, BannerComponent, FeedComponent, CommonModule]
})

export class GlobalFeedComponent {
    apiUrl: string = '/articles';

    
}