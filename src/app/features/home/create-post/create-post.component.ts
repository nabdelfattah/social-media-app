import { User } from '@/app/core/models/post.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  imports: [],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  user!: User;
  savedFile!: File;
  imageUrl: string | ArrayBuffer | null | undefined;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('rippleUser') || '');
    console.log(this.user);
  }

  uploadImg(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input?.files && input.files?.length > 0) {
      this.savedFile = input.files[0];
      this.showFile(this.savedFile);
      console.log('after function');
    }
  }

  showFile(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      this.imageUrl = e.target?.result;
      console.log(this.imageUrl);
    };
  }
}
