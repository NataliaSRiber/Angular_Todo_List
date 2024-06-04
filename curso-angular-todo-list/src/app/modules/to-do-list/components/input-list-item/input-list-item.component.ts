import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({ required: true }) public inputListItems: IListItems[] = [];

  // envia as informações para o componente pai tratar
  @Output() public outputUpdateItemCheckbox = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();
  // quando a pessoa clicar no checkbox será verificado se este esta checado ou nao e receberá o id
  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  @Output() public outputUpdateItemText = new EventEmitter<{
    id: string;
    value: string;
  }>();

  public updateItemText(id: string, value: string) {
    return this.outputUpdateItemText.emit({ id, value });
  }
}
