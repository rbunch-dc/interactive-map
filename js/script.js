

    
function PresidentialMap(init_string, map_string) {

    this.init_string = init_string; // Initial view for resetting
    this.map_string  = map_string;
    this.init_mapid  = "";
    this.hashid      = "";
    this.dem_can     = "Democrat";
    this.dem_can_id  = false;
    this.rep_can     = "Republican";
    this.rep_can_id  = false;
    this.custom_text = false;
    this.init_view   = false;
    this.views       = {};
    
    this.init_dem_can_id = false;
    this.init_rep_can_id = false;
    
    this.debug = 0;

    // The order of FIPS codes for building map_strings (110021211 etc)
    this.state_order  = ["02", "01", "05", "04", "06", "08", "09", "11", "10", "12", "13", "15", "19", "16", "17", "18", "20", "21", "22", "25", "24", "23", "26", "27", "29", "28", "30", "37", "38", "31", "33", "34", "35", "32", "36", "39", "40", "41", "42", "44", "45", "46", "47", "48", "49", "51", "50", "53", "55", "54", "56", "MX", "M4", "NX", "N4", "N5"];
    
    // ME/NE and the small states with boxes
    this.specialStates = ["23","25","44","09","34","10","24","11","31"];
    
    this.states = {
        "10": { "state_abbr":"DE","e_votes":"3","outcome":0,"state_name":"Delaware"}, 
        "11": {"state_abbr":"DC","e_votes":"3","outcome":0,"state_name":"District of Columbia"},
        "12": {"state_abbr":"FL","e_votes":"29","outcome":0,"state_name":"Florida"},
        "13": {"state_abbr":"GA","e_votes":"16","outcome":0,"state_name":"Georgia"},
        "15": {"state_abbr":"HI","e_votes":"4","outcome":0,"state_name":"Hawaii"},
        "16": {"state_abbr":"ID","e_votes":"4","outcome":0,"state_name":"Idaho"},
        "17": {"state_abbr":"IL","e_votes":"20","outcome":0,"state_name":"Illinois"},
        "18": {"state_abbr":"IN","e_votes":"11","outcome":0,"state_name":"Indiana"},
        "19": {"state_abbr":"IA","e_votes":"6","outcome":0,"state_name":"Iowa"},
        "20": {"state_abbr":"KS","e_votes":"6","outcome":0,"state_name":"Kansas"},
        "21": {"state_abbr":"KY","e_votes":"8","outcome":0,"state_name":"Kentucky"},
        "22": {"state_abbr":"LA","e_votes":"8","outcome":0,"state_name":"Louisiana"},
        "23": {"state_abbr":"ME","e_votes":"4","outcome":0,"state_name":"Maine",
        "24": {"state_abbr":"MD","e_votes":"10","outcome":0,"state_name":"Maryland"},
        "25": {"state_abbr":"MA","e_votes":"11","outcome":0,"state_name":"Massachusetts"},
        "26": {"state_abbr":"MI","e_votes":"16","outcome":0,"state_name":"Michigan"},
        "27": {"state_abbr":"MN","e_votes":"10","outcome":0,"state_name":"Minnesota"},
        "28": {"state_abbr":"MS","e_votes":"6","outcome":0,"state_name":"Mississippi"},
        "29": {"state_abbr":"MO","e_votes":"10","outcome":0,"state_name":"Missouri"},
        "30": {"state_abbr":"MT","e_votes":"3","outcome":0,"state_name":"Montana"},
        "31": {"state_abbr":"NE","e_votes":"5","outcome":0,"state_name":"Nebraska",
        "32": {"state_abbr":"NV","e_votes":"6","outcome":0,"state_name":"Nevada"},
        "33": {"state_abbr":"NH","e_votes":"4","outcome":0,"state_name":"New Hampshire"},
        "34": {"state_abbr":"NJ","e_votes":"14","outcome":0,"state_name":"New Jersey"},
        "35": {"state_abbr":"NM","e_votes":"5","outcome":0,"state_name":"New Mexico"},
        "36": {"state_abbr":"NY","e_votes":"29","outcome":0,"state_name":"New York"},
        "37": {"state_abbr":"NC","e_votes":"15","outcome":0,"state_name":"North Carolina"},
        "38": {"state_abbr":"ND","e_votes":"3","outcome":0,"state_name":"North Dakota"},
        "39": {"state_abbr":"OH","e_votes":"18","outcome":0,"state_name":"Ohio"},
        "40": {"state_abbr":"OK","e_votes":"7","outcome":0,"state_name":"Oklahoma"},
        "41": {"state_abbr":"OR","e_votes":"7","outcome":0,"state_name":"Oregon"},
        "42": {"state_abbr":"PA","e_votes":"20","outcome":0,"state_name":"Pennsylvania"},
        "44": {"state_abbr":"RI","e_votes":"4","outcome":0,"state_name":"Rhode Island"},
        "45": {"state_abbr":"SC","e_votes":"9","outcome":0,"state_name":"South Carolina"},
        "46": {"state_abbr":"SD","e_votes":"3","outcome":0,"state_name":"South Dakota"},
        "47": {"state_abbr":"TN","e_votes":"11","outcome":0,"state_name":"Tennessee"},
        "48": {"state_abbr":"TX","e_votes":"38","outcome":0,"state_name":"Texas"},
        "49": {"state_abbr":"UT","e_votes":"6","outcome":0,"state_name":"Utah"},
        "50": {"state_abbr":"VT","e_votes":"3","outcome":0,"state_name":"Vermont"},
        "51": {"state_abbr":"VA","e_votes":"13","outcome":0,"state_name":"Virginia"},
        "53": {"state_abbr":"WA","e_votes":"12","outcome":0,"state_name":"Washington"},
        "54": {"state_abbr":"WV","e_votes":"5","outcome":0,"state_name":"West Virginia"},
        "55": {"state_abbr":"WI","e_votes":"10","outcome":0,"state_name":"Wisconsin"},
        "56": {"state_abbr":"WY","e_votes":"3","outcome":0,"state_name":"Wyoming"},
        "02": {"state_abbr":"AK","e_votes":"3","outcome":0,"state_name":"Alaska"},
        "01": {"state_abbr":"AL","e_votes":"9","outcome":0,"state_name":"Alabama"},
        "05": {"state_abbr":"AR","e_votes":"6","outcome":0,"state_name":"Arkansas"},
        "04": {"state_abbr":"AZ","e_votes":"11","outcome":0,"state_name":"Arizona"},
        "06": {"state_abbr":"CA","e_votes":"55","outcome":0,"state_name":"California"},
        "08": {"state_abbr":"CO","e_votes":"9","outcome":0,"state_name":"Colorado"},
        "09": {"state_abbr":"CT","e_votes":"7","outcome":0,"state_name":"Connecticut"}
    }; // Current status of each state
    

    
    this.width = 730;
    this.height = 500;
    this.centered;
        
    this.isInitialized = false;
    
    
    

    
    
    this.getNextColor = function(currentColor) {
        if (this.debug == 1) console.log('m.getNextColor()');
        var nextColor, nextState;
        
        for(var key in this.stateColors) {
            if(currentColor == this.stateColors[key]) {
                if(key==0) {
                    nextColor = this.stateColors["1"];
                    nextState = 1;
                } 
                else if(key==1) {
                    nextColor = this.stateColors["2"];
                    nextState = 2;
                } 
                else if(key==2) {
                    nextColor = this.stateColors["0"];
                    nextState = 0;
                } 
                else if(key==3) {
                    nextColor = this.stateColors["0"];
                    nextState = 0;
                }
                else if(key==4) {
                    nextColor = this.stateColors["0"];
                    nextState = 0;
                }
            }
        }
        return [nextColor, nextState];
    }
    
    this.state_click = function(stateID, split_ev) {
        if (this.debug == 1) console.log('m.state_click()');
        var states = this.states;
        
        if (split_ev===undefined) {
            split_ev = 0 ;
        }
        // If not a special state, or ME/NE without a split
        if ( $.inArray(stateID, this.specialStates) == -1 || ( (stateID=="23" || stateID=="31") && split_ev == 0 ) ) { 
            var currentColor = $("#"+stateID).attr("fill");
        }
        else {
            // Get the color from the boxes
            if (stateID == "23" || stateID == "31") {
                if (split_ev == 4 || split_ev == 5) { 
                    var currentColor = hexc( $("#sp_"+stateID+"_"+split_ev).css("background-color") );
                } else {
                    var currentColor =  hexc( $("#sp_"+stateID+"_1").css("background-color") );
                }
            } else {
                var currentColor = hexc( $("#sp_"+stateID).css("background-color") );
            }
        }
    
        var next = this.getNextColor(currentColor); 
        var nextColor = next[0];
        var nextState = next[1];
        
        /*** Handle coloring ***/
        if ($.inArray(stateID, this.specialStates) == -1 ) {
            $("#"+stateID).attr("fill", nextColor);
        }
        else {
            if (stateID == "23" || stateID == "31") {
                if (split_ev == 4 || split_ev == 5) { 
                    $("#sp_"+stateID+"_"+split_ev).css("background-color", nextColor);
                
                    if (stateID=="31") {
                        if (split_ev == 4) {
                            var otherColor = hexc( $("#sp_"+stateID+"_5").css("background-color") );
                        }
                        else if(split_ev == 5) {
                            var otherColor = hexc( $("#sp_"+stateID+"_4").css("background-color") );
                        }
                    }
                
                    var currentEVColor = hexc( $("#sp_"+stateID+"_"+1).css("background-color") );
                
                    if (stateID == "31") {
                        if (nextColor == currentEVColor && nextColor == otherColor) {
                            $("#"+stateID).attr("fill", nextColor);
                        } 
                        else {
                            $("#"+stateID).attr("fill", "#800080");
                        }
                    }
                    else if (stateID="23") {
                        if (nextColor == currentEVColor) {
                            $("#"+stateID).attr("fill", nextColor);
                        }
                        else {
                            $("#"+stateID).attr("fill", "#800080");
                        }
                    }
                }
                else if (split_ev == 1 || split_ev == 2 || split_ev == 3) {
                
                    $("#sp_"+stateID+"_1").css("background-color", nextColor);
                    $("#sp_"+stateID+"_2").css("background-color", nextColor);
                    $("#sp_"+stateID+"_3").css("background-color", nextColor);
                
                    if (stateID == "23") {
                        if (nextColor !== hexc( $("#sp_"+stateID+"_4").css("background-color") ) ) {
                            $("#"+stateID).attr("fill","#800080");
                        }
                        else {
                            $("#"+stateID).attr("fill", nextColor);
                        }
                    }
                
                    if (stateID == "31") {
                        if (nextColor !== hexc( $("#sp_"+stateID+"_4").css("background-color") ) || nextColor !== hexc( $("#sp_"+stateID+"_5").css("background-color") )) {
                            $("#"+stateID).attr("fill", "#800080");
                        } 
                        else {
                            $("#"+stateID).attr("fill", nextColor);
                        }
                    }
                }
                else {
                    $("#sp_"+stateID+"_1").css("background-color", nextColor);
                    $("#sp_"+stateID+"_2").css("background-color", nextColor);
                    $("#sp_"+stateID+"_3").css("background-color", nextColor);
                    $("#sp_"+stateID+"_4").css("background-color", nextColor);
                    $("#sp_"+stateID+"_5").css("background-color", nextColor);
                    $("#"+stateID).attr("fill", nextColor);
                }
            }
            else {
                $("#sp_"+stateID).css("background-color", nextColor);
                $("#"+stateID).attr("fill", nextColor);
            }
        }
        
        /*** Handle state tracking ***/
        if (stateID == "23") {
            if (split_ev==4) {
                this.states[stateID]["M4"]["outcome"] = nextState;
            } 
            else {
                if (split_ev==0) {
                    this.states[stateID]["outcome"]       = nextState;
                    this.states[stateID]["MX"]["outcome"] = nextState;
                    this.states[stateID]["M4"]["outcome"] = nextState;
                } 
                else {
                    this.states[stateID]["MX"]["outcome"] = nextState;
                    this.states[stateID]["outcome"]       = nextState;
                }
            }
        } 
        else if (stateID == "31") {
            if (split_ev == 4) {
                this.states[stateID]["N4"]["outcome"] = nextState;
            } 
            else if (split_ev == 5) {
                this.states[stateID]["N5"]["outcome"] = nextState;
            } 
            else {
                if (split_ev == 0){
                    this.states[stateID]["NX"]["outcome"] = nextState;
                    this.states[stateID]["N4"]["outcome"] = nextState;
                    this.states[stateID]["N5"]["outcome"] = nextState;
                    this.states[stateID]["outcome"]       = nextState;
                } 
                else {
                    this.states[stateID]["NX"]["outcome"] = nextState;
                    this.states[stateID]["outcome"]       = nextState;
                }
            }
        } 
        else {
            this.states[stateID]["outcome"] = nextState; 
        }
        
        this.hashid = false;
        this.update_electoral_votes();

        
        if (this.custom_text) {
            $("#map_title").html("2016 Presidential Election Map");
            $("#map_subtitle").html("This isn't a popularity contest&#8482;");
            $("#map_description").html('To return to <strong>'+this.custom_text+'</strong>, <a href="javascript:location.reload(true)">reload the page</a>');
        }
        
        $("#starting_view").hide()
        $("#button_container").show();
        $("#share_buttons").hide();
        $("#share_text").show();
        $("#share_title").html('Share or Embed your Map: <em>Select <span style="color: #348134">\'Share Map\'</span> button above</em>');
        $("#share_button").css('visibility', 'visible');
        
        
    } // END function state_click


    
    this.init = function() {
        if (this.debug == 1) console.log('m.init()');
        // Set up the map
        var p = this;

        for (state in this.specialStates) {
            if(state=="23") {
                $("#sp_"+state+"_1").css("background-color", this.stateColors[this.states[state]["MX"]["outcome"]]);
                $("#sp_"+state+"_2").css("background-color", this.stateColors[this.states[state]["MX"]["outcome"]]);
                $("#sp_"+state+"_3").css("background-color", this.stateColors[this.states[state]["MX"]["outcome"]]);
                $("#sp_"+state+"_4").css("background-color", this.stateColors[this.states[state]["M4"]["outcome"]]);
            }
            else if(state=="31") {
                $("#sp_"+state+"_1").css("background-color", this.stateColors[this.states[state]["NX"]["outcome"]]);
                $("#sp_"+state+"_2").css("background-color", this.stateColors[this.states[state]["NX"]["outcome"]]);
                $("#sp_"+state+"_3").css("background-color", this.stateColors[this.states[state]["NX"]["outcome"]]);
                $("#sp_"+state+"_4").css("background-color", this.stateColors[this.states[state]["N4"]["outcome"]]);
                $("#sp_"+state+"_5").css("background-color", this.stateColors[this.states[state]["N5"]["outcome"]]);
            }
            else {
                $("#sp_"+state).css("background-color", '#c5b6a0');
            }
        }
        
        $(".sp_state").click(function() {
                var state_id = $(this).attr("id").split("_");
                p.state_click( state_id[1], state_id[2] );
        });
        

        this.isInitialized = true;
        
        //this.loadString(init_string);
    } // END function init

} // END object

$( document ).ready(function() {
    $('.state').click(function(){
        var stateID = $(this).attr('id');
        // If not a special state, or ME/NE without a split
        if ( $.inArray(stateID, this.specialStates) == -1 || ( (stateID=="23" || stateID=="31") && split_ev == 0 ) ) { 
            var currentColor = $("#"+stateID).attr("fill");
        }        
    });

});





