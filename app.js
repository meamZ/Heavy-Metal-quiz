var state = {
  questions: [{question: 'When was Metallica formed?',
              answers: ['1981','1977','1985', '1979'],
              correctanswer: '1981',
              wasasked: false,},
              {question: 'Who is currently a Guns and Roses member?',
              answers: ['Richard Fortus','Robin Finck','DJ Ashba','Tommy Stinson'],
              correctanswer: 'Richard Fortus',
              wasasked: false,},
              {question: 'What is NOT a Slipknot song?',
              answers: ['My Nemesis','Duality','Surfacing','Eyeless'],
              correctanswer: 'My Nemesis',
              wasasked: false,},
              {question: 'When was the Album "Way of the fist" by Five Finger Death Punch released?',
              answers: ['2007','2001','2014','2004',],
              correctanswer: '2007',
              wasasked: false,},
              {question: 'In which Band does Zoltan Bathory play?',
              answers: ['Five Finger Death Punch','Slipknot','System of a Down','Disturbed'],
              correctanswer: 'Five Finger Death Punch',
              wasasked: false,},
              {question: 'On which Album was "Numb" by Linkinpark?',
              answers: ['Meteora','The Hunting Party','Hybrid Theory','One More Light'],
              correctanswer: 'Meteora',
              wasasked: false,},
              {question: 'Whats the name of the current Metallica bassist?',
              answers: ['Rob Trujillo','Chris Kael','Lars Ulrich','Dave Farell'],
              correctanswer: 'Rob Trujillo',
              wasasked: false,},
              {question: 'What is the second Motörhead Album?',
              answers: ['Overkill','Iron Fist','Ace of spades','Bomber'],
              correctanswer: 'Overkill',
              wasasked: false,},
              {question: 'When was "The Number of the Beast" released?',
              answers: ['1982','1990','1980','1978'],
              correctanswer: '1982',
              wasasked: false,},
              {question: ' Which was the first Megadeath album that made it into the Top 10 of the Billboard Charts?',
              answers: ['Countdown to Extinction','Peace Sells... but Who`s Buying?','The World Needs a Hero','Youthanasia'],
              correctanswer: 'Countdown to Extinction',
              wasasked: false,},
            ],
currentquestionindex: -1,
correctchildnr : -1,
questioncounter: 0,
correctcounter: 0,
incorrectcounter: 0,
MAXQUESTIONS: 5,
            };
//state modification functions
function setWasAsked(state,questionindex ,wasasked){
  state.questions[questionindex].wasasked = wasasked;
}

function setCorrectChildNr(state, correctChildNr){
  state.correctchildnr = correctChildNr;
}

function setCurrentQuestionIndex(state, questionindex){
  state.currentquestionindex = questionindex;
}

function incQuestionCounter(state){
  state.questioncounter += 1;
}

function incCorrectCounter(state){
  state.correctcounter += 1;
}

function incIncorrectCounter(state){
  state.incorrectcounter += 1;
}

function checkAnswer(state, answer, element){
  if(state.questions[state.currentquestionindex].correctanswer === answer){
    element.addClass('answer-right');
    incCorrectCounter(state);
  } else{
    element.addClass('answer-wrong');
    element.parent().find('div:nth-child('+state.correctchildnr+')').addClass('answer-wasright');
    incIncorrectCounter(state);
  }
  $('.js-nextbutton').show();
}

function resetQuiz(state){
  state.currentquestionindex= -1;
  state.correctchildnr= -1;
  state.questioncounter= 0;
  state.correctcounter= 0;
  state.incorrectcounter= 0;
  $('.quizbox,.js-count,.js-endbox').hide();
  $('.js-start').show();
  for(var i = 0; i < state.questions.length; i++){
    setWasAsked(state,i,false);
  }
}

