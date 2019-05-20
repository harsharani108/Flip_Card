"use strict";
$(document).ready(function(){
	
	var app = {
		cards: ["3H","3S","5H","5S","8H","8S","11H","11S","13H","13S","14H","14S"],
		init:function(){
			app.shuffle();
		},
		shuffle:function(){
			var random =0;
			var temp =0;
			console.log(app.cards.length);
			for(var i=1; i<app.cards.length; i++){
				random = Math.floor(Math.random() * i);
				console.log("random number is " + random); //getting random no generated here!!
				
				// here swapping the array items 
				temp = app.cards[i];
				app.cards[i] = app.cards[random];
				app.cards[random] = temp;
			} 
			console.log("Suffled array items " + app.cards);
			
			//After Shuffling assinging of cards should be done so assignCards function will be called.
			app.assignCards();		
		},
		assignCards:function(){
			$(".Card").each(function(index){
				$(this).attr("data-value", app.cards[index]);
				console.log("app.cards[index] value : " + app.cards[index]);				
				$(this).next().css({"background-image": "url( images/" + app.cards[index] + ".png)"});
				$(this).next().addClass("backCard");
			});	
			app.clickHandlers();
		},
		clickHandlers:function(){
			$(".Card").on('click',function(){
				$(this).parent().css({"transform": "rotateY(180deg)"});
				$(this).addClass("selected");
					/* var clickedCard = $(this).data("value");
					console.log(clickedCard + " clickedCard");	 */	
				app.checkMatch();
			});	
			
		},
		checkMatch:function(){	
		
			if($(".selected").length == 2){				
				/* console.log("first card  "+$(".selected").first().data("value").match(/\d+/)[0]);
				console.log("last card  "+$(".selected").last().data("value").match(/\d+/)[0]); */
				
				if($(".selected").first().data("value").match(/\d+/)[0] == $(".selected").last().data("value").match(/\d+/)[0]){
						//remove matched cards
					setTimeout(function(){
						$(".selected").each(function(){
							$(this).removeClass("unmatched");
							$(this).parent().css({"opacity": "0"});
							console.log("matched");	
							
					    });
						//needs to remove selected class
						$(".selected").each(function(){
							$(this).removeClass("selected");
						});
						
						app.checkWin();		
					},500);													
				 }
				 else{					
					setTimeout(function(){
						$(".selected").each(function(){					
							$(this).parent().css({"transform": "rotateY(0deg)"});						
							console.log("not matched");
							
						});
						//needs to remove selected class
						$(".selected").each(function(){
							$(this).removeClass("selected");
						});
						
					},500);
				}
					
			}			
		},
		checkWin:function(){
			if($(".unmatched").length === 0){
				console.log("you win");
				$("h2").text("You Win!!").addClass("h2");
				
			}
		}
	}	
	app.init();
});