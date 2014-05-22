document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
	
	function checkConnection() {
		var networkState = navigator.network.connection.type;
	
		var states = {};
		states[Connection.UNKNOWN]  = 'unknown';
		states[Connection.ETHERNET] = 'Ether';
		states[Connection.WIFI]     = 'wifi';
		states[Connection.CELL_2G]  = '2g';
		states[Connection.CELL_3G]  = '3g';
		states[Connection.CELL_4G]  = '4g';
		states[Connection.NONE]     = 'no connection';
	}

	$("#loginForm").on("submit",function(e) {
		//disable the button so we can't resubmit while we wait
		$("#submitButton",this).attr("disabled","disabled");
		var u = $("#username", this).val();
		var p = $("#password", this).val();
		
		if(checkConnection != "no connection" || checkConnection != "2g") {
			var uLs = window.localStorage.getItem("username"),
				pLs = window.localStorage.getItem("password");
				
			if(uLs && pLs) {
				loginAjax(uLs,pLs);
			} else if(u != '' && p!= '') {
				loginAjax(u,p);
			} else {
				alert("You haven't entered anything");
			}
		} else {
			alert('an internet connection cannot be found, or your connection is too weak');
		}
		return false;
	});
	
	function loginAjax(u,p) {
		$.mobile.changePage( "#loading", { transition: "flip"} );
		$.ajax({ 
			 type: 'POST', 
			 url: 'http://blog.grassrootsgroup.com/phonegap/service.php', 
			 crossDomain: true,
			 data:  {username: u, password: p},
			 dataType: 'json', 
			 async: false,
	
			 success: function (response){ 
				if (response.success) { 
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
				alert('Could not connect to the database' + error);
			}
		}); 
	}

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