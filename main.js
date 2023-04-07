gsap.from('.navContainer',{
    opacity: -1,
    duration:3,
    x:500,
    ease: 'back'
});
gsap.from('.childContainer',{
    opacity: -1,
    duration:3,
    y:-500,
    ease: 'back'
}); 
function numeros(e){
    document.querySelector(".typerInp").value += e.value;
    console.log(document.querySelector(".typerInp").value);
    document.querySelector(".result").textContent = eval(document.querySelector(".typerInp").value);
    document.querySelector(".warningImg").classList.add("hide");
    document.querySelector(".result").classList.remove("hide");
};
function clearAll(){
    let allResults = document.querySelector(".oldResults");
    while(allResults.firstChild){
        allResults.removeChild(allResults.firstChild);
    }
    document.querySelector(".fatherResults").classList.add("hide");
    document.querySelector(".clear").classList.add("hide");

}
function borrar(){
    document.querySelector(".result").textContent = "";
    document.querySelector(".typerInp").value = ""; 
}
function numbersF(e){
    if(document.querySelector(".typerInp").value.endsWith("-") || document.querySelector(".typerInp").value.endsWith("+") || document.querySelector(".typerInp").value.endsWith("/") || document.querySelector(".typerInp").value.endsWith("*")){
        let del = document.querySelector(".typerInp").value.substring(0, document.querySelector(".typerInp").value.length - 1);
        document.querySelector(".typerInp").value = del + e.value;
    }
    else{
         document.querySelector(".typerInp").value += e.value;
    }
    document.querySelector(".warningImg").classList.remove("hide");
    document.querySelector(".result").classList.add("hide");
    if(document.querySelector(".typerInp").value.startsWith("+") || document.querySelector(".typerInp").value.startsWith("/") || document.querySelector(".typerInp").value.startsWith("*")){
        document.querySelector(".typerInp").value = "";
    }
}
document.querySelector(".typerInp").addEventListener("keyup", function(){
    if(this.value.endsWith("-") || this.value.endsWith("+") || this.value.endsWith("/") || this.value.endsWith("*")){
        document.querySelector(".warningImg").classList.remove("hide");
        document.querySelector(".result").classList.add("hide");
    }
    else{
        document.querySelector(".result").textContent = eval(document.querySelector(".typerInp").value);
        document.querySelector(".result").classList.remove("hide");
        document.querySelector(".warningImg").classList.add("hide");
    }
    if(this.value.startsWith("+") || this.value.startsWith("/") || this.value.startsWith("*")){
        this.value = "";
    }
});
function valorCalc(e){
    document.querySelector(".fatherResults").classList.remove("hide");
    document.querySelector(".oldResults").insertAdjacentHTML("afterbegin", `<tr onclick="valorInp(this)"><td class="op">${document.querySelector(".typerInp").value}</td><td class="resu">${document.querySelector(".result").textContent}</td></tr>`);
    document.querySelector(".typerInp").value = "";
    document.querySelector(".result").textContent = "";
    document.querySelector(".clear").classList.remove("hide");
}
document.querySelector(".calculator").addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        e.preventDefault();
        let oldR = document.querySelector(".oldResults");
        let op = document.querySelector(".typerInp").value;
        let resu = document.querySelector(".result").textContent;
        oldR.insertAdjacentHTML("afterbegin", `<tr onclick="valorInp(this)"><td class="op">${op}</td><td class="resu">${resu}</td></tr>`);
        document.querySelector(".result").textContent = "";
        document.querySelector(".fatherResults").classList.remove("hide");
        document.querySelector(".typerInp").value = "";
        document.querySelector(".clear").classList.remove("hide");
    }
});
function valorInp(e){
    document.querySelector('.typerInp').value = e.children[0].textContent;
    document.querySelector('.result').textContent = e.children[1].textContent;
}

