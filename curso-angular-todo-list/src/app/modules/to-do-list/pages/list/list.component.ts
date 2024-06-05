import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.interface';
import { JsonPipe } from '@angular/common';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { ELocalStorage } from '../../enum/ELocalStorage.enum';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  // dado pego do localStorage
  #setListItems = signal<IListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]')
  }

  #updateLocalStorage() {
    return localStorage.setItem(
      ELocalStorage.MY_LIST, JSON.stringify(this.#setListItems())
    );
  }

  // funcao para captar as informações fornecidas pelo filho input-add-item
  public getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      ELocalStorage.MY_LIST, JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  public listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IListItems) => {
      if (value === 'pending') {
        return !res.checked;
      }
      if (value === 'completed') {
        return res.checked;
      }
      return res;
    })
  }

  public updateItemCheckbox(newItem: { id: string, checked: boolean }){
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter(res => {
        if(res.id === newItem.id){
          res.checked = newItem.checked;
          return res
        }
        return res
      })
      return oldValue
    });
    return this.#updateLocalStorage();
  }

  public updateItemText(newItem: { id: string, value: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter(res => {
        if(res.id === newItem.id){
          res.value = newItem.value;
          return res
        }
        return res
      })
      return oldValue
    });
    return this.#updateLocalStorage();
  }

  public deleteItem(id: string) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      return oldValue.filter((res) => res.id !== id)
    });
    return this.#updateLocalStorage();
  }

  public deleteAllItems() {
    localStorage.removeItem(ELocalStorage.MY_LIST);
    return this.#setListItems.set(this.#parseItems());
  }
}
