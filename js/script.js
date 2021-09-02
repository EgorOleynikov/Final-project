const calculateButton = document.getElementById('calculate');
const resetButton = document.getElementById('reset');
const genderMale = document.getElementById('gender-male');
const numeric = document.getElementsByClassName('numeric');
const activity = document.getElementsByClassName('activity');
const resultWindow = document.getElementsByClassName('counter__result');
const caloriesOutput = document.getElementsByClassName('caloriesOutput');

const calculateButtons = () => {
    var filledAndValidated = 0;
    var filled = 0;
    for(var i = 0; i < numeric.length; i++) {
        if ((numeric[i].value !== '') && (numeric[i].value > 0) && (isNaN(numeric[i].value) === false)) {
            filledAndValidated += 1;
        }
        if (numeric[i].value.length > 0) {
            filled += 1;
        }
    }
    if (filledAndValidated == 3) {calculateButton.disabled = false;} else {calculateButton.disabled = true;}
    if (filled > 0) {resetButton.disabled = false;} else {resetButton.disabled = true;}
}

const genderCheck = () => {
    if (genderMale.checked) {
        return 5;
    } else return -161;
}

const activityCheck = () => {
    for (i = 0; i < activity.length; i++) {
        if (activity[i].checked) {
            var res = i;
            break;
        }
    }
    switch (res) {
        case 0: return 1.2;
        case 1: return 1.375;
        case 2: return 1.55;
        case 3: return 1.725;
        case 4: return 1.9;
    }
}

calculateButton.onclick = function() {
    var weightMaintaining = Math.round(((6.25*numeric[1].value) + (10*numeric[2].value) - (5*numeric[0].value) + genderCheck()) * activityCheck());
    if (weightMaintaining <= 0 || isNaN(weightMaintaining)) {
        weightMaintaining = 0;
    }
    const diff15 = Math.round(weightMaintaining/100*15);
    const weightGain = weightMaintaining + diff15;
    const weightLose = weightMaintaining - diff15;
    caloriesOutput[0].innerHTML = weightMaintaining;
    caloriesOutput[1].innerHTML = weightLose;
    caloriesOutput[2].innerHTML = weightGain;
    resultWindow[0].classList.remove("counter__result--hidden");
}

resetButton.onclick = function() {
    for(var i = 0; i < numeric.length; i++) {
        numeric[i].value = '';
    }
    genderMale.checked = true;
    activity[0].checked = true;
    resultWindow[0].classList.add("counter__result--hidden");
    calculateButton.disabled = true;
    resetButton.disabled = true;
}