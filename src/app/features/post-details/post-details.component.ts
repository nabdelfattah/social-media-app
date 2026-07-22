import { PostService } from '@core/services/post.service';
import { Post, User } from '@/app/core/models/post.interface';
import { Component, inject, input, OnInit } from '@angular/core';
import { CommentComponent } from '../home/comment/comment.component';

@Component({
  selector: 'app-post-details',
  imports: [CommentComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly postService = inject(PostService);
  // user!: User;
  user!: User;
  post!: Post;
  id = input<string>(''); // auto-populated from :id

  ngOnInit() {
    // get user info from local storage
    const storedUser = localStorage.getItem('rippleUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    console.log(this.user);
    // get post data
    this.postService.getSinglePost(this.id()).subscribe({
      next: (res) => {
        console.log(res.data.post);
        this.post = res.data.post;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteHandler(id: string) {
    this.postService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          //  Navigate back
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
