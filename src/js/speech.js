var ID_SUBTITLES_CONTAINER = 'hatemile-subtitles-container';
var hatemileSubtitlesList = [];

function getSubtitlesContainer() {
    var subtitles = document.getElementById(ID_SUBTITLES_CONTAINER);

    if (!subtitles) {
        subtitles = document.createElement('div');
        subtitles.setAttribute('id', ID_SUBTITLES_CONTAINER);
        document.body.appendChild(subtitles);
    }

    return subtitles;
}

function addTextToSubtitlesContainer(text, lang) {
    var subtitles = getSubtitlesContainer();
    var paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(text));
    if (lang != null) {
        paragraph.setAttribute('lang', lang);
    }

    hatemileSubtitlesList.push({'text': text, 'lang': lang});
    subtitles.appendChild(paragraph);
}

function speechNextSubtitleText() {
    var subtitles = getSubtitlesContainer();

    subtitles.children[subtitles.children.length - 1].remove();
    setTimeout(function() {
        if (!window.speechSynthesis.speaking) {
            subtitles.remove();
        }
    }, 300);
}

window.speechSynthesis.__speak = window.speechSynthesis.speak;
window.speechSynthesis.speak = function(utterance) {
    utterance.addEventListener('start', function(event) {
        var target = event.target;

        var lang = null;
        if ((target.lang) && (target.lang != '')) {
            lang = target.lang;
        } else if ((target.voice.lang) && (target.voice.lang != '')) {
            lang = target.voice.lang;
        }

        addTextToSubtitlesContainer(target.text, lang);
    });

    utterance.addEventListener('end', function(event) {
        speechNextSubtitleText();
    });

    return this.__speak.apply(this, arguments);
}
