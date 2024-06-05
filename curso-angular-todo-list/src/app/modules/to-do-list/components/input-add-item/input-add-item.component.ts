import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);
  // pegando os dados do inputText definido no input do html
  @ViewChild("inputText") public inputText!: ElementRef;

  // items pegos do local storage
  @Input({ required: true }) public inputListItems: IListItems[] = []

// emitter vai transmitir eventos para fora. Neste caso a linha abaixo esta deixando "visivel" a função para que outros componentes possam utiliza-lo
  @Output() public outputAddListItems = new EventEmitter<IListItems>()

  public focusAndAddItem(value: string) {
    if (value) {
      // ao detectar alterações o cdr fará algo
      this.#cdr.detectChanges();
      // ao clicar em enter o input é limpo
      this.inputText.nativeElement.value = '';
      // emite para o elemento pai que pegará o objeto abaixo

      const curretDate = new Date();
      const timestamp = curretDate.getTime();
      const id = `ID ${timestamp}`

      this.outputAddListItems.emit({
        id,
        checked: false,
        value
      })
      // mantem a setinha dentro do input após enviar o valor (acessibilidade)
      return this.inputText.nativeElement.focus();
    }
  }
}
