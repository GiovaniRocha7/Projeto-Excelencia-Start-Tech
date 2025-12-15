// ========== CONFIGURAÇÕES ==========
const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/api',
    ENDPOINTS: {
        START_INTERVIEW: '/interview/start',
        SEND_AUDIO: '/interview/audio',
        END_INTERVIEW: '/interview/end',
        GET_SIMULATIONS: '/interview/simulations'
    },
    TEST_MODE: true // Modo de teste - sem câmera necessária
};

// ========== ELEMENTOS DO DOM ==========
const setupOverlay = document.getElementById('setupOverlay');
const setupModal = document.getElementById('setupModal');
const interviewMain = document.getElementById('interviewMain');
const videoContainer = document.getElementById('videoContainer');
const localVideo = document.getElementById('localVideo');
const startInterviewBtn = document.getElementById('startInterviewBtn');
const newSimulationBtn = document.getElementById('newSimulationBtn');
const backHomeBtn = document.getElementById('backHomeBtn');
const professionalAreaSelect = document.getElementById('professionalArea');
const difficultySelect = document.getElementById('difficulty');
const durationSelect = document.getElementById('duration');
const evaluationTypeSelect = document.getElementById('evaluationType');

// Video controls
const toggleAudioBtn = document.getElementById('toggleAudioBtn');
const toggleVideoBtn = document.getElementById('toggleVideoBtn');
const endCallBtn = document.getElementById('endCallBtn');
const toggleChatBtn = document.getElementById('toggleChatBtn');
const chatPanel = document.getElementById('chatPanel');
const closeChatBtn = document.getElementById('closeChatBtn');
const transcriptArea = document.getElementById('transcriptArea');
const timerDisplay = document.getElementById('timerDisplay');
const aiState = document.getElementById('aiState');
const simulationHistory = document.getElementById('simulationHistory');
const chatInput = document.getElementById('chatInput');
const chatInputForm = document.getElementById('chatInputForm');

// ========== ESTADO DA APLICAÇÃO ==========
let mediaStream = null;
let audioContext = null;
let mediaRecorder = null;
let isAudioEnabled = true;
let isVideoEnabled = true;
let interviewStartTime = null;
let timerInterval = null;
let currentSimulationId = '1';
let transcriptMessages = [];
let currentSettings = {
    area: '',
    difficulty: '',
    duration: 0,
    evaluationType: ''
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    startInterviewBtn.addEventListener('click', handleStartInterview);
    newSimulationBtn.addEventListener('click', showSetupModal);
    backHomeBtn?.addEventListener('click', goBackHome);
    toggleChatBtn?.addEventListener('click', toggleChat);
    closeChatBtn.addEventListener('click', closeChat);
    endCallBtn.addEventListener('click', endInterview);
    toggleAudioBtn.addEventListener('click', toggleAudio);
    toggleVideoBtn.addEventListener('click', toggleVideo);
    simulationHistory.addEventListener('click', handleSimulationClick);
    chatInputForm.addEventListener('submit', sendTranscriptMessage);
}

/* =============================================== */
/* ========== MODAL DE SETUP - INÍCIO ========== */
/* =============================================== */

// ========== SETUP MODAL ==========
function showSetupModal() {
    setupOverlay.style.display = 'flex';
    interviewMain.style.display = 'none';
}

