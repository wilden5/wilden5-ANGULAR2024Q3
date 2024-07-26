import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { dateValidator } from '../../validators/date.validator';
import { createNewCustomItem } from '../../../utils/create-item-helper';
import { ADD_CUSTOM_ITEM } from '../../../redux/actions/custom-items.actions';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent {
  createItemForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    imageLink: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: ['', [Validators.required, dateValidator]],
    tags: this.fb.array([this.fb.control('', Validators.required)]),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  get tags(): FormArray {
    return this.createItemForm.get('tags') as FormArray;
  }

  onFormReset(): void {
    this.createItemForm.reset();
    this.tags.clear();
    this.tags.push(this.fb.control('', Validators.required));
  }

  onFormSubmit(): void {
    const customItem = createNewCustomItem(this.createItemForm);
    this.store.dispatch(ADD_CUSTOM_ITEM({ customItem }));
    this.router.navigate(['/search']);
  }

  onAddTag(): void {
    if (this.tags.length < 5) {
      this.tags.push(this.fb.control('', Validators.required));
    }
  }

  getTitleErrorMessage(): string {
    const titleControl = this.createItemForm.get('title');

    if (titleControl?.hasError('required')) {
      return 'Please enter a title';
    }

    if (titleControl?.hasError('minlength')) {
      return 'The title is too short';
    }

    if (titleControl?.hasError('maxlength')) {
      return 'The title is too long';
    }

    return '';
  }

  getDateErrorMessage(): string {
    const dateControl = this.createItemForm.get('creationDate');

    if (dateControl?.hasError('required')) {
      return 'Please enter a creation date';
    }

    if (dateControl?.hasError('futureDate')) {
      return 'The date is invalid';
    }

    return '';
  }
}
