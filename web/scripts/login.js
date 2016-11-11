$(document).ready(function()
{	
	var login, password;
	$('#Login').click(function()
	{			
		$("div[id='message']").slideUp(300);
		$("div[id='download_autorization']").slideDown(300);
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
				console.log(msg);
				var arr = msg.split('<-msg->');
				$("#p_message").html(arr[0] + ":<br>" + arr[1]);
				if(arr[0] == "SUCCESS")
				{	
					login = user_login_now;
					password = user_password_now;
					$("div[id='Autorization']").slideUp(300);
					$("input[id='Exit_Button']").slideDown(300);
					AddChatRooms();					
				}
				else
				{
					$("div[id='message']").slideDown(300);
					$("div[id='download_autorization']").slideUp(300);
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
		$("div[id='download_autorization']").slideDown(300);
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
				console.log(msg);
				var arr = msg.split('<-msg->');
				
				$("#p_message").html(arr[0] + ":<br>" + arr[1]);
				$("div[id='message']").slideDown(300);
				$("div[id='download_autorization']").slideUp(300);
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
		$("div[id='download_chatroom']").slideDown(300);
		$("#chatroom_append").empty();
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
				console.log(msg);
				var arr = msg.split('<-name->');
				
				
				for(var i = 0; i < arr.length - 1; i++)
				{
					var arr_2 = arr[i].split('<-id->');
					$('<div id = "chat" style = "width: 100%; display:none;">' + 
					'<input class = "Button" type = "submit" value = "' + arr_2[1] + '" style = "width: 40%; background: #7292ab;"/>' + 
					'<input class = "Text" id = "Chatroom_connect_password" type = "password" placeholder = "Password" style = "width: 40%; margin-left: -7px;  margin-right: -7px;" />' + 
					'<input id = "' + arr_2[1] + '" class = "Button" type = "submit" value = "Connect" style = "width: 20%; background: #f07797;"/>' + 
					'</div>').appendTo($("#chatroom_append"));
				    setTimeout(function() 
					{
						$("div[id = 'chat']").slideDown(300);		
					}, 100); 
				}	
				$("div[id='download_chatroom']").slideUp(300);
			}
		});			
	}
	
	
	
	
	$('#ChatRoom_Create').click(function()
	{
		if($("#ChatRoom_Name").val() != "")
		{
			$("div[id='download_chatroom']").slideDown(300);
			$.ajax
			({
				type: "GET",
				url: "server.php",
				data: 
				{
					comand: 'chatroom_create', 
					chatroom_name: $("#ChatRoom_Name").val(),
					user_login: login,
					user_password: password,
					chatroom_password: 12345
				},
				success: function(msg)
				{
					console.log(msg);
					$("div[id='download_chatroom']").slideUp(300);
					$("#ChatRoom_Name").val("");
					AddChatRooms();
				}					 
			});
		}
	});	
	
});
