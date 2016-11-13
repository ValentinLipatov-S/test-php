$(document).ready(function()
{	
	var login, password, chatroom_id;
	var chatroom_password;
	$('#Login').click(function()
	{			
		$("div[id='download_autorization']").slideDown(375);
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
				if(arr[0] == "SUCCESS")
				{	
					var arr_2 = arr[1].split('<-name->');
					var name = arr_2[0];
					var surname = arr_2[1];
					$("#p_message").html(arr[0] + " : Autorization user as " + name + " " + surname);
					$('#Profile_Name').val(name);
					$('#Profile_Surname').val(surname);
					login = user_login_now;
					password = user_password_now;
					$("div[id='message']").slideDown(375);
					$("div[id='Autorization']").slideUp(375);
					$("input[id='Exit_Button']").slideDown(375);
					$("div[id='Profile']").slideDown(375);
					setTimeout(function() 
					{
						$("div[id='message']").slideUp(375);	
					}, 2000);
					AddChatRooms();					
				}
				else
				{
					$("#p_message").html(arr[0] + " : " + arr[1]);
					$("div[id='message']").slideDown(375);
					$("div[id='download_autorization']").slideUp(375);
					setTimeout(function() 
					{
						$("div[id='message']").slideUp(375);	
					}, 2000);
				}
			}					 
		});			
	});
	$('#Registartion').click(function()
	{
		$("div[id='download_autorization']").slideDown(375);
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
				
				$("#p_message").html(arr[0] + " : " + arr[1]);
				$("div[id='message']").slideDown(375);
				$("div[id='download_autorization']").slideUp(375);
				setTimeout(function() 
				{
					$("div[id='message']").slideUp(375);	
				}, 2000);
			}					 
		});			
	});
	
	
	
	function AddChatRooms()
	{
		$("div[id='ChatRooms']").slideDown(375);
		$("div[id='download_chatroom']").slideDown(375);
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
					if(arr_2[2] == "public")
					{
						$('<div id = "chat" style = "width: 100%; display:none; margin-top: 3px;">' + 
						'<input class = "Button" type = "submit" value = "' + arr_2[1] + '" style = "width: 40%; background: #7292ab;"/>' + 
						'<input class = "Button" id = "Chatroom_connect_password" type = "submit" value = "Public" style = "width: 40%; background: #e4f06a;" />' + 
						'<input id = "' + arr_2[0] + '" class = "ChatRoomsButton" type = "submit" value = "Connect" style = "width: 20%; background: #f07797;"/>' + 
						'</div>').appendTo($("#chatroom_append"));
						setTimeout(function() 
						{
							$("div[id = 'chat']").slideDown(375);		
						}, 100); 
					}
					else
					{
						$('<div id = "chat" style = "width: 100%; display:none; margin-top: 3px;">' + 
						'<input class = "Button" type = "submit" value = "' + arr_2[1] + '" style = "width: 40%; background: #7292ab;"/>' + 
						'<input class = "Text" id = "Chatroom_connect_password_text" type = "password" placeholder = "Password" style = "width: 40%;" />' + 
						'<input id = "' + arr_2[0] + '" class = "ChatRoomsButton" type = "submit" value = "Connect" style = "width: 20%; background: #f07797;"/>' + 
						'</div>').appendTo($("#chatroom_append"));
						setTimeout(function() 
						{
							$("div[id = 'chat']").slideDown(375);		
						}, 100); 
					}
				}	
				$("div[id='download_chatroom']").slideUp(375);
			}
		});			
	}
	$('#Chatroom_create').click(function()
	{
		if($("#Chatroom_name").val() != "")
		{
			$("div[id='download_chatroom']").slideDown(375);
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
					chatroom_password: $('#Chatroom_password').val()
				},
				success: function(msg)
				{
					console.log(msg);
					$("div[id='download_chatroom']").slideUp(375);
					$("#Chatroom_name").val("");
					AddChatRooms();
				}					 
			});
		}
	});	
	 
	 $('#Search').click(function()
	{
		$("div[id='ChatRooms']").slideDown(375);
		$("div[id='download_chatroom']").slideDown(375);
		var search = $("#Search_text").val();
		$("#Search_text").val("");
		$("#chatroom_append").empty();
		$.ajax
		({
			type: "GET",
			url: "server.php",
			data: 
			{
				comand: 'chatrooms_search', 
				user_login: login,
				user_password: password,
				chatrooms_search_text: search
			},
			success: function(msg)
			{
				console.log(msg);
				var arr = msg.split('<-name->');		
				for(var i = 0; i < arr.length - 1; i++)
				{
					var arr_2 = arr[i].split('<-id->');
					if(arr_2[2] == "public")
					{
						$('<div id = "chat" style = "width: 100%; display:none; margin-top: 3px;">' + 
						'<input class = "Button" type = "submit" value = "' + arr_2[1] + '" style = "width: 40%; background: #7292ab;"/>' + 
						'<input class = "Button" id = "Chatroom_connect_password" type = "submit" value = "Public" style = "width: 40%; background: #e4f06a;" />' + 
						'<input id = "' + arr_2[0] + '" class = "ChatRoomsButton" type = "submit" value = "Connect" style = "width: 20%; background: #f07797;"/>' + 
						'</div>').appendTo($("#chatroom_append"));
						setTimeout(function() 
						{
							$("div[id = 'chat']").slideDown(375);		
						}, 100); 
					}
					else
					{
						$('<div id = "chat" style = "width: 100%; display:none; margin-top: 3px;">' + 
						'<input class = "Button" type = "submit" value = "' + arr_2[1] + '" style = "width: 40%; background: #7292ab;"/>' + 
						'<input class = "Text" id = "Chatroom_connect_password_text" type = "password" placeholder = "Password" style = "width: 40%;" />' + 
						'<input id = "' + arr_2[0] + '" class = "ChatRoomsButton" type = "submit" value = "Connect" style = "width: 20%; background: #f07797;"/>' + 
						'</div>').appendTo($("#chatroom_append"));
						setTimeout(function() 
						{
							$("div[id = 'chat']").slideDown(375);		
						}, 100); 
					}
				}	
				$("div[id='download_chatroom']").slideUp(375);
			}
		});	
	});
	
	
	
	$('#Exit_Button').click(function()
	{
		clearInterval(Timer);	
		$("div[id='download_autorization']").slideUp(375);
		$("div[id='Profile']").slideUp(375);
		$("#Post_Area").empty();
		$("#chatroom_append").empty();
		$("div[id='Autorization']").slideDown(375);
		$("div[id='ChatRooms']").slideUp(375);
		$("div[id='Chat']").slideUp(375);
		$("input[id='Exit_Button']").slideUp(375);
		$("input[id='Chatmenu_Button']").slideUp(375);
		$("input[id='Update']").slideUp(375);
		login = "" ;
		password = ""; 
		chatroom_id = "";
	});
	
	
	
	
	$('#Change_Name').click(function()
	{
		$('#download_profile').slideDown(375);
		$.ajax
		({
			type: "GET",
			url: "server.php",
			data: 
			{
				comand: 'change_firstname',
				user_login: login,
				user_password: password,
				new_user_firstname: $('#Change_Name_Text').val() 
			},
			success: function(msg)
			{
				$('#Change_Name_Text').val("");
				console.log(msg);
				$('#Profile_Name').val(msg);
				$('#download_profile').slideUp(375);
			}
		});		
	});
	
	$('#Change_Surname').click(function()
	{
		$('#download_profile').slideDown(375);
		$.ajax
		({
			type: "GET",
			url: "server.php",
			data: 
			{
				comand: 'change_secondname',
				user_login: login,
				user_password: password,
				new_user_secondname: $('#Change_Surname_Text').val() 
			},
			success: function(msg)
			{
				$('#Change_Surname_Text').val(""); 
				console.log(msg);
				$('#Profile_Surname').val(msg);
				$('#download_profile').slideUp(375);
			}	
		});	
	});
	
	$('#Chatmenu_Button').click(function()
	{
		clearInterval(Timer);
		$("div[id='Profile']").slideDown(375);
		$("#Post_Area").empty();
		$("#chatroom_append").empty();
		$("div[id='Autorization']").slideUp(375);
		$("div[id='ChatRooms']").slideDown(375);
		$("div[id='Chat']").slideUp(375);
		$("input[id='Exit_Button']").slideDown(375);
		$("input[id='Chatmenu_Button']").slideUp(375);
		$("input[id='Update']").slideUp(375);
		AddChatRooms();
	});
	
	
	var Max_Post = -1;
	var Min_Post =  0;
	var Post = -1;
	
	$('body').on('click', '.ChatRoomsButton', function()
	{		
		$("div[id='ChatRooms']").slideDown(375);
		$("div[id='download_chatroom']").slideDown(375);
		chatroom_id = $(this).attr("id");
		
		if($(this).prev().attr("id") == "Chatroom_connect_password_text")chatroom_password = $(this).prev().val();
		else chatroom_password = "";
		
		$(this).prev().val("");
		
		$.ajax
		({
			type: "GET",
			url: "server.php",
			data: 
			{
				comand: 'chatroom_connect',
				chatroom_id: chatroom_id,
				chatroom_password: chatroom_password,
				user_login: login,
				user_password: password
			},
			success: function(msg) 
			{
				if(msg.indexOf('<-msg->') > -1)
				{
					console.log(msg);
					var arr = msg.split('<-msg->');
					
					$("#p_message").html(arr[0] + " : " + arr[1]);
					$("div[id='message']").slideDown(375);
					setTimeout(function() 
					{
						$("div[id='message']").slideUp(375);	
					}, 2000);
					$("div[id='download_chatroom']").slideUp(375);
					if(arr[0] == "SUCCESS")
					{
						clearInterval(Timer);
						$("#Post_Area").empty();
						$("#chatroom_append").empty();
						$("div[id='Autorization']").slideUp(375);
						$("div[id='Profile']").slideUp(375);
						$("div[id='ChatRooms']").slideUp(375);
						$("div[id='Chat']").slideDown(375);
						$("input[id='Exit_Button']").slideDown(375);
						$("input[id='Chatmenu_Button']").slideDown(375);
						$("input[id='Update']").hide();
						$("div[id='download_chat']").slideUp(375);
						$.ajax
						({
							type: "GET",
							url: "server.php",
							data: 
							{
								comand: 'get_first_id_message',
								chatroom_id: chatroom_id,
								user_login: login,
								user_password: password,
								chatroom_password: chatroom_password
							},
							success: function(msg) 
							{ 
								if(msg.indexOf("<-id->") > -1)
								{
									var arr = msg.split('<-id->');	
									if(arr[1] != "" && arr[0] != "")
									{
										console.log(msg);
										Max_Post = arr[1];
										Post = Max_Post;
										
										Min_Post =  arr[0];
										Message_Timer();
										
										if(Post - Min_Post >= 0)
										{
											console.log("id - " + Post + " min - " + Min_Post + " ");
											$("#Update").click();		
										}
										$("div[id='download_chat']").slideUp(375);
										$("div[id='Autorization']").slideUp(375);
										$("div[id='Profile']").slideUp(375);
										$("div[id='ChatRooms']").slideUp(375);
										$("div[id='Chat']").slideDown(375);
										$("input[id='Exit_Button']").slideDown(375);
										$("input[id='Chatmenu_Button']").slideDown(375);
									}
								}
							}
						});	
					}		
				}	
			}
		});     
	});

	var Timer;
	var flag = false;
	function Message_Timer () 
	{
		flag = false;
		Timer = setInterval(function () 
		{
			if(flag == false)
			{
				flag = true;
				$.ajax
				({
					type: "GET",
					url: "server.php",
					data: 
					{
						comand: 'get_last_id_message',
						chatroom_id: chatroom_id,
						user_login: login,
						user_password: password,
						chatroom_password: chatroom_password
					},
					success: function(msg) 
					{ 
						flag = false;
						console.log(msg);
						var arr = msg.split('<-id->');	
						if(arr[1] != "" && arr[0] != "")
						{
							if(arr[0] == chatroom_id)
							{
								if(arr[1] > Max_Post)
								{
									while(arr[1] > Max_Post)
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
												user_password: password,
												chatroom_password: chatroom_password
											},
											success: function(msg)
											{	
												console.log(msg);
												var arr_1 = msg.split('<:>');
												if(arr_1[1] != "")$("#Post_Area").prepend('<div id = "Post" style = "display: none;"><b><p>' + arr_1[0] + '</b> : ' + arr_1[1] + '</p></div><br>');
												$("div[id = 'Post']").slideDown(375);
											}
										});	
									}
								}
							}
						}	
					}
				}); 
			}
		},100);
	}
	var Stop = -1;
	var Start = -1;
	function Update ()
	{
		if(Post === "" || Post - Min_Post < 0)
		{
			$("div[id='download_message']").hide();
			$("input[id='Update']").hide();
		}
		else
		{
			$("div[id='download_message']").show();
			$("input[id='Update']").hide();
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
					user_password: password,
					chatroom_password: chatroom_password
				},
				success: function(msg)
				{
					var arr = msg.split('<:>');
					if(arr[1] != "" && msg !="")
					{
						$('<div id = "Post" style = "display: none;"><b><p>' + arr[0] + '</b> : ' + arr[1] + '</p></div><br>').appendTo($("#Post_Area"));
						$("div[id = 'Post']").show(375);	
						Start--;
					}
					if(Start > Stop){Post--; Update();}
					else
					{
						Post--; 
						$("div[id='download_message']").hide();
						if(Post === "" || Post - Min_Post > -1)$("input[id='Update']").show();
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
					user_password: password,
					chatroom_password: chatroom_password
				},
				success: function(msg)
				{
					console.log(msg);
					$("#Post_Send_Text").val("");
				}					 
			});
		}
	});
	
	
	
	
	$('#Login_Login').keydown(function (e) 
	{
		if (e.which == 13) $('#Login').click();
	});
	$('#Login_Password').keydown(function (e) 
	{
		if (e.which == 13) $('#Login').click();
	});
	$('#Registartion_Login').keydown(function (e) 
	{
		if (e.which == 13) $('#Registartion').click();
	});
	$('#Registartion_Password').keydown(function (e) 
	{
		if (e.which == 13) $('#Registartion').click();
	});
	$('#Registartion_Name').keydown(function (e) 
	{
		if (e.which == 13) $('#Registartion').click();
	});
	$('#Registartion_Surname').keydown(function (e) 
	{
		if (e.which == 13) $('#Registartion').click();
	});
	$('#Post_Send_Text').keydown(function (e) 
	{
		if (e.which == 13) $('#Post_Send').click();
	});
	$('#Chatroom_name').keydown(function (e) 
	{
		if (e.which == 13) $('#Chatroom_create').click();
	});
	$('#Search_text').keydown(function (e) 
	{
		if (e.which == 13) $('#Search').click();
	});
	$('#Change_Surname_Text').keydown(function (e) 
	{
		if (e.which == 13) $('#Change_Surname').click();
	});
	$('#Change_Name_Text').keydown(function (e) 
	{
		if (e.which == 13) $('#Change_Name').click();
	});
	
	
		
	$('#Enadle_Password').click(function()
	{
		if($('#Enadle_Password').val() == "Enable")
		{
			$("#Chatroom_password").css("background", "white");
			$('#Chatroom_password').val("");
			$('#Chatroom_password').removeAttr("disabled")
			$('#Enadle_Password').val("Disable");
		}
		else 
		{
			$("#Chatroom_password").css("background", "gray");
			$('#Chatroom_password').val("");
			$('#Chatroom_password').attr('disabled', "disabled");
			$('#Enadle_Password').val("Enable");
		}
		
	});
	
	
	
	
	
	
	
});
