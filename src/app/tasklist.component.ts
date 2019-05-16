import { Component, Input } from '@angular/core';
import { TaskService } from './task.service';
import { TaskListItemComponent } from './tasklistitem.component';


@Component({
  selector: 'tasklist',
  templateUrl: './tasklist.component.html',
  styles: [`h1 { font-family: Lato; color: blue; }`],
  providers: [TaskService]

})

/**
*this is the TaskListComponent
*this just simply handles the fetching of the tasklist so the tasklistitem component can display the individual tasks
*/

export class TaskListComponent  {
  tasklist;


  constructor(private taskService: TaskService) {

   
  }

//get calls task service instance of getAllTasks to load tasks.
ngOnInit(){
  var x = document.getElementById('newTask');
  x.style.visibility = "visible";
  

    document.getElementById("viewTasks").style.visibility = "hidden";	
   



  

}

}