function nextQuestion(state){
  $('.js-nextbutton').hide();
  if(state.questioncounter < state.MAXQUESTIONS) {
    incQuestionCounter(state);
    var possibleanswers = [];
    for(var i = 0; i<state.questions.length; i++) {
      if(state.questions[i].wasasked === false) {
        possibleanswers.push(i);
      }
    }
    var newquestionindex = getRandomInt(possibleanswers, state.questions.length);
    setWasAsked(state, newquestionindex, true);
    setCurrentQuestionIndex(state,newquestionindex);
    renderQuestion(state, $('.questiontext'));
    renderAnswers(state, $('.answers'));
    updateQuestionCount(state);
  } else{
    renderEndPage(state);
  }
}

function updateQuestionCount(state){
  $('.js-questioncount').text('Question '+state.questioncounter+' of '+state.MAXQUESTIONS);
}
function updateSuccessCount(state){
  $('.js-correctcount').text(state.correctcounter+' correct, '+state.incorrectcounter+' incorrect');
}

function renderQuestion(state, element){
  element.text(state.questions[state.currentquestionindex].question);
}

function renderAnswers(state, element){
  var answers = getShuffeledAnswers(state).map(function(answer){
    return '<div class="answer js-answer">'+answer+'</div>';
  });
  element.html(answers);
}

function renderEndPage(state){
  var text = '';
  var score = Math.round(state.correctcounter*5/state.MAXQUESTIONS);
  switch(score){
    case 0:
      text = 'That was horrible';
    break;
    case 1:
      text = 'Not good';
    break;
    case 2:
      text = 'OK';
    break;
    case 3:
      text = 'Quite good';
    break;
    case 4:
      text = 'Good';
    break;
    case 5:
      text = 'Really good';
    break;
  }
  $('.js-endheader').text(text+'!');
  $('.js-endtext').text('You had '+state.correctcounter+' questions right and '+
    state.incorrectcounter + ' questions wrong.');
  $('.js-quizbox').hide();
  $('.js-count').hide();
  $('.js-endbox').show();
}

function getShuffeledAnswers(state){
  var answers = state.questions[state.currentquestionindex].answers;
  var correctanswer = state.questions[state.currentquestionindex].correctanswer;
  var newanswers = [];
  var possibleanswers = [0,1,2,3];
  answers.forEach(function(answer){
    var newindex = getRandomInt(possibleanswers, 4);
    newanswers[newindex] = answer;
    possibleanswers.splice(possibleanswers.indexOf(newindex),1);
    if(answer === correctanswer){
      setCorrectChildNr(state, newindex+1);
    }
  });
  return newanswers;
}

function getRandomInt(inarray, max) {
  var inar = inarray;
  var wasntfound = true;
  min = Math.ceil(0);
  max = Math.floor(max);
  while(wasntfound) {
    //The maximum is exclusive and the minimum is inclusive
    var testint = Math.floor(Math.random() * (max - min)) + min;
    if(!testInt(inar, testint)){
      return testint;
    }
  }
}

function testInt(inar, int){
  return inar.find(function(i){
     return i === int;
  }) === undefined;
}

function handleReset(){
  $('.js-resetbutton').click(function(event){
    event.stopPropagation();
    resetQuiz(state);
  });
}

function handleStart(){
  $('.js-startbutton').click(function(){
    $(this).parent().hide();
    nextQuestion(state);
    renderQuestion(state,$('.questiontext'));
    renderAnswers(state, $('.answers'));
    updateQuestionCount(state);
    updateSuccessCount(state);
    $('.quizbox,.js-count').show();
  });
}
function handleAnswers(){
  $('.js-answers').on('click','.js-answer',function(event){
      var answer = $(this).text();
      checkAnswer(state, answer, $(this));
      updateSuccessCount(state);
  });
}

function handleNext(){
  $('.js-nextbutton').click(function(event) {
    event.stopPropagation();
    nextQuestion(state);
  });
}

$(function(){
  handleStart();
  handleReset();
  handleNext();
  handleAnswers();
});
