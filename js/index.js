function init() {
document.addEventListener("deviceready", deviceReady, true);
delete init;
}

function deviceReady() {

	$("#loginForm").on("submit",function(e) {
		//disable the button so we can't resubmit while we wait
		$("#submitButton",this).attr("disabled","disabled");
		var u = $("#username", this).val();
		var p = $("#password", this).val();
		
		if(u != '' && p!= '') {
			$.ajax({ 
				 type: 'POST', 
				 url: 'http://blog.grassrootsgroup.com/phonegap/service.php', 
				 crossDomain: true,
				 data:  {username: u, password: p},
				 dataType: 'json', 
				 async: false,
	
				 success: function (response){ 
					if (response.success) { 
						window.localStorage["username"] = e;
						window.localStorage["password"] = p; 
						//window.localStorage["UID"] = data.uid;           
						window.location = "member.html";
					} 
					else {
						navigator.notification.alert("Your login failed", function(){});
						//window.location("main.html");
					}
				 },
				 error: function(error){
					 //alert(response.success);
					navigator.notification.alert('Could not connect to the database' + error, function(){});
				}
			}); 
		} else {
			navigator.notification.alert("You haven't entered anything", function() {});
		}
		
		return false;
	});

}

/*$(document).ready(function() {
	$("#loginForm").on("submit",function(e) {
		//disable the button so we can't resubmit while we wait
		//$("#submitButton",this).attr("disabled","disabled");
		var u = $("#username", this).val();
		var p = $("#password", this).val();
		
		if(u != '' && p!= '') {
			$.ajax({ 
				 type: 'POST', 
				 url: 'http://blog.grassrootsgroup.com/phonegap/service.php', 
				 crossDomain: true,
				 data:  {username: u, password: p},
				 dataType: 'json', 
				 async: false,
	
				 success: function (response){ 
					alert("response"); 
					if (response.success) { 
						alert("you're logged in");
						window.localStorage["email"] = e;
						window.localStorage["password"] = p; 
						//window.localStorage["UID"] = data.uid;           
						window.location = "member.html";
					} 
					else {
	
						alert("Your login failed");
						//window.location("main.html");
					}
				 },
				 error: function(error){
					 //alert(response.success);
					alert('Could not connect to the database' + error);
				}
			}); 
		} else {
			alert("You haven't entered anything", function() {});
		}
		
		return false;
	});

});*/