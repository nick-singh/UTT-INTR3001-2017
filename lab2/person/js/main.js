(function(){

	var personList = [
		{"firstName":"Nicholas", "lastName":"Chamansingh","sex":"Male","country":"Trindad"}
	];

	function getFormData(id){
		var data = {},
    form = $(id),
    viewArr = form.serializeArray(),
    valid = true;

    $.each(viewArr, function(i,d){
      data[viewArr[i].name] = viewArr[i].value;
      if(viewArr[i].value === ""){
        valid = false;
      }
    });
    if(valid){
      return data;
    }else{
      return {};
    }
	}
	function clearForm(id){
    $(id).find("input[type=text], textarea").val("");
  }

	function addRow(){
		$("#personTableBody").empty();
		$.each(personList, function(index, data){
				var row = "<tr>"+
									"<td>"+data.firstName+"</td>"+
									"<td>"+data.lastName+"</td>"+
									"<td>"+data.sex+"</td>"+
									"<td>"+data.country+"</td>"+
								"</tr>";
			$("#personTableBody").append(row);
		});
	}

	function addPerson(){
		$("#add").click(function(){
        var data = getFormData("#personDetails");
				console.log(data);
				if (!_.isEmpty(data)) {
					personList.push(data);
					addRow();
					clearForm("#personDetails");
				}else{
					alert("There are empty Fields");
				}
    });
	}


	$(document).ready(function(){
		$('select').material_select();
		addRow();
		addPerson();
	});

})()
