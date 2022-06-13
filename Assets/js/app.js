//HTML section is divided to four sections start, question, result and high score. Each div visibility is controlled using JavaScript
//Initialise all DOM elements

var start = false;
var timer = 0;
var time = 60;
var score = 0;
var index;
var storedList = [];
var questionE1 = document.querySelector("#question");
var answerE1 = document.querySelector("#answer1");
var answerE2 = document.querySelector("#answer2");
var answerE3 = document.querySelector("#answer3");
var answerE4 = document.querySelector("#answer4");
var timerIndication = document.querySelector("#timer");
var result = document.querySelector("#result");
var startDiv = document.querySelector("#startDiv");
var questionDiv = document.querySelector("#questionDiv");
var resultDiv = document.querySelector("#resultDiv");
var highScoreDiv = document.querySelector("#highScoreDiv");
var submitInitials = document.querySelector("#submitInitials");
var goBack = document.querySelector("#goBack");
var clearList = document.querySelector("#clearList");
var viewHighScore = document.querySelector("#viewHighScore");
var finalScore = document.querySelector("#finalScore");
var initialsList = document.querySelector("#initialsList");
var initialsTextEntry = document.querySelector("#initialsTextEntry");

// Only start button section of the HTML will be visible at the beginning. All others are hidden.
startDiv.setAttribute("style", "display:flex");
questionDiv.setAttribute("style", "display:none");
resultDiv.setAttribute("style", "display:none");
highScoreDiv.setAttribute("style", "display:none");

//when the start button clicked.
//variable "start" set to true.
//sound a beep and the screen switch to the question section by changing the display settings.
//three functions for the timer, selection of questions & checking the answer selections are called.
//when the user repeating the game, the name and initials of previous games will be displayed as an ordered list using "createList" function.

var startButton = document.querySelector("#startBtn");
startButton.addEventListener("click", function (event) {
  event.stopImmediatePropagation();
  start = true;
  score = 0;
  if (start === true) {
    gameStartBeep();
    startButton.disabled = true;
    createList();
  }
  questionSelect();
  setTimer();
  answerSelection();
  questionDiv.setAttribute("style", "display:flex");
  startDiv.setAttribute("style", "display:none");
  resultDiv.setAttribute("style", "display:none");
  highScoreDiv.setAttribute("style", "display:none");
});

//after the time limit completed, screen will switch to the screen of "score and enter initials"
//name initials and the score will be saved in an array "storedlist". The data will be sorted based on high to low score values.
//also the same data will be stored in local storage
//after saving the User initials and score, reset the score to zero. And then change screen to high score section.
//The high score section will have the buttons to "go back" to main screen and also a button to "reset the high score". Functions for these two buttons are in below sections.

submitInitials.addEventListener("click", function (event) {
  event.preventDefault();

  if (initialsTextEntry.value.length > 0) {
    var x = { Name: initialsTextEntry.value, marks: score };
    storedList.push(x);
    storedList.sort(function (a, b) {
      return b.marks - a.marks;
    });
    localStorage.setItem("storedList", JSON.stringify(storedList));
    createList();
    initialsTextEntry.value = "";
  }

  score = 0;
  questionDiv.setAttribute("style", "display:none");
  startDiv.setAttribute("style", "display:none");
  resultDiv.setAttribute("style", "display:none");
  highScoreDiv.setAttribute("style", "display:flex");
});

//"createList" function is using for displaying the high score entries as an ordered list
// the function will retrieve the high score list data string  from local storage and parse to an array
//the function then write each objects in the array to HTML as an ordered list

function createList() {
  if (localStorage.getItem("storedList") != null) {
    var listArray = JSON.parse(localStorage.getItem("storedList"));

    if (listArray != null) {
      initialsList.innerHTML = "";
      for (i = 0; i < listArray.length; i++) {
        var li1 = document.createElement("li");
        li1.textContent = listArray[i].Name + "  :  " + listArray[i].marks;
        li1.style =
          "font-size: medium;background-color: rgba(85, 107, 47, 0.363);width: 195px;text-align: left; padding:5px; margin:5px";
        initialsList.appendChild(li1);
      }
    }
  }
}

//"go back" button in the high score screen will switch the screen to the start button the if the timer is not running
//if the quiz is running , it will switch to the question section

goBack.addEventListener("click", function () {
  if (start == true) {
    questionDiv.setAttribute("style", "display:flex");
    startDiv.setAttribute("style", "display:none");
    resultDiv.setAttribute("style", "display:none");
    highScoreDiv.setAttribute("style", "display:none");
  } else {
    score = 0;
    index = 0;
    questionDiv.setAttribute("style", "display:none");
    startDiv.setAttribute("style", "display:flex");
    resultDiv.setAttribute("style", "display:none");
    highScoreDiv.setAttribute("style", "display:none");
  }
});
// "view high score" button will switch the screen to the high score section.
// this button also initiate the "createList" function, this will enable to create list of high score from local storage when the game is initialised/ open for first time.

