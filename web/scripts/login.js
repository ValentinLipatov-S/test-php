$(document).ready(function()
{	
	var login, password;
	$('#Login').click(function()
	{			
		$("div[id='message']").slideUp(300);
		$("div[id='download']").slideDown(300);
		var user_login_now = $("#Login_Login").val();
		var user_password_now = $("#Login_Password").val();
		$.ajax
		({
			type: "GET",
			url:  "server.php",
			data: 
			{
				comand:   	   "autorization", 
				user_login:    user_login_now, 
				user_password: user_password_now
			},
			success: function(msg)
			{
				var arr = msg.split('<-msg->');
				$("#p_message").html(arr[0] + ":<br>" + arr[1]);
				if(arr[0] == "SUCCESS")
				{	
					login = user_login_now;
					password = user_password_now;
					$("div[id='Login_Registration']").slideUp(300);
					$("input[id='Exit']").slideDown(300);
					AddChatRooms();					
				}
				else
				{
					$("div[id='message']").slideDown(300);
					$("div[id='download']").slideUp(300);
					setTimeout(function() 
					{
						$("div[id='message']").slideUp(300);	
					}, 3000);
				}
			}					 
		});			
	});
	$('#Registartion').click(function()
	{
		$("div[id='message']").slideUp(300); 
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
	
	
	
	function AddChatRooms()
	{
		$("div[id='ChatRooms']").slideDown(300);
		$("div[id='download']").slideDown(300);
		$("#ChatRooms_List").empty();
		$.ajax
		({
			type: "GET",
			url: "server.php",
			data: 
			{
				comand: 'chatrooms', 
				user_login: login,
				user_password: password
			},
			success: function(msg)
			{
				var arr = msg.split('<-name->');
				arr.forEach(function(item, i, arr) 
				{
					var arr_2 = item.split('<-id->');
				    $('<input id = "' + arr_2[0] + '" class = "ChatRoomsButton" type = "submit" value = "' + arr_2[1] + '" style = "background: #e3f1ed; display: none;" />').appendTo($("#ChatRooms_Spisok"));
				    $("input[class = 'ChatRoomsButton']").slideDown(500);	
				});	
				$("div[id='download']").slideUp(300);
			}
		});		
		
	}
});
