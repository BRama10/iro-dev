'use client';

import ProblemPage from "@/components/problem";
import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

export default function Exam() {
  const [seconds, setSeconds] = useState<number | null>(null);
  const [timer, setTimer] = useState<any | null>(null);
  const [isTabVisible, setIsTabVisible] = useState<boolean | null>(true);
  const [closeTesting, setCloseTesting] = useState<any>({
    value: false,
    reason: null
  });

  useEffect(() => {
    if (global?.window !== undefined) {
      const savedValue = localStorage.getItem('timer');
      if (savedValue) {
        setSeconds(parseInt(savedValue));
      } else {
        setSeconds(60 * 60);
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once during mount

  useEffect(() => {
    if (seconds === 0) {
      // Clear timer and reset local storage when it reaches 0
      clearInterval(timer);
      localStorage.removeItem('timer');
    }
  }, [seconds]); // Run this effect whenever seconds changes

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSeconds((prevSeconds: any) => prevSeconds - 1);
      if (seconds) {
        const cur = seconds - 1
      }

    }, 1000);

    setTimer(timerInterval);

    return () => clearInterval(timerInterval);
  }, []); // Empty dependency array ensures this effect runs only once during mount

  useEffect(() => {
    if (seconds) {
      localStorage.setItem('timer', seconds.toString());
    }
  }, [seconds])

  const handleVisibilityChange = useCallback(() => {
    setIsTabVisible(document.visibilityState === 'visible');
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if(!isTabVisible)
    setCloseTesting({
      value: true,
      reason: 'Testing window was exited during the test.'
    })
  }, [isTabVisible])

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <main className="flex h-screen min-h-screen max-h-screen flex-col ">
      <div className='h-[15%] w-full flex justify-between pt-[2.0%]'>
        <Card className='h-[fit-content] ml-[10%]'>
          <CardBody className='h-[fit-content]'>
            <p>IRO Testing</p>
          </CardBody>
        </Card>


        <Card className='h-[fit-content] mr-[2%]'>
          <CardBody className='h-[fit-content]'>
            <p>Time remaining: {seconds ? formatTime(seconds) : 'N/A'}</p>
          </CardBody>
        </Card>
      </div>
      {!closeTesting.value ?
        (<div className='h-[77%] w-full px-[20%] flex items-center justify-center '>
          <ProblemPage note='Round to the nearest thousand.' problem="How many cats are there in Europe?" choices={[
            {
              key: 'five',
              content: '5',
              description: ''
            }, 
            {
              key: 'six',
              content: '6',
              description: ''
            }, 
            {
              key: 'seven',
              content: '',
              description: '7'
            }, 
          ]} />
        </div>)
        :
        (<div className='h-[77%] w-full flex flex-col'>
          <div>Testing Has Been Closed!</div>
          <div>Reason : {closeTesting.reason}</div>
        </div>)
      }
      <div className='h-[8%] w-full'>Footer Goes Here</div>

    </main>
  );
}
