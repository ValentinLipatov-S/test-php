$(document).ready(function()
{	
	var login, password, chatroom_id;
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
					$('<div id = "chat" style = "width: 100%; display:none; margin-top: 3px;">' + 
					'<input class = "Button" type = "submit" value = "' + arr_2[1] + '" style = "width: 40%; background: #7292ab;"/>' + 
					'<input class = "Button" id = "Chatroom_connect_password" type = "submit" value = "Public" style = "width: 40%; background: #e4f06a;" />' + 
					'<input id = "' + arr_2[0] + '" class = "ChatRoomsButton" type = "submit" value = "Connect" style = "width: 20%; background: #f07797;"/>' + 
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
	
	
	
	
	$('#Chatroom_create').click(function()
	{
		if($("#Chatroom_name").val() != "")
		{
			$("div[id='download_chatroom']").slideDown(300);
			$.ajax
			({
				type: "GET",
				url: "server.php",
				data: 
				{
					comand: 'chatroom_create', 
					chatroom_name: $("#Chatroom_name").val(),
					user_login: login,
					user_password: password,
					chatroom_password: 12345
				},
				success: function(msg)
				{
					console.log(msg);
					$("div[id='download_chatroom']").slideUp(300);
					$("#Chatroom_name").val("");
					AddChatRooms();
				}					 
			});
		}
	});	
	 
	$('#Exit_Button').click(function()
	{
		clearInterval(Timer);	
		$("div[id='download_autorization']").slideUp(300);
		$("#Post_Area").empty();
		$("#chatroom_append").empty();
		$("div[id='Autorization']").slideDown(300);
		$("div[id='Profile']").slideUp(300);
		$("div[id='ChatRooms']").slideUp(300);
		$("div[id='Chat']").slideUp(300);
		$("input[id='Exit_Button']").slideUp(300);
		$("input[id='Chatmenu_Button']").slideUp(300);
		$("input[id='Update']").slideUp(300);
		login = "" ;
		password = ""; 
		chatroom_id = "";
	});
	
	$('#Chatmenu_Button').click(function()
	{
		clearInterval(Timer);
		$("#Post_Area").empty();
		$("#chatroom_append").empty();
		$("div[id='Autorization']").slideUp(300);
		$("div[id='Profile']").slideUp(300);
		$("div[id='ChatRooms']").slideDown(300);
		$("div[id='Chat']").slideUp(300);
		$("input[id='Exit_Button']").slideDown(300);
		$("input[id='Chatmenu_Button']").slideUp(300);
		$("input[id='Update']").slideUp(300);
		AddChatRooms();
	});
	
	
	var Max_Post = -1;
	var Min_Post =  0;
	var Post = -1;

	$('body').on('click', '.ChatRoomsButton', function()
	{		
		clearInterval(Timer);
		$("#Post_Area").empty();
		$("#chatroom_append").empty();
		$("div[id='Autorization']").slideUp(300);
		$("div[id='Profile']").slideUp(300);
		$("div[id='ChatRooms']").slideUp(300);
		$("div[id='Chat']").slideDown(300);
		$("input[id='Exit_Button']").slideDown(300);
		$("input[id='Chatmenu_Button']").slideDown(300);
		$("input[id='Update']").slideDown(300);
		$("div[id='download_chat']").slideDown(300);
	
		chatroom_id = $(this).attr("id");
		
		$.ajax
		({
			type: "GET",
			url: "server.php",
			data: 
			{
				comand: 'get_last_id_message',
				chatroom_id: chatroom_id,
				user_login: login,
				user_password: password
			},
			success: function(msg) 
			{ 
				console.log(msg);
				Max_Post = msg;
				Post = Max_Post;
				$.ajax
				({
					type: "GET",
					url: "server.php",
					data: 
					{
						comand: 'get_first_id_message',
						chatroom_id: chatroom_id,
						user_login: login,
						user_password: password
					},
					success: function(msg) 
					{ 
						console.log(msg);
						Min_Post = msg;
						Message_Timer();
						$("#Update").click();
						$("div[id='download_chat']").slideUp(300);
						$("div[id='Autorization']").slideUp(300);
						$("div[id='Profile']").slideUp(300);
						$("div[id='ChatRooms']").slideUp(300);
						$("div[id='Chat']").slideDown(300);
						$("input[id='Exit_Button']").slideDown(300);
						$("input[id='Chatmenu_Button']").slideDown(300);
						$("input[id='Update']").slideDown(300);
					}
				});
			}
		});
       
	});

	var Timer;
	function Message_Timer () 
	{
		Timer = setInterval(function () 
		{
			$.ajax
			({
				type: "GET",
				url: "server.php",
				data: 
				{
					comand: 'get_last_id_message',
					chatroom_id: chatroom_id,
					user_login: login,
					user_password: password
				},
				success: function(msg) 
				{ 
					console.log(msg);
					if(msg > Max_Post)
					{
						
						while(msg > Max_Post)
						{
							Max_Post++;
							$.ajax
							({
								type: "GET",
								url: "server.php",
								data: 
								{
									comand: 'get_message',
									message_id: Max_Post,
									chatroom_id: chatroom_id,
									user_login: login,
									user_password: password
								},
								success: function(msg)
								{	
									console.log(msg);
									var arr = msg.split('<:>');
									if(arr[1] != "")$("#Post_Area").prepend('<div id = "Post" style = "display: none;"><b><p>' + arr[0] + '</b> : ' + arr[1] + '</p></div><br>');
									$("div[id = 'Post']").slideDown(300);
								}
							});	
						}
					}
				}
			}); 
		},100);
	}
	var Stop = -1;
	var Start = -1;
	function Update ()
	{
		if(Post === "" || Post - Min_Post < 0)
		{
			$("div[id='download_message']").slideUp(300);
			$("input[id='Update']").slideUp(300);
		}
		else
		{
			$("div[id='download_message']").slideDown(300);
			$("input[id='Update']").slideUp(300);
			$.ajax
			({
				type: "GET",
				url: "server.php",
				data: 
				{
					comand: 'get_message',
					message_id: Post,
					chatroom_id: chatroom_id,
					user_login: login,
					user_password: password
				},
				success: function(msg)
				{
					var arr = msg.split('<:>');
					if(arr[1] != "" && msg !="")
					{
						$('<div id = "Post" style = "display: none;"><b><p>' + arr[0] + '</b> : ' + arr[1] + '</p></div><br>').appendTo($("#Post_Area"));
						$("div[id = 'Post']").slideDown(300);	
						Start--;
					}
					if(Start > Stop){Post--; Update();}
					else
					{
						Post--; 
						$("div[id='download_message']").slideUp(300);
						$("input[id='Update']").slideDown(300);
					}
					
				}
			});	
		}	
	}	
	
	$('#Update').click(function(){Start = Post; Stop = Post - 15; Update();});

	
	$('#Post_Send').click(function()
	{
		if($("#Post_Send_Text").val() != "")
		{
			$.ajax
			({
				type: "GET",
				url: "server.php",
				data: 
				{
					comand: 'set_message', 
					message_text: $("#Post_Send_Text").val(),
					chatroom_id: chatroom_id,
					user_login: login,
					user_password: password
				},
				success: function(msg)
				{
					console.log(msg);
					$("#Post_Send_Text").val("");
				}					 
			});
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
