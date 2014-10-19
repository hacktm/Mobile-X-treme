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
	            if(res != 'false') {
	                //store
	                window.localStorage["username"] = u;
	                window.localStorage["password"] = p;
	                window.localStorage["userid"] = res;
	                //$('#pageContent').load('main-page.html');
	                $.changeView('#pageContent', 'main-page');
	            } else {
	                navigator.notification.alert("Wrong login!", function() {});
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

$.changeView = function(container, page) {
	$(container).load('views/'+page+'.html');
}

function deviceReady() {
    
$("#loginForm").on("submit",handleLogin);

}