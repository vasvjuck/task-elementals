import React, { useEffect, useState } from 'react';
import './App.css';
import { users } from './data'

const usersSlice = (m, n) => {
  return users.slice(m, n)
}

const App = () => {
  const [argumentOne, setArgumentOne] = useState(0);
  const [argumentTwo, setArgumentTwo] = useState(50)
  const [allUsers, setAllUsers] = useState(usersSlice(argumentOne, argumentTwo))
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    if (upload) {
      setAllUsers(prev => [...prev, ...usersSlice(argumentOne, argumentTwo)])
    }
  }, [argumentOne, argumentTwo])

  useEffect(() => {
    const userActive = document.querySelectorAll('.users__box')

    function setUserActive() {
      userActive.forEach(e => e.classList.remove("active"));
      this.classList.add("active");
    }

    userActive.forEach(e => e.addEventListener('click', setUserActive))

    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    };
  }, [allUsers])

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setUpload(true)
      setArgumentOne(prev => prev + 50)
      setArgumentTwo(prev => prev + 50)
    }
  }

  return (
    <div className="App">
      <h2>List of users</h2>
      <div className='content'>
        {
          allUsers && allUsers.map((data) => (
            <div className="users__box" key={data.id}>
              <p className='user__id'>{data.id}</p>
              <div className={`helmet_bg ${data.color}`}><img className='helmet' src="https://raw.githubusercontent.com/ElementalsWeb/frontend-task/1e504c0f4960d48f49403d1c7172d2a60582ab5c/helmet.svg" alt='user' /></div>
              <div className="user__main">
                <h3>{data.name}</h3>
                <p><span className='time'>{data.time}</span> | <span className='speed'>{data.speed}km/h</span></p>
              </div>
            </div>
          ))
        }
        {upload && <div className='loading'>Loading...</div>}
      </div>
    </div>
  );
}
export default App;
