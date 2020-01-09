import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.css']
})
export class MymodalComponent implements OnInit {
  @Input() my_modal_title;
  @Input() my_modal_content;
  password: any;
  password1:any;
  passmismatch:boolean;
  changepass: any;
  // activemodal = new NgbActiveModal();
  modalform: FormGroup
  constructor(private activeModal:NgbActiveModal, private authservice: AuthService) { }

  ngOnInit() {
     this.authservice.getuser();
     console.log(this.authservice.getuser());
  }

   async Updatepassword(){
    console.log(this.password);
    console.log(this.password1);
    if(this.password === this.password1) {
      console.log('passwords are matched');
      this.changepass ={
        Email: this.authservice.getuser(),
        password: this.password,
        confirm: this.password1
      }
      const status = await this.authservice.updatepassword(this.changepass);
      console.log(status);
      this.activeModal.close('save click');

    } else {
      this.passmismatch = true;

    }

  }
}
