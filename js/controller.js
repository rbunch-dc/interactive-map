var stateMap = angular.module('interactiveMap',[]);

stateMap.controller('interactiveMapCntrl',interactiveMapCntrl);

stateMap.directive('clickState', function(){
	return{
		link: function($scope, element, attr){
			element.bind('click', function(){
				var newColor = getNewColor($scope.state);
				$scope.state.stateColor = newColor;
				var stateElement = element[0].querySelector('path');
				stateElement.setAttribute('class','state ' + newColor);
			});
		}
	}
});

function interactiveMapCntrl($scope){
	console.log(redStates);
	$scope.states = states;
	for(i=0; i<redStates.length; i++){
		$scope.redTotal = 
	}
}

function getNewColor(state){
	if(state.stateColor == 'red'){
		//add the element to the appropriate array and remove it from the old
        redStates[state.id] = ""
		blueStates[state.id] = state;
		return 'blue';
	}else if(state.stateColor == 'blue'){
        blueStates[state.id] = ""
		openStates[state.id] = state;
		return 'open';
	}else if(state.stateColor == 'open'){
        openStates[state.id] = ""
		redStates[state.id] = state;
		return "red";
	}else{
		return console.log("How did you get here?");
	}
	//if state color = red, then change to blue
	//if state color = blue , then change to open
	//if state state color = open, then change to red
}





