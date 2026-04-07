const audio = document.getElementById("bgm");
const player = document.getElementById("player");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const vol = document.getElementById("vol");

audio.volume = vol.value / 100;

/* album art assumption:
   ripped FLAC has matching image next to it */
cover.src = audio.src.replace(/\.flac$/i, ".jpg");

/* controls */
play.onclick = () => audio.play();
pause.onclick = () => audio.pause();
vol.oninput = e => audio.volume = e.target.value / 100;

/* draggable */
let drag=false,ox=0,oy=0;
player.addEventListener("pointerdown",e=>{
if(e.target.tagName==="INPUT")return;
drag=true;
const r=player.getBoundingClientRect();
ox=e.clientX-r.left;
oy=e.clientY-r.top;
player.setPointerCapture(e.pointerId);
});
document.addEventListener("pointermove",e=>{
if(!drag)return;
player.style.left=e.clientX-ox+"px";
player.style.top=e.clientY-oy+"px";
player.style.right="auto";
});
document.addEventListener("pointerup",()=>{
drag=false;
});

/* sync volume slider w/main */
audio.addEventListener("volumechange",()=>{
vol.value = Math.round(audio.volume * 100);
});
