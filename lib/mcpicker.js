(function ($) {
				
	$.fn.mcpicker = function(options) {

		var el = this;//To avoid scope issues
		options = options ? options : {};//Options
		
		//Colors
		var colors = [
			"#FFFFFF",//White	
			"#C0C0C0",//Silver
			"#808080",//Gray
			"#000000",//Black
			"#FF0000",//Red
			"#800000",//Maroon
			"#FFFF00",//Yellow
			"#808000",//Olive
			"#00FF00",//Lime
			"#008000",//Green
			"#00FFFF",//Aqua
			"#008080",//Teal
			"#0000FF",//Blue
			"#000080",//Navy
			"#FF00FF",//Fuchsia
			"#800080"//Purple
		];

		//Picker elements
		var mcp_container = 'pcp_mobile_color_picker_container';
		var mcp_cell = 'pcp_mobile_color_picker_cell';

		//Create the color picker
		$(el).after("<div id=\""+mcp_container+"\"></div>");
		$.each(colors, function(key, value){
			$('#'+mcp_container).append("<div data-color=\""+value+"\" class='"+mcp_cell+"' style='background-color:"+value+"'></div>");
		});
		$("#"+mcp_container).hide();

		//Show the picker on fucus
		$(el).focus(function(){
			$("#"+mcp_container).show("slow");
		});
		
		//Set the selected color
		$("."+mcp_cell).click(function(){
			$("#"+mcp_container).hide("slow");
			var selected_color = $(this).data("color");
			$(el).val(selected_color);
			$(el).css('background-color', selected_color);
		});

		//Styles
		var position = $(el).position();
		$("#"+mcp_container).css({
			"position" : "absolute",
			"top" : position.top + $(el).height() + 10,
			"left" : position.left,
			//"width" : "100%",
			//"height" : "100%",
			"width" : "200px",
			"height" : "200px",
			"margin" : "auto",
			"background" : "black",
			"padding" : "5px"
		});
		$("."+mcp_cell).css({
			"width" : "50px",
			"height" : "50px",
			"float" : "left",
		});
	};

}( jQuery ));