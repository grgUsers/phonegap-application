document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
//start of ready
		
	$("#loginForm #submitButton").click(function() {
		if($("#loginForm #username").val() != "" && $("#loginForm #password").val() != "") {	
			if(navigator.network.connection.type != Connection.NONE) {
				//check local storgae for login
				var uLs = window.localStorage.getItem("username"),
					pLs = window.localStorage.getItem("password")
					user = $("#loginForm #username").val(),
					pass = $("#loginForm #password").val();
					
				if(uLs && pLs != "" || !$(uls, pLs).empty()) {
					loginAjax(uLs,pLs);
				} else {
					//get values form the form
					loginAjax(user,pass);
				}
			} else {
				//check local storage for login
			}
		} else {
			alert("no login details have been entered")
		}
	});
		
	function loginAjax(u,p) {
		$.ajax({ 
			 type: 'POST', 
			 url: 'http://blog.grassrootsgroup.com/phonegap/service.php', 
			 crossDomain: false,
			 data:  {username: u, password: p},
			 dataType: 'jsonp', 
			 async: false,
	
			 success: function (response){ 
				if (response.success == "true") { 
					window.localStorage["username"] = u;
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
				alert('Could not connect to the database' + JSON.stringify(error));
			}
		}); 
	}
	
//end of ready
}