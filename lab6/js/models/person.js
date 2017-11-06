(function(window){
    "use strict";

    window.models = {
        Person : {},
        PersonManager: {}
    };
    var Person,
    PersonManager;

    Person = function(){
        this.firstName = "";
        this.lastName = "";
        this.gender = "";
        this.picture = "";
        this.id = -1;
        this.age = 0;
        this.email = "";
        this.phone = "";
        this.address = "";
        this.about = "";
        this.registered = "";
        this.greeting = "";
        this.favoriteFruit = "";
        this.company = ""
    };

    Person.prototype.get = function(id, _callback){
      $.ajax({
        url: "api/index.php/users/"+id,
        method: "GET"
      }).done(function(res){
          if (typeof _callback === 'function') {
              _callback(JSON.parse(res));
          }
      }).fail(function(res){
          console.log(res);
      });
    };

    Person.prototype.put = function(id, data, _callback){
      $.ajax({
        url: "api/index.php/users/"+id,
        method: "PUT",
        data:data
      }).done(function(res){
          if (typeof _callback === 'function') {
              _callback(JSON.parse(res));
          }
      }).fail(function(res){
          console.log(res);
      });
    }

    Person.delete = function(id, _callback){
        $.ajax({
          url: "api/index.php/users/"+id,
          method: "DELETE"
        }).done(function(res){
            if (typeof _callback === 'function') {
                _callback(JSON.parse(res));
            }
        }).fail(function(res){
            console.log(res);
        });
    }

    Person.prototype.setDetails = function(details){
        var that = this;
        $.each(details, function(key, value){
            if (details[key]) {
                if (key === 'id') {
                    that[key] = parseInt(value);
                }else{
                    that[key] = value;
                }
            }
        });
    };


    Person.prototype.printPerson = function(){
        var str = "";
        str += "First Name: "+this.firstName;
        str += " Last Name: "+this.lastName;
        str += " Sex: "+ this.gender;
        str += " Picture: "+ this.picture;
        str += " Company: "+this.company;

        return str;
    };


    PersonManager = function(){

      this.persons = [];

      this.get = function(_callback){
        $.ajax({
          url: "api/index.php/users",
          method: "GET"
        }).done(function(res){
          if (typeof _callback === 'function') {
            _callback(JSON.parse(res));
          }
        }).fail(function(res){
          console.log(res);
        });
      }
    };

    PersonManager.prototype.post = function(person, _callback){
        var p = new Person(),
        that = this;
        p.setDetails(person);
        if (p instanceof Person)  {
            $.ajax({
              url: "api/index.php/users",
              method: "POST",
              data: person
            }).done(function(res){
                console.log(res);
                that.persons.push(p);
                if (typeof _callback === 'function') {
                    _callback(JSON.parse(res));
                }
            }).fail(function(res){
                console.log(res);
            });
        }else{
            window.console.log("No Person added");
        }
    };


    PersonManager.prototype.deletePersonById = function(indx, _callback){
      if(indx >= 0 && indx < this.persons.length){ //check if valid index
            var that = this;
            Person.delete(this.persons[indx].id, function(res){
                that.persons.splice(indx, 1);

                if (typeof _callback === 'function') {
                    _callback(res);
                }
            });
            return false
        }
        return false;
    };

    models.Person = Person;
    models.PersonManager = PersonManager;

}(this));
