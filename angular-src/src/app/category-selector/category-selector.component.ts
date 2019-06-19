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

  /* The decorator Output allows to generate a custom events, we use it to generate the event when the user make a choise on
  one or more categories inside the select */
  @Output() selectedCategoryChanged = new EventEmitter<any>();

  /* This method is called from ngOnInit to retrieve from the service the list of categories ids and name. */
  getCategoriesInfo(){
    this.wpservice.getCategoriesInfo()
      .subscribe(data => {
        this.categories = JSON.parse(data);
      }
      );
  }

  /* Here the component generate the event because the status of the select is changed, this means that the user has choosed 
  the categories.  */
  somethingChanged(){
    this.selectedCategoryChanged.emit(this.selectedOption);
  }


  ngOnInit() {
    this.getCategoriesInfo();
  }

}
