import React from "react";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { Button } from "@mui/material";

function OrderHistory() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    console.log(date);
  }, [date]);

  function classNames(...classes){
    return classes.filter(Boolean).join(' ')
  }

  return (
      <div className="bg-backGround-500 w-screen h-screen">
        <div className="container py-8 mx-auto flex flex-col">
          <div className="bg-backGroundShade-500 w-fit px-3 py-3 rounded-xl flex flex-row gap-3">
            <p className="py-1 text-white">date:</p>
            <input type="date" className="p-1 rounded appearance-none focus:outline-none bg-backGround-400 text-gray-400"/>
          </div>
          <div className="w-full px-2 py-4 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-backGroundShade-500 p-1">
                <Tab 
                  className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                    'focus:outline-none',
                    selected
                      ? 'bg-cherryBlossomPink-500 shadow text-backGround-500'
                      : 'hover:bg-white/[0.12] hover:text-white'
                  )
                }
                >Done</Tab>
                <Tab
                  className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                    'focus:outline-none',
                    selected
                      ? 'bg-cherryBlossomPink-500 shadow text-backGround-500'
                      : 'hover:bg-white/[0.12] hover:text-white'
                  )
                }
                >Canceled by me</Tab>
                <Tab
                  className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                    'focus:outline-none',
                    selected
                      ? 'bg-cherryBlossomPink-500 shadow text-backGround-500'
                      : 'hover:bg-white/[0.12] hover:text-white'
                  )
                }
                >Canceled by customer</Tab>
                <Tab
                  className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                    'focus:outline-none',
                    selected
                      ? 'bg-cherryBlossomPink-500 shadow text-backGround-500'
                      : 'hover:bg-white/[0.12] hover:text-white'
                  )
                }
                >Customer didnt arrive</Tab>
                <Tab
                  className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                    'focus:outline-none',
                    selected
                      ? 'bg-cherryBlossomPink-500 shadow text-backGround-500'
                      : 'hover:bg-white/[0.12] hover:text-white'
                  )
                }
                >Waiting to respond</Tab>
                <Tab
                  className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                    'focus:outline-none',
                    selected
                      ? 'bg-cherryBlossomPink-500 shadow text-backGround-500'
                      : 'hover:bg-white/[0.12] hover:text-white'
                  )
                }
                >Confirmed</Tab>
              </Tab.List>
              <Tab.Panels className="text-white">
                <Tab.Panel>Done</Tab.Panel>
                <Tab.Panel>Canceled by me</Tab.Panel>
                <Tab.Panel>Canceled by customer</Tab.Panel>
                <Tab.Panel>Customer didnt arrive</Tab.Panel>
                <Tab.Panel>Waiting to respond</Tab.Panel>
                <Tab.Panel>Confirmed</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
  );
}

export default OrderHistory;