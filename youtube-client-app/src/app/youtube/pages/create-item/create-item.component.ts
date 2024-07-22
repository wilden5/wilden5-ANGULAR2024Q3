import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent {
  createItemForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageLink: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: ['', [Validators.required]],
    tags: this.fb.array([this.fb.control('', Validators.required)]),
  });

  constructor(private fb: FormBuilder) {}

  get tags(): FormArray {
    return this.createItemForm.get('tags') as FormArray;
  }

  onFormReset(): void {
    this.createItemForm.reset();
    this.tags.clear();
    this.tags.push(this.fb.control('', Validators.required));
  }

  onFormSubmit(): void {}

  onAddTag(): void {
    if (this.tags.length < 5) {
      this.tags.push(this.fb.control('', Validators.required));
    }
  }
}
