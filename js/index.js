document.addEventListener("deviceready", deviceReady, true);

function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin(u, p) {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    //$("#submitButton",form).attr("disabled","disabled");

    if(u != '' && p!= '') {
		$.ajax({
		  type: "POST",
		  url: "http://blog.grassrootsgroup.com/phonegap/service.php",
		  dataType: 'json',
		  async: false,
		  data: { username: u ,password: p },
		  success: function (data) { 
				if(JSON.parse(data) == true) {
					//store
					window.localStorage["username"] = u;
					window.localStorage["password"] = p;             
					$.mobile.changePage("member.html");
				} else {
					navigator.notification.alert("Your login failed", function() {});
				}
			}
		})
    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        //$("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {  
	$("#loginForm #submitButton").click(function() { 
	if(localStorage.getItem('username') && localStorage.getItem('password')) {
		var u = localStorage.getItem('username');
		var p = localStorage.getItem('password');
		handleLogin(u,p);
	} else {
		var u = $("#loginForm #username").val();
		var p = $("#loginForm #password").val();
		handleLogin(u,p); 
	}
});
}