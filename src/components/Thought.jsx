import React, {useEffect, useState, useRef} from 'react'
import {Form as BTForm, FormGroup, Input, Label, Button, Col, FormFeedback} from 'reactstrap';
import ThoughtsDisplay from './ThoughtsDisplay';
import ThoughtsModal from './ThoughtsModal';

function Thought() {

    const curDate= new Date();
    const curDay = curDate.getDate();
    const curMonth = curDate.getMonth();
    const curYear = curDate.getFullYear();
    const [dateToday, setDateToday] = useState(`${curYear}-${curMonth + 1}-${curDay}`);
    const [thoughts, setThoughts] = useState('');
    const loadData = localStorage.getItem('thoughts') ? JSON.parse(localStorage.getItem('thoughts')) : [];
    const [emptyArr, setEmptyArr] = useState(loadData);
    const [showModal, toggleShowModal] = useState(false);
    const [updateProductData, setUpdateProductData] = useState({});

    const handleThoughts = (event) => {
        setThoughts(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const tId = Date.now();
        if(thoughts !== ''){
          const data = {tId ,thoughts,dateToday}
          setEmptyArr([...emptyArr, data]);
        }else{ alert("Please Input a Thought")}
        setThoughts("");
    }

    useEffect(() => {
        localStorage.setItem('thoughts', JSON.stringify(emptyArr));
    }, [emptyArr]);


  return (
    <div className='container-fluid'>
      <BTForm className='bg-info-subtle p-3 form' onSubmit={handleSubmit}>
        <div className='d-flex justify-content-between'>
            <span>Thoughts for the Day</span>
            <FormGroup floating>
                <Input type='text' id='currentDate' name='currentDate' value={dateToday}/>
                <Label for='currentDate'>Date: </Label>
            </FormGroup>
        </div>
        <FormGroup floating>
            <Input type='textarea' id='thoughts' name='thoughts' value={thoughts} onChange={handleThoughts}/>
            <Label for='thoughts'>Your thoughts?</Label>
        </FormGroup>
        <div className='d-flex justify-content-end'>
        <Button type='submit' color='primary'>Save</Button>
        </div>
      </BTForm>
      <ThoughtsDisplay emptyArr={emptyArr} setEmptyArr={setEmptyArr} setUpdateProductData={setUpdateProductData} toggleShowModal={toggleShowModal}/>
      {showModal && (
      <ThoughtsModal
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

export default Thought
