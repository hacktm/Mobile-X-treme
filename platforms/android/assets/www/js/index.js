function init() {
document.addEventListener("deviceready", deviceReady, true);
delete init;
}


function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if(u != '' && p!= '') {
        $.ajax({
        	url:"http://hacktm.mngwebs.com/ajax.php?action=login",
        	type: 'POST',
        	data: {username:u,password:p}
        	}).done(function(res) {
	            if(res == 'true') {
	                //store
	                window.localStorage["username"] = u;
	                window.localStorage["password"] = p;             
	                //$.mobile.changePage("some.html");
	                navigator.notification.alert(
			            'You are the winner!',  // message
			            function(){},         // callback
			            'Game Over',            // title
			            'Done'                  // buttonName
			        );
	            } else {
	                navigator.notification.alert("Your login failed", function() {});
	            }
	            $("#submitButton").removeAttr("disabled");
	    }).fail(function(){
	    	navigator.notification.alert("Ajax Failed", function() {});
	    });
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
    
$("#loginForm").on("submit",handleLogin);

}