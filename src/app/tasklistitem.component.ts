import { Component, Input } from '@angular/core';
import { TaskService } from './task.service';




@Component({
  selector: 'tasklistitem',
  templateUrl: './tasklistitem.component.html',
  styles: [`h1 { font-family: Lato; color: blue; }`],
  providers: [TaskService]

})

/**
*this is the TaskListItemComponent
*this loads the task data from the tasklist component into its HTML as a table.
*/
export class TaskListItemComponent  {
dataSource;


  @Input() task;


  displayedColumns: string[] = ['id','dateCreated', 'description', 'isComplete', 'dateCompleted', 'edit', 'delete'];
  

  constructor(private taskService: TaskService) {
     
  }
  ngOnInit(){

    
  var x = document.getElementById('warning');
  

  this.taskService.getAllTasks()
  .toPromise()
  .then((response) => {
    this.dataSource = response;
    if(this.dataSource === undefined || this.dataSource.length === 0){
  
      x.style.visibility = "visible";
      }
      else{
       x.remove();
    
      }

  })
  .catch((error) => {
    console.error(error);
  });



  }
  selectRow(row){
	console.log(row);
}

/**
* deletion process and passes ID into taskService instance by calling deleteTask(id)
* @param {string} id -The task id number.
*/
startDelete(id){
this.taskService.deleteTask(id);
}



}
