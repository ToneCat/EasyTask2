import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}
/**
*creates a new task using node server and remote mongodb server.
* @param {string} desc - description (user entered).
*/
createTask(desc){
var url = 'http://localhost:3000/api/tasks?description='+desc;
const body2 = {description : desc};
window.location.href = "http://localhost:4200/tasks";
  return this.http.post<any>(url, body2).subscribe();


}

/**
*takes a task by ID number, deletes it from the database
* @param {string} id -The task id number.
*/
deleteTask(id){
var url = 'http://localhost:3000/api/delete?id='+id;
window.location.href = "http://localhost:4200/tasks";
return this.http.delete<any>(url).subscribe();



}

/**
*updates the task JSON using ID, matches ID, then updates description, isComplete
* and date of completion using the current date.
* @param {string} id -The task id number.
* @param {string} desc -The task description.
*@param {boolean} comp  - task complete boolean value.
*/
updateTask(id, desc, comp){
  var url = 'http://localhost:3000/api/tasks/'+id+'?description='+desc+'&isComplete='+comp;
  const body = {description : desc};
  
    return this.http.patch<any>(url, body).subscribe();

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
 var tasks = this.http.get('http://localhost:3000/api/tasks')



 return tasks;
	
}

}
