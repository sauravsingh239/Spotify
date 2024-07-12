// console.log("hello");
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('Master-play');
let myProgressBar=document.getElementById('myProgress');
let gif=document.querySelector('#gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemplay = Array.from(document.getElementsByClassName('songItemplay'));
let songNamedown = document.getElementById('songNamedown');
let songlistplay = document.getElementsByClassName('songlistplay');
let timestamp = document.getElementsByClassName('timestamp');

let songs=[
    {songName:"baby Justin-beiber",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"kaise hua",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    { songName:"bekhayali",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"shape of you",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Love Me Like You",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"cheap-thrills",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
]


masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        songNamedown.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        songItemplay[songIndex].classList.remove('fa-circle-play');
        songItemplay[songIndex].classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        songItemplay[songIndex].classList.remove('fa-circle-pause');
        songItemplay[songIndex].classList.add('fa-circle-play');
        gif.style.opacity=-1;

    }
})

audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})


songItem.forEach((e, i) => {
    // console.log(e, i);
    e.getElementsByTagName("img")[0].src = songs[i].coverPath;
    e.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
    // songNamedown.innerHTML = songs[i].songName;
    // e.getElementById("songNamedown").innerHTML = songs[i].songName;
})


const makeAllplay = () => {
    songItemplay.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    })
}

songItemplay.forEach((element) => {
    element.addEventListener("click", (e) => {
        // console.log(e.target);
        makeAllplay();        
        songIndex = parseInt(e.target.id);       
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        songNamedown.innerText = songs[songIndex].songName;
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause'); 
    })
})




document.getElementById('next').addEventListener("click", () => {
    if (songIndex >= 5) {
        songItemplay[songIndex].classList.remove('fa-circle-pause');
        songItemplay[songIndex].classList.add('fa-circle-play');
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    // songIndex.classList.remove('fa-circle-play');
    // songIndex.classList.add('fa-circle-pause');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songNamedown.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    songItemplay[songIndex].classList.remove('fa-circle-play');
    songItemplay[songIndex].classList.add('fa-circle-pause');
    songItemplay[songIndex-1].classList.remove('fa-circle-pause');
    songItemplay[songIndex-1].classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('prev').addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songNamedown.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    songItemplay[songIndex].classList.remove('fa-circle-play');
    songItemplay[songIndex].classList.add('fa-circle-pause');
    songItemplay[songIndex + 1].classList.remove('fa-circle-pause');
    songItemplay[songIndex + 1].classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})