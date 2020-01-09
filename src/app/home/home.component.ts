import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MymodalComponent } from '../mymodal/mymodal.component';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalOptions: NgbModalOptions;
  user: any;
  constructor(private router: Router, private modalservice: NgbModal,private authservice: AuthService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    this.authservice.getuser();
    console.log(this.authservice.logincount);
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.authservice.logincount) {
      this.open1();
    }

  }
  logout() {
    localStorage.removeItem('user');
    setTimeout(() => {
      this.router.navigate(['']);
    }, 500);
  }

  open1() {
    const modalRef = this.modalservice.open(MymodalComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
  }
}
