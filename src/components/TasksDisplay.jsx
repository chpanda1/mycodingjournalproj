import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
import TaskModal from './TaskModal';

function ThoughtsDisplay({emptyArr, setEmptyArr, setUpdateProductData, toggleShowModal}) {


    function handleDelete (tId) {

        Swal.fire({
          title: `Are you sure you want to DELETE task? `,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
            let newArr = emptyArr.filter(emptyArr => emptyArr.tId !== tId);
            setEmptyArr(newArr);
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
      }


  return (
    <div className='p-3'>
        <TableContainer component={Paper} className='bg-info-subtle'>
            <Table sx={{ minWidth: 1 }} aria-label="simple table">
                <TableHead className='bg-primary text-white'>
                    <TableRow>
                        <TableCell align="center">Tasks for today</TableCell>
                        <TableCell colSpan={2} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {emptyArr.map((Arr) => 
                    <TableRow 
                    key={Arr.tId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="left" sx={{width: '80%'}}><pre>{Arr.dateToday}<br />{Arr.tasks}</pre></TableCell>
                        <TableCell align="center"><button className='btn btn-warning' onClick={() => {
                        setUpdateProductData({...Arr}) 
                        toggleShowModal(true)}} >Edit</button></TableCell>
                        <TableCell align="center"><button className='btn btn-danger' onClick={() => handleDelete(Arr.tId)}>Delete</button></TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default ThoughtsDisplay