async function handleStartInterview() {
    // Validar seleções
    if (!professionalAreaSelect.value) {
        alert('Por favor, selecione uma área profissional');
        return;
    }

    // Armazenar configurações
    currentSettings = {
        area: professionalAreaSelect.value,
        difficulty: difficultySelect.value,
        duration: parseInt(durationSelect.value),
        evaluationType: evaluationTypeSelect.value
    };

    try {
        // Se estiver em modo de teste, pular acesso à câmera
        if (API_CONFIG.TEST_MODE) {
            console.log('Modo de teste ativado - câmera simulada');
            // Criar um canvas como substituto para a câmera
            const canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            const ctx = canvas.getContext('2d');
            
            // Preencher com cor escura
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Adicionar texto
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Modo de Teste - Câmera Simulada', canvas.width / 2, canvas.height / 2);
            
            // Converter para stream
            const stream = canvas.captureStream(30);
            mediaStream = stream;
            localVideo.srcObject = stream;
        } else {
            // Solicitar acesso à câmera e microfone normalmente
            mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: true
            });

            // Configurar vídeo
            localVideo.srcObject = mediaStream;
        }

        // Configurar áudio
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        mediaRecorder = new MediaRecorder(mediaStream);
        setupMediaRecorder();

        // Esconder modal e mostrar vídeo
        setupOverlay.style.display = 'none';
        interviewMain.style.display = 'flex';
        videoContainer.style.display = 'flex';

        // Iniciar entrevista
        await startInterview();

    } catch (error) {
        console.error('Erro ao acessar câmera/microfone:', error);
        console.log('Tentando modo de teste como fallback...');
        
        // Fallback: usar modo de teste mesmo assim
        API_CONFIG.TEST_MODE = true;
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ff6b6b';
            ctx.font = 'bold 36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('⚠️ Modo de Teste', canvas.width / 2, canvas.height / 2 - 50);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px Arial';
            ctx.fillText('Câmera não disponível - Continuando em modo teste', canvas.width / 2, canvas.height / 2 + 50);
            
            const stream = canvas.captureStream(30);
            mediaStream = stream;
            localVideo.srcObject = stream;

            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            mediaRecorder = new MediaRecorder(mediaStream);
            setupMediaRecorder();

            setupOverlay.style.display = 'none';
            interviewMain.style.display = 'flex';
            videoContainer.style.display = 'flex';

            await startInterview();
        } catch (fallbackError) {
            console.error('Erro no fallback de teste:', fallbackError);
        }
    }
}

/* =============================================== */
/* ========== MODAL DE SETUP - FIM ============= */
/* =============================================== */

// ========== ENTREVISTA ==========
async function startInterview() {
    try {
        interviewStartTime = Date.now();
        startTimer();

        // Iniciar gravação de áudio
        if (mediaRecorder) {
            mediaRecorder.start();
        }

        // Enviar evento para API
        await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.START_INTERVIEW}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                simulationId: currentSimulationId,
                settings: currentSettings
            })
        }).catch(err => console.error('Erro ao iniciar entrevista na API:', err));

        // Adicionar primeiro mensagem da IA
        addTranscriptMessage(
            'ExcelencIA',
            `Olá! Bem-vindo à simulação de entrevista para ${currentSettings.area}. Vou fazer algumas perguntas de nível ${currentSettings.difficulty}. Quando estiver pronto, pode começar respondendo.`,
            'ai'
        );
        updateAIState('Aguardando resposta');

    } catch (error) {
        console.error('Erro ao iniciar entrevista:', error);
    }
}

async function endInterview() {
    try {
        // Parar timer
        if (timerInterval) clearInterval(timerInterval);

        // Parar gravação
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }

        // Parar stream
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }

        // Enviar evento para API
        await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.END_INTERVIEW}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                simulationId: currentSimulationId,
                duration: Math.floor((Date.now() - interviewStartTime) / 1000),
                settings: currentSettings
            })
        }).catch(err => console.error('Erro ao encerrar entrevista:', err));

        // Resetar interface
        setupModal.style.display = 'flex';
        videoContainer.style.display = 'none';
        chatPanel.classList.remove('open');
        transcriptArea.innerHTML = '';
        transcriptMessages = [];

    } catch (error) {
        console.error('Erro ao encerrar entrevista:', error);
    }
}

