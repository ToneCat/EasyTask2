import { Injectable } from '@angular/core';



@Injectable()
export class TaskService {

/**
*creates a new task, adds it to the task JSON object, and pushes it to the local storage.
* @param {string} id -The task id number.
*/
createTask(desc){


var tasks= [{}];
if(JSON.parse(window.localStorage.getItem("tasks")) == null){ //checks to see if task list is null
window.localStorage.setItem("tasks", JSON.stringify(tasks));	
}
else {
	tasks = JSON.parse(window.localStorage.getItem("tasks"));
}


let isComplete: boolean = false; 
var id=(tasks.length-1)+1;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;

var yyyy = today.getFullYear(); 
if (dd < 10) {
  dd = 0 + dd;
} 
if (mm < 10) {
  mm = 0 + mm;
} 
var hello = mm + '/' + dd + '/' + yyyy; //current date

//sets entry
var entry = {"id": id, "dateCreated": hello, "description":desc, "isComplete": isComplete, "dateCompleted": "not completed"} 
// pushes entry
tasks.push(entry); 
var storedTaskList = window.localStorage.setItem("tasks", JSON.stringify(tasks));
window.location.href = "https://tonecat.github.io/easytask/tasks";

}

/**
*takes a task by ID number, deletes it from the JSON, and then updates local storage
* @param {string} id -The task id number.
*/
deleteTask(id){
var tasksforDelete = JSON.parse(window.localStorage.getItem("tasks"));
var idForDeletion = id;
tasksforDelete = tasksforDelete.filter(item=>item.id !=idForDeletion );
window.localStorage.setItem("tasks", JSON.stringify(tasksforDelete));
window.location.href = "https://tonecat.github.io/easytask/tasks";

}

/**
*updates the task JSON using ID, matches ID, then updates description, isComplete
* and date of completion using the current date.
* @param {string} id -The task id number.
* @param {string} desc -The task description.
*@param {boolean} comp  - task complete boolean value.
*/
updateTask(id, desc, comp){
var tasksforUpdate = JSON.parse(window.localStorage.getItem("tasks"));

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = 0 + dd;
} 
if (mm < 10) {
  mm = 0 + mm;
} 
var hello = mm + '/' + dd + '/' + yyyy;




for (var i = 1; i < tasksforUpdate.length; i++) {
  if (tasksforUpdate[i].id == id) {
    tasksforUpdate[i].description = desc;
     tasksforUpdate[i].isComplete = comp;
     if(tasksforUpdate[i].isComplete == 'true'){
     tasksforUpdate[i].dateCompleted = hello;
	} 
	else{
	tasksforUpdate[i].dateCompleted = "not completed";

	}
  }
}
	window.localStorage.setItem("tasks", JSON.stringify(tasksforUpdate));	
	window.location.reload();

}
/**
*gets a task by its ID number using filtering
* @param {string} id -The task id number.
*/
getTaskById(idtwo){
 var response = JSON.parse(window.localStorage.getItem("tasks"));
 const a = response.filter(response => response.id == idtwo);
 return a;
}

/**
*returns a json of all tasks
*/
getAllTasks(){
var getTasks = JSON.parse(window.localStorage.getItem("tasks"));
return getTasks;
	
}

}
