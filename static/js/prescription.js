try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  // $('.no-browser-support').show();
  // $('.app').hide();
}

var _name = document.getElementById('name');
var _gender = document.getElementById('gender');
var _age = document.getElementById('age');
var symptoms = $('#symptoms');
var diagnosis = $('#diagnosis');
var medicines = $('#medicines');
var advices = $('#advices');
var instructions = $('#recording-instructions');
var noteContent = '';

var flags = [0,0,0,0,0,0,0]
// var flag_name = 0;
// var flag_gender = 0;
// var flag_age = 0;
// var flag_symptoms = 0, flag_diagnosis = 0, flag_medicines = 0, flag_advices = 0;



recognition.onstart = function() {
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');
  };
}


recognition.continuous = true;

recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far.
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {

    console.log(transcript)
    if(transcript.trim() == "name" || transcript.trim() == 'gender' || transcript.trim() == 'age' || transcript.trim() == 'symptoms' || transcript.trim() == 'diagnosis' || transcript.trim() == medicines || transcript.trim() == advices){
    }
    else{
      noteContent += transcript;
    }

    if(transcript.trim() == 'name'){
      noteContent = '';
      setflag(0);
    }
    if(transcript.trim() == 'gender'){
      noteContent = '';
      setflag(1);
    }
    if(transcript.trim() == 'age'){
      noteContent = '';
      setflag(2);
    }
    if(transcript.trim() == 'symptoms'){
      noteContent = '';
      setflag(3);
    }
    if(transcript.trim() == 'diagnosis'){
      noteContent = '';
      setflag(4);
    }
    if(transcript.trim() == 'medicines'){
      noteContent = '';
      setflag(5);
    }
    if(transcript.trim() == 'advices'){
      noteContent = '';
      setflag(6);
    }
    if(flags[0]){
      _name.value = noteContent;
    }
    if(flags[1]){
      if(noteContent.trim() == 'mail') noteContent = 'male';
      if(noteContent.trim() == 'male' || noteContent.trim() == 'female' || noteContent.trim() == 'transgender'){
        _gender.value = noteContent;
      }
    }
    if(flags[2]){
      if(noteContent.trim() == 'xx') noteContent = '20'
      if(!(isNaN(noteContent.trim())))
        _age.value = noteContent;
      else
        console.log('valid number plz')
    }
    if(flags[3]){
      symptoms.val(noteContent);
    }
    if(flags[4]){
      diagnosis.val(noteContent);
    }
    if(flags[5]){
      medicines.val(noteContent);
    }
    if(flags[6]){
      advices.val(noteContent);
    }
  }
};

$('#start-record-btn').on('click', function(e) {
  // if (noteContent.length) {
  //   noteContent += ' ';
  // }
  recognition.start();
});

function setflag(flag){
  for(let i=0; i<7; i++){
    if(i!=flag){
      flags[i] = 0;
    }
    else if(i == flag){
      flags[i] = 1;
    }
  }
}
