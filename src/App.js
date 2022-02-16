import React, { useEffect, useState } from 'react';
import { List } from 'react-virtualized';
import './App.css';
import { users } from './data';
import helmet from './img/helmet.svg'

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
    const scrollList = document.querySelector('.scrollList')

    function setUserActive() {
      userActive.forEach(e => e.classList.remove("active"));
      this.classList.add("active");
    }

    userActive.forEach(e => e.addEventListener('click', setUserActive))

    scrollList.addEventListener('scroll', scrollHandler)

    return function () {
      scrollList.removeEventListener('scroll', scrollHandler)
    };
  }, [allUsers])

  const scrollHandler = (e) => {
    const scrollList = document.querySelector('.scrollList')
    if (scrollList.scrollHeight - (scrollList.scrollTop + window.innerHeight) < 100) {
      setUpload(true)
      setArgumentOne(prev => prev + 50)
      setArgumentTwo(prev => prev + 50)
    }
  }

  return (
    <div className="App">
      <h2>List of users</h2>
      <List
        className='scrollList'
        width={400}
        height={650}
        rowHeight={150}
        rowCount={allUsers.length}
        rowRenderer={({ index, style }) => {
          const data = allUsers[index]
          return (
            <div className='content' key={data.id} style={style}>
              <div className="users__box" key={data.id}>
                <p className='user__id'>{data.id}</p>
                <div className={`helmet_bg ${data.color}`}><img className='helmet' src={helmet} alt='user' /></div>
                <div className="user__main">
                  <h3>{data.name}</h3>
                  <p><span className='time'>{data.time}</span> | <span className='speed'>{data.speed}km/h</span></p>
                </div>
              </div>
            </div>
          )
        }}
      />
      {/* {
          allUsers && allUsers.map((data) => (
            <div className="users__box" key={data.id}>
              <p className='user__id'>{data.id}</p>
              <div className={`helmet_bg ${data.color}`}><img className='helmet' src={helmet} alt='user' /></div>
              <div className="user__main">
                <h3>{data.name}</h3>
                <p><span className='time'>{data.time}</span> | <span className='speed'>{data.speed}km/h</span></p>
              </div>
            </div>
          ))
        } */}
    </div>
  );
}
export default App;