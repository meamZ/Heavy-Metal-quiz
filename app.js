var state = {
  questions: [{question: 'When was Metallica formed?',
              answers: ['1981','1977','1985', '1979'],
              correctanswer: '1981',
              wasasked: false,
              },
              {question: 'Who is currently a Guns and Roses member?',
              answers: ['Richard Fortus','Robin Finck','DJ Ashba','Tommy Stinson'],
              correctanswer: 'Richard Fortus',
              wasasked: false,
              },
              {question: 'What is NOT a Slipknot song?',
              answers: ['My Nemesis','Duality','Surfacing','Eyeless'],
              correctanswer: 'My Nemesis',
              wasasked: false,
              },
              {question: 'When was the Album "Way of the fist" by Five Finger Death Punch released?',
              answers: ['2007','2001','2014','2004',],
              correctanswer: '2007',
              wasasked: false,
              },
              {question: 'In which Band does Zoltan Bathory play?',
              answers: ['Five Finger Death Punch','Slipknot','System of a Down','Disturbed'],
              correctanswer: 'Five Finger Death Punch',
              wasasked: false,
              },
              {question: 'On which Album was "Numb" by Linkinpark?',
              answers: ['Meteora','The Hunting Party','Hybrid Theory','One More Light'],
              correctanswer: 'Meteora',
              wasasked: false,
              },
              {question: 'Whats the name of the current Metallica bassist?',
              answers: ['Rob Trujillo','Chris Kael','Lars Ulrich','Dave Farell'],
              correctanswer: 'Rob Trujillo',
              wasasked: false,
              },
              {question: 'What is the second Motörhead Album?',
              answers: ['Overkill','Iron Fist','Ace of spades','Bomber'],
              correctanswer: 'Overkill',
              wasasked: false,
              },
              {question: 'When was "The Number of the Beast" released?',
              answers: ['1982','1990','1980','1978'],
              correctanswer: '1982',
              wasasked: false,
              },
              {question: ' Which was the first Megadeath album that made it into the Top 10 of the Billboard Charts?',
              answers: ['Countdown to Extinction','Peace Sells... but Who`s Buying?','The World Needs a Hero','Youthanasia'],
              correctanswer: 'Countdown to Extinction',
              wasasked: false,
            }],
currentquestionindex: -1,
correctchildnr = -1,
questioncounter: 0,
correctcounter: 0,
incorrectcounter: 0,
maxquestions: 5,
            };
//state modification functions
function setCurrentQuestionIndex(state, questionindex){
  state.currentquestionindex = questionindex;
}

function incQuestionCounter(state){
  state.questioncounter += 1;
}

function incCorrectCounter(state){
  state.questioncounter += 1;
}

function incIncorrectCounter(state){
  state.questioncounter += 1;
}

function checkAnswer(state, answer){
  return state.questions[state.currentquestionindex] === answer;
}

function resetQuiz(state){
  state.currentquestionindex= -1;
  state.questioncounter= 0;
  state.correctcounter= 0;
  state.incorrectcounter= 0;
}

function updateQuestionCount(state){
  $('.js-questioncount').text('Question '+state.questioncounter+' of '+state.maxquestions);
}
function updateSuccessCount(state){
  $('js-correctcount').text(state.correctcounter+' correct, '+state.incorrectcounter+' incorrect');
}

function renderQuestion(question){

}

function renderAnswers(answers){

}

function handleStart(){
  $('.js-startbutton').click(function(){
    $(this).parent().addClass('hidden');
    nextQuestion(state.questions);
    updateQuestionCount(state);
    $('.quizbox,.js-count').removeClass('hidden');
  });
}
function handleAnswers(){
  $('.answers').on('click','.js-answer',function(event){
      event.stopPropagation();
      var answer = $(this).find('.js-answer').text();
      if(checkAnswer(state, answer)){
        $(this).addClass('answer-right');
      } else{
        $(this).addClass('answer-wrong');
        $(this).parent().find()
      }
  });
}

function handleNext(){

}

function nextQuestion(questions){

}

$(function(){
  handleStart();
  handleAnswers();
});
