$(document).ready(function()
{	
	$("input[id='Exit']").hide();
	$("div[id='msg']").hide();
	$("div[id='Child']").hide();
	$("div[id='Chat']").hide();
	$("div[id='download_chat']").hide();
	$("input[id='Back_To_Chat_Rooms']").hide();
	$("div[id='ChatRooms']").hide(); 
	$("div[id='download_chatroom']").hide();
	
	$("div[id='Button']").click(function(e) 
	{
		var obj = $(this);
    	if(obj.children("div[id = 'Child']").is(':visible') == false)
		{
			if(e.target.id == 'Slim')
			{
				$("div[id='Child']").slideUp(500);
				obj.children("div[id = 'Child']").slideDown(500);
			}
		}
		else 
		{
			if(e.target.id == 'Slim')
			{
				obj.children("div[id = 'Child']").slideUp(500);
			}
		}
						
	});
	//Login
	$('#Login').click(function()
	{			
		$.ajax
		({
			type: "GET",
			url:  "server.php",
			data: 
			{
				comand:     "autorization", 
				login: 	  $("#Login_Login").val(), 
				password: $("#Login_Password").val()
			},
			success: function(msg)
			{
				alert(msg);
				var arr = msg.split('<-msg->');
				
				$("#p_msg").html(arr[0] + ": <br>" + arr[1]);
				$("div[id='msg']").slideDown(300);
				setTimeout(function() 
				{
					$("div[id='msg']").slideUp(300);	
				}, 3000);
			}					 
		});			
	});
});