viewHighScore.addEventListener("click", function () {
  createList();
  questionDiv.setAttribute("style", "display:none");
  startDiv.setAttribute("style", "display:none");
  resultDiv.setAttribute("style", "display:none");
  highScoreDiv.setAttribute("style", "display:flex");
});

//"clear high scores " button will clear the list of high scores from both HTML and also the local storage.
clearList.addEventListener("click", function () {
  initialsList.innerHTML = "";
  storedList = [];
  localStorage.removeItem("storedList");
});
// set timer function will initialise a setinterval with 1sec time interval, when the variable "start" is true. When the start is false , the timer interval will clear.
function setTimer() {
  if (start == true) {
    timer = setInterval(function () {
      timeincrement();
    }, 1000);
  } else {
    clearInterval(timer);
    time = 60;
  }
}

//"time increment" function is using as a countdown counter to show the remaining time of the quiz.
//after the countdown reached zero, set the var start to false and stop the "set timer " function"
//switch the screen to result screen, where it will show the final score.

function timeincrement() {
  time = time - 1;
  if (time < 0) {
    time = 0;
  }
  timerIndication.innerHTML = "Time: " + time;
  startButton.innerHTML = "Quiz running";
  if (time <= 0) {
    gameOverBeep();
    start = false;
    clearInterval(timer);
    time = 60;
    result.innerHTML = "";
    startButton.innerHTML = "Start Quiz";
    startButton.disabled = false;
    finalScore.innerHTML = "Your final score is : " + score;
    questionDiv.setAttribute("style", "display:none");
    startDiv.setAttribute("style", "display:none");
    resultDiv.setAttribute("style", "display:flex");
    highScoreDiv.setAttribute("style", "display:none");
  }
}

// "question  select" function is for choosing a random equation from the list of questions provided in an array of objects "question list"
// after randomly selecting an object in "question list" , each named values of the object will be displayed in the question div.
//the question list array also contains a value of the correct answer as "solution"

function questionSelect() {
  index = Math.floor(Math.random() * questionList.length);
  console.log(index);
  var question = questionList[index];
  console.log(question.quest);
  questionE1.innerHTML = question.quest;
  answerE1.innerHTML = question.ans1;
  answerE2.innerHTML = question.ans2;
  answerE3.innerHTML = question.ans3;
  answerE4.innerHTML = question.ans4;
}

//when the user selected an answer it will be compared to the correct answer value provided in the corresponding object and determine it as correct or wrong.
//an event listener is provided for each answer label in HTML.
//Sound alert provided for correct and wrong selection

function answerSelection() {
  if (start === true) {
    answerE1.addEventListener("click", function (event) {
      event.stopImmediatePropagation();
      if (answerE1.innerHTML == questionList[index].solution) {
        correctAnsBeep();
        result.innerHTML = "Correct!";
        score = score + 5;
        questionSelect();
      } else {
        wrongAnsBeep();
        result.innerHTML = "Wrong!";
        time = time - 10;
        if (time < 0) {
          time = 0;
        }
        questionSelect();
      }
    });

    answerE2.addEventListener("click", function (event) {
      event.stopImmediatePropagation();
      if (answerE2.innerHTML == questionList[index].solution) {
        correctAnsBeep();
        result.innerHTML = "Correct!";
        score = score + 5;
        questionSelect();
      } else {
        wrongAnsBeep();
        result.innerHTML = "Wrong!";
        time = time - 10;
        if (time < 0) {
          time = 0;
        }
        questionSelect();
      }
    });

    answerE3.addEventListener("click", function (event) {
      event.stopImmediatePropagation();
      if (answerE3.innerHTML == questionList[index].solution) {
        correctAnsBeep();
        result.innerHTML = "Correct!";
        score = score + 5;
        questionSelect();
      } else {
        wrongAnsBeep();
        result.innerHTML = "Wrong!";
        time = time - 10;
        if (time < 0) {
          time = 0;
        }
        questionSelect();
      }
    });

    answerE4.addEventListener("click", function (event) {
      event.stopImmediatePropagation();
      if (answerE4.innerHTML == questionList[index].solution) {
        correctAnsBeep();
        result.innerHTML = "Correct!";
        score = score + 5;
        questionSelect();
      } else {
        wrongAnsBeep();
        result.innerHTML = "Wrong!";
        time = time - 10;
        if (time < 0) {
          time = 0;
        }
        questionSelect();
      }
    });
  } else {
    return;
  }
}

