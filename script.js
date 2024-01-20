//initialize variables
let songIndex = 0;
let audioElement = new Audio("song/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let previousBtn = document.getElementById("masterPreviousBtn");
let nextBtn = document.getElementById("masterNextBtn");
let masterSongName = document.getElementById("masterSongName");
let artist = 'ColdPlay';


let songs = [
    {songName: 'Dont Panic', filepath: "song/1.mp3", coverPath: "cover1.png", duration: "2:17"},
    {songName: 'Shiver', filepath: "song/2.mp3", coverPath: "cover1.png", duration: "5:05" },
    {songName: "Spies", filepath: "song/3.mp3", coverPath: "cover1.png", duration: "5:19"},
    {songName: 'Sparks', filepath: "song/4.mp3", coverPath: "cover1.png", duration: "3:48"},
    {songName: 'Yellow', filepath: "song/5.mp3", coverPath: "cover1.png", duration: "4:27"},
    {songName: 'Trouble', filepath: "song/6.mp3", coverPath: "cover1.png", duration: "4:34"},
    {songName: 'Parachutes', filepath: "song/7.mp3", coverPath: "cover1.png", duration: "0:47"},
    {songName: 'High Speed', filepath: "song/8.mp3", coverPath: "cover1.png", duration: "4:17"},
    {songName: 'We Never Change', filepath: "song/9.mp3", coverPath: "cover1.png", duration: "4:10"}
];

//handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=> {
   //update seekbar
   let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
   myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

songItems.forEach((e, i) => {
    e.getElementsByTagName("img")[0].src = songs[i].coverPath;
    e.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    e.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
});

const makeAllPlays = (id) => {
    songItemPlay.forEach((e) => {
        if(e.id != id) {
            e.classList.remove('fa-pause-circle');
            e.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    });
}

function tog(s, sound) {
    if(s.target.classList.contains('fa-pause-circle')){
        s.target.classList.remove('fa-pause-circle');
        s.target.classList.add('fa-play-circle');
        sound.pause();
        gif.style.opacity = 0;
    } else {
        s.target.classList.remove('fa-play-circle');
        s.target.classList.add('fa-pause-circle');
        sound.play();
        gif.style.opacity = 1;
    }
}

songItemPlay.forEach((e) => {
    e.addEventListener('click', (s) => {
        songIndex = parseInt(s.target.id);
        audioElement.src = `song/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName + " - " + artist;
        audioElement.currentTime = 0;
        tog(s, audioElement);
        makeAllPlays(e.id);
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

previousBtn.addEventListener('click', () => {
    if(songIndex <= 1) {
        songIndex = 8;
    } else {
        songIndex--;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName + " - " + artist;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

nextBtn.addEventListener('click', () => {
    if(songIndex >= 8) {
        songIndex = 1;
    } else {
        songIndex++;
    }
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName + " - " + artist;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});