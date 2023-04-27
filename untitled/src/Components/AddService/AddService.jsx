import axios, { Axios } from 'axios';
import React, { useState } from 'react';



const AddService = () => {
    const [service, setService] = useState();
  const [inputValue , setInputValue] = useState({
      Service : "",
      category : "",
      price : "",
      ServicePic : "",
  });

  //let formData = new FormData();
  function formSubmit(event){
    let form_data = new FormData();
    if (inputValue.ServicePic)
        form_data.append("ServicePic", inputValue.ServicePic, inputValue.ServicePic.name);
    form_data.append("Service", inputValue.Service);
    form_data.append("Price", inputValue.price);
    form_data.append("category", inputValue.category);

    axios.post(`https://amirmohammadkomijani.pythonanywhere.com/barber/categories/1/service/`, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
      data: {
        service: inputValue.Service,
        price: inputValue.price,
        servicePic: "",
    }
  }).then((res) => {
    console.log(res)
}).catch((error) => {
    console.warn(error)
});
event.preventDefault();


  }
  const onInputChange = (event) => {
      switch (event.target.name){
          case "Service" :
              setInputValue({...inputValue , Service : event.target.value})
                // setService(event.target.value);
              //formData.append("Service" , event.target.value);
          
              break;

          case "category" :
              setInputValue({...inputValue , category : event.target.value})
             
              console.log(inputValue);
              break;


          case "price" :
              setInputValue({...inputValue , price : event.target.value})
              console.log(inputValue);
              break;

          case "file" :
            setInputValue({...inputValue , ServicePic: event.target.files[0]});
           
           

           default:
               break;
      }
   };

  const postData = (event) => {
      event.preventDefault();
      console.log(inputValue);

      axios.post(`/Products` , inputValue)
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
       <h3>Add a new Service</h3>
       <form onSubmit = {formSubmit}  > 
           <input value={inputValue.Service}
             onChange = {onInputChange}
             type="text" 
             placeholder="Service" 
             name ="Service" />

           <input 
             value={inputValue.category}
             onChange = {onInputChange}
             type="text"  
             placeholder="Category" 
             name ="category" />

           <input value={inputValue.price}
             onChange = {onInputChange}
             type="number"   
             placeholder="Price" 
             name ="price" />

           <input 
             onChange = {onInputChange}
             type="file"   
             name ="file" />
            
             <button type="submit">
                Add Service
             </button>

       </form>
       
    </div>
  );
}

export default AddService;