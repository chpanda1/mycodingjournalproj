import React, { useCallback, useState } from "react"
import Swal from "sweetalert2"
import {
  Form as BTForm,
  FormGroup,
  Input,
  Label,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap"


function TaskModal(  
    {showModal,
    updateProductData,
    toggleShowModal,
    setEmptyArr
    }) {

    const {
        tId: id,
        thoughts: tasks,
        dateToday: dateToday,
    } = updateProductData
        
    const [thoughtsID] = useState(id);
    const [Thoughts, setThoughts] = useState(tasks);
    const curDate= new Date();
    const curDay = curDate.getDate();
    const curMonth = curDate.getMonth();
    const curYear = curDate.getFullYear();
    const [date, setDate] = useState(dateToday);

    const handleThoughts = useCallback((e) => {
        setThoughts(e.target.value)
    }, [])

    const handleUpdateProduct = useCallback(
        (e) => {
          e.preventDefault()
    
          const rawProductFormData = new FormData(e.target)
          // check if input value has no value
          for (const value of rawProductFormData.values()) {
            if (!value)
              return Swal.fire({
                title: "Invalid empty inputs!",
                icon: "warning",
                text: "Please fill up all required fields",
                showConfirmButton: false,
                timer: 1500,
              })
          }
    
          Swal.fire({
            title: "Success!",
            text: "Updating...",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              toggleShowModal(false)
            },
            willClose: () => {
              const updatedProductFormData = Object.fromEntries(rawProductFormData)
              setEmptyArr((prevProductsData) => {
                const oldProducts = prevProductsData.filter(
                  (localProduct) => localProduct.tId !== thoughtsID
                )
                return [
                  ...oldProducts,
                  { ...updatedProductFormData, tId: thoughtsID },
                ]
              })
            },
          })
        },
        [thoughtsID, setEmptyArr, toggleShowModal]
      )

  return (
    <div>
      <Modal isOpen={showModal}>
      <ModalHeader>Update Your Thoughts</ModalHeader>
      <BTForm className='bg-info-subtle p-3 form' onSubmit={handleUpdateProduct}>
        <div className='d-flex justify-content-between'>
            <span>Your Thoughts</span>
            <FormGroup floating>
                <Input type='text' id='dateToday' name='dateToday' value={date}/>
                <Label for='dateToday'>Date: {date}</Label>
            </FormGroup>
        </div>
        <FormGroup floating>
            <Input type='textarea' id='thoughts' name='thoughts' value={Thoughts} onChange={handleThoughts}/>
            <Label for='thoughts'>Your Thoughts {Thoughts}</Label>
        </FormGroup>
        <div className='d-flex justify-content-end'>
        <ModalFooter>
          <Button variant='primary' type='submit'>
            Update
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              toggleShowModal(false)
            }}
          >
            Close
          </Button>
        </ModalFooter>
        </div>
      </BTForm>
      </Modal>
    </div>
  )
}

export default TaskModal
