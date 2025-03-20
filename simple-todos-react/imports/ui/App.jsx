import React from 'react';
import { useSubscribe, useTracker} from 'meteor/react-meteor-data'; 
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';

export const App = () => {
  const isLoading = useSubscribe("tasks");  
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  const handleToggleChecked = ({ _id, isChecked }) =>
    Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });
  const handleDelete = ({ _id }) =>
    Meteor.callAsync("tasks.delete", { _id });

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>📝️ To Do List</h1>
            </div>
          </div>
        </header>
        <div className="main">
          <TaskForm />
  
          <ul className="tasks">
            {tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onCheckboxClick={handleToggleChecked}
                onDeleteClick={handleDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    );
};