import React,{useState} from 'react'
import Pagination from '@mui/material/Pagination';
import "./style.css";
import Stack from '@mui/material/Stack';
function PaginationComponent({pageNumber,handleChange}) {
 //Page 1-[0,10)
 //Page 2-[10,20)
 //Page 3-[20,30)
//Page 9-[80,90)
//Page 10-[90,100)



  return (
    <div className='pagination-div'>
      <Pagination count={10} page={pageNumber} onChange={handleChange}
      sx={{
        color:"var(--white)",
        "& .Mui-selected , .Mui-selected:hover":{
            backgroundColor:"var(--blue) !important",
            color:"#fff !important",
            borderColor:"var(--blue) !important",
        },
        "& .MuiPaginationItem-ellipsis":{
            border:"0px solid var(--grey) !important"
        },
        "& .MuiPaginationItem-text":{
            color:"var(--white)",
            border:"1px solid var(--grey)",

        },
      }}
      
      />
    </div>
  )
}

export default PaginationComponent;
