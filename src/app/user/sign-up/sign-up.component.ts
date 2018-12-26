import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from "../../shared/user.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    public userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.spinner.show();
    this.userService.postUser(form.value).subscribe(
      res => {
        this.spinner.hide();
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.spinner.hide();
          this.serverErrorMessages = err.error.join("<br/>");
        } else {
          this.spinner.hide();
          this.serverErrorMessages =
            "Something went wrong.Please contact admin.";
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: "",
      email: "",
      password: "",
      age: "",
      famille: "",
      race: "",
      nourriture: ""
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }
}
