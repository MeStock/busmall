'use strict';

/*
This program will survey most popular items by:
  1. Displaying 3 random items
  2. Ask user to select which one they like
  3. Count number of votes 
  4. Count number of times each item is shown (regardless if its selected)
  5. Show results in a percentage on a graph
    --> #times selected/ #times shown * 100

*/

//Global Variables
var numberOfImages = 3;
var totalClicksCounter = 0;
var merchandiseArray = [];
var nextItem;
var results;
var resultsArray = [];
var merchandiseItemNameArray = [];
var numClicksArray = [];
var numTimesShownArray = [];
var randomIndex;
var previousIndexArray = [];
var tempIndexArray =[];

//Reference the DOM
var currentDisplayArray = [];

/*
==========================================
Build constructor function for each image

Constructor function
    object{
        name
        file path
        # clicks
        # times shown
    }
==========================================
*/

function Merchandise(itemName, filepath){
  this.itemName = itemName;
  this.filepath = filepath;

  this.numClicks = 0;
  this.numTimesShown = 0;

  merchandiseArray.push(this);
}

/*
==========================================
Event to listen for:
  -Click on an image

This to track:
    -track # of clicks
    -track # times shown
    -stop listening after 25 votes are counted
==========================================
*/

//this function will count number of clicks during the survey
function countClick(event) {
  totalClicksCounter++;

  var itemSelected = event.target.alt;
  //this loop will track the number of times an image was selected
  for(var i = 0; i < merchandiseArray.length; i++){
    if(itemSelected === merchandiseArray[i].itemName){
      merchandiseArray[i].numClicks++;
    }
  }

  getNewImages();

  //stop survey after 25 clicks & calculate the results
  if(totalClicksCounter > 24){
    calcResults();
    removeImage();
    buildResultsGraph();
    takeOffEventListener();
  }
}

/*
==========================================
Other Functions:

1.getNewImages()
  displays images on the page
2.randomItem()
  creates a random number to select new item
  checks to make sure random number !== any of the 3 used for last images displayed
3.calcResults()
  calculates results as a % (#clicks/#times shown * 100)
  stores names of each item to be displayed on graph
4.buildResultsGraph()
  renders results from above function onto a bar graph
==========================================
*/

function firstImages() {
  for(var k = 0; k < numberOfImages; k++) {
    currentDisplayArray.push(document.getElementById(k));
    do{
      var index = Math.floor(Math.random() * merchandiseArray.length);
    }while(tempIndexArray.includes(index));
    tempIndexArray.push(index);
    currentDisplayArray[k].src = merchandiseArray[index].filepath;
    currentDisplayArray[k].alt = merchandiseArray[index].itemName;
  }
}

function getNewImages(){
  //This loop will change the display after the user makes a selection
  for(var k = 0; k < currentDisplayArray.length; k++){
    nextItem = randomItem();
    currentDisplayArray[k].src = nextItem.filepath;
    currentDisplayArray[k].alt = nextItem.itemName;
  }
  previousIndexArray = tempIndexArray;
  tempIndexArray = [];
}

//This function will replace items with new (randomized) items
function randomItem() {
  do {//Create random number
    randomIndex = Math.floor(Math.random() * merchandiseArray.length);
    //while new index equals previously used index
  }while(previousIndexArray.includes(randomIndex) || tempIndexArray.includes(randomIndex)); 
  
  //Use random numbers as indexies in merchandiseArray
  nextItem = merchandiseArray[randomIndex];
  nextItem.numTimesShown++; //track item being listed

  tempIndexArray.push(randomIndex);
  return nextItem;
}

function calcResults(){
  for(var l = 0; l < merchandiseArray.length; l++){
    //if # times shown does not equal 0 calc % (denominator that equals 0 will return NaN)
    if(merchandiseArray[l].numTimesShown !== 0){
      results = Math.floor((merchandiseArray[l].numClicks / merchandiseArray[l].numTimesShown) * 100);
      resultsArray.push(results);
    }
    //if # times shown equals 0 push 0 to the array
    resultsArray.push(0);

    //collect all information to display on graph
    merchandiseItemNameArray.push(merchandiseArray[l].itemName); //item names
    numClicksArray.push(merchandiseArray[l].numClicks);
    numTimesShownArray.push(merchandiseArray[l].numTimesShown);
  }
}

function removeImage(){
  for(var x = 0; x < currentDisplayArray.length; x++){
    var img_element = document.getElementById(x).style.visibility= "hidden";
  }
}

function buildResultsGraph(){
  var ctx = document.getElementById('resultsGraph').getContext('2d');
  var resultsGraph = new Chart(ctx, {
    type: 'bar',

    data: {
      labels: merchandiseItemNameArray,
      datasets: [{
        label: 'Percentage selected (#clicks/#times shown)',
        backgroundColor: 'rgb(254, 127, 156)',
        borderColor: 'rgb(255, 99, 132)',
        data: resultsArray
      }]
    },

    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

/*
==========================================
Initialize Page
==========================================
*/

new Merchandise('Bag', './img/bag.jpg');
new Merchandise('Banana', './img/banana.jpg');
new Merchandise('Bathroom', './img/bathroom.jpg');
new Merchandise('Boots', './img/boots.jpg');
new Merchandise('Breakfast', './img/breakfast.jpg');
new Merchandise('Bubblegum', './img/bubblegum.jpg');
new Merchandise('Chair', './img/chair.jpg');
new Merchandise('Cthulhu', './img/cthulhu.jpg');
new Merchandise('Dog-duck', './img/dog-duck.jpg');
new Merchandise('Dragon', './img/dragon.jpg');
new Merchandise('Pen', './img/pen.jpg');
new Merchandise('Pet-Sweep', './img/pet-sweep.jpg');
new Merchandise('Scissors', './img/scissors.jpg');
new Merchandise('Shark', './img/shark.jpg');
new Merchandise('Sweep', './img/sweep.png');
new Merchandise('Tauntaun', './img/tauntaun.jpg');
new Merchandise('Unicorn', './img/unicorn.jpg');
new Merchandise('Usb', './img/usb.gif');
new Merchandise('Water-can', './img/water-can.jpg');
new Merchandise('Wine-glass', './img/wine-glass.jpg');

firstImages();

//Create the listener
for(var j = 0; j < currentDisplayArray.length; j++){
  currentDisplayArray[j].addEventListener('click', countClick);
}

//This function will remove the event listener
function takeOffEventListener() {
  for(var k = 0; k < currentDisplayArray.length; k++){
    currentDisplayArray[k].removeEventListener('click', countClick);
  }
}


