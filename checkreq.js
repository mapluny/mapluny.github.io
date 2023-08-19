function checkrq(string) {
    if (eval(isConditionValid(string))) {
        return true
    }
}

function isConditionValid(conditionString) {
    try {
        // Attempt to parse the condition
        eval(`if (${conditionString}) {}`);
        return conditionString;
    } catch (error) {
        console.error('Condition is not valid:', error);
        return null;
    }
}