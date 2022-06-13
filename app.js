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
    quest: "Inside which HTML element do we put the JavaScript?",
    ans1: "<script>",
    ans2: "<javascript>",
    ans3: "<js>",
    ans4: "<scripting>",
    solution: "<script>",
  },
  {
    quest:
      'What is the correct syntax for referring to an external script called "xxx.js?"',
    ans1: '<script name="xxx.js>"',
    ans2: '<sript href="xxx.js>"',
    ans3: '<script src="xxx.js>"',
    ans4: '<script="xxx.js>"',
    solution: '<script src="xxx.js>"',
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
    quest: "How does a FOR loop start?",
    ans1: "for i=1 to 5",
    ans2: "for (i=0;i<=5)",
    ans3: "for(i=0;i<5;i++)",
    ans4: "for(i<=5;i++",
    solution: "for(i=0;i<5;i++)",
  },
];

var start = false;
var timer = 0;
var time = 10;
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

questionDiv.setAttribute("style", "display:none");
resultDiv.setAttribute("style", "display:none");
highScoreDiv.setAttribute("style", "display:none");

var startButton = document.querySelector("#startBtn");
startButton.addEventListener("click", function () {
  start = true;
  score = 0;
  if (start === true) {
    startButton.disabled = true;
    createList();
  }
  // initialsList=localStorage.getItem("initialsList")
  questionSelect();
  setTimer();
  answerSelection();
  questionDiv.setAttribute("style", "display:flex");
  startDiv.setAttribute("style", "display:none");
  resultDiv.setAttribute("style", "display:none");
  highScoreDiv.setAttribute("style", "display:none");
});

submitInitials.addEventListener("click", function (event) {
  event.preventDefault();
  if (initialsTextEntry != null) {
    var x = { Name: initialsTextEntry.value, marks: score };
    storedList.push(x);
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

function createList() {
  if (localStorage.getItem("storedList") != null) {
    var listArray = JSON.parse(localStorage.getItem("storedList"));

    if (listArray != null) {
      initialsList.innerHTML = "";
      for (i = 0; i < listArray.length; i++) {
        var li1 = document.createElement("li");
        li1.textContent = listArray[i].Name + "-" + listArray[i].marks;
        initialsList.appendChild(li1);
      }
    }
  }
}

goBack.addEventListener("click", function () {
  if (start == true) {
    questionDiv.setAttribute("style", "display:flex");
    startDiv.setAttribute("style", "display:none");
    resultDiv.setAttribute("style", "display:none");
    highScoreDiv.setAttribute("style", "display:none");
  } else {
    questionDiv.setAttribute("style", "display:none");
    startDiv.setAttribute("style", "display:flex");
    resultDiv.setAttribute("style", "display:none");
    highScoreDiv.setAttribute("style", "display:none");
  }
});
viewHighScore.addEventListener("click", function () {
  createList();
  questionDiv.setAttribute("style", "display:none");
  startDiv.setAttribute("style", "display:none");
  resultDiv.setAttribute("style", "display:none");
  highScoreDiv.setAttribute("style", "display:flex");
});
clearList.addEventListener("click", function () {
  initialsList.innerHTML = "";
  storedList = [];
  localStorage.removeItem("storedList");
});

function setTimer() {
  if (start == true) {
    timer = setInterval(function () {
      timeincrement();
    }, 1000);
  } else {
    clearInterval(timer);
    time = 10;
  }
}
function timeincrement() {
  time = time - 1;
  timerIndication.innerHTML = "Time: " + time;
  startButton.innerHTML = "Quiz running";
  if (time <= 0) {
    start = false;
    clearInterval(timer);
    time = 10;
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

function answerSelection() {
  if (start === true) {
    answerE1.addEventListener("click", function () {
      if (answerE1.innerHTML == questionList[index].solution) {
        result.innerHTML = "Answer is correct";
        score = score + 5;
        questionSelect();
      } else {
        result.innerHTML = "Answer is wrong";
        questionSelect();
      }
    });

    answerE2.addEventListener("click", function () {
      if (answerE2.innerHTML == questionList[index].solution) {
        result.innerHTML = "Answer is correct";
        score = score + 5;
        questionSelect();
      } else {
        result.innerHTML = "Answer is wrong";
        questionSelect();
      }
    });

    answerE3.addEventListener("click", function () {
      if (answerE3.innerHTML == questionList[index].solution) {
        result.innerHTML = "Answer is correct";
        score = score + 5;
        questionSelect();
      } else {
        result.innerHTML = "Answer is wrong";
        questionSelect();
      }
    });

    answerE4.addEventListener("click", function () {
      if (answerE4.innerHTML == questionList[index].solution) {
        result.innerHTML = "Answer is correct";
        score = score + 5;
        questionSelect();
      } else {
        result.innerHTML = "Answer is wrong";
        questionSelect();
      }
    });
  } else {
    return;
  }
}