//sound alert for correct answer
function correctAnsBeep() {
  var sound = new Audio("./Assets/sounds/correct-answer.wav");
  sound.play();
}
//sound alert for wrong answer
function wrongAnsBeep() {
  var sound = new Audio("./Assets/sounds/wrong-answer.wav");
  sound.play();
}
//sound alert when the quiz completed
function gameOverBeep() {
  var sound = new Audio("./Assets/sounds/game-over.wav");
  sound.play();
}
//sound alert when the quiz begin
function gameStartBeep() {
  var sound = new Audio("./Assets/sounds/laser-swoosh.wav");
  sound.play();
}
//list of question presented
//includes questiona and four answer choices. The correct answer is also provided as "solution", this will be used for determining the user entry is correct or wrong.
var questionList = [
  {
    quest: "Commonly used data types do not include",
    ans1: "Strings",
    ans2: "Boolean",
    ans3: "floats",
    ans4: "digits",
    solution: "digits",
  },

  {
    quest: 'How do you write "Hello World" in an alertbox?',
    ans1: 'msgBox("Hello World)"',
    ans2: 'alert("Hellow World")',
    ans3: 'alertBox("Hello World")',
    ans4: 'msg("Hello World")',
    solution: 'alert("Hellow World")',
  },
  {
    quest: "How do you create a function in JavaScript?",
    ans1: "function:myFunction()",
    ans2: "function myFunction()",
    ans3: "function=myFunction()",
    ans4: "function=myFunction()",
    solution: "function myFunction()",
  },
  {
    quest: 'How do you call a function named "myFunction"?',
    ans1: "myFunction()",
    ans2: "call myFunction()",
    ans3: "call function myFunction()",
    ans4: "function=myFuncton()",
    solution: "myFunction()",
  },
  {
    quest: "How to write an IF statement in JavaScript?",
    ans1: "if(i==5)",
    ans2: "if i==5",
    ans3: "if i==5 then",
    ans4: "if i=5 then",
    solution: "if(i==5)",
  },
  {
    quest:
      'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    ans1: "if(i <> 5)",
    ans2: "if i <> 5",
    ans3: "if i =! 5 then",
    ans4: "if(i != 5)",
    solution: "if(i != 5)",
  },
  {
    quest: "How does a WHILE loop start?",
    ans1: "while(i<=10,i++)",
    ans2: "while i=1 to 10",
    ans3: "while(i<=10)",
    ans4: "while(i=10)",
    solution: "while(i<=10)",
  },

  {
    quest: "What does HTML stand for?",
    ans1: "Hyperlinks and Text Markup Language",
    ans2: "Home Tool Markup Language",
    ans3: "Hyper Test Markup Language",
    ans4: "High Text Making Language",
    solution: "Hyper Test Markup Language",
  },
  {
    quest: "Who is making the Web standards?",
    ans1: "Mozilla",
    ans2: "google",
    ans3: "The World Wide Web Consortium",
    ans4: "Microsoft",
    solution: "The World Wide Web Consortium",
  },
  {
    quest: "Choose the correct HTML element for the largest heading:",
    ans1: "head",
    ans2: "h6",
    ans3: "heading",
    ans4: "h1",
    solution: "h1",
  },
  {
    quest: "How can you add a comment in a JavaScript?",
    ans1: ",--this is a comment-->",
    ans2: "'this is a comment",
    ans3: "/this is a comment",
    ans4: "//this is a comment",
    solution: "//this is a comment",
  },

  {
    quest: "How do you round the number 7.25, to the nearest integer?",
    ans1: "round(7.25)",
    ans2: "Math.round(7.25)",
    ans3: "rnd(7.25)",
    ans4: "Math.rnd(7.25)",
    solution: "Math.round(7.25)",
  },
  {
    quest: "How do you find the number with the highest value of x and y?",
    ans1: "ceil(x,y)",
    ans2: "Math.ceil(x,y)",
    ans3: "top(x,y)",
    ans4: "Math.max(x,y)",
    solution: "Math.max(x,y)",
  },
  {
    quest: "How can you detect the client's browser name?",
    ans1: "client.navName",
    ans2: "navigator.appName",
    ans3: "browser.name",
    ans4: "url.name",
    solution: "navigator.appName",
  },
  {
    quest: "Which event occurs when the user clicks on an HTML element?",
    ans1: "onmouseclick",
    ans2: "onclick",
    ans3: "onmouseover",
    ans4: "onchange",
    solution: "onclick",
  },
  {
    quest: "How do you declare a JavaScript variable?",
    ans1: "var carName",
    ans2: "variable carName",
    ans3: "v carName",
    ans4: "v=carName",
    solution: "var carName",
  },
  {
    quest: "Which operator is used to assign a value to a variable?",
    ans1: "x",
    ans2: "=",
    ans3: ":",
    ans4: "==",
    solution: "=",
  },
  {
    quest: "What will the following code return: Boolean(10 > 9)",
    ans1: "true",
    ans2: "false",
    ans3: "null",
    ans4: "NaN",
    solution: "true",
  },
];
