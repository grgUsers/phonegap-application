document.addEventListener("deviceready", deviceReady, true);

function checkPreAuth() {
	console.log("checking pre-auth")
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
	console.log("enter login handler")
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    //$("#submitButton",form).attr("disabled","disabled");
    var u = $("#loginForm #username").val();
    var p = $("#loginForm #password").val();
	console.log("username: "+u+" Password: "+p)
    if(u != '' && p!= '') {
		$.ajax({
		  type: "POST",
		  url: "http://blog.grassrootsgroup.com/phonegap/service.php",
		  data: { username: u ,password: p }
		}, "text").done(function( data ) {
			console.log(data)
			if(data == "true") {
				//store
				window.localStorage["username"] = u;
				window.localStorage["password"] = p;             
				$.mobile.changePage("member.html");
			} else {
				navigator.notification.alert("Your login failed", function() {});
			}
	  	});
    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        //$("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {  
console.log("device ready")
	$("#loginForm #submitButton").click(function() { handleLogin(); });
}