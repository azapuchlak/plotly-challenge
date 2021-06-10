//! Code in this file is based on Dom's description in office hours for HW 15 !

//Ensure that console is working and webpage is connected
console.log("app.js loaded");

//---------------------------------------------------------------------------//

//function stubs - placeholder for real function
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
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
            xaxis: {title: {text: 'Sample Values'}},
            yaxis: {title: {text: 'OTU ID'}},
            margin: {t: 30, l: 150}
        }
        
        Plotly.newPlot("bar", barArray, barLayout);

    })
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("data/samples.json").then(data => {

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
            xaxis: {title: {text: 'OTU ID'}},
            yaxis: {title: {text: 'Sample Values'}}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    })
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);

    // Reset demographic info when another dataslice is selected
    document.getElementById("sample-metadata").innerHTML = "";

    d3.json("data/samples.json").then(data => {

    var metadata = data.metadata;
    var resultArray = metadata.filter(s => s.id == sampleId);
    var result = resultArray[0];

//set all components of metadata/ demographic info to whichever result comes up for that listing/person selected
    
    var id = result.id;
    var ethnicity = result.ethnicity;
    var gender = result.gender;
    var age = result.age;
    var location = result.location;
    var bbtype = result.bbtype;
    var wfreq = result.wfreq;
    var info = [id, ethnicity, gender, age, location, bbtype, wfreq];
    
    //append the data to be a list that exists in the appropriate panel (the demo box)
    //took sample-metadata from div in index where we're filling this in
    var ul = d3.select("#sample-metadata").append("ul");
    ul.append("li").text(`id: ${id}`);
    ul.append("li").text(`ethnicity: ${ethnicity}`);
    ul.append("li").text(`gender: ${gender}`);
    ul.append("li").text(`age: ${age}`);
    ul.append("li").text(`location: ${location}`);
    ul.append("li").text(`bbtype: ${bbtype}`);
    ul.append("li").text(`wfreq: ${wfreq}`);
    })
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

    d3.json("data/samples.json").then(data => {
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