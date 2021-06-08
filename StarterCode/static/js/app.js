//! Code in this file is based on Dom's description in office hours for HW 15 !

//Ensure that console is working and webpage is connected
console.log("app.js loaded");

//---------------------------------------------------------------------------//

//function stubs - placeholder for real function
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("/data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        //console.log(resultArray);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }
        
        Plotly.newPlot("bar", barArray, barLayout);

    })
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("/data/samples.json").then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        //console.log(data);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                opacity: 1
            },
            text: otu_labels
        }

        var bubbleArray = [bubbleData];
        
        var bubbleLayout = {
            title: "Bacteria Samples",
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    })
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

        //Draw the graphs and the metadata

        DrawBargraph(id);
        DrawBubblechart(id);
        ShowMetadata(id);

    });

//--------------------------------------------------------------------------------//

}
//call function
InitDashboard();