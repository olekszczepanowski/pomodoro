let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll("button");
let shortBreakButton = document.getElementById("short-break");
let longBreakButton = document.getElementById("long-break");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let restartButton = document.getElementById("restart");
let time = document.getElementById("time");
let addButton = document.getElementById("add");
let subButton = document.getElementById("subtract");

var audio = new Audio("alarm.mp3");
let set;
let count = 59;
let paused = true;
let minCount = 20;
let minCountTmp = 1;
time.textContent = `${minCount +1}:00`;

const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
};

addButton.addEventListener("click", ( () => {
    minCount++;
    minCountTmp=minCount;
    count = 59;
    time.textContent = `${appendZero(minCount+1)}:00`;
}));

subButton.addEventListener("click", ( () => {
    if(minCount>0){
    minCount--;
    minCountTmp=minCount;
    count = 59;
    }
    time.textContent = `${appendZero(minCount+1)}:00`;
}));

restartButton.addEventListener("click", 
(resetTimer = () => {
    pauseTimer();
    count = 59;
    minCount = minCountTmp;
    time.textContent = `${appendZero(minCount+1)}:00`;
    restartButton.classList.remove("show");
    restartButton.classList.add("hide");
}));

const removeFocus = () => {
    buttons.forEach((btn)=>{
        btn.classList.remove("focus");
    });
};

focusButton.addEventListener("click", ( () => {
    removeFocus();
    focusButton.classList.add("focus");
    pauseTimer();
    minCount = minCountTmp;
    count = 59;
    time.textContent = `${appendZero(minCount+1)}:00`;
}));

shortBreakButton.addEventListener("click", () => {
    removeFocus();
    shortBreakButton.classList.add("focus");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount+1)}:00`;
});

longBreakButton.addEventListener("click", () => {
    removeFocus();
    longBreakButton.classList.add("focus");
    pauseTimer();
    minCount = 9;
    count = 59;
    time.textContent = `${appendZero(minCount+1)}:00`;
});

pauseButton.addEventListener("click", (pauseTimer = () =>{
    paused = true;
    clearInterval(set);
    startButton.classList.remove("hide");
    pauseButton.classList.remove("show");
    restartButton.classList.remove("show");
    pauseButton.classList.add("hide");

}));

startButton.addEventListener("click", () => {
    startButton.classList.add("hide");
    startButton.classList.remove("show");
    restartButton.classList.add("show");
    pauseButton.classList.add("show");
    pauseButton.classList.remove("hide");
    restartButton.classList.remove("hide");
    if(paused){
        paused=false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if(count==0){
                if(minCount!=0){
                    minCount--;
                    count=60;
                }
                else{
                    audio.play();
                    clearInterval(set);
                }
            }
        },1000);
    }
});


