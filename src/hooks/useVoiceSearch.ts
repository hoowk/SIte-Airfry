import { useMemo, useRef, useState } from 'react'

type SpeechResultEvent = Event & { results: { [index: number]: { [index: number]: { transcript: string } } } }
type SpeechRecognitionInstance = { continuous: boolean; interimResults: boolean; lang: string; start: () => void; stop: () => void; onresult: ((event: SpeechResultEvent) => void) | null; onend: (() => void) | null; onerror: ((event: { error: string }) => void) | null }
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

export function useVoiceSearch(onTranscript: (value: string) => void, onComplete?: () => void) {
  const [state, setState] = useState<'idle' | 'listening' | 'processing' | 'success' | 'permission_denied' | 'microphone_error' | 'recognition_error' | 'unsupported'>('idle')
  const [transcript, setTranscript] = useState('')
  const recognition = useMemo(() => {
    const scope = window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }
    return scope.SpeechRecognition ?? scope.webkitSpeechRecognition
  }, [])
  const activeRecognition = useRef<SpeechRecognitionInstance | null>(null)
  const start = () => {
    if (!recognition) { setState('unsupported'); return }
    const instance = new recognition()
    activeRecognition.current = instance
    instance.continuous = false; instance.interimResults = false; instance.lang = 'pt-BR'
    instance.onresult = event => { const value = event.results[0]?.[0]?.transcript ?? ''; setState('processing'); setTranscript(value); onTranscript(value); onComplete?.(); setState('success') }
    instance.onerror = event => setState(event.error === 'not-allowed' ? 'permission_denied' : event.error === 'audio-capture' ? 'microphone_error' : 'recognition_error')
    instance.onend = () => { activeRecognition.current = null; setState(current => current === 'listening' ? 'idle' : current) }
    setState('listening'); try { instance.start() } catch { setState('microphone_error') }
  }
  const stop = () => { activeRecognition.current?.stop(); activeRecognition.current = null; setState('idle') }
  const messages: Record<typeof state, string> = { idle: 'Buscar por voz', listening: 'Ouvindo… toque para parar', processing: 'Processando voz…', success: 'Busca por voz concluída', permission_denied: 'Permita o microfone para buscar por voz', microphone_error: 'Não foi possível acessar o microfone', recognition_error: 'Não entendi. Tente novamente', unsupported: 'Busca por voz indisponível neste navegador' }
  return { supported: Boolean(recognition), state, listening: state === 'listening', transcript, message: messages[state], start, stop }
}
