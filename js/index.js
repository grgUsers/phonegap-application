document.addEventListener("deviceready", deviceReady, true);

function handleLogin(u, p) {
	$.mobile.changePage( "#loading", { transition: "fade", changeHash: false });
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
					//navigator.notification.vibrate(800);           
					$.mobile.changePage( "member.html", { transition: "turn", changeHash: false });
				} else {
					//navigator.notification.vibrate(800);
					navigator.notification.alert(
						'Your login details are incorrect',  // message
						'Incorrect login',            // title
						'Exit'                  // buttonName
					);
					$.mobile.changePage( "#login", { transition: "fade", changeHash: false });
				}
			}
		})
    } else {
		navigator.notification.vibrate(800);
        navigator.notification.alert(
			'Your username or password empty',  // message
			'Missing information',            // title
			'Exit'                  // buttonName
		);
		$.mobile.changePage( "#login", { transition: "fade", changeHash: false });
    }
    return false;
}

function deviceReady() {  
	if(localStorage.getItem('username') && localStorage.getItem('password')) {
		var u = localStorage.getItem('username');
		var p = localStorage.getItem('password');
		
		$("#loginForm #username").attr("value", u);
		$("#loginForm #password").attr("value", p);
		
		handleLogin(u,p);
	}
	 
	$("#loginForm #submitButton").click(function() { 
		var u = $("#loginForm #username").val();
		var p = $("#loginForm #password").val();
		handleLogin(u,p); 
	});
}