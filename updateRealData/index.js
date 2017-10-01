var svg = d3.select('svg');

//set up variables to hold two versions of the data, one for each year
var data2016;
var data2017;

//set up a tracker variable to watch the button click state
var clicked = true;

//import the data from the .csv file
d3.csv('./data.csv', function(dataIn){


    //save the objects from the .csv with year = 2016
    data2016 = dataIn.filter(function(d){
        return d.year == 2016;
    });

    //save the objects from the .csv with year = 2017
    data2017 = dataIn.filter(function(d){
        return d.year == 2017;
    });

    //bind the data to the d3 selection, but don't draw it yet
    svg.selectAll('circles')
        .data(data2016)
        .enter()
        .append('circle')
        .attr('class','dataPoints');

    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(data2016);

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    svg.selectAll('.dataPoints')  //select all of the circles with dataPoints class that we made using the enter() commmand above
        .data(pointData)          //re-attach them to data (necessary for when the data changes from 2016 to 2017)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return +d.x;
        })
        .attr('cy',function(d){
            return +d.y;
        })
        .attr('r',function(d){
            return +d.r;
        })
        .attr('fill',function(d){
            return d.fill;
        });
}

//this function runs when the HTML button is clicked.
function buttonClicked(){

    //check to see whether the tracker variable is true. If it is, use the 2017 data set
    if(clicked == true){
        drawPoints(data2016);  //call the draw function again, to redraw the circles
        clicked = false;       //reset the value of the tracker variable
    }
    else{   //if the tracker variable is not true, use the 2016 data set
        drawPoints(data2017);
        clicked = true;
    }



}