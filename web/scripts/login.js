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
				comand:   "autorization", 
				login: 	  $("#Login_Login").val(), 
				password: $("#Login_Password").val()
			},
			success: function(msg)
			{
				var arr = msg.split('<-msg->');
				
				$("#p_message").html(arr[0] + ":<br>" + arr[1]);
				if(arr[0] === "SUCCESS")
				{
					
				}
				$("div[id='message']").slideDown(300);
				setTimeout(function() 
				{
					$("div[id='message']").slideUp(300);	
					$("div[id='download']").slideUp(300);
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
				comand:   	  "registration", 
				login: 	 	  $("#Login_Login").val(), 
				password: 	  $("#Login_Password").val(),
				firstname: 	  $("#Registartion_Name").val(), 
				secondname:   $("#Registartion_Surname").val()
			},
			success: function(msg)
			{
				var arr = msg.split('<-msg->');
				
				$("#p_message").html(arr[0] + ":<br>" + arr[1]);
				$("div[id='message']").slideDown(300);
				setTimeout(function() 
				{
					$("div[id='message']").slideUp(300);	
					$("div[id='download']").slideUp(300);
				}, 3000);
			}					 
		});			
	});
});
