//! Code in this file is based on Dom's description in office hours for HW 15 !

//Ensure that console is working and webpage is connected
console.log("app.js loaded");

//Populate the data for initial bargraphs

function InitDashboard() {
    console.log("InitDashboard()");

    //populate dropdown menu on index page
    var selector = d3.select("#selDataset");

    d3.json("/data/samples.json").then(function(data) {
        console.log(data);

    });



    //update bargraph
    //update bubblechart
    //update demographic info
}
//call function
InitDashboard();