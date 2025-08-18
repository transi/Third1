import { LightningElement } from 'lwc';

export default class TextToSpeech extends LightningElement {
    inputText = '';
    audioUrl;
    isConverting = false;

    handleInputChange(event) {
        this.inputText = event.target.value;
    }

    convertToSpeech() {
        if (!this.inputText.trim()) {
            console.error('Input text is empty or contains only whitespace.');
            return;
        }

        this.callOpenAIAPI();
    }

    async callOpenAIAPI() {
        const apiUrl = 'https://api.openai.com/v1/audio/speech';
        const apiKey = 'OPEN_AI_KEY'; // Replace with your actual OpenAI API key
        this.showHideSpinner(true);
        this.audioUrl = '';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'tts-1',
                    input: this.inputText,
                    voice: 'alloy',
                }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                this.audioUrl = audioUrl;
                this.showHideSpinner(false);
            } else {
                console.error('Failed to convert text to speech:', response.status, response.statusText);
                this.showHideSpinner(false);
            }
        } catch (error) {
            console.error('Error during text-to-speech conversion:', error);
            this.showHideSpinner(false);
        }
    }

    startPlaying() {
        const audioElement = this.template.querySelector('audio');
        if (audioElement) {
            audioElement.play();
        }
    }

    showHideSpinner(bool) {
        this.isConverting = bool;
    }
}