//javascrypt for toDo list
class Tarea{
    constructor(task, status){
        this.task = task;
        this.status = status;
    }
}
let inpVal = document.querySelector(".inpTd");
let taskList = [];
function btnadder(){
    if(inpVal.value !== ""){
        let task = new Tarea(inpVal.value, "pending");
        taskList.push(task);
        localStorage.setItem("task", JSON.stringify(taskList));
        console.log(JSON.parse(localStorage.getItem("task")))
        document.querySelector(".ulF").insertAdjacentHTML("beforeend", 
            `<li class="txts">
                <span>${JSON.parse(localStorage.getItem("task")).slice(-1)[0].task}</span>
                <button class="btnCheck hide" onclick="checkbtn(this)">✔</button>
                <button class="btnDelete" onclick="deleteBTn(this)">X</button>
                <button class="inProgBtn" onclick="btnInProg(this)">In progress</button>
                <button class="onHold hide" onclick="onholdBtn(this)">On Hold</button>
                <hr>
            </li>`);
        document.querySelector(".empty").classList.add("hide");
        inpVal.value = "";
        document.querySelector(".inpSearch").classList.remove("hide")
    }
}
window.addEventListener("load", e=>{
    if(localStorage.task == "[]" || localStorage.task == undefined){
        document.querySelector(".empty").classList.remove("hide");
    }else{
        taskList = JSON.parse(localStorage.getItem("task"));
        JSON.parse(localStorage.getItem("task")).forEach(element => {
            adderOfTasks(element)
        });
        document.querySelector(".empty").classList.add("hide");
        document.querySelector(".inpSearch").classList.remove("hide")
    }
});
document.querySelector(".containerTD").addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        e.preventDefault();
        btnadder();
    }
});
function deleteBTn(e){
    e.parentNode.remove();
    if(document.querySelector(".txts") == null){
        document.querySelector(".empty").classList.remove("hide");
        document.querySelector(".inpSearch").classList.add("hide")
    }
    taskList = taskList.filter(elem => elem.task  !==  e.parentNode.children[0].textContent);
    localStorage.setItem("task", JSON.stringify(taskList));
}
function btnInProg(e){
    e.parentElement.classList.add("negro");
    e.parentNode.children[1].classList.remove("hide");
    e.parentNode.children[4].classList.remove("hide");
    e.classList.add("hide");
    e.parentNode.children[2].classList.add("hide");
    e.parentElement.classList.add('progresStatus');
    e.parentElement.classList.remove('holdStatus', 'checkStatus');
    taskList.forEach((ele, id)=>{
        if(ele.task == e.parentNode.children[0].textContent){
            taskList[id].status = "progress";
        }
    });
    localStorage.setItem("task", JSON.stringify(taskList));
}
function onholdBtn(e){
    e.parentElement.classList.add('holdStatus');
    e.classList.add("hide")
    e.parentNode.children[2].classList.remove("hide");
    e.parentNode.children[3].classList.remove("hide");
    e.parentNode.children[1].classList.add("hide");
    e.parentElement.classList.remove('progresStatus', 'checkStatus');
    taskList.forEach((ele, id)=>{
        if(ele.task == e.parentNode.children[0].textContent){
            taskList[id].status = "hold";
        }
    });
    localStorage.setItem("task", JSON.stringify(taskList));
}
function checkbtn(e){
    e.parentElement.classList.add('checkStatus');
    e.parentNode.children[2].classList.remove("hide");
    e.parentNode.children[4].classList.add("hide");
    e.classList.add("hide");
    e.parentElement.classList.remove('progresStatus', 'holdStatus');
    taskList.forEach((ele, id)=>{
        if(ele.task == e.parentNode.children[0].textContent){
            taskList[id].status = "check";
        }
    });
    localStorage.setItem("task", JSON.stringify(taskList));
}
function inpSearchFn(e){
    let searchTask = taskList.filter(post => post.task.includes(document.querySelector(".searchInp").value));
    document.querySelectorAll(".txts").forEach((post)=>{
        post.remove();  
    });
    searchTask.forEach((element)=>{
        adderOfTasks(element);
    });
}
function adderOfTasks(element){
    document.querySelector(".ulF").insertAdjacentHTML("beforeend", 
    `${(() =>{if(element.status == "progress"){
        return (`<li class="txts progresStatus negro">
        <span>${element.task}</span>  
        <button class="btnCheck" onclick="checkbtn(this)">✔</button>
        <button class="btnDelete hide" onclick="deleteBTn(this)">X</button>
        <button class="inProgBtn hide" onclick="btnInProg(this)">In progress</button>
        <button class="onHold" onclick="onholdBtn(this)">On Hold</button>
        <hr>
    </li>`);
    }else if(element.status == "hold"){
        return (`<li class="txts holdStatus negro">
        <span>${element.task}</span>  
        <button class="btnCheck hide" onclick="checkbtn(this)">✔</button>
        <button class="btnDelete" onclick="deleteBTn(this)">X</button>
        <button class="inProgBtn" onclick="btnInProg(this)">In progress</button>
        <button class="onHold hide" onclick="onholdBtn(this)">On Hold</button>
        <hr>
    </li>`)
    }else if(element.status == "check"){
        return (`<li class="txts checkStatus negro">
        <span>${element.task}</span>  
        <button class="btnCheck hide" onclick="checkbtn(this)">✔</button>
        <button class="btnDelete" onclick="deleteBTn(this)">X</button>
        <button class="inProgBtn hide" onclick="btnInProg(this)">In progress</button>
        <button class="onHold hide" onclick="onholdBtn(this)">On Hold</button>
        <hr>
    </li>`)
    }
    else{
        return (`<li class="txts">
        <span>${element.task}</span>  
        <button class="btnCheck hide" onclick="checkbtn(this)">✔</button>
        <button class="btnDelete" onclick="deleteBTn(this)">X</button>
        <button class="inProgBtn" onclick="btnInProg(this)">In progress</button>
        <button class="onHold hide" onclick="onholdBtn(this)">On Hold</button>
        <hr>
    </li>`)
    }
    })()}`);
}
function openCalc(e){
    $(".introduction").fadeOut(500)
        $(".containerTD").fadeOut(500);
        $(".gameContainer").fadeOut(500);
        navChange()
        $(".mundialApi").fadeOut(500);
        $(".rolexPr").fadeOut(500);
        $(".calculator").delay(500).fadeIn(500);
}
function openTD(e){
    $(".introduction").fadeOut(500)
        $(".calculator").fadeOut(500);
        $(".gameContainer").fadeOut(500);
        navChange()
        $(".mundialApi").fadeOut(500);
        $(".rolexPr").fadeOut(500);
        $(".containerTD").delay(500).fadeIn(500);
}
function openIntro(e){
    $(".containerTD").fadeOut(500)
        $(".calculator").fadeOut(500);
        $(".gameContainer").fadeOut(500);
        navChange()
        $(".mundialApi").fadeOut(500);
        $(".rolexPr").fadeOut(500);
        $(".introduction").delay(500).fadeIn(500);
}
let roundsForPlay;
function addRounds(e){
    roundsForPlay = e.value;
}
function vsComputer(e){
    $(".custom").fadeOut(500)
        $(".game").delay(500).fadeIn(500);
        navChange();
}
let selectionOfPlayer;
let selectionOfPc;
let pointsPc = 0;
let pointsPlayer = 0;
let rounds = 0;

