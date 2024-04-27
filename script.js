console.log("Welcome to Spotify");

// Declaration of the variables
let songIndex = 0;
let res = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let songItemPlays = document.getElementsByClassName('songItemPlay'); 
let myProcessBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songs = [
    { songName: "Darkside", filePath: "songs/1.mp3", coverPage: "cover/cp1.jpg" },
    { songName: "Woh din", filePath: "songs/2.mp3", coverPage: "cover/cp2.jpg" },
    { songName: "Baarishein", filePath: "songs/3.mp3", coverPage: "cover/cp3.jpg" },
    { songName: "Pal", filePath: "songs/4.mp3", coverPage: "cover/cp4.jpg" },
    { songName: "Faasle", filePath: "songs/5.mp3", coverPage: "cover/cp5.jpg" },
    { songName: "Long Time No See", filePath: "songs/6.mp3", coverPage: "cover/cp6.jpg" },
    { songName: "Thousand Years", filePath: "songs/7.mp3", coverPage: "cover/cp7.jpg" }
];

// Event Listeners
masterPlay.addEventListener("click", () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.setAttribute("src", "pau.svg");
        document.getElementsByClassName('songItemPlay')[songIndex].setAttribute('src', 'pau1.jpg');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.setAttribute("src", "plyic.svg");
        Array.from(songItemPlays).forEach(item => item.src = "ply1.jpg");
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProcessBar.value = progress;
});

myProcessBar.addEventListener("change", () => {
    audioElement.currentTime = audioElement.duration * myProcessBar.value / 100;
});

// Display song items
Array.from(document.getElementsByClassName('songItems')).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPage;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play song on click
Array.from(document.querySelectorAll('.songItemPlay')).forEach((element, i) => { 
    element.addEventListener('click', () => {
        makeAllPlays();
        songIndex = i; 
        ssg = songIndex; 
        Array.from(songItemPlays).forEach(item => item.src = "ply1.jpg"); 
        element.src = "pau1.jpg";
        audioElement.src = songs[songIndex].filePath; 
        masterSongName.innerText = songs[ssg].songName;
        masterPlay.setAttribute("src", "pau.svg");
        audioElement.play();
        gif.style.opacity = 1;
    });
});

// Next song button
document.querySelector('.next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.setAttribute("src", "pau.svg");
    Array.from(songItemPlays).forEach(item => item.src = "ply1.jpg"); 
    document.getElementsByClassName('songItemPlay')[songIndex].setAttribute('src', 'pau1.jpg');
    makeAllPlays();
});

// Previous song button
document.querySelector('.previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.setAttribute("src", "pau.svg");
    Array.from(songItemPlays).forEach(item => item.src = "ply1.jpg"); 
    document.getElementsByClassName('songItemPlay')[songIndex].setAttribute('src', 'pau1.jpg');
    makeAllPlays();
});



// Function to set all play icons
const makeAllPlays = () => {
    Array.from(songItemPlays).forEach((element) => {
        element.src = "ply1.jpg";
    });
};
document.querySelectorAll('.songItemPlay').forEach(element => {
    element.addEventListener('click', event => {
        const clickedId = event.target.id;
        console.log("Clicked ID:", clickedId);
    });
});
