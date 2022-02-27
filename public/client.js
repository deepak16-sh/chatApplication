const socket=io();
console.log('hy');
const form=document.querySelector('#send');
const messageinput=document.querySelector(".messageinput");
const container=document.querySelector('.container');
let nameuser;
do{
     nameuser=prompt("Enter your name to join");
}while(!nameuser);
 function append(msg,position){
    const element=document.createElement('div');
    element.innerHTML=`<h4>${msg.user}</h4>
                       <p>${msg.message}</p>`;
    element.classList.add("message");
    element.classList.add(position);
    container.append(element);
}
function appendJoined(msg,position){
    const element=document.createElement('div');
    element.innerHTML=`<h2 class="joined">${msg} joined the chat</h4>`;
    element.classList.add("message");
    element.classList.add(position);
    container.append(element);
}
function appendLeaved(msg,position){
    const element=document.createElement('div');
    element.innerHTML=`<h2 class="leaved">${msg} Leaved the chat</h4>`;
    element.classList.add("message");
    element.classList.add(position);
    container.append(element);
}

function sendmsg(msg){
    let Leftmssg={
        user:nameuser,
        message:msg.trim()
    }
    let Rightmssg={
        user:"You",
        message:msg.trim()
    }
    append(Rightmssg,'right');
    scroll();
    socket.emit('send',Leftmssg);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    if(message){
        sendmsg(message);
    }
    messageinput.value="";
})
socket.emit('new-user-joined',nameuser);
socket.on('user-joined',name=>{
    appendJoined(name,'left');
})
socket.on('recieve',message=>{
    append(message,'left');
    scroll();
})

socket.on('left',name=>{
    appendLeaved(name,'left')
})
function scroll(){
    container.scrollTop=container.scrollHeight;
}