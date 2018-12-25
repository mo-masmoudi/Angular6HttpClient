import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from "../../shared/user.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  model = {
    email: "",
    password: ""
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl("/userprofile");
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.spinner.show();
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res["token"]);
        this.spinner.hide();
        this.router.navigateByUrl("/userprofile");
      },
      err => {
        this.spinner.hide();
        this.model.password = "";
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  onKey(event: KeyboardEvent) {
    this.serverErrorMessages = "";
  }
}
