import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drop-down-menu',
  imports: [CommonModule],
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.css'
})
export class DropDownMenuComponent {
  isMenuOpen : boolean = false;
  selectedMenu : string = 'Mes Dernières Actions';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectOption(option : string) {
    this.selectedMenu = option;
    this.isMenuOpen = false;
  }


}
