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
		$.post("http://blog.grassrootsgroup.com/phonegap/service.php", {username:u,password:p}, function(res) {
			if(res == true) {
				$.mobile.changePage("member.html");
			} else {
				navigator.notification.alert("Your login failed", function() {});
			}
			 $("#submitButton").removeAttr("disabled");
		},"jsonp");
	} else {
		navigator.notification.alert("You haven't entered anything", function() {});
	}
	
	return false;
});

}

/*$(document).ready(function() {
	$("#loginForm").on("submit",function(e) {
		var u = $("#username", this).val(),
			p = $("#password", this).val();
			
		$.post("http://blog.grassrootsgroup.com/phonegap/service.php", {username:u,password:p}, function(res) {
			if(res == true) {
				$.mobile.changePage("member.html");
			} else {
				alert("Your login failed");
			}
			 $("#submitButton").removeAttr("disabled");
		},"jsonp");
	})
});*/