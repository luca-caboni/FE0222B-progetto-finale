import { Component, OnInit } from '@angular/core';
import {  PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  dataUsers:any;
  displayedColumns: string[] = ['id', 'email', 'nome','cognome','roles'];
  constructor(private authSrv:AuthService,) {

  }

  ngOnInit(): void {
    this.authSrv.userGetAll(0,20)
    .pipe(
    )
    .subscribe((res)=>{
      console.log(res)
      console.log(res.content)
      this.dataUsers=res;
      console.log(this.dataUsers)
      console.log(this.dataUsers.content)
      console.log(this.dataUsers.content[1].roles[0].roleName)
    })
  }


onPageEvent(event:PageEvent){
this.authSrv.userGetAll(event.pageIndex,event.pageSize)
.subscribe(
  res=>{
    console.log(res)
    this.dataUsers=res;
    console.log(this.dataUsers)
  }
)
 }
}
