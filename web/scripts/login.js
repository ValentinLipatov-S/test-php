$(document).ready(function()
{	
	$('#Login').click(function()
	{			
		$("div[id='download']").slideDown(300);
		$.ajax
		({
			type: "GET",
			url:  "server.php",
			data: 
			{
				comand:   	   "autorization", 
				user_login:    $("#Login_Login").val(), 
				user_password: $("#Login_Password").val()
			},
			success: function(msg)
			{
				var arr = msg.split('<-msg->');
				
				$("#p_message").html(arr[0] + ":<br>" + arr[1]);
				if(arr[0] === "SUCCESS")
				{
					
				}
				$("div[id='message']").slideDown(300);
				$("div[id='download']").slideUp(300);
				setTimeout(function() 
				{
					$("div[id='message']").slideUp(300);	
				}, 3000);
			}					 
		});			
	});
	$('#Registartion').click(function()
	{
		$("div[id='download']").slideDown(300);
		$.ajax
		({
			type: "GET",
			url:  "server.php",
			data: 
			{
				comand:   	       "registration", 
				user_login: 	   $("#Registartion_Login").val(), 
				user_password: 	   $("#Registartion_Password").val(),
				user_firstname:    $("#Registartion_Name").val(), 
				user_secondname:   $("#Registartion_Surname").val()
			},
			success: function(msg)
			{
				var arr = msg.split('<-msg->');
				
				$("#p_message").html(arr[0] + ":<br>" + arr[1]);
				$("div[id='message']").slideDown(300);
				$("div[id='download']").slideUp(300);
				setTimeout(function() 
				{
					$("div[id='message']").slideUp(300);	
				}, 3000);
			}					 
		});			
	});
});
