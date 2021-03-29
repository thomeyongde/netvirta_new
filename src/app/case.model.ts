

export class Case{
    img:String;
    firstName:String;
    lastName:String;
    birthDate:Date;
    country:String;
    status:String;
    id:number;
    phoneNumber:number;
  
    constructor(id:number,img:String,firstName:String,lastName:String,birthDate:Date,country:String,status:String,phoneNumber:number){
      this.id=id;
      this.img=img;
      this.firstName=firstName;
      this.lastName=lastName;
      this.birthDate=birthDate;
      this.country=country;
      this.status=status;
      this.phoneNumber=phoneNumber;
    }
  }