(function(window){
  "use strict";

  window.Person = function(){

    // Public properties
    this.firstName = "";
    this.lastName = "";
    this.sex = "";
    //Private properties
    var country = "None";
    //Getter & Setter
    this.getCountry = function(){return country;};
    this.setCountry = function(c){country = c; };
  };

  //  Using person prototype
  Person.prototype.setName = function(fullName){// Nicholas Chamansingh
    var str_name = fullName.split(" ");
    if(str_name.length === 2){
      this.firstName = str_name[0];
      this.lastName = str_name[1];
    }else{
      console.log("error in setting name");
    }
  };

  Person.prototype.setDetails = function(details){

    if(details.firstName){
      this.firstName = details.firstName;
    }
    if(details.lastName){
      this.lastName = details.lastName;
    }
    if(details.sex){
      this.sex = details.sex;
    }
    if(details.country){
      this.setCountry(details.country);
    }

  }

  Person.prototype.printPerson = function(){
    var str = "";
    str += "Frist Name: "+this.firstName;
    str += " Last Name: "+this.lastName;
    str += " Sex: "+this.sex;
    str += " Country: "+this.getCountry();

    return str;
  }


  var person1 = new Person(),
  person2 = new Person(),
  person3 = new Person();

  var details1 = {
    firstName: "Nicholas",
    lastName: "Chamansingh",
    sex:"male",
    country:"Trinidad"
  },
  details2 = {
    firstName: "Crystal",
    lastName: "John",
    sex:"female",
    country:"Trinidad"
  },
  details3 = {
    firstName: "Shellyann",
    lastName: "Singh",
    sex:"female",
    country:"Tobago"
  };

  person1.setDetails(details1);
  console.log(person1.printPerson());
  person2.setDetails(details2);
  console.log(person2.printPerson());
  person3.setDetails(details3);
  console.log(person3.printPerson());


  var PersonManager = function(){
    this.persons = [];

  }


  PersonManager.prototype.addPerson = function(person){
    if(person instanceof Person){
      console.log("Entering Person: ", person.printPerson());
      var id = this.persons.length;
      this.persons.push(person);
      return id;
    }else{
      console.log("No Person was added");
    }
  }

  var pManager = new PersonManager();
  var id = pManager.addPerson(person1);



})(this);
