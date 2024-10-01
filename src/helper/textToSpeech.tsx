import tingtung from "../assets/audio/tingtung.mp3"
export default function textToSpeech(text: string) {
    const synth = window.speechSynthesis
    try {
        const utterance: SpeechSynthesisUtterance =
            new SpeechSynthesisUtterance(text)
        const voices = speechSynthesis.getVoices()

        const voice = voices.find((v) => v.name === "Google Bahasa Indonesia")
        console.log(voice)
        if (voice) {
            utterance.voice = voice

            utterance.rate = 0.9
            utterance.pitch = 1
            utterance.volume = 1
            const audio = new Audio(tingtung)
            audio.play()
            setTimeout(() => {
                synth.speak(utterance)
            }, 2400)
        }
    } catch (error) {
        console.log(error)
    }
}
