import {Component, OnInit} from '@angular/core';
import {User} from "../../model/User";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{

  user:User;
  constructor(private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['profile'];
  }

}
