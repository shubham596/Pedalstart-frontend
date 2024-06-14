import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);



  return (
    <>
    
      <MainLayout>
        {!isLoggedIn ? (
        <div className='home-container'>
          <Link className='btn-home' to='/Signup'> Get Started </Link>
          </div>
        ) : (
          <>
          <div className='home-create'>
           <h1>Create a New Notes</h1>
          
              <Link className='addtask' to="/tasks/add">
                <i className="fa-solid "></i> Add task
              </Link>
           
          </div>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  )
}

export default Home