function RemakeRebuyableButton(rebuyable) {
    const button = document.createElement('button');
    button.textContent = `Buy ${rebuyable.name} for ${formatnum(rebuyable.cost)}`;
    button.style.padding = '10px 20px';
    button.style.margin = '5px';
    button.style.border = '12px';
    button.style.borderRadius = '5px';
    button.style.backgroundColor = '#4caf50';
    button.style.color = 'white';
    button.style.cursor = 'pointer';

    button.addEventListener('click', () => {
        rebuyable.purchase();
        updateHTML(["cg/pd", "bu"]);
    });

    return button;
}
