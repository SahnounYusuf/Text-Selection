import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {LableMessage, SelectedLabels} from "../model/label_message";
import {TextSelectEvent} from "../utils/select.directive";

interface SelectionRectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {

  public hostRectangle: SelectionRectangle | null;

  public skillList: string[] = ["Skills", "Education"];

  selectedLabel: string;

  public lableMessage: LableMessage = new LableMessage();
  public selectedLabels: SelectedLabels = new SelectedLabels();
  public exported: boolean;
  public warning: boolean;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.hostRectangle = null;
  }


  addSkill(label: string) {
    if (label && this.skillList.indexOf(label) == -1)
      this.skillList.push(label)
    console.log(this.skillList)
  }

  removeLabel(label: string) {
    console.log(label)
    const index: number = this.skillList.indexOf(label);
    if (index !== -1) {
      this.skillList.splice(index, 1);
    }
    this.exported = false
    this.warning = false
  }

  selecteLabel(label: string) {
    this.selectedLabel = label;
    this.exported = false
    this.warning = false
  }

  exportData(): void {
    if (this.selectedLabels.paragraph && this.selectedLabels.selected)
    {
      this.apiService.exportData(this.selectedLabels);
      this.exported = true
    }
    else {
      this.warning = true
    }
  }

  public addLabelDescription(event: TextSelectEvent): void {
    var description = document.getElementById('description');
    this.lableMessage = new LableMessage();
    if (event.text && this.selectedLabel && description) {
      this.selectedLabels.paragraph = description.textContent

      this.lableMessage.selected_text = event.text;
      this.lableMessage.label = this.selectedLabel;

      this.selectedLabels.selected.push(this.lableMessage)
    }
    this.exported = false
    this.warning = false
  }

}
