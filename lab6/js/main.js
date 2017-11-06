(function(window, $, models) {
  // initialize personManager
  var personManager = new models.PersonManager();


  // loads the data from source
  function loadData(){
    // get all users
    personManager.get(function(res){
      // for each user
      $.each(res, function(index, data){
        create a person model
        var person = new models.Person();
        person.setDetails(data);
        person.printPerson();
        // add the persons to a collection
        personManager.persons.push(person);
      });
      createCardFromList(".person-list");
      addPerson();
      fullProfileModal();
      deleteProfile();
    });
  }

  function reduceWords(string){
    if (!string) {
      string = 'At vero quos dolores et quas molestias excepturi sint occaecati cupiditate non provident';
    }
    return string.substring(0, 100);
  }

  function getFormData(element){
		var form = $(element),
		dataArray = form.serializeArray(),
		data = {},
		valid = true;
		$.each(dataArray, function(index, value){
			$("label[for="+value.name+"]").removeClass('red-text');
			if(value.value === ""){
				$("label[for="+value.name+"]").addClass('red-text');
				valid = false;
			}
			data[value.name] = value.value;
		});
		if(valid === true){
			return data;
		}else{
			return {};
		}
	};

  function popForm(data){
    $('.profile-name').text(data.firstName+" "+data.lastName);
    $.each(data, function(index, d){
      if ($('input[name=view_'+index+']').length > 0) {
        $('input[name=view_'+index+']').val(d);
      }
    });
  }

  function clearForm(element){
		$(element).find("input").val("");
	}

  function addPerson(){
    $("#add").click(function(){
      var data = getFormData(".new-person");
      console.log(data);
      if(!$.isEmptyObject(data)){
        $('#modal2').modal('close');
        data.picture = "https://onbcanada.ca/wp-content/themes/onb/images/placeholder.png";
        data.about = 'At vero quos dolores et quas molestias excepturi sint occaecati cupiditate non provident';
        personManager.post(data, function(){
          var card = createSingleCard(personManager.persons.length-1, data);
          $(".person-list").append(card);
          fullProfileModal();
          deleteProfile();
        });
      }
    });
	}
  function createSingleCard(index, data){
    var card = '<div class="col m3 profile">'+
                '<div class="card">'+
                  '<div class="card-image">'+
                    '<img src="'+data.picture+'">'+
                    '<span class="card-title grey-text">'+data.firstName+' '+data.lastName+'</span>'+
                  '</div>'+
                  '<div class="card-content">'+
                    '<p>'+reduceWords(data.about)+'</p>'+
                  '</div>'+
                  '<div class="card-action">'+
                    '<button class="waves-effect waves-light btn full-profile" data-id="'+index+'">'+
                      '<i class="material-icons">&#xE8F4;</i>'+
                    '</button>'+
                    '<button class="waves-effect red btn delete-profile" data-id="'+index+'">'+
                      '<i class="material-icons">&#xE14C;</i>'+
                    '</button>'+
                  '</div>'+
                '</div>'+
              '</div>';
      return card;
  }

  function fullProfileModal(){
    $('.full-profile').click(function(){
      var index = $(this).data(),
      person = personManager.persons[index.id];
      $('#modal1').modal('open');
      popForm(person);
    });
  }

  function deleteProfile(){
    $('.delete-profile').click(function(){
      var index = $(this).data(),
      that = $(this);
      personManager.deletePersonById(index.id, function(){
        that.parent().parent().parent().remove();
      });

    });
  }

  function createCardFromList(element){
    $.each(personManager.persons, function(index,row){
      card = createSingleCard(index, row);
      $(element).append(card);
    });
  }

$(document).ready(function(){
  $('.modal').modal({
    complete:function() {
      clearForm('.new-person');
      clearForm('.view-person');
    }
  });
  loadData();
});

})(this, jQuery, this.models);
