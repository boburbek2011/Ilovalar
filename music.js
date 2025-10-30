const songList = document.getElementById('songList');
const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');

// Default songs
let songs = [
    { name: 'Music1', src: '1.mp3' },
    { name: 'Music2', src: '2.mp3' },
    { name: 'Music3', src: '3.mp3' }
];

// Load songs from localStorage
const saved = JSON.parse(localStorage.getItem('songs'));
if (saved) songs = [...songs, ...saved];

// Display songs
function renderSongs() {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const div = document.createElement('div');
        div.className = 'song-item';
        div.textContent = song.name;
        div.onclick = () => playSong(index);
        songList.appendChild(div);
    });
}

function playSong(index) {
    audioPlayer.src = songs[index].src;
    audioPlayer.play();
}

// Handle file upload
fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    const newSongs = files.map(f => ({
        name: f.name,
        src: URL.createObjectURL(f)
    }));
    songs = [...songs, ...newSongs];
    localStorage.setItem('songs', JSON.stringify(newSongs));
    renderSongs();
});

renderSongs();

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
