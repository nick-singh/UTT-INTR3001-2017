(function(window){

	var personList = [
		{"firstName":"Nicholas", "lastName":"Chamansingh","sex":"Male","country":"Trindad"}
	];

	function getFormData(id){
		var form = $(id),
		dataArray = form.serializeArray(),
		data = {},
		valid = true;
		$.each(dataArray, function(index, value){
			$("input[name="+value.name+"]").removeClass('red');
			if(value.value === ""){
				$("input[name="+value.name+"]").addClass('red');
				valid = false;
			}
			data[value.name] = value.value;
		});
		if(valid === true){
			clearForm(id);
			return data;
		}else{
			return {};
		}

	};

	function clearForm(id){
		$(id).find("input[type=text]", "select").val("");
	}

	function selectPersonFromTable(){
		$(".tablePerson").click(function(){
			var row = $(this).data();
			console.log(personList[row.id]);
		});
	}

	function addPersonRow(){
		$("#personTableBody").empty();
		$.each(personList, function(index, data){
			var row = "<tr class='tablePerson' data-id='"+index+"'>"+
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
			if(!$.isEmptyObject(data)){
				personList.push(data);
				addPersonRow();
				selectPersonFromTable();
			}
		});
	}

	$(document).ready(function() {
		$('select').material_select();
		addPerson();
		addPersonRow();
		selectPersonFromTable();
	});

})(this);
