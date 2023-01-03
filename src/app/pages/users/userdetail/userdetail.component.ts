import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  @Input() displayDetailModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean>= new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){    
    this.clickClose.emit(true); 
}
}
