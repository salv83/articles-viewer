import { WPRestAPIService } from './../service/wprest-api.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  constructor(private wpservice: WPRestAPIService) { }

  categories: string;
  selectedOption: string;
  @Output() selectedCategoryChanged = new EventEmitter<any>();

  getCategoriesInfo(){
    this.wpservice.getCategoriesInfo()
      .subscribe(data => {
        this.categories = JSON.parse(data);
      }
      );
  }

  somethingChanged(){
    this.selectedCategoryChanged.emit(this.selectedOption);
  }


  ngOnInit() {
    this.getCategoriesInfo();
  }

}
