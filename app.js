'use strict';

/*
This program will survey most popular items by:
  1. Displaying 3 random items
  2. Ask user to select which one they like
  3. Count number of votes 
  4. Count number of times item is shown (regardless if its selected)
  5. Show results in a percentage 
    --> #times selected/ #times shown * 100

*/

//Global Variables
var totalClicksCounter = 0;
var merchandiseArray = [];
var nextItem;
var results;
var resultsArray = [];

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

//Reference the element
var leftItem = document.getElementById('leftItem');
var centerItem = document.getElementById('centerItem');
var rightItem = document.getElementById('rightItem');

var currentDisplayArray = [leftItem, centerItem, rightItem];

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

  //This loop will change the display after the user makes a selection
  for(var j = 0; j < currentDisplayArray.length; j++){
    nextItem = randomItem();
    currentDisplayArray[j].src = nextItem.filepath;
    currentDisplayArray[j].alt = nextItem.itemName;
  }

  //stop survey after 25 clicks & calculate the results
  if(totalClicksCounter > 24){
    calcResults();
    printResults();
    leftItem.removeEventListener('click', countClick);
    centerItem.removeEventListener('click', countClick);
    rightItem.removeEventListener('click', countClick);
  }
}

//This function will replace items with new (randomized) items
function randomItem() {
  //Create random numbers
  var randomIndex = Math.floor(Math.random() * merchandiseArray.length);
  //Use random numbers as indexies in merchandiseArray
  nextItem = merchandiseArray[randomIndex];
  nextItem.numTimesShown++; //track item being listed

  return nextItem;
}

//Create the listener
leftItem.addEventListener('click', countClick);
centerItem.addEventListener('click', countClick);
rightItem.addEventListener('click', countClick);

/*
==========================================
Display results

result = #times selected / #times shown * 100
==========================================
*/

function calcResults(){
  for(var k = 0; k < merchandiseArray.length; k++){
    results = Math.floor((merchandiseArray[k].numClicks / merchandiseArray[k].numTimesShown) * 100);
    resultsArray.push(results);
  }
}

//Reference parent ul and child li to page
var ul_element = document.getElementById('resultsList');
function printResults(){
  for(var l = 0; l < resultsArray.length; l++){
    var next_li = document.createElement('li');
    next_li.textContent = (`${merchandiseArray[l].itemName} was clicked ${merchandiseArray[l].numClicks} times and shown ${merchandiseArray[l].numTimesShown} times, which is ${resultsArray[l]}%`);
    ul_element.appendChild(next_li);
  }
}

/*
==========================================
Initialize Page
==========================================
*/

new Merchandise('Bag', './img/bag.jpg');
merchandiseArray[0].numTimesShown = 1;
new Merchandise('Banana', './img/banana.jpg');
merchandiseArray[1].numTimesShown = 1;
new Merchandise('Bathroom', './img/bathroom.jpg');
merchandiseArray[2].numTimesShown = 1;
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




