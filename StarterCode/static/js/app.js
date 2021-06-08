//! Code in this file is based on Dom's description in office hours for HW 15 !

//Ensure that console is working and webpage is connected
console.log("app.js loaded");

//---------------------------------------------------------------------------//

//function stubs - placeholder for real function
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
}

//---------------------------------------------------------------------------//

//Event Handler for all drop down options to load
function optionChanged(newSampleId) {
    console.log(`User selected $(newSampleId)`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

//---------------------------------------------------------------------------//
//Populate the data for initial bargraphs

function InitDashboard() {
    console.log("InitDashboard()");

    //populate dropdown menu on index page
    var selector = d3.select("#selDataset");

    d3.json("/data/samples.json").then(data => {
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);
        });

//---------------------------------------------------------------------------//
        //Create a stub. Use the first option that is in dropdown.

        var id = sampleNames[0];

        DrawBargraph(id);
        DrawBubblechart(id);
        ShowMetadata(id);

    });


    //update bargraph





    //update bubblechart
    //update demographic info
}
//call function
InitDashboard();