import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  searchText="";

  @Output() valueEmitter = new EventEmitter<any>();

  emitValue(inputText: HTMLInputElement) {
    this.searchText = inputText.value;
    this.valueEmitter.emit(this.searchText);  
  } 
}

 // emitValue() {
 //   console.log(this.searchText);
 //   this.valueEmitter.emit(this.searchText);
 // }
