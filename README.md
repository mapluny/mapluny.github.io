<!DOCTYPE html>
<html>
<head>
  <title>Space Incremental</title>
  <style>
     body {
      font-family: 'Arial', sans-serif;
      background-color: #0b182d;
      color: #ffffff;
      text-align: center;
      margin: 20px;
    }

    h1 {
      color: #ffcc00;
    }

    p {
      margin-bottom: 5px;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
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

    .btn {
      background-color: #ffcc00;
      color: #000000;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn:hover {
      background-color: #ffdb4d;
    }

    .how-to-play {
      background-color: #1b2e4c;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      text-align: left;
    }

    .how-to-play h2 {
      color: #ffcc00;
      margin-top: 0;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Space Incremental</h1>
    <p>Value of Spaceship X: <span id="xValue">1</span></p>
    <p>Value of Stardust Y: <span id="yValue">0</span></p>
    <p>Value of Warp Drive Z: <span id="zValue">1</span></p>
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
    <button class="btn" onclick="buyUpgrade()">Acquire Tech (Cost: <span id="upgradeCost">1</span> Spaceship X)</button>
    <br>
    <button class="btn" onclick="resetValues()">Initiate Hyperdrive (Cost: <span id="resetCost">40</span> Stardust Y)</button>

    <div class="how-to-play">
      <h2>How to Play</h2>
      <p>Welcome to Space Incremental! Your mission is to explore the vast universe and gather resources to upgrade your spaceship and warp drive technology.</p>
      <p><strong>Spaceship X:</strong> Represents the current value of your spaceship. It increases over time based on the power of your warp drive and stardust.</p>
      <p><strong>Stardust Y:</strong> Stardust is the cosmic currency you'll collect during your journey. You can use stardust to acquire advanced technologies and strengthen your spaceship.</p>
      <p><strong>Warp Drive Z:</strong> The warp drive multiplies the power of your stardust to speed up the growth of your spaceship.</p>
      <p><strong>Goals:</strong> Reach the following milestones to achieve your objectives:</p>
      <ul>
        <li><strong>Goal 1:</strong> Reach 8 Warp Drive Z. Reward: Reduce upgrade price multiplier</li>
        <li><strong>Goal 2:</strong> Collect 100 Stardust Y. Reward: Incrase the strength of Y *2</li>
        <li><strong>Goal 3:</strong> Boost Spaceship X to 1 million. Reward Reduce the upgrade price multiplier</li>
      </ul>
      <p>Remember, once you've reached a goal, it remains achieved even after a reset. Keep upgrading and exploring to uncover the secrets of the cosmos!</p>
    </div>
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
      X = X.plus(Y.times(yMultiplier).dividedBy(100).times(Z));
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

    setInterval(updateValues, 10);
    setInterval(updateUpgradeCost, 1);
  </script>
</body>
</html>
