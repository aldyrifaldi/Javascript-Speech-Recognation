const microphone = document.querySelector('#microphone')
const content = document.querySelector('#content')

const SpeechRecognation = window.SpeechRecognition ||  window.webkitSpeechRecognition

const recognation = new SpeechRecognation()

recognation.continuous = false;
recognation.lang = 'id-ID';
recognation.interimResults = false;
recognation.maxAlternatives = 10    ;

recognation.onstart = () => {
    // microphone.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
    console.log('voice is activated, you can speak to microphone!')
}

recognation.onresult = (event) => {
    console.log(event);
    // microphone.innerHTML = '<i class="fas fa-microphone"></i>'
    const current = event.resultIndex
    const transcript = event.results[current][0].transcript

    content.textContent = transcript
    readOutLoud(transcript)
}


recognation.onaudiostart = (event) => {
    console.log('audio start',event);
}
recognation.continuous = (event) => {
    console.log('continue start',event);
}

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance()
    speech.text = message
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1

    window.speechSynthesis.speak(speech)
}


microphone.addEventListener('click', () => {
    recognation.start()
})
