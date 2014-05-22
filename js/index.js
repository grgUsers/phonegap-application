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
    },"json");
}
return false;
});

}