// Step 1: Web Audio Synthesis Engine for OS Boot chime
function playBootSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Quick synthesizer harmony engine chime
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 chord progression
    notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Stagger note triggers for arpeggio startup execution
        const startTime = ctx.currentTime + (index * 0.12);
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 1.2);
    });
}

// Step 2: System Boot Sequence Lifecycle Execution
window.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('boot-status');
    
    // Stepwise visual execution timeline
    setTimeout(() => { statusText.innerText = "Loading Kernel Subsystems..."; }, 1000);
    setTimeout(() => { statusText.innerText = "Mounting Virtual Desktop Filesystems..."; }, 2200);
    
    setTimeout(() => {
        // Play Chime Audio and drop boot state screen
        playBootSound();
        document.getElementById('boot-screen').classList.remove('operational-state');
        document.getElementById('login-screen').classList.add('operational-state');
    }, 3500);
});

// Step 3: Authorization Interface Interceptor
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Accept empty entry or any mock password for standard usability
    document.getElementById('login-screen').classList.remove('operational-state');
    document.getElementById('desktop-screen').classList.add('operational-state');
    initClock();
});

// Step 4: Taskbar System Clock Interface Sync Loop
function initClock() {
    const clockElement = document.getElementById('live-clock');
    setInterval(() => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // execution mapping for 0 to 12 conversion
        clockElement.innerText = `${hours}:${minutes} ${ampm}`;
    }, 1000);
}
