<!DOCTYPE html>
<html>

  <head>
    <title>Incremental Game</title>
    <style>
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

      .upgrade-buttons {
        position: absolute;
        top: 0;
        right: 10px;
        text-align: left;
      }

      /* New style for the tab buttons */
      .tab-button {
        cursor: pointer;
        padding: 10px 20px;
        background-color: #f1f1f1;
        border: 1px solid #ccc;
      }

      /* Style for the active tab button */
      .tab-button.active {
        background-color: #ccc;
      }

      /* Style for the tab content */
      .tab-content {
        display: none;
      }

      /* Style for the active tab content */
      .tab-content.active {
        display: block;
      }

    </style>
  </head>

  <body>
    <h1>Incremental Game</h1>
    <p>Value of X: <span id="xValue">1</span></p>
    <p>Value of Y: <span id="yValue">0</span></p>
    <p>Value of Z: <span id="zValue">1</span></p>
    <p>Goal Z: <span id="goal1">Not Reached</span></p>
    <div class="progress-bar">
      <div class="progress-fill" id="goal1Progress" style="width: 0;"></div>
    </div>
    <p>Goal Y: <span id="goal2">Not Reached</span></p>
    <div class="progress-bar">
      <div class="progress-fill" id="goal2Progress" style="width: 0;"></div>
    </div>
    <p>Goal Z: <span id="goal3">Not Reached</span></p>
    <div class="progress-bar">
      <div class="progress-fill" id="goal3Progress" style="width: 0;"></div>
    </div>
    <p>Stars: <span id="starValue">0</span></p>

    <!-- Tab buttons -->
    <div>
      <button class="tab-button" onclick="openTab(event, 'mainTab')">Main</button>
      <button class="tab-button" onclick="openTab(event, 'starUpgradesTab')">Star Upgrades
        <button class="tab-button" onclick="openTab(event, 'autobuyerTab')">Autobuyers</button>
        <button class="tab-button" onclick="openTab(event, 'staritetab')">Starites</button>
      </button>
    </div>

    <!-- Main Tab Content -->
    <div class="tab-content active" id="mainTab">
      <div class="upgrade-buttons">
        <button onclick="buymax()">Buy Max Upgrades</button>
        <button onclick="buyUpgrade()">Buy Upgrade (Cost: <span id="upgradeCost">1</span> X)</button>
        <br>
        <button onclick="resetValues()">Reset for 2x Z (Cost: <span id="resetCost">40</span> Y)</button>
        <br>
        <button onclick="resetGame()">Reset Everything to gain stars (Requires all goals to be reached)</button>
      </div>
    </div>

    <div class="tab-content" id="staritetab">
      <div class="upgrade-buttons">
        <button onclick="buymax2()">Buy Max Upgrades</button>
        <button onclick="buyUpgrade2()">Buy Starites (Cost: <span id="upgradeCost2">1</span> Star)</button>
        <p>You have <span id="starites">1</span> Starpower</p>
        <button onclick="buyUpgrade3()">Buy star power upgrade (Cost: <span id="upgradeCost3">1</span> Star)</button>
        <p>star power reduces the price of Y.</p>
        <button onclick="buyUpgrade4()">Buy star power upgrade (Cost: <span id="upgradeCost4">1</span> Star)</button>
        <p>Improve star power growth based on highest X reached without Z resetting</p>
        <p>Highest: <span id="hxwoz">1</span></p>
        <button onclick="buyUpgrade5()">Buy star power upgrade (Cost: <span id="upgradeCost5">1</span> Star)</button>
        <p>Improve Z factor in star gain</p>
        <button onclick="buyUpgrade6()">Buy star power upgrade (Cost: <span id="upgradeCost6">1</span> Star)</button>
        <p>Star power grows faster if you have not Z reset in this current full reset.</p>
      </div>
    </div>


    <!-- Star Upgrades Tab Content -->
    <div class="tab-content" id="starUpgradesTab">
      <div class="upgrade-buttons">
        <!-- Add an ID to each star upgrade button for easier access -->
        <button id="starUpgrade1Button" onclick="buyStarUpgrade(1)">Star Upgrade 1 (Cost: 2 stars)</button>
        <p>Y is stronger based on X</p>
        <br>
        <button id="starUpgrade2Button" onclick="buyStarUpgrade(2)">Star Upgrade 2 (Cost: 2 stars)</button>
        <p>Stars provide a boost based on Z</p>
        <br>
        <button id="starUpgrade3Button" onclick="buyStarUpgrade(3)">Star Upgrade 3 (Cost: 2 stars)</button>
        <p>X is stronger based on X</p>
        <br>
        <button id="starUpgrade4Button" onclick="buyStarUpgrade(4)">Star Upgrade 4 (Cost: 2 stars)</button>
        <p>You automatically purchase upgrades every 100ms</p>
        <br>
        <button id="starUpgrade5Button" onclick="buyStarUpgrade(5)">Star Upgrade 4 (Cost: 2 stars)</button>
        <p>You gain 2x stars (can be bought infinitely)</p>
        <button id="starUpgrade6Button" onclick="buyStarUpgrade(6)">Star Upgrade 6 (Cost: 2 stars)</button>
        <p>You automatically reset (Z reset) every 100ms</p>
        <button id="starUpgrade7Button" onclick="buyStarUpgrade(7)">Star Upgrade 7 (Cost: 3 stars)</button>
        <p>You automatically full reset (Star reset) every 100ms</p>
        <button id="starUpgrade8Button" onclick="buyStarUpgrade(8)">Star Upgrade 8 (Cost: 10 stars)</button>
        <p>Y is stronger based on Z</p>
        <button id="starUpgrade9Button" onclick="buyStarUpgrade(9)">Star Upgrade 9 (Cost: 33 stars)</button>
        <p>Y is stronger based on Stars</p>
        <button id="starUpgrade10Button" onclick="buyStarUpgrade(10)">Star Upgrade 10 (Cost: 250 stars)</button>
        <p>You get increased stars based on how much X, Y, and Z you have.</p>

      </div>
    </div>

    <div class="tab-content" id="autobuyerTab">
      <div class="upgrade-buttons">
        <!-- Add buttons to toggle Autobuyers if the respective upgrade is bought -->
        <p>(Toggles only work if you have bought the autobuyer upgrade.)</p>
        <button id="autobuyerToggle1" onclick="toggleautobuyer(0)">Toggle Autobuyer 1 </button>
        <p>(The upgrade autobuyer)</p>
        <br>
        <button id="autobuyerToggle2" onclick="toggleautobuyer(1)">Toggle Autobuyer 2 </button>
        <p>(The Z autobuyer)</p>
        <button id="autobuyerToggle3" onclick="toggleautobuyer(2)">Toggle Autobuyer 3 </button>
        <p>(The Star autobuyer)</p>
        <label for="username">Only reset when X stars:</label>
        <input type="text" id="username" name="username">
        <p>(If it is not a number it won't do anything)</p>
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
      let star = new Decimal("1"); // New variable for star using Decimal.js
      let reset1times = new Decimal(0);
      let lastX = new Decimal(1);

      // New variables to store the upgrades' effects
      let starUpgrade1Bought = false;
      let starUpgrade2Bought = false;
      let starUpgrade3Bought = false;
      let starUpgrade4Bought = false;
      let starUpgrade6Bought = false;
      let starUpgrade7Bought = false;
      let starUpgrade8Bought = false;
      let starUpgrade9Bought = false;
      let starUpgrade10Bought = false;
      let rstarubt = new Decimal(0);
      let ymult = new Decimal(0);
      let autobuyers = [1, 1, 1];
      let starsgained = new Decimal(0);


      let starites = new Decimal(0);
      let starpower = new Decimal(1);
      let stariteupgboughttimes = 0;
      let stariteupgradecost = new Decimal("1.5e3");
      let stariteupgrademult = new Decimal("8");

      let spupgradecost = new Decimal("1e6");
      let spupgrademult = new Decimal("5e2");
      let spupgboughttimes = 0;
      let zresetpurchasedthisfullreset = 0;
      let hxwoz = new Decimal(0);

      let spupgradecost2 = new Decimal("1e10");
      let spupgrademult2 = new Decimal("1e10");
      let spupgboughttimes2 = 0;

      let spupgradecost3 = new Decimal("1e12");
      let spupgrademult3 = new Decimal("1.5e3");
      let spupgboughttimes3 = 0;

      let spupgradecost4 = new Decimal("1e13");
      let spupgrademult4 = new Decimal("1e22");
      let spupgboughttimes4 = 0;





      function formatNumber(num) {
        if (num.gte(1000)) {
          const parts = num.toExponential().split('e');
          return `${parseFloat(parts[0]).toFixed(3)}e${parseInt(parts[1])}`;
        } else {
          return num.toFixed(3);
        }
      }

      function updateDisplay() {
        document.getElementById("xValue").textContent = formatNumber(X) + " %+s " + formatNumber(lastX.dividedBy(X).mul(100));
        document.getElementById("yValue").textContent = formatNumber(Y) + " * " + formatNumber(ymult);
        document.getElementById("zValue").textContent = formatNumber(Z);
        document.getElementById("upgradeCost").textContent = formatNumber(upgradeCost);
        document.getElementById("upgradeCost2").textContent = formatNumber(stariteupgradecost);
        document.getElementById("upgradeCost3").textContent = formatNumber(spupgradecost);
        document.getElementById("upgradeCost4").textContent = formatNumber(spupgradecost2);
        document.getElementById("upgradeCost5").textContent = formatNumber(spupgradecost3);
        document.getElementById("upgradeCost6").textContent = formatNumber(spupgradecost4);
        document.getElementById("resetCost").textContent = formatNumber(resetCost);
        document.getElementById("goal1").textContent = Goal1.eq(1) ? "Reached" : "Not Reached";
        document.getElementById("goal2").textContent = Goal2.eq(1) ? "Reached" : "Not Reached";
        document.getElementById("goal3").textContent = Goal3.eq(1) ? "Reached" : "Not Reached";
        document.getElementById("starites").textContent = formatNumber(starpower);
        document.getElementById("hxwoz").textContent = formatNumber(hxwoz);

        document.getElementById("starValue").textContent = formatNumber(star) + " + " + formatNumber(starsgained); // Display the amount of stars
        document.getElementById("starUpgrade5Button").textContent = "Star Upgrade 5 (Cost: " + formatNumber(new Decimal(10).pow(rstarubt.plus(1))) + ")";

        // Update progress bars
        document.getElementById("goal1Progress").style.width = Goal1.eq(1) ? "100%" : (Z.div(8).times(100)).toFixed(2) + "%";
        document.getElementById("goal2Progress").style.width = Goal2.eq(1) ? "100%" : (Y.div(100).times(100)).toFixed(2) + "%";
        document.getElementById("goal3Progress").style.width = Goal3.eq(1) ? "100%" : (Decimal.log10(X) / Decimal.log10(1e6) * 100).toFixed(2) + "%";
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

      function buyUpgrade2() {
        if (star.gte(stariteupgradecost)) {
          star = star.minus(stariteupgradecost);
          starites = starites.plus(1);
          stariteupgboughttimes++;
          updateUpgradeCost2();
          updateDisplay();
        }
      }

      function buyUpgrade3() {
        if (star.gte(spupgradecost)) {
          star = star.minus(spupgradecost);;
          spupgboughttimes++;
          updateUpgradeCost3();
          updateDisplay();
        }
      }


      function buyUpgrade4() {
        if (star.gte(spupgradecost2)) {
          star = star.minus(spupgradecost2);;
          spupgboughttimes2++;
          updateUpgradeCost4();
          updateDisplay();
        }
      }

      function buyUpgrade5() {
        if (star.gte(spupgradecost3)) {
          star = star.minus(spupgradecost3);;
          spupgboughttimes3++;
          updateUpgradeCost5();
          updateDisplay();
        }
      }

      function buyUpgrade6() {
        if (star.gte(spupgradecost4)) {
          star = star.minus(spupgradecost4);;
          spupgboughttimes4++;
          updateUpgradeCost6();
          updateDisplay();
        }
      }

      function buyStarUpgrade(upgradeNumber) {
        // Check if the star upgrade is not bought yet and the player has enough stars
        if (star.gte(2) && !starUpgrade1Bought && upgradeNumber === 1) {
          star = star.minus(2);
          starUpgrade1Bought = true;
          updateDisplay();
        } else if (star.gte(2) && !starUpgrade2Bought && upgradeNumber === 2) {
          star = star.minus(2);
          starUpgrade2Bought = true;
          updateDisplay();
        } else if (star.gte(2) && !starUpgrade3Bought && upgradeNumber === 3) {
          star = star.minus(2);
          starUpgrade3Bought = true;
          updateDisplay();
        } else if (star.gte(2) && !starUpgrade4Bought && upgradeNumber === 4) {
          star = star.minus(2);
          starUpgrade4Bought = true;
          updateDisplay();
        } else if (star.gte(new Decimal(10).pow(rstarubt.plus(1))) && upgradeNumber === 5) {
          star = star.minus(new Decimal(10).pow(rstarubt.plus(1)));
          rstarubt = rstarubt.plus(1);
          updateDisplay();
        } else if (star.gte(2) && !starUpgrade6Bought && upgradeNumber === 6) {
          star = star.minus(2);
          starUpgrade6Bought = true;
        } else if (star.gte(3) && !starUpgrade7Bought && upgradeNumber === 7) {
          star = star.minus(3);
          starUpgrade7Bought = true;
          updateDisplay();
        } else if (star.gte(10) && !starUpgrade8Bought && upgradeNumber === 8) {
          star = star.minus(10);
          starUpgrade8Bought = true;
          updateDisplay();
        } else if (star.gte(33) && !starUpgrade9Bought && upgradeNumber === 9) {
          star = star.minus(33);
          starUpgrade9Bought = true;
          updateDisplay();
        } else if (star.gte(250) && !starUpgrade10Bought && upgradeNumber === 10) {
          star = star.minus(250);
          starUpgrade10Bought = true;
          updateDisplay();

        }

        // Disable the buttons for bought star upgrades
        document.getElementById("starUpgrade1Button").disabled = starUpgrade1Bought;
        document.getElementById("starUpgrade2Button").disabled = starUpgrade2Bought;
        document.getElementById("starUpgrade3Button").disabled = starUpgrade3Bought;
        document.getElementById("starUpgrade4Button").disabled = starUpgrade4Bought;
        document.getElementById("starUpgrade6Button").disabled = starUpgrade6Bought;
        document.getElementById("starUpgrade7Button").disabled = starUpgrade7Bought;
        document.getElementById("starUpgrade8Button").disabled = starUpgrade8Bought;
        document.getElementById("starUpgrade9Button").disabled = starUpgrade9Bought;
        document.getElementById("starUpgrade10Button").disabled = starUpgrade10Bought;
      }

      function updateValues() {
        let yMultiplier = Goal2.eq(1) ? 2 : 1;
        let starEffectiveness = star.pow(new Decimal(1).dividedBy(X.plus(1).sqrt().sqrt()));
        let sp = starpower.pow(5);
        let staritegp = new Decimal(2).pow(starites).minus(1);
        let Xmul = new Decimal(1);
        let szfactor = Z;
        Ystrength = Y.plus(1);
        starEffectiveness = starEffectiveness.mul(sp)

        if (star.lte(0)) {

          star = star.plus(1)


        }

        if (zresetpurchasedthisfullreset == 0) {

          hxwoz = Decimal.max(X, hxwoz);

        }

        // Apply the effects of the star upgrades
        if (starUpgrade1Bought) {
          Ystrength = Ystrength.times(Decimal.log10(X.plus(1)).plus(1).pow(2))
        }
        if (starUpgrade2Bought) {
          starEffectiveness = starEffectiveness.times(Z.sqrt());
        }
        if (starUpgrade3Bought) {
          Xmul = Xmul.times(Decimal.log10(X.plus(1).mul(500)).pow(1.2).plus(1));
        }
        if (starUpgrade8Bought) {
          Ystrength = Ystrength.mul(Z.pow(2).plus(1));
        }


        if (reset1times.mul(10).plus(40).gte(100)) {
          resetCost = Decimal.floor(new Decimal(1.2).pow(reset1times.mul(3))).plus(74);
        } else {
          resetCost = reset1times.mul(10).plus(40);
        }

        if (spupgboughttimes2 >= 1) {
          let dv = new Decimal(spupgboughttimes2)
          staritegp = staritegp.plus(Decimal.log10(hxwoz.pow(1.5)).pow(dv));
        }

        if (spupgboughttimes3 >= 1) {
          let dv = new Decimal(spupgboughttimes3)
          szfactor = szfactor.pow(dv.mul(0.4).plus(1))
        }

        if (spupgboughttimes4 >= 1) {
          let dv = new Decimal(spupgboughttimes4)
					if (zresetpurchasedthisfullreset == 0){
					staritegp = staritegp.pow(dv.plus(1))
					}
          
        }

        starsgained = new Decimal(0.5);
        Ystrength = Ystrength.mul(sp);
        Ystrength = Ystrength.plus(Decimal.min((new Decimal(3).pow(Z).minus(3)), 5000));
        newX = Xmul.mul(Ystrength.times(yMultiplier).times(Z.mul(sp)).times(starEffectiveness));
        lastX = newX;
        ymult = Ystrength.minus(Y);
        X = X.plus(newX.dividedBy(100));
        newstarpower = staritegp;
        starpower = starpower.plus(newstarpower.div(100))

        if (starUpgrade10Bought) {
          starsgained = starsgained.plus(new Decimal(10).pow(Decimal.log10(X.pow(0.05).mul(Y.pow(0.002).mul(szfactor)))))

        }
        starsgained = starsgained.times(new Decimal(2).pow(rstarubt.plus(1)));


        checkGoals();
        updateDisplay();
      }

      function updateUpgradeCost() {
        upgpricepow = new Decimal(1); // Reset upgpricepow to 1
        upgpricerealpow = new Decimal(1);
        if (Goal3.eq(1)) {
          upgpricepow = upgpricepow.dividedBy(1.25);
        }
        if (Goal1.eq(1)) {
          upgpricepow = upgpricepow.dividedBy(1.25);
        }



        if (upgboughttimes > 5000) {
          let dc = new Decimal(upgboughttimes - 499)
          let dv = dc;
          upgpricerealpow = Decimal.max(dv, 1);


        }

        if (spupgboughttimes > 0) {
          let dv = new Decimal(spupgboughttimes);
          upgpricepow = upgpricepow.div(starpower.mul(dv.pow(2)));
        }

        upgradeCost = upgcostmult.pow(upgboughttimes).times(upgpricepow).pow(upgpricerealpow);




      }

      function updateUpgradeCost2() {
        upgpricepow = new Decimal(2); // Reset upgpricepow to 1
        stariteupgradecost = new Decimal("1.5e3");
        stariteupgradecost = stariteupgradecost.mul(stariteupgrademult.pow(stariteupgboughttimes).pow(upgpricepow));
      }

      function updateUpgradeCost3() {
        upgpricepow = new Decimal(1.01); // Reset upgpricepow to 1
        spupgradecost = new Decimal("1e6");
        spupgradecost = spupgradecost.mul(spupgrademult.pow(spupgboughttimes).times(upgpricepow));
      }

      function updateUpgradeCost4() {
        upgpricepow = new Decimal(1.5); // Reset upgpricepow to 1
        spupgradecost2 = new Decimal("1e10");
        spupgradecost2 = spupgradecost2.mul(spupgrademult2.pow(spupgboughttimes2).pow(upgpricepow));
				if (spupgradecost2.gte("1e90")) {

				spupgradecost2 = spupgradecost2.pow(5);

				}
      }

      function updateUpgradeCost5() {
        upgpricepow = new Decimal(1); // Reset upgpricepow to 1
        spupgradecost3 = new Decimal("1e12");
        spupgradecost3 = spupgradecost3.mul(spupgrademult3.pow(spupgboughttimes3).pow(upgpricepow));
				if (spupgradecost3.gte("1e70")) {

				spupgradecost3 = spupgradecost3.pow(4);

				}
      }

      function updateUpgradeCost6() {
        upgpricepow = new Decimal(1.03); // Reset upgpricepow to 1
        spupgradecost4 = new Decimal("1e13");
        spupgradecost4 = spupgradecost4.mul(spupgrademult4.pow(spupgboughttimes4).pow(upgpricepow));
				if (spupgradecost4.gte("1e80")) {

				spupgradecost4 = spupgradecost4.pow(10);

				}

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
          Z = Z.times(2);
          upgboughttimes = 0;
          upgcostmult = new Decimal(1.15);
          upgpricepow = new Decimal(1);
          reset1times = reset1times.add(1);
          zresetpurchasedthisfullreset = 1;
          updateDisplay();

        }
      }

      function resetGame() {



        if (Goal1.gte(1) && Goal2.gte(1) && Goal3.gte(1)) {
          star = Decimal.floor(star.plus(starsgained)); // Increase the value of "star" using Decimal.js
          X = new Decimal(1); // Reset X to 0
          resetCost = new Decimal(40);
          upgboughttimes = 0;
          reset1times = new Decimal(0);
          upgcostmult = new Decimal(1.15);
          upgpricepow = new Decimal(1);
          Y = new Decimal(1);
          Z = new Decimal(1);
          Goal1 = new Decimal(0);
          Goal2 = new Decimal(0);
          Goal3 = new Decimal(0);
          starpower = new Decimal(1);
          zresetpurchasedthisfullreset = 0;
          updateDisplay();
        }
      }

      function buymax() {
        let i = 0;
        while (i < 512) {
          buyUpgrade();
          i++;
        }
      }


      function buymax2() {
        let i = 0;
        while (i < 512) {
          buyUpgrade2();
          i++;
        }
      }



      function autobuyer() {
        const tv = document.getElementById('username').value;
				whenreset = new Decimal(0);
        if (tv) {
          try {
					whenreset = new Decimal(tv);
					} catch (error) {


				
				}

          if (whenreset instanceof Decimal) {
					
          } else {
					whenreset = new Decimal(0);
          }

        }


        updateUpgradeCost();

        if (starUpgrade4Bought && autobuyers[0] == 1) {
          buymax();
        }
        if (starUpgrade6Bought && autobuyers[1] == 1) {
          resetValues()
        }
        if (starUpgrade7Bought && autobuyers[2] && starsgained.gte(whenreset) == 1) {
          resetGame()
        }

      }

      function toggleautobuyer(autobuyer) {

        if (autobuyers[autobuyer] == 0) {
          autobuyers[autobuyer] = 1;
        } else {
          autobuyers[autobuyer] = 0;
        }

      }



      setInterval(updateValues, 10);
      setInterval(updateUpgradeCost, 1);
      setInterval(autobuyer, 100)

      // Function to open the selected tab and hide others
      function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].classList.remove("active");
        }
        tablinks = document.getElementsByClassName("tab-button");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].classList.remove("active");
        }
        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.classList.add("active");
      }

    </script>
  </body>

</html>
