import React , { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';


const PutService = () => {
  const [inputValue , setInputValue] = useState({
    id : "",
    title : "",
    category : "",
    description : "",
    price : "",
    image : "",
  });
  const onInputChange = (event) => {
    switch (event.target.name){
      case "id" :
        setInputValue({...inputValue , id : event.target.value})
   
        break;
        
        case "title" :
            setInputValue({...inputValue , title : event.target.value})
       
            break;

        case "category" :
            setInputValue({...inputValue , category : event.target.value})
           
            console.log(inputValue);
            break;

        case "description" :
            setInputValue({...inputValue , description : event.target.value})
         
            console.log(inputValue);
            break;

        case "price" :
            setInputValue({...inputValue , price : event.target.value})
            console.log(inputValue);
            break;

        case "file" :
          setInputValue({...inputValue , image: event.target.files[0]});
         
         

         default:
             break;
    }
 };

const putData = (event) => {
    event.preventDefault();
    console.log(inputValue);

    axios
    .put('/Products/${inputValue.id}' , inputValue)
    .then((response) => {console.log(response);
    })
    .catch((error) => {console.log(error.message);
   });
};


  return (
    <div 
      style={{
        display: "flex",
        flexDirection : "column",
        alignItems : "center",
        rowGap : "20px"

    }}>
      
      <h3>
            Edit Service
      </h3>
      
       <form onSubmit = {putData}> 
           <input onChange={onInputChange} value={inputValue.id} type="number" placeholder="Id" name ="id" />
           <input onChange={onInputChange} value={inputValue.title} type="text"  placeholder="Title" name ="title" />
           <input onChange={onInputChange} value={inputValue.category} type="text"  placeholder="Category" name ="category" />
           <input onChange={onInputChange} value={inputValue.description} type="text"  placeholder="Description" name ="description" />
           <input onChange={onInputChange} value={inputValue.price} type="number"  placeholder="Price" name ="price" />
       
             <button type="submit" variant="outlined">
                Edit Service 
             </button>
        </form>
        

      
      
    </div>
  );
};

export default PutService;