/* testing device 
document.addEventListener("deviceready", deviceReady, true); */
/* testing locally */

jQuery(document).ready(function(){
	deviceReady();
/* testing locally */

	$('.diary img').each(function(i){
		$(this).delay(500*i).fadeTo(500,1);
	});
	
	
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
			//handleLogin(u,p); 
			localBypass();
		});
		
		//menu popping
		$("#showMenu").click(function() {
			var winW = window.innerWidth,
				winH = window.innerHeight;
			
			$("#menuPop").css({height:winH}).animate({width : winW});
		});
		
		$('.header-member').load('header-member.html');
		$('.footer-member').load('footer-member.html');
		$('.header-guest').load('header-guest.html');
		$('.footer-guest').load('footer-guest.html');
	}
	function localBypass() {
		$.mobile.changePage( "#toddler-details", { transition: "fade", changeHash: false });
	}
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
						$.mobile.changePage( "#member-page2", { transition: "fade", changeHash: false });
					} else {
						navigator.notification.vibrate(800);
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
	
	
	
/* testing locally */
});
/* testing locally */


jQuery(window).resize(function() {
	
	/* mobile nav 
	var width = $(window).width();
	$('ul#menu').width(width-20); // 20 for left margin
	mobile nav */

});