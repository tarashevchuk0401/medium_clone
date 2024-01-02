import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { Router } from "express";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { currentUser } from "../../types/currentUser.interface";

@Component({
    selector: 'app-topbar',
    templateUrl: './topBar.component.html',
    styleUrl: './topbar.component.scss',
    standalone: true,
    imports: [RouterLink, CommonModule]
})
 export class TopBarComponent implements OnInit {
    currentUser$ : currentUser| null | undefined;


    constructor(private store: Store){}

    ngOnInit(): void {
        this.store.select(selectCurrentUser).subscribe(d => this.currentUser$ = d)
    }
 }