// ========== TIMER ==========
function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - interviewStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// ========== CONTROLES DE MÍDIA ==========
function toggleAudio() {
    const audioTracks = mediaStream.getAudioTracks();
    if (audioTracks.length > 0) {
        isAudioEnabled = !isAudioEnabled;
        audioTracks[0].enabled = isAudioEnabled;
        
        toggleAudioBtn.classList.toggle('active', !isAudioEnabled);
        toggleAudioBtn.innerHTML = isAudioEnabled 
            ? '<i class="fas fa-microphone"></i>' 
            : '<i class="fas fa-microphone-slash"></i>';
    }
}

function toggleVideo() {
    const videoTracks = mediaStream.getVideoTracks();
    if (videoTracks.length > 0) {
        isVideoEnabled = !isVideoEnabled;
        videoTracks[0].enabled = isVideoEnabled;
        
        toggleVideoBtn.classList.toggle('active', !isVideoEnabled);
        toggleVideoBtn.innerHTML = isVideoEnabled 
            ? '<i class="fas fa-video"></i>' 
            : '<i class="fas fa-video-slash"></i>';
    }
}

function toggleChat() {
    chatPanel.classList.toggle('open');
    toggleChatBtn.classList.toggle('active');
}

function closeChat() {
    chatPanel.classList.remove('open');
    toggleChatBtn.classList.remove('active');
}

// ========== ANÁLISE FACIAL ==========
function updateFacialAnalysis(confidence, clarity) {
    document.getElementById('confidenceBar').style.width = `${confidence}%`;
    document.getElementById('clarityBar').style.width = `${clarity}%`;
}

// Simular atualização de análise a cada 2 segundos
setInterval(() => {
    const confidence = Math.random() * 100;
    const clarity = Math.random() * 100;
    updateFacialAnalysis(confidence, clarity);
}, 2000);

// ========== TRANSCRIÇÃO ==========
function addTranscriptMessage(speaker, text, type = 'ai') {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `transcript-item ${type}`;
    messageDiv.innerHTML = `
        <div class="transcript-speaker">${speaker}</div>
        <div class="transcript-text">${escapeHtml(text)}</div>
        <div class="transcript-time">${timestamp}</div>
    `;
    
    transcriptArea.appendChild(messageDiv);
    transcriptArea.scrollTop = transcriptArea.scrollHeight;

    transcriptMessages.push({ speaker, text, type, timestamp });
}

function sendTranscriptMessage(e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    
    if (message) {
        addTranscriptMessage('Você', message, 'user');
        chatInput.value = '';
    }
}

// ========== MEDIA RECORDER ==========
function setupMediaRecorder() {
    const audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
        // Apenas adicionar se houver áudio real (não em modo teste puro)
        if (e.data.size > 0) {
            audioChunks.push(e.data);
        }
    };

    mediaRecorder.onstop = async () => {
        // Apenas enviar se houver áudio real
        if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            await sendAudioToAPI(audioBlob);
        } else {
            console.log('Modo teste - sem áudio real para enviar');
        }
    };
}

async function sendAudioToAPI(audioBlob) {
    try {
        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('simulationId', currentSimulationId);
        formData.append('settings', JSON.stringify(currentSettings));

        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEND_AUDIO}`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.aiResponse) {
                addTranscriptMessage('ExcelencIA', data.aiResponse, 'ai');
                updateAIState('Aguardando resposta');
            }
        }
    } catch (error) {
        console.error('Erro ao enviar áudio:', error);
    }
}

// ========== SIMULAÇÕES ==========
function handleSimulationClick(e) {
    const item = e.target.closest('.simulation-item');
    if (item) {
        document.querySelectorAll('.simulation-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        currentSimulationId = item.dataset.simulationId;
    }
}

// ========== ESTADO DA IA ==========
function updateAIState(state) {
    aiState.textContent = state;
}

// ========== VOLTAR PARA HOME ==========
function goBackHome() {
    if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
    if (timerInterval) clearInterval(timerInterval);
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    window.location.href = '/html/homeLogin.html';
}

// ========== UTILITÁRIOS ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
