import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  constructor(private _router: Router, private bookService: BookService) {}
  searchFormGroup: FormGroup;
  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      bookName: new FormControl(''),
    });
  }

  HandleOnSearch() {
    this.bookService.OnSearchBook?.next(this.searchFormGroup.value['bookName']);
    this.searchFormGroup.reset();
    this._router.navigate(['/books']);
  }
}
