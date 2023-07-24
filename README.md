<!DOCTYPE html>
<html>
<head>
  <title>Space Odyssey - An Incremental Game</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f1f1f1;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    .progress-bar {
      width: 200px;
      height: 20px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 5px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background-color: #4caf50;
    }

    h1 {
      text-align: center;
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    p {
      margin: 5px 0;
    }

    .how-to-play {
      border: 1px solid #ccc;
      background-color: #f9f9f9;
      padding: 10px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Space Odyssey - An Incremental Game</h1>
    <div class="how-to-play">
      <h2>How to Play</h2>
      <p>Welcome to Space Odyssey! Your goal is to explore the vast cosmos and reach new frontiers.</p>
      <p><strong>Value of X:</strong> Represents your current spacecraft technology level.</p>
      <p><strong>Value of Y:</strong> Indicates the amount of interstellar resources gathered.</p>
      <p><strong>Value of Z:</strong> Shows the space exploration milestone achieved.</p>
      <p><strong>Goals:</strong> Reach the following milestones:</p>
      <ol>
        <li>Goal 1: Reach the interstellar speed of light (Z &gt;= 8).</li>
        <li>Goal 2: Gather 100 interstellar resources (Y &gt;= 100).</li>
        <li>Goal 3: Reach a technology level of 1 million (X &gt;= 1e6).</li>
      </ol>
      <p><strong>Stars:</strong> Your cosmic achievements are marked with stars. Each time you reset the game with all goals reached, you earn a star.</p>
      <p>Click the buttons to buy upgrades and gather resources. Can you conquer the vastness of space?</p>
    </div>
    <p>Value of X: <span id="xValue">1</span></p>
    <p>Value of Y: <span id="yValue">0</span></p>
    <p>Value of Z: <span id="zValue">1</span></p>
    <p>Stars: <span id="starValue">0</span></p> <!-- Display the amount of stars -->
    <p>Goal 1: <span id="goal1">Not Reached</span></p>
    <div class="progress-bar">
      <div class="progress-fill" id="goal1Progress" style="width: 0;"></div>
    </div>
    <p>Goal 2: <span id="goal2">Not Reached</span></p>
    <div class="progress-bar">
      <div class="progress-fill" id="goal2Progress" style="width: 0;"></div>
    </div>
    <p>Goal 3: <span id="goal3">Not Reached</span></p>
    <div class="progress-bar">
      <div class="progress-fill" id="goal3Progress" style="width: 0;"></div>
    </div>
    <button onclick="buyUpgrade()">Buy Spacecraft Upgrade (Cost: <span id="upgradeCost">1</span> X)</button>
    <br>
    <button onclick="resetValues()">Explore a New Galaxy (Cost: <span id="resetCost">40</span> Y)</button>
    <br>
    <button onclick="resetGame()">Warp to a New Dimension (Requires all goals to be reached)</button>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.3.1/decimal.min.js"></script>
  <script>
    let X = new Decimal(1);
    let Y = new Decimal(0);
    let Z = new Decimal(1);
    let upgradeCost = new Decimal(1);
    let resetCost = new Decimal(40);
    let Goal1 = new Decimal(0);
    let Goal2 = new Decimal(0);
    let Goal3 = new Decimal(0);
    let upgboughttimes = 0;
    let upgcostmult = new Decimal(1.15);
    let upgpricepow = new Decimal(1);
    let star = new Decimal(0); // New variable for star using Decimal.js

    function formatNumber(num) {
      if (num.gte(100)) {
        const parts = num.toExponential().split('e');
        return `${parseFloat(parts[0]).toFixed(3)}e${parseInt(parts[1])}`;
      } else {
        return num.toFixed(3);
      }
    }

    function updateDisplay() {
      document.getElementById("xValue").textContent = formatNumber(X);
      document.getElementById("yValue").textContent = formatNumber(Y);
      document.getElementById("zValue").textContent = formatNumber(Z);
      document.getElementById("upgradeCost").textContent = formatNumber(upgradeCost);
      document.getElementById("resetCost").textContent = formatNumber(resetCost);
      document.getElementById("goal1").textContent = Goal1.eq(1) ? "Reached" : "Not Reached";
      document.getElementById("goal2").textContent = Goal2.eq(1) ? "Reached" : "Not Reached";
      document.getElementById("goal3").textContent = Goal3.eq(1) ? "Reached" : "Not Reached";
      document.getElementById("starValue").textContent = formatNumber(star); // Display the amount of stars

      // Update progress bars
      document.getElementById("goal1Progress").style.width = Goal1.eq(1) ? "100%" : (Z.div(8).times(100)).toFixed(2) + "%";
      document.getElementById("goal2Progress").style.width = Goal2.eq(1) ? "100%" : (Y.div(100).times(100)).toFixed(2) + "%";
      document.getElementById("goal3Progress").style.width = Goal3.eq(1) ? "100%" : (Math.log10(X) / Math.log10(1e6) * 100).toFixed(2) + "%";
    }

    function buyUpgrade() {
      if (X.gte(upgradeCost)) {
        X = X.minus(upgradeCost);
        Y = Y.plus(1);
        upgboughttimes++;
        updateUpgradeCost();
        updateDisplay();
      }
    }

    function updateValues() {
      let yMultiplier = Goal2.eq(1) ? 2 : 1;
      X = X.plus(Y.times(yMultiplier).dividedBy(100).times(Z)).pow(star.sqrt()); // Exponentiate X based on the square root of star
      checkGoals();
      updateDisplay();
    }

    function updateUpgradeCost() {
      upgpricepow = new Decimal(1); // Reset upgpricepow to 1
      if (Goal3.eq(1)) {
        upgpricepow = upgpricepow.dividedBy(1.25);
      }
      if (Goal1.eq(1)) {
        upgpricepow = upgpricepow.dividedBy(1.25);
      }
      upgradeCost = upgcostmult.pow(upgboughttimes).times(upgpricepow);
    }

    function checkGoals() {
      if (Z.gte(8) && Goal1.eq(0)) {
        Goal1 = new Decimal(1);
      }
      if (Y.gte(100) && Goal2.eq(0)) {
        Goal2 = new Decimal(1);
      }
      if (X.gte("1e6") && Goal3.eq(0)) {
        Goal3 = new Decimal(1);
      }
    }

    function resetValues() {
      if (Y.gte(resetCost)) {
        X = new Decimal(1);
        Y = new Decimal(0);
        resetCost = resetCost.plus(10);
        Z = Z.times(2);
        upgboughttimes = 0;
        upgcostmult = new Decimal(1.15);
        upgpricepow = new Decimal(1);
        updateDisplay();
      }
    }

    function resetGame() {
      if (Goal1.eq(1) && Goal2.eq(1) && Goal3.eq(1)) {
        star = star.plus(1); // Increase the value of "star" using Decimal.js
        X = new Decimal(0); // Reset X to 0
        Goal1 = new Decimal(0);
        Goal2 = new Decimal(0);
        Goal3 = new Decimal(0);
        updateDisplay();
      }
    }

    setInterval(updateValues, 10);
    setInterval(updateUpgradeCost, 1);
  </script>
</body>
</html>
