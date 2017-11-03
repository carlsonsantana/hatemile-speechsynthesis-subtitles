var a = new SpeechSynthesisUtterance();
a.text = 'Um texto muito grante para ser falado';
a.voice = speechSynthesis.getVoices()[21];
speechSynthesis.speak(a);

var b = new SpeechSynthesisUtterance();
b.text = 'E pior ainda para ser repetido';
b.voice = speechSynthesis.getVoices()[21];
speechSynthesis.speak(b);
