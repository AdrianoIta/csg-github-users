import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public formGithub: FormGroup;
  displayedColumns: string[] = [
    'user_name',
    'repository',
    'url',
    'language',
    'description',
  ];
  dataSource: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.formGithub = this.formBuilder.group({
      form_user_name: new FormControl(''),
    });
  }

  search() {
    const user_name = this.formGithub.controls['form_user_name'].value;

    if (user_name !== '') {
      this.http.get(`http://127.0.0.1:5000/get-user/${user_name}`).subscribe({
        next: (data) => {
          this.dataSource = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
