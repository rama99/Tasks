import { Component , OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../Task';
import { FormGroup , FormBuilder , FormControl , FormArray , Validators  , Validator } from '@angular/forms';

@Component({
moduleId: module.id,
selector:'tasks',
templateUrl:'./tasks.component.html'
})

export class TasksComponent implements OnInit {

    //tasks: Task[];
    tasks: any[];
    formgroup:FormGroup;

    constructor(private service: TaskService, private fb: FormBuilder) { 
        console.log('Task Service Initialized');

       this.formgroup = this.fb.group({
            "title":['', Validators.compose([Validators.required])]
        })
    }

    ngOnInit() {
        this.service.getTasks().subscribe( (tasks) => {
            this.tasks = tasks;            
        });
    }

    addTask(task:any) {  
            
         let newTask = {
             title:task.title,
             isDone:false
         }

         this.service.addTask(newTask).subscribe( (task) => {
             this.tasks.push(task);
         })
    }

    deleteTask(id) {

        let tasks = this.tasks;
        this.service.deleteTask(id).subscribe( (data) => {
            if(data.n == 1) {

              for(var i = 0; i<= tasks.length; i++) {
                    if(tasks[i]._id == id) {
                        tasks.splice(i,1);
                    }
                }

            }
        })
    }

    updateStatus(task:any) {

        var _task = {
            _id:task._id,
            title:task.title,
            isDone:!task.isDone
        }

        this.service.updateStatus(_task).subscribe( data => {
            task.isDone = ! task.isDone;
        })

    }

}