var ar_img=[];
		var tam_game=8;
		for (var i = 0; i < tam_game; i++) {
			ar_img.push(i+1);
			ar_img.push(i+1);
		}
		var dom=document.getElementById("space-imgs");
		var html='';
		var counter=1;
		while(ar_img.length>0){
			var newar=[];
			if (ar_img.length==1) {
				html+=
				'<div class="blocks">'+
					'<div class="content-block" data-partner="'+ar_img[0]+'" data-clicked="0" data-enc="0" id="'+counter+'">'+
						'<img src="img/'+ar_img[0]+'.jpg"/>'
					'</div>'+
				'</div>';
			}else{
				var index=Math.round(Math.random()*ar_img.length)+1;
				for (var i = 0; i < ar_img.length; i++) {
					if (i==index) {
						html+=
						'<div class="blocks">'+
							'<div class="content-block" data-partner="'+ar_img[i]+'" data-clicked="0" data-enc="0" id="'+counter+'">'+
								'<img src="img/'+ar_img[i]+'.jpg">'+
							'</div>'+
						'</div>';
					}else{
						newar.push(ar_img[i]);
					}
				}
			}
			ar_img=[];
			ar_img=newar;
			counter++;
		}
		dom.innerHTML=html;

		var ar_inicial=document.getElementsByClassName("blocks");

		var id_ant=0;
		var counter_clicks=0;
		var img_ant=0;
		var intentos=0;
		var counter_enc=0;
		var validate_click=true;
		function myfunction(){
			if (validate_click) {
				var element=this.getElementsByClassName("content-block")[0];
				if(element.id!=id_ant && element.dataset.enc!="1"){
					element.dataset.clicked="1";
					element.style.transform="rotateY(0deg)";
					if (counter_clicks==0) {
						img_ant=element.dataset.partner;
						id_ant=element.id;
						counter_clicks++;
					}else{
						validate_click=false;
						setTimeout(function(){
							var ar=document.getElementsByClassName("content-block");
							if (img_ant==element.dataset.partner) {
								counter_enc++;
								//IMAGENES IGUALES - EL primero y el segundo
								for (var i = 0; i < ar.length; i++) {
									if (ar[i].dataset.clicked=="1") {
										ar[i].dataset.enc="1"
									}
								}
								if (tam_game==counter_enc) {
									alert("Ganaste!");
								}
							}else{
								for (var i = 0; i < ar.length; i++) {
									if (ar[i].dataset.enc=="0") {
										ar[i].style.transform="rotateY(90deg)";
										ar[i].dataset.clicked="0";
									}
								}
							}
							counter_clicks=0;
							img_ant=0;
							intentos++;
							id_ant=0;
							validate_click=true;
							document.getElementById("intentos").innerHTML=intentos;
						},500);
					}
				}
			}
		}

		for (var i = 0; i < ar_inicial.length; i++) {
			ar_inicial[i].addEventListener('click',myfunction,false);
		}