(function(window, $, models) {
  // initialize personManager
  var personManager = new models.PersonManager();


  // loads the data from source
  function loadData(){
    var data = peopleList,
    person;
    $.each(data, function(index, d){
      person = new models.Person();
      person.setDetails(d);
      personManager.addPerson(person);
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

  function clearForm(element){
		$(element).find("input[type=text]", "select").val("");
	}

  function addPerson(){
    $("#add").click(function(){
      var data = getFormData(".new-person");
      console.log(data);
      if(!$.isEmptyObject(data)){
        $('#modal2').modal('close');
        clearForm(".new-person");
        data.picture = "https://onbcanada.ca/wp-content/themes/onb/images/placeholder.png";
        person = new models.Person();
        person.setDetails(data);
        personManager.addPerson(person);
        var card = createSingleCard(data);
        $(".person-list").append(card);
      }
    });
	}
  function createSingleCard(data){
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
                    '<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>'+
                  '</div>'+
                '</div>'+
              '</div>';
      return card;
  }

  function createCardFromList(element){
    $.each(personManager.persons, function(index,row){
      card = createSingleCard(row);
      $(element).append(card);
    });
  }

$(document).ready(function(){
  $('.modal').modal();
  $('#modal2').modal({
      complete: function() {
        var confirmation = confirm("Are you sure?!");
        if (confirmation == true) {
            clearForm(".new-person");
        }
       } // Callback for Modal close
    }
  );
  loadData();
  createCardFromList(".person-list");

  addPerson();
});

})(this, jQuery, this.models);
