const Q=[
{q:"The part of a computing system that manages all hardware and software.",a:"operatingsystem"},
{q:"The component of a computer system that refers to the physical machine.",a:"hardware"},
{q:"The operating system manager responsible for controlling RAM.",a:"memorymanager"},
{q:"The operating system manager that decides how the CPU is allocated.",a:"processormanager"},
{q:"The manager that keeps track of files and enforces access rules.",a:"filemanager"}
];

let i=0,score=0,lock=false,log=[];
const qNum=document.getElementById("qNum"),
qTotal=document.getElementById("qTotal"),
qText=document.getElementById("qText"),
ans=document.getElementById("answer"),
fb=document.getElementById("feedback"),
skip=document.getElementById("skip"),
check=document.getElementById("check"),
res=document.getElementById("result"),
scoreEl=document.getElementById("score"),
review=document.getElementById("review");

qTotal.textContent=Q.length;
render();

function norm(s){return s.toLowerCase().replace(/\s+/g,"")}

function render(){
lock=false;
fb.className="feedback hidden";
ans.value="";
qNum.textContent=i+1;
qText.textContent=Q[i].q;
setTimeout(()=>ans.focus(),0);
}

check.onclick=()=>{
if(lock)return;
lock=true;
if(norm(ans.value)==Q[i].a){
score++;
log.push({q:Q[i].q,u:ans.value,c:Q[i].a});
next();
}else{
fb.className="feedback bad";
fb.textContent="Wrong. Correct answer required or Skip.";
lock=false;
}
};

skip.onclick=()=>{
if(lock)return;
lock=true;
log.push({q:Q[i].q,u:ans.value,c:Q[i].a});
next();
};

function next(){
i++;
if(i<Q.length)render();
else finish();
}

function finish(){
res.classList.remove("hidden");
scoreEl.textContent=`Score: ${score} / ${Q.length}`;
review.innerHTML="";
log.forEach((r,n)=>{
review.innerHTML+=`<p>${n+1}. ${r.q}<br>Your answer: ${r.u||"(blank)"}<br>Correct: ${r.c}</p>`;
});
}
