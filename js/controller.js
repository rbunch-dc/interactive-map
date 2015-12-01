var stateMap = angular.module('interactiveMap',[]);

stateMap.controller('interactiveMapCntrl',interactiveMapCntrl);

stateMap.directive('clickState', function(){
	return{
		link: function($scope, element){

			element.bind('click', function(){
				var newColor = getNewColor($scope.state);
				var stateElement = element[0].querySelector('path');
				stateElement.setAttribute('class','state ' + newColor);
			});
		}
	}
});

function interactiveMapCntrl($scope){
	$scope.states = states;
}

function getNewColor(state){
	if(state.stateColor == 'red'){
		return 'blue';
	}else if(state.stateColor == 'blue'){
		return 'open';
	}else if(state.stateColor == 'open'){
		return "red";
	}else{
		return console.log("error");
	}
	//if state color = red, then change to blue
	//if state color = blue , then change to open
	//if state state color = open, then change to red
}





