<h1>BusMall - Where style meets your everyday needs!</h1>

<h2>Overview</h2>
<p>
<ul>This program will survey most popular items by:
  <li>1. Displaying 3 random items</li>
  <li>2. Ask user to select which one they like</li>
  <li>3. Count number of votes </li>
  <li>4. Count number of times each item is shown (regardless if its selected)</li>
  <li>5. Show results as a percentage on a graph</li>
    <li>--> #times selected/ #times shown * 100</li>
</ul>
</p>
<h2>Methodology</h2>
<p><ul>
    <li>1.firstImages()</li>
    <ul><li>select 3 random images and display them on the DOM</li></ul>
    <li>2.getNewImages()</li>
    <ul><li>displays images on the page</li></ul>
    <li>3.randomItem()</li>
    <ul><li>creates a random number to select new item</li>
        <li>checks to make sure random number !== any of the 3 used for last images displayed</li></ul>
    <li>4.calcResults()</li>
    <ul><li>calculates results as a % (#clicks/#times shown * 100)</li>
        <li>stores names of each item to be displayed on graph</li>
        <li>stores #clicks & #times shown to be displayed on another graph (TBD)</li></ul>
    <li>5.removeImage();</li>
    <ul><li>removes images from the DOM after survey is complete</li></ul>
    <li>6.takeOffTheListener()</li>
    <ul><li>removes listeners from DOM after survey is complete</li></ul>
    <li>7.buildResultsGraph()</li>
    <ul><li>renders results from above function onto a bar graph</li></ul>
    </ul>
</p>