import { Post } from '@core/models/post.interface';
import { PostService } from '@core/services/post.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-content',
  imports: [],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postService = inject(PostService);

  data: Post[] = [];
  userId: string = ''; //initialize it in ngOnInit().

  ngOnInit() {
    this.getPosts();
    // initialized here.
    this.userId = JSON.parse(localStorage.getItem('rippleUser') || '')?._id;
    console.log(this.userId);
  }

  getPosts() {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        this.data = res.data.posts;
      },
      error: (err) => {
        // ToDo: display it in a toast
        console.log(err);
      },
      complete: () => {},
    });
  }
}
