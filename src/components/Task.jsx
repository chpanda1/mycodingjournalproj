import React, {useEffect, useState, useRef} from 'react';
import {Form as BTForm, FormGroup, Input, Label, Button} from 'reactstrap';
import TaskDisplay from './TasksDisplay';
import TaskModal from './TaskModal';

function Task() {
    const curDate= new Date();
    const curDay = curDate.getDate();
    const curMonth = curDate.getMonth();
    const curYear = curDate.getFullYear();
    const [dateToday, setDateToday] = useState(`${curYear}-${curMonth + 1}-${curDay}`);
    const [tasks, setTasks] = useState('');
    const loadData = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    const [emptyArr, setEmptyArr] = useState(loadData);
    const [showModal, toggleShowModal] = useState(false);
    const [updateProductData, setUpdateProductData] = useState({});


    const handleTasks = (event) => {
        setTasks(event.target.value);
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const tId = Date.now();
        if(tasks !== ''){
            const data = {tId ,tasks, dateToday}
            setEmptyArr([...emptyArr, data]); 
        }else{ alert("Please Input a Task")}

        setTasks("");
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(emptyArr));
    }, [emptyArr]);


  return (
    <div className='container-fluid'>
      <BTForm className='bg-info-subtle p-3 form' onSubmit={handleSubmit}>
        <div className='d-flex justify-content-between'>
            <span>Task</span>
            <FormGroup floating>
                <Input type='text' id='currentDate' name='currentDate' value={dateToday}/>
                <Label for='currentDate'>Date </Label>
            </FormGroup>
        </div>
        <FormGroup floating>
            <Input type='textarea' id='tasks' name='tasks' value={tasks} onChange={handleTasks} rows={'5'}/>
            <Label for='tasks'>Your tasks</Label>
        </FormGroup>
        <div className='d-flex justify-content-end'>
        <Button type='submit' color='primary'>Save</Button>
        </div>
      </BTForm>
      <TaskDisplay emptyArr={emptyArr} setEmptyArr={setEmptyArr} setUpdateProductData={setUpdateProductData} toggleShowModal={toggleShowModal}/>
      {showModal && (
      <TaskModal
      showModal = {showModal}
      updateProductData = {updateProductData}
      toggleShowModal = {toggleShowModal}
      setEmptyArr = {setEmptyArr}
      emptyArr={emptyArr}
      />
      )}
    </div>
  )
}

export default Task
