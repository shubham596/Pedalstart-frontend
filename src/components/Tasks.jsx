import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';


const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }

  return (
    <div className="container">

      {loading ? (
        <Loader />
      ) : (
        <div className='listContainer'>
          {tasks.length === 0 ? (
            <div className='no-tasks'>
              <span>Please Add Some Tasks</span>
              <Link to="/tasks/add" className="add-task-button">+ Add new task </Link>
            </div>
          ) : (
            
            tasks.map((task, index) => (
              <Link to={`/detail/${task._id}`}>
              <div key={task._id} className='task-card'>
                <div className='task-header'>
                  <span className='task-number'>Task #{index + 1}</span>
                  <Tooltip text={"Edit"} position={"top"}>
                    <Link to={`/tasks/${task._id}`} className='edit-task'>
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </Tooltip>
                  <Tooltip text={"Delete"} position={"top"}>
                    <span className='delete-task' onClick={() => handleDelete(task._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </Tooltip>
                </div>
                <div className='task-description'>{task.description}</div>
              </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Tasks;
