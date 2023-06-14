import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { TaskDetailsComponent } from '@app/tasks/details.component'
import { TaskFormComponent } from '@app/tasks/form.component'
import { TaskListComponent } from '@app/tasks/list.component'
import { TaskService } from '@app/tasks/service'
import { TaskHttpService } from '@app/tasks/service/http'
import { TaskLocalStorageService } from '@app/tasks/service/local-storage'
import { SharedModule } from '@shared/module'

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/new', component: TaskFormComponent },
      { path: 'tasks/:id/edit', component: TaskFormComponent },
      { path: 'tasks/:id', component: TaskDetailsComponent },
    ]),
  ],
  providers: [TaskService, TaskLocalStorageService, TaskHttpService],
})
export class TasksModule {}
