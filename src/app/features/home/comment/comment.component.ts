import { User } from '@/app/core/models/post.interface';
import { CommentsService } from './comments.service';
import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface Comment {
  _id: string;
  content: string;
  image?: string;
  commentCreator: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: Date;
  repliesCount: number;
}

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {
  user!: User;
  id = input<string>('');
  comments = signal<Comment[]>([]);
  private readonly commentsService = inject(CommentsService);

  content = new FormControl();
  image = new FormControl();

  ngOnInit() {
    // get user info from local storage
    this.user = JSON.parse(localStorage.getItem('rippleUser') || '');
    // get comments
    this.getAllComments();
  }

  getAllComments() {
    this.commentsService.getComments(this.id()).subscribe({
      next: (res) => {
        this.comments.set(res.data.comments);
        console.log(this.comments());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitComment(event: SubmitEvent, form: HTMLFormElement) {
    // prevent page reload
    event.preventDefault();
    // collect the data and create a form data object holding them
    const formData = new FormData();
    if (this.content.value) formData.append('content', this.content.value);
    if (this.image.value) formData.append('image', this.image.value);
    // send date to the backend
    this.commentsService.createComment(this.id(), formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllComments();
        // reset the form
        form.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
