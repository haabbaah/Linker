$(function () {

	var inputResult = $("#result");

	var colorIncrement = 0;
	var marginTopIncrement = 0;
	var dataIncrement = 0;

	var opacityCheck = localStorage.getItem("opacity");
	var httpCheck = localStorage.getItem("http");
	if (opacityCheck === '1') {
		$("#opacity").attr("checked", "checked");
	} else {
		$("#opacity").removeAttr("checked");
	}
	if (httpCheck === '') {
		$("#http").attr("checked", "checked");
	} else {
		$("#http").removeAttr("checked");
	}


	function addLink(icon) {
		var field = $(".wrap-field");
		var conteinerForDrag = $(".drag-img");
		var arrColor = ['0,191,255', '220,20,60', '72,61,139', '124,252,0', '105,105,105', '255,255,0', '255,69,0', '0,250,154'];

		if (colorIncrement === 8) {
			colorIncrement = 0;
		}
		var color = 'rgba(' + arrColor[colorIncrement] + ', .5)';
		var colorIcon = 'rgba(' + arrColor[colorIncrement] + ', 1)';
		var marginTop = marginTopIncrement;

		switch (icon) {
			case 0:
				field.append('<li class="item-field" data-drag__element="' + dataIncrement + '"> <i class="demo-icon icon-link" data-type="link" style="color: ' + colorIcon + ';">&#xe800;</i> <input type="text"> <div class="remove-btn">×</div></li>');
				conteinerForDrag.append('<div class="drsElement drsMoveHandle" data-drag__element="' + dataIncrement + '" style="left: 0px; top: ' + marginTop + 'px; width: 50px; height: 30px; background: ' + color + ';"><i class="demo-icon icon-link">&#xe800;</i></div>');
				colorIncrement++;
				dataIncrement++;
				marginTopIncrement += 30;
				break;
			case 1:
				field.append('<li class="item-field" data-drag__element="' + dataIncrement + '"> <i class="demo-icon icon-mail-alt" data-type="mail" style="color: ' + colorIcon + ';">&#xf0e0;</i> <input type="text"> <div class="remove-btn">×</div></li>');
				conteinerForDrag.append('<div class="drsElement drsMoveHandle" data-drag__element="' + dataIncrement + '" style="left: 0px; top: ' + marginTop + 'px; width: 50px; height: 30px; background: ' + color + ';"><i class="demo-icon icon-mail-alt">&#xf0e0;</i></div>');
				colorIncrement++;
				dataIncrement++;
				marginTopIncrement += 30;
				break;
			case 2:
				field.append('<li class="item-field" data-drag__element="' + dataIncrement + '"> <i class="demo-icon icon-instagram" data-type="instagram" style="color: ' + colorIcon + ';">&#xf16d;</i> <input type="text"> <div class="remove-btn">×</div></li>');
				conteinerForDrag.append('<div class="drsElement drsMoveHandle" data-drag__element="' + dataIncrement + '" style="left: 0px; top: ' + marginTop + 'px; width: 50px; height: 30px; background: ' + color + ';"><i class="demo-icon icon-instagram">&#xf16d;</i></div>');
				colorIncrement++;
				dataIncrement++;
				marginTopIncrement += 30;
				break;
			case 3:
				field.append('<li class="item-field" data-drag__element="' + dataIncrement + '"> <i class="demo-icon icon-phone" data-type="phone" style="color: ' + colorIcon + ';">&#xe801;</i> <input type="text"> <div class="remove-btn">×</div></li>');
				conteinerForDrag.append('<div class="drsElement drsMoveHandle" data-drag__element="' + dataIncrement + '" style="left: 0px; top: ' + marginTop + 'px; width: 50px; height: 30px; background: ' + color + ';"><i class="demo-icon icon-phone">&#xe801;</i></div>');
				colorIncrement++;
				dataIncrement++;
				marginTopIncrement += 30;
				break;
		}
	}

	function removeLink() {
		var dataDrag = $(this).parent().attr("data-drag__element");
		$('.drag-img .drsElement[data-drag__element="' + dataDrag + '"]').remove();

		$(this).parent().remove();
	}

	function getCode() {
		var str = '';
		var opacity = $("#opacity").prop('checked');
		opacity ? opacity = '1' : opacity = '0';

		var http = $("#http").prop('checked');
		http ? http = '' : http = 'http://';
		var imgWidthHeight = document.querySelector('.drag-img');
		var imgHeight = imgWidthHeight.clientHeight;

		localStorage.setItem('opacity', opacity);
		localStorage.setItem('http', http);

		opacity = localStorage.getItem("opacity");
		http = localStorage.getItem("http");

		
		$(".drag-img .drsElement").each(function (index, el) {

			var link = $(this);
			var i = link.attr("data-drag__element");
			var inputEl = $('.wrap-field .item-field[data-drag__element="' + i + '"] input').val();

			var widthEl = link.css("width");
			widthEl = +widthEl.slice(0, -2);
			widthEl = (widthEl * 100) / 650;
			widthEl = Math.round(widthEl * 10) / 10;

			var heightEl = link.css("height");
			heightEl = +heightEl.slice(0, -2);
			heightEl = (heightEl * 100) / imgHeight;
			heightEl = Math.round(heightEl * 10) / 10;
			var topEl = link.css("top");
			console.log(topEl);

			topEl = +topEl.slice(0, -2);
			topEl = (topEl * 100) / imgHeight;
			topEl = Math.round(topEl * 10) / 10;
			var leftEl = link.css("left");
			console.log(leftEl);

			leftEl = +leftEl.slice(0, -2);
			leftEl = (leftEl * 100) / 650;
			leftEl = Math.round(leftEl * 10) / 10;

			var typeLink = $('.wrap-field .item-field[data-drag__element="' + i + '"] i').attr("data-type");
			switch (typeLink) {
				case 'link':
					inputEl = http + inputEl;
					break;
				case 'mail':
					inputEl = "mailto:" + inputEl;
					break;
				case 'instagram':
					inputEl = "https://www.instagram.com/" + inputEl;
					break;
				case 'phone':
					inputEl = "tel:+" + inputEl;
					break;
			}

			str = str + '<a href="' + inputEl + '" style="background-color: rgba(0, 255, 255, ' + opacity + '); position: absolute; width: ' + widthEl + '%; height: ' + heightEl + '%; top: ' + topEl + '%; left: ' + leftEl + '%"></a>\n';
		});


		inputResult.val(str);
		//Автоматическое копирование в буфер обменм
		event.preventDefault();
		inputResult.select();
		document.execCommand("copy");
		//Автоматическое копирование в буфер обменм end
	}



	$("#site").on("click", function () {
		addLink(0);
	})

	$("#email").on("click", function () {
		addLink(1);
	})

	$("#inst").on("click", function () {
		addLink(2);
	})

	$("#tell").on("click", function () {
		addLink(3);
	})
	$(".wrap__option i").on("click", function () {
		$(".option-list").slideToggle("fast");
	})

	$(".wrap-field").on("click", ".remove-btn", removeLink);

	$("#btn").on("click", getCode);


});