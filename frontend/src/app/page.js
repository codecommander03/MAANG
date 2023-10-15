"use client";
import Navbar from "@/components/Navbar.js";
import Card from "@/components/Card.js";
import BarGraph from "@/components/BarGraph";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import { useEffect, useState } from "react";
import axiosInst from "@/utils/axios";

export default function Home() {
  
  const [salary, setSalary] = useState({total_records:"",mean_salary:"",median_salary:"",twentyfive:"",seventyfive:""});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInst.get("/api/v1/salaryrecords");
        setSalary(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    // Call the async function
    fetchData();
  },[]);

  return (
    <>
      <div className="h-screen bg-[#212121] flex items-center">
        <Navbar />
        <div className="w-full p-4 flex flex-col gap-3"> 

        <div className="grid grid-cols-5 w-full items-center justify-center gap-4">
          
            <Card title="Number of Records" value={salary.total_records} />
            <Card title="Mean Salary" value={salary.mean_salary} />
            <Card title="Median Salary" value={salary.median_salary} />
            <Card title="25th Percentile Salary" value={salary.twentyfive} />
            <Card title="75th Percentile Salary" value={salary.seventyfive} />
        
        </div>

        <div className="grid grid-cols-3 gap-3 justify-center">
          <div className="flex col-span-2 items-center justify-center rounded-xl bg-black p-4 h-80">
            <LineChart />
          </div>
            <div className="flex items-center justify-center bg-black p-4 text-white rounded-xl ">
              Sub Graph
            </div>
        </div>

        <div className="flex items-center justify-center gap-3 h-60 ">
          <div className="flex basis-1/3 p-4 items-center justify-center bg-black text-white rounded-xl h-full">
            <PieChart />
          </div>
          <div className="flex basis-1/3 p-4 items-center justify-center bg-black text-white rounded-xl h-full">
            <BarGraph />
          </div>
          <div className="flex basis-1/3 items-center justify-center bg-black text-white rounded-xl h-full">
            Main Graph
          </div>
        </div>
      </div>
        </div>
    </>
  );
}