function gameFunctions(e){
    rounds+=1;
    document.querySelector(".roundsCuant").textContent = rounds;
    selectionOfPlayer = e.dataset.elem;
    console.log(selectionOfPlayer);
    let randomNumber = Math.floor(Math.random()*3)+1;
    if(randomNumber == 1){
        selectionOfPc = "rock";
    }
    else if(randomNumber == 2){
        selectionOfPc = "scissors";
    }
    else if(randomNumber == 3){
        selectionOfPc = "paper";
    }
    console.log(selectionOfPc)
    if(selectionOfPc == "rock" && selectionOfPlayer == "scissors" || selectionOfPc == "scissors" && selectionOfPlayer == "paper" || selectionOfPc == "paper" && selectionOfPlayer == "rock"){
        document.querySelector(".spWinner").textContent = "PC";
        document.querySelector(".pcPoints").textContent = pointsPc +=1; 
    }
    else if(selectionOfPlayer == "rock" && selectionOfPc == "scissors" || selectionOfPlayer == "scissors" && selectionOfPc == "paper" || selectionOfPlayer == "paper" && selectionOfPc == "rock"){
        document.querySelector(".spWinner").textContent = "Player 1";
        document.querySelector(".playerPoints").textContent = pointsPlayer +=1;
    }
    else{
        document.querySelector(".spWinner").textContent = "Tie";
    }
    if(document.querySelector(".spWinner").textContent == "Tie" || document.querySelector(".spWinner").textContent == "Player 1" || document.querySelector(".spWinner").textContent == "PC"){
        document.querySelector(".pcChoice").textContent = selectionOfPc;
        document.querySelector(".playerChoice").textContent = selectionOfPlayer;
    }
    if(rounds == document.querySelector(".roundsOptions").value){
        document.querySelectorAll(".imgGame").forEach(function (e){
            e.classList.add("block");
        });
        document.querySelector(".winners").classList.remove("hide")
    }
    if(pointsPc > pointsPlayer){
        document.querySelector(".gameWinner").textContent = "PC";
    }
    else if(pointsPc < pointsPlayer){
        document.querySelector(".gameWinner").textContent = "Player 1";
    }
    else{
        document.querySelector(".gameWinner").textContent = "Tie";
    }
    if(selectionOfPc == "rock"){
        document.querySelector(".imgRock").classList.remove("hide");
        document.querySelector(".imgPaper").classList.add("hide");
        document.querySelector(".imgScissors").classList.add("hide");
    }
    else if(selectionOfPc == "paper"){
        document.querySelector(".imgPaper").classList.remove("hide");
        document.querySelector(".imgScissors").classList.add("hide");
        document.querySelector(".imgRock").classList.add("hide");
    }
    else if(selectionOfPc == "scissors"){
        document.querySelector(".imgScissors").classList.remove("hide");
        document.querySelector(".imgPaper").classList.add("hide");
        document.querySelector(".imgRock").classList.add("hide");
    }
}
function resetBtn(e){
    pointsPc = 0;
    pointsPlayer = 0;
    document.querySelector(".winners").classList.add("hide")
    document.querySelector(".imgScissors").classList.add("hide");
    document.querySelector(".imgPaper").classList.add("hide");
    document.querySelector(".imgRock").classList.add("hide");
    document.querySelector(".roundsCuant").textContent = "";
    document.querySelector(".spWinner").textContent = "";
    document.querySelector(".pcPoints").textContent = pointsPc;
    document.querySelector(".playerPoints").textContent = pointsPlayer;
    document.querySelector(".playerChoice").textContent = "";
    document.querySelector(".pcChoice").textContent = "";
    document.querySelector(".gameWinner").textContent = "";
    rounds=0;
    document.querySelectorAll(".imgGame").forEach(function (e){
        e.classList.remove("block");
    });
}
function backToCustom(){
    $(".game").fadeOut(500)
    $(".custom").delay(500).fadeIn(500);
    document.querySelector(".roundsOptions").value = 1;
    resetBtn();
    navChange();
}
function openGame(e){
    backToCustom();
    $(".introduction").fadeOut(500, function (){
        $(".containerTD").fadeOut(500);
        $(".calculator").fadeOut(500);
        $(".rolexPr").fadeOut(500);
        $(".mundialApi").fadeOut(500);
        $(".gameContainer").delay(500).fadeIn(500);
    });
}
function openmundialApi(e){
    backToCustom();
    $(".introduction").fadeOut(500, function (){
        $(".containerTD").fadeOut(500);
        $(".calculator").fadeOut(500);
        $(".gameContainer").fadeOut(500);
        $(".rolexPr").fadeOut(500);
        $(".mundialApi").delay(500).fadeIn(500);
    });
}
function openRolexPr(e){
    backToCustom();
    $(".introduction").fadeOut(500, function (){
        $(".containerTD").fadeOut(500);
        $(".calculator").fadeOut(500);
        $(".gameContainer").fadeOut(500);
        $(".mundialApi").fadeOut(500);
        $(".rolexPr").delay(500).fadeIn(500);
    });
}
function navChange(){
    $(".navContainer").fadeOut(500);
    $(".navContainer").fadeIn(500);
}