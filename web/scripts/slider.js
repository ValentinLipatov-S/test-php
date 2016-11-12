$(document).ready(function()
{	
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
});
