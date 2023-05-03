//Getting All elemets
let masterPlay = document.getElementById('masterPlay')
let gif =document.getElementById('gif')
let myProgressBar = document.getElementById('myProgressBar')
let previous = document.getElementById('previous')
let next = document.getElementById('next')
let songItems = document.getElementsByClassName('songItems')
let playingSong = document.getElementById('playingSong')
let plays = Array.from(document.getElementsByClassName('plays'))
let songIndex = 0; 
let audioElement = new Audio('./songs/1.mp3')


//songs
let songs = [
    {songName:"Warriyo - Mortals [NCS Release]",filePath:"songs/1.mp3"},
    {songName:"Cielo - Huma-Huma",filePath:"songs/2.mp3"},
    {songName:"DEAF KEV - Invincible [NCS Release]-320k",filePath:"songs/3.mp3"},
    {songName:"Heaven & EH!DE - My Heart [NCS Release]",filePath:"songs/4.mp3"},
    {songName:"Janji-Heroes-Tonight-feat-Johnning-NCS-Release",filePath:"songs/5.mp3"},
    {songName:"Ascence - About You [NCS Release]",filePath:"songs/6.mp3"},
    {songName:"VERB & 22 Void Beats",filePath:"songs/7.mp3"},
    {songName:"Ek Jindari meri",filePath:"songs/8.mp3"},
    {songName:"Alan Walker - Dreamer [NCS Release]",filePath:"songs/9.mp3"},
    {songName:"Jéja - Bad Habit (ft. Zaug) [NCS Release]",filePath:"songs/10.mp3"}
]

//Showing the name of songs
Array.from(songItems).forEach((element,index)=>{
    element.getElementsByClassName('name')[0].innerText = songs[index].songName;
})

//Handel play/pause of masterPlay
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        gif.style.opacity=1
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    }
    else{
        audioElement.pause();
        gif.style.opacity=0
        masterPlay.classList.remove('fa-pause-circle')        
        masterPlay.classList.add('fa-play-circle')
    }
})

//ProgressBar Update according to song
audioElement.addEventListener("timeupdate",()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress)
    myProgressBar.value = progress;
})

//Song Update according to ProgressBar  
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

//Making all plays
const makingAllPlays = ()=>{
    Array.from(plays).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle")
    })
}

// Play/Pause songs when small play buttion is clicked
Array.from(plays).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makingAllPlays();
        songIndex = parseInt(e.target.id)
        playingSong.innerHTML = songs[songIndex].songName;
        if(audioElement.paused || audioElement.currentTime <= 0){
            audioElement.src = `songs/${songIndex+1}.mp3`                
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }else {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    })
})

//Next Button
next.addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }else{
        songIndex+=1;
    }

    audioElement.src=`songs/${songIndex+1}.mp3`;
    playingSong.innerHTML = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    makingAllPlays();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1
})

//Previous button
previous.addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }else{
        songIndex-=1;
    }
// console.log(songIndex)

audioElement.src=`songs/${songIndex+1}.mp3`;
playingSong.innerHTML = songs[songIndex].songName;
audioElement.currentTime=0;
    audioElement.play();
    makingAllPlays();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1
})