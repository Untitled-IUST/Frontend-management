import React from "react";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { Button, useStepContext } from "@mui/material";
import {IonIcon} from '@ionic/react';
import {time} from 'ionicons/icons';

function OrderHistory() {

  const [date, setDate] = useState(new Date().toISOString().substring(0,10));
  const [data ,setData] = useState([]);
  const [AllData , setAllData] = useState([]);
  const [DoneData , setDoneData] = useState([]);
  const [CanceledByMeData , setCenceledByMeData] = useState([]);
  const [CanceledByCustomerData , setCenceledByCustomerData] = useState([]);
  const [CustomerDidntArriveData , setCustomerDidntArriveData] = useState([]);

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzOTkwNTY4LCJpYXQiOjE2ODM5MDQxNjgsImp0aSI6IjJiOGJkZWJmYWJkZjRkMzdiMTJjOWNhNzUxMTFiNDNhIiwidXNlcl9pZCI6MX0.IsNqs2woJH2EMWZii1mUOJ0lmOY_MLPUsRTOy5Hw-r4";
  const [selectedIndex , setSelectedIndex] = useState(0);
  const Filters = [
    "All" ,"Done", "Canceled by me" , "Canceled by customer" , "Customer didnt arrive" 
  ]
  
  useEffect(() => {
    if(selectedIndex === 0){
      setData(AllData);
    }
    else if(selectedIndex === 1){
      setData(DoneData);
    }
    else if(selectedIndex === 2){
      setData(CanceledByMeData);
    }
    else if(selectedIndex === 3){
      setData(CanceledByCustomerData);
    }
    else if(selectedIndex === 4){
      setData(CustomerDidntArriveData);
    }
  },[selectedIndex])

  useEffect(() => {
    const url = "https://amirmohammadkomijani.pythonanywhere.com/barber/panel/";
    const options =  {
      headers : {
        Authorization : `JWT ${accessToken}`,
        'Content-Type' : 'application/json'
      }
    }
    async function fetchData(url,options){
      const response = await fetch(url,options);
      const fetchedData = await response.json();
      setAllData(fetchedData.results);
      setData(fetchedData.results);
    }
    async function fetchDoneData(url,options){
      const response = await fetch(url,options);
      const fetchedData = await response.json();
      setDoneData(fetchedData.results);
    }
    async function fetchCanceledByMeData(url,options){
      const response = await fetch(url,options);
      const fetchedData = await response.json();
      setCenceledByMeData(fetchedData.results);
    }
    async function fetchCanceledByCustomerData(url,options){
      const response = await fetch(url,options);
      const fetchedData = await response.json();
      setCenceledByCustomerData(fetchedData.results);
    }
    async function fetchCustomerDidntArriveData(url,options){
      const response = await fetch(url,options);
      const fetchedData = await response.json();
      setCustomerDidntArriveData(fetchedData.results);
    }
    fetchData(url,options);
    fetchDoneData(url,options);
    fetchCanceledByMeData(url,options);
    fetchCanceledByCustomerData(url,options);
    fetchCustomerDidntArriveData(url,options);
  },[])

  
  function classNames(...classes){
    return classes.filter(Boolean).join(' ')
  }


  return (
      <div className="bg-backGround-500 w-screen h-full">
        <div className="container px-2 py-8 mx-auto flex flex-col">
          <div className="bg-backGroundShade-500 w-fit px-3 py-3 rounded-xl flex flex-row gap-3">
            <p className="font-medium text-lg py-1 text-white">date:</p>
            <input onChange={(event) => {setDate(event. target.value)}} type="date" className="p-1 rounded appearance-none focus:outline-none bg-backGround-400 text-gray-400" value={date}/>
          </div>
          <div className="w-full py-4 sm:px-0">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <Tab.List className="flex flex-wrap sm:flex-nowrap space-x-1 rounded-xl bg-backGroundShade-500 p-1">
                {Filters.map((filter,index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                    classNames(
                      'text-lg px-1 w-full rounded-lg py-2.5 font-medium leading-5 text-white focus:outline-none',
                      
                      selected
                        ? 'bg-cherryBlossomPink-500 shadow text-backGround-500'
                        : 'hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                  >{filter}</Tab>
                ))}
              </Tab.List>
              <div className="flex flex-row justify-center w-full py-2 bg-backGroundShade-500 px-2 mx-auto rounded-xl mt-2">
                  <p className="bg-cherryBlossomPink-500 rounded-xl m-1 p-2 text-backGround-500 text-lg font-medium">{date}</p>
                  <p className="bg-Mauve-500 rounded-xl m-1 p-2 text-backGround-500 text-lg font-medium">{Filters[selectedIndex]}</p>
              </div>
              <Tab.Panels className="mt-3 text-white">
                <Tab.Panel>
                  {data.map((order) => (
                    <div key={order}>
                      <div class="m-1 flex items-center">
                        <div class="border-t border-backGroundShade-300 flex-1 mr-3"></div>
                          <span class="flex flex-row items-center text-center text-cherryBlossomPink-500">
                            <IonIcon icon={time} className="mr-1"/>
                            <p>{order.time}</p>
                          </span>
                        <div class="border-t border-backGroundShade-300 flex-1 ml-3"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className="m-1">
                            <img className="border-2 border-Mauve-500 w-12 h-12 rounded-lg" src={order.customer.profile_pic} alt="profile"/>
                          </div>
                          <div className="m-1 text-white">
                            <p className="text-base font-bold">first name : {order.customer.first_name}</p>
                            <p className="text-lg font-bold">family name :{order.customer.last_name}</p>
                          </div>
                        </div>
                        <div className="m-1 flex items-center">
                          <p className="text-green-500">+${order.service.price}</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="py-2 mx-2 bg-Mauve-500 mt-2 rounded-lg">
                          <p className="p-0.5 px-1 text-backGround-500 text-base font-bold">service : {order.service.service}</p>
                        </div>
                        <div className="py-2 mx-2 bg-RussianViolet-200 mt-2 rounded-lg">
                          <p className="p-0.5 px-1 text-backGround-500 text-base font-bold">{order.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
                {/* <Tab.Panel>Done</Tab.Panel>
                <Tab.Panel>Canceled by me</Tab.Panel>
                <Tab.Panel>Canceled by customer</Tab.Panel>
                <Tab.Panel>Customer didnt arrive</Tab.Panel> */}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
  );
}

export default OrderHistory;