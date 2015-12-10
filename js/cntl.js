var stateMap = angular.module('presidential', []);

stateMap.directive('clickState', function(){
    // Runs during compile
    return {
        link: function($scope, element, iAttrs, controller) {
            element.bind('click', function(event){
                var curState = states[$scope.state.id];
                var newColor = getNewColor(curState,$scope.state.id);
                // console.log(newColor);
                var pathOfElement = element[0].querySelector('path');

                //Update the state object to use the new color
                curState.stateColor = newColor;

                //Update the attribute so the color changes on the map
                pathOfElement.setAttribute('class', 'state ' + newColor);

                $scope.redStates = redStates;
                $scope.blueStates = blueStates;
                $scope.openStates = openStates;
                console.log($scope.redStates);

                
            })
        }
    };
});

stateMap.controller('presMapCntrl',presMapCntrl);
function presMapCntrl($scope){
	$scope.states = states;
    $scope.redStates = redStates;
    $scope.blueStates = blueStates;
    $scope.openStates = openStates;

    // console.log(openStates);
};

function getNewColor(state, index){
    // console.log(state);
    // console.log(states[stateId].stateColor);
    if(state.stateColor == 'red'){
        //Add the element to the appropriate array and remove it from old
        redIndex=redStates.indexOf(index);
        redStates.splice(redIndex,1);
        blueStates[index] = state;
        return 'blue';
    }else if(state.stateColor == 'blue'){
        //Add the element to the appropriate array and remove it from old
        blueIndex=blueStates.indexOf(index);
        blueStates.splice(blueIndex,1);
        openStates[index] = state;
        return 'open';
    }else if(state.stateColor == 'open'){
        //Add the element to the appropriate array and remove it from old
        openIndex=openStates.indexOf(index);
        openStates.splice(openIndex,1);
        redStates[index] = state;
        return 'red';
    }else{
        console.log('error');
    }
}
