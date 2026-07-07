import { Component } from '@angular/core';
import { FeedContentComponent } from './feed-content/feed-content.component';
import { RightAsideComponent } from './right-aside/right-aside.component';
import { LeftAsideComponent } from './left-aside/left-aside.component';
import { CreatePostComponent } from './create-post/create-post.component';

@Component({
  selector: 'app-home',
  imports: [FeedContentComponent, RightAsideComponent, LeftAsideComponent, CreatePostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
