import React from "react";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
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

  const accessTokenBarber = localStorage.getItem('accessTokenBarber');
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
        Authorization : `JWT ${accessTokenBarber}`,
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
    fetchData((url+"?status=&date="+date),options);
    fetchDoneData((url+"?status=Done&date="+date),options);
    fetchCanceledByMeData((url+"?status=BarberCancelled&date="+date),options);
    fetchCanceledByCustomerData((url+"?status=CustomerCancelled&date="+date),options);
    fetchCustomerDidntArriveData((url+"?status=CustomerNotCome&date="+date),options);
  },[date])

  
  function classNames(...classes){
    return classes.filter(Boolean).join(' ')
  }


  return (
    <div className="bg-WhiteChocolate-500 w-full">
      <div className=" md:w-2/3 w-full mx-auto h-full">
        <div className="container px-2 py-8 mx-auto flex flex-col">
          <div className="bg-DesertSand-500 w-fit px-3 py-3 rounded-xl flex flex-row gap-3">
            <p className="font-medium text-lg py-1 text-AteneoBlue-500">date:</p>
            <input onChange={(event) => {setDate(event.target.value)}} type="date" className="p-1 rounded appearance-none focus:outline-none bg-WhiteChocolate-500 text-AteneoBlue-500" value={date}/>
          </div>
          <div className="w-full py-4 sm:px-0">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <Tab.List className="flex flex-wrap sm:flex-nowrap space-x-1 rounded-xl bg-DesertSand-500 p-1">
                {Filters.map((filter) => (
                  <Tab
                    className={({ selected }) =>
                    classNames(
                      'text-lg px-1 w-full rounded-lg py-2.5 font-medium leading-5 focus:outline-none',
                      
                      selected
                        ? 'bg-MediumRuby-500 shadow text-white'
                        : 'hover:bg-white/[0.12] hover:text-MediumRuby-500 text-AteneoBlue-500'
                    )
                  }
                  >{filter}</Tab>
                ))}
              </Tab.List>
              <div className="flex flex-row justify-center w-full py-2 bg-DesertSand-500 px-2 mx-auto rounded-xl mt-2">
                <div className="bg-MediumRuby-500 flex flex-row rounded-xl">
                  <p className="m-1 p-2 text-white text-lg font-medium">{date}</p>
                  <p className="m-1 p-2 text-lg font-medium">/</p>
                  <p className="m-1 p-2 text-white text-lg font-medium">{Filters[selectedIndex]}</p>
                </div>
              </div>
              <Tab.Panels className="mt-3 text-AteneoBlue-500 min-h-screen">
                {Filters.map(() => (
                  <Tab.Panel>
                    
                    {data.length>0 ? (data.map((order) => (
                      <div key={order}>
                        <div class="m-1 flex items-center">
                          <div class="border-t border-AteneoBlue-500 flex-1 mr-3"></div>
                            <span class="flex flex-row items-center text-center text-cherryBlossomPink-500">
                              <IonIcon icon={time} className="mr-1"/>
                              <p>{order.time}</p>
                            </span>
                          <div class="border-t border-AteneoBlue-500 flex-1 ml-3"></div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-start">
                            <div className="m-1">
                              <img className="border border-AteneoBlue-500 w-12 h-12 rounded-lg" src={order.customer.profile_pic} alt="profile"/>
                            </div>
                            <div className="m-1 text-AteneoBlue-500">
                              <p className="text-base font-bold">first name : {order.customer.first_name}</p>
                              <p className="text-lg font-bold">family name :{order.customer.last_name}</p>
                            </div>
                          </div>
                          <div className="m-1 flex items-center">
                            <p className="text-green-500">+${order.service.price}</p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="py-2 mx-2 bg-MediumRuby-400 mt-2 rounded-lg">
                            <p className="p-0.5 px-1 text-white text-base font-bold">service : {order.service.service}</p>
                          </div>
                          <div className="py-2 mx-2 bg-AteneoBlue-400 mt-2 rounded-lg">
                            <p className="p-0.5 px-1 text-white text-base font-bold">{order.status}</p>
                          </div>
                        </div>
                      </div>
                      
                    ))):
                    <p className="text-center text-AteneoBlue-500">No Orders</p>
                    }
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;