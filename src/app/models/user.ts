export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  name!: string;
  lastname!: string;
  roles!: [{
    id: number;
    roleName: string;
  }];
}
