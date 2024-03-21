function RemakeRebuyableButton(rebuyable) {
    let buttonId = rebuyable.config.set + "buy";
    let button = document.getElementById(buttonId);

    if (!button) {
        console.log(`No button found with id ${buttonId}`);
        return;
    }

    let purchaseText = rebuyable.subFromCurrency ? `Buy ${rebuyable.name} for ${formatnum(rebuyable.cost)} ${rebuyable.currency.name}`  : `${rebuyable.name} Requries ${formatnum(rebuyable.cost)} ${rebuyable.currency.name}`

    if (rebuyable.canBuy) {
        button.textContent = purchaseText;
        button.style.backgroundColor = '#4caf50';
    } else if (rebuyable.set.eq(rebuyable.maxPurchases)) {
        button.textContent = `${rebuyable.name} is maxed`;
        button.style.backgroundColor = '#66ff99';
    } else {
        button.textContent = purchaseText;
        button.style.backgroundColor = 'red';
    }

    button.style.padding = '10px 20px';
    button.style.margin = '5px';
    button.style.border = '12px';
    button.style.borderRadius = '5px';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    if (rebuyable.toolTip) {
        button.title = rebuyable.toolTip;
    }

    let eventListener = () => {
        rebuyable.purchase();
        updateHTML();
    };

    if (button.eventListener && button.eventListener.toString() === eventListener.toString()) {
        return;
    }

    if (button.eventListener) {
        button.removeEventListener('click', button.eventListener);
    }

    button.addEventListener('click', eventListener);

    button.eventListener = eventListener;
}


    function generateEffectClassHTML(effectClass) {
    let divId = "effectsDiv";
    let div = document.getElementById(divId);

    if (!div) {
        console.log(`No div found with id ${divId}`);
        return;
    }

    div.innerHTML = '';

    let title = document.createElement('h2');
    title.textContent = effectClass.displayName;
    div.appendChild(title);

    if (effectClass.allEffectsMultWithNegative.eq(0)) {
        let noMult = document.createElement('p');
        noMult.textContent = `Multiplier has been reduced to 0.`;
        div.appendChild(noMult);
        return
    }

    for (let effect of effectClass.allEffects) {
        let p = document.createElement('p');
        if (!effect.isNegative) {

            let contribution
            let effval = Decimal.absLog10(effect.effectValue)
            let alleffmult = Decimal.absLog10(effectClass.allEffectsMult)
            contribution = Decimal.div(effval, alleffmult).times(100);
    
            p.textContent = `${effect.name}: x${formatnum(effect.effectValue)} (%${formatnum(contribution)})`;
        }
        if (effect.isNegative) {

            let contribution
            let effval = Decimal.absLog10(effect.effectValue)
            let alleffmult = Decimal.absLog10(effectClass.allEffectsMultOnlyNegative)
            contribution = Decimal.div(effval, alleffmult).times(100);
    
            p.textContent = `${effect.name}: /${formatnum(Decimal.div(1, effect.effectValue))} (%${formatnum(contribution)})`;
        }
        p.className = effect.isNegative ? 'effect-negative' : 'effect';
        if (!effect.effectValue.eq(1)) div.appendChild(p);
    }

    let total = document.createElement('p');
    total.textContent = `Total Multiplier: x${formatnum(effectClass.allEffectsMultWithNegative)}`;
    div.appendChild(total);
}

function RemakeAutobuyerButton(autobuyer) {
    let buttonId = autobuyer.config.set + "autobuy";
    let button = document.getElementById(buttonId);

    if (!button) {
        console.log(`No button found with id ${buttonId}`);
        return;
    }

    if (!autobuyer.unlockRequirement) {
        button.textContent = `LOCKED AUTOBUYER`;
        button.style.backgroundColor = 'grey';
        button.disabled = true;
    } else {
        button.disabled = false;
        if (autobuyer.isEnabled) {
            button.textContent = `Disable Autobuyer for ${autobuyer.setRebuyable.name}`;
            button.style.backgroundColor = '#4caf50';
        } else {
            button.textContent = `Enable Autobuyer for ${autobuyer.setRebuyable.name}`;
            button.style.backgroundColor = 'red';
        }
    }

    button.style.padding = '10px 20px';
    button.style.margin = '5px';
    button.style.border = '12px';
    button.style.borderRadius = '5px';
    button.style.color = 'white';
    button.style.cursor = 'pointer';

    let eventListener = () => {
        autobuyer.isEnabled = !autobuyer.isEnabled;
        updateHTML();
    };

    if (button.eventListener && button.eventListener.toString() === eventListener.toString()) {
        return;
    }

    if (button.eventListener) {
        button.removeEventListener('click', button.eventListener);
    }

    button.addEventListener('click', eventListener);

    button.eventListener = eventListener;
}

