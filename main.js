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
        return (`<li class="txts progresStatus">
        <span>${element.task}</span>  
        <button class="btnCheck" onclick="checkbtn(this)">✔</button>
        <button class="btnDelete hide" onclick="deleteBTn(this)">X</button>
        <button class="inProgBtn hide" onclick="btnInProg(this)">In progress</button>
        <button class="onHold" onclick="onholdBtn(this)">On Hold</button>
        <hr>
    </li>`);
    }else if(element.status == "hold"){
        return (`<li class="txts holdStatus">
        <span>${element.task}</span>  
        <button class="btnCheck hide" onclick="checkbtn(this)">✔</button>
        <button class="btnDelete" onclick="deleteBTn(this)">X</button>
        <button class="inProgBtn" onclick="btnInProg(this)">In progress</button>
        <button class="onHold hide" onclick="onholdBtn(this)">On Hold</button>
        <hr>
    </li>`)
    }else if(element.status == "check"){
        return (`<li class="txts checkStatus">
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
    document.querySelector(".introduction").classList.add("hide");
    document.querySelector(".calculator").classList.remove("hide");
}