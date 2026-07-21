import { Post } from '@core/models/post.interface';
import { PostService } from '@core/services/post.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import id from '@angular/common/locales/id';

@Component({
  selector: 'app-feed-content',
  imports: [],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postService = inject(PostService);

  data = signal<Post[]>([]);
  userId: string = ''; //initialize it in ngOnInit().

  ngOnInit() {
    this.getPosts();
    // initialized here.
    this.userId = JSON.parse(localStorage.getItem('rippleUser') || '')?._id;
  }

  getPosts() {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        this.data.set(res.data.posts);
      },
      error: (err) => {
        // ToDo: display it in a toast
        console.log(err);
      },
      complete: () => {},
    });
  }

  deleteHandler(id: string) {
    this.postService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.getPosts();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
