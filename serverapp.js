var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine","jade")

var totalAnswered = 0;
var totalRightAnswered = 0;
var totalWrongAnswered = 0;
questionsPage1 = ["Natural logarithm table has the base is","Solution set of 5^2 =30x","The software that is used to create text-based documents are referred to as","Errors in a software program are referred to as","We can detect spelling and grammar error by"];
optionsPage1 = [["π","e","10","0"],["{6}","{-6}","{0,6}","{25}"],["DBMS","Suites","Spreadsheets","Word processors"],["Viruses","Computer Fault","Bugs","None of These"],["Press F7","Press Shift + F7","Press Alt + F7","None of These"]];
answersPage1 = ["π","{6}","Word processors","Bugs","Press F7"];

questionsPage2 = ["Ctrl + A is for","The birthplace of the World Wide Web was","A small high speed memory insidse CPU is","DPI stands for","Which of the following device uses the parallel transmission"];
optionsPage2 = [["To Bold","To Save","To Select Whole Area","None of These"],["NASA","Pentagon","CERN","Microsoft"],["RAM","ROM","Cache","Register"],["Dot Per Inch","Decimal Per Inch","Digit Per Inch","Data Per Inch"],["Mouse","Keyboard","Printer","Light Pen"]];
answersPage2 = ["To Select Whole Area","CERN","Register","Dot Per Inch","Printer"];

questionsPage3 = ["Caps Lock is a","A type of reader commonly used to read UPC code is","CPU consists of the following parts","MICR stands for","Name the presentation technology that can be used with JavaScript."];
optionsPage3 = [["Window key","Modifier key","Toggle key","Cursor control key"],["Bar-code reader","Optical-mark reader","Magnetic-ink reader","Both A and C"],["Control unit and ALU","CU and Main memory","Main memory and ALU","Operating system and Main memory"],["Magic In Character Redo","Magnetic Ink Character Recorder","Magnetic Ink Character Reader","None Of These"],["C++","C#","JavaScript","Visual Basic"]];
answersPage3 = ["Toggle key","Bar-code reader","Control unit and ALU","Magnetic Ink Character Reader","C#"];

app.get('/', function (req, res) {
    res.render('sample',{page:"Page 1: Selecting any one of the given options for each question",actionUrl:"/page2",questions:questionsPage1,qoptions:optionsPage1,resultOfPreviousPage:"",methodType: "post",totalResultData:""});
});

app.post('/page2', function (req, res) {
var selAnswersOfpage1 = [];
var rightAnswersPage1 = 0;
var noAnswersPage1 = 0;
selAnswersOfpage1.push(req.body.OptionforQ0);
selAnswersOfpage1.push(req.body.OptionforQ1);
selAnswersOfpage1.push(req.body.OptionforQ2);
selAnswersOfpage1.push(req.body.OptionforQ3);
selAnswersOfpage1.push(req.body.OptionforQ4);
for(var j = 0; j<5;j++){    
    if(selAnswersOfpage1[j] == undefined){
        noAnswersPage1++;
    } 
    if(selAnswersOfpage1[j] == answersPage1[j]){
        rightAnswersPage1++;
    }
}
let resultOfPag1 = {
    "Result of Page" : 1,
    "Total Questions" : 5,
    "Right Answered" : rightAnswersPage1,
    "Wrong Answered" : 5 - rightAnswersPage1 - noAnswersPage1,
    "Not Answered" : noAnswersPage1
}
totalAnswered = 5 - noAnswersPage1;
totalRightAnswered = rightAnswersPage1;
var jsonPage1 = JSON.stringify(resultOfPag1);
res.render('sample',{page:"Page 2: : Selecting any one of the given options for each question",actionUrl:"/page3",questions:questionsPage2,qoptions:optionsPage2,resultOfPreviousPage:jsonPage1,info:"Data from Previous page",methodType: "post",totalResultData:""});
});

app.post('/page3', function (req, res) {
var selAnswersOfpage2 = [];
var rightAnswersPage2 = 0;
var noAnswersPage2 = 0;
selAnswersOfpage2.push(req.body.OptionforQ0);
selAnswersOfpage2.push(req.body.OptionforQ1);
selAnswersOfpage2.push(req.body.OptionforQ2);
selAnswersOfpage2.push(req.body.OptionforQ3);
selAnswersOfpage2.push(req.body.OptionforQ4);
for(var j = 0; j<5;j++){     
    if(selAnswersOfpage2[j] == undefined){
        noAnswersPage2++;
    } 
    if(selAnswersOfpage2[j] == answersPage2[j]){
        rightAnswersPage2++;
    }
}
let resultOfPag2 = {
    "Result of Page" : 2,
    "Total Questions" : 5,
    "Right Answered" : rightAnswersPage2,
    "Wrong Answered" : 5 - rightAnswersPage2 - noAnswersPage2,
    "Not Answered" : noAnswersPage2
}
var jsonPage2 = JSON.stringify(resultOfPag2);
totalAnswered += 5 - noAnswersPage2;
totalRightAnswered+= rightAnswersPage2;
res.render('sample',{page:"Page 3: Selecting any one of the given options for each question",actionUrl:"/result",questions:questionsPage3,qoptions:optionsPage3,resultOfPreviousPage:jsonPage2,info:"Data from Previous page",methodType: "post",totalResultData:""});
});

app.post('/result', function (req, res) {
var selAnswersOfpage3 = [];
var rightAnswersPage3 = 0;
var noAnswersPage3 = 0;
selAnswersOfpage3.push(req.body.OptionforQ0);
selAnswersOfpage3.push(req.body.OptionforQ1);
selAnswersOfpage3.push(req.body.OptionforQ2);
selAnswersOfpage3.push(req.body.OptionforQ3);
selAnswersOfpage3.push(req.body.OptionforQ4);
for(var j = 0; j<5;j++){     
    if(selAnswersOfpage3[j] == undefined){
        noAnswersPage3++;
    } 
    if(selAnswersOfpage3[j] == answersPage3[j]){
        rightAnswersPage3++;
    }
}
let resultOfPag3 = {
    "Result of Page" : 3,
    "Total Questions" : 5,
    "Right Answered" : rightAnswersPage3,
    "Wrong Answered" : 5 - rightAnswersPage3 - noAnswersPage3,
    "Not Answered" : noAnswersPage3
}
var jsonPage3 = JSON.stringify(resultOfPag3);
totalAnswered+= 5 - noAnswersPage3;
totalRightAnswered+= rightAnswersPage3;
totalWrongAnswered = totalAnswered -totalRightAnswered;
var finalResultData = ["Total pages: 3", "Total Questions: 15","Total Questions Answered: "+totalAnswered,"Right Answered: "+totalRightAnswered,"Wrong Answered: "+totalWrongAnswered];
res.render('sample',{page:"Final Result",actionUrl:"/",questions:"",qoptions:"",resultOfPreviousPage:jsonPage3,info:"Data from Previous page",methodType: "get",totalResultData:finalResultData});
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});

