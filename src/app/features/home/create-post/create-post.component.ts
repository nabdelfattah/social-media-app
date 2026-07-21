import { User } from '@/app/core/models/post.interface';
import { PostService } from '@/app/core/services/post.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  private readonly postService = inject(PostService);

  user!: User;
  savedFile!: File;
  imageUrl: string | ArrayBuffer | null | undefined;

  content = new FormControl('');
  privacy = new FormControl('public');

  submitHandler(event: SubmitEvent, form: HTMLFormElement) {
    event.preventDefault();
    const formData = new FormData(); // بيسمحلك ت append جواه ملف او داتا و تبعتها لل backend
    if (this.content.value) {
      formData.append('body', this.content.value);
    }
    if (this.privacy.value) {
      formData.append('privacy', this.privacy.value);
    }
    if (this.savedFile) {
      formData.append('image', this.savedFile);
    }
    // you can loop over all the form controls and append them.
    this.postService.createPost(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.postService.getAllPosts();
        form.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('rippleUser') || '');
  }

  changeImg(event: any) {
    const files = (event.target as HTMLInputElement).files;

    // files may be null
    if (files && files.length > 0) {
      // files[0] contains the file name, size and type (png/ svg/ ...)
      // Now I want to store the file itselft (blob not just name) and make it global
      this.savedFile = files[0];

      // To preview img in the html I need the file's URL
      // file reader reads the file and give me its URL
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.savedFile); // read the file and return the URL
      // How to know the fileReader finishes reading? the firing of the onload event.
      // when the file reader finishes reading, render the file in the html
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result;
      };
    }
  }
}
