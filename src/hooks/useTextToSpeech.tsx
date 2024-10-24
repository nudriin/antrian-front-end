import { useEffect, useState } from "react"
import tingtung from "../assets/audio/tingtung.mp3"

// Fungsi text-to-speech untuk Bahasa Indonesia
export const textToSpeech = (text: string) => {
    // Cek apakah browser mendukung Web Speech API
    if ("speechSynthesis" in window) {
        // Hentikan speech yang sedang berjalan (jika ada)
        window.speechSynthesis.cancel()

        // Buat instance utterance baru
        const utterance = new SpeechSynthesisUtterance(text)

        // Dapatkan daftar suara yang tersedia
        const voices = window.speechSynthesis.getVoices()

        // Cari suara bahasa Indonesia
        const indonesianVoice = voices.find(
            (voice) =>
                voice.lang.toLowerCase().includes("id") || // Mencari suara dengan kode 'id' (Indonesia)
                voice.lang.toLowerCase().includes("ID") // Alternatif kode bahasa
        )

        // Konfigurasi utterance
        utterance.voice = indonesianVoice || voices[0] // Gunakan suara Indonesia jika tersedia, jika tidak gunakan default
        utterance.lang = "id-ID" // Set bahasa ke Indonesia
        utterance.rate = 1.0 // Kecepatan bicara (1.0 adalah normal)
        utterance.pitch = 1.0 // Nada suara (1.0 adalah normal)
        utterance.volume = 1.0 // Volume (0.0 sampai 1.0)

        // Mainkan audio tingtung terlebih dahulu
        return new Promise((resolve, reject) => {
            const audio = new Audio(tingtung)

            // Event handler ketika audio selesai diputar
            audio.onended = () => {
                // Setelah audio selesai, jalankan text-to-speech
                window.speechSynthesis.speak(utterance)

                // Event handlers untuk text-to-speech
                utterance.onend = () => resolve(true)
                utterance.onerror = () =>
                    reject(new Error("Speech synthesis failed"))
            }

            // Event handler jika audio gagal dimainkan
            audio.onerror = () => {
                reject(new Error("Audio playback failed"))
            }

            // Mulai memainkan audio
            audio.play().catch((error) => {
                console.error("Error playing audio:", error)
                // Jika audio gagal, tetap jalankan text-to-speech
                window.speechSynthesis.speak(utterance)
            })
        })
    } else {
        console.error("Browser tidak mendukung Web Speech API")
        return Promise.reject(
            new Error("Browser tidak mendukung Web Speech API")
        )
    }
}

// Hook untuk memastikan voices sudah dimuat
export const useTextToSpeech = () => {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const checkVoices = () => {
            const voices = window.speechSynthesis.getVoices()
            if (voices.length > 0) {
                setIsReady(true)
            }
        }

        // Check voices pertama kali
        checkVoices()

        // Event listener untuk perubahan voices
        window.speechSynthesis.onvoiceschanged = checkVoices

        return () => {
            window.speechSynthesis.onvoiceschanged = null
        }
    }, [])

    return { isReady, textToSpeech }
}
