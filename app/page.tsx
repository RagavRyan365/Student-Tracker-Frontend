'use client'
import { useEffect, useState } from "react";
import axios from "axios";

import Scard, { type StudentStatus } from "@/components/studentCard";

interface StudentData{
  name:string;
  rollno:string;
  registerno:number;
  status:StudentStatus;
}

export default function Home() {
  // State variables to hold the selected department, class section, and year
  const [selectedDepartment, setSelectedDepartment] = useState("IT");
  const [selectedclassSection, setClassSection] = useState("C");
  const [selectedYear, setSelectedYear] = useState("1");
  /*
    StudentName;
    StudentRollNo;
    StudentRegisterNo;
    Status - P,A or OD;
  */
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [isNoStudentLable,setIsNoStudentLable] = useState<boolean>(false);

  const handleStudentStatusChange = (index: number, status: StudentStatus) => {
    setStudentData((currentStudents) =>
      currentStudents.map((student, studentIndex) =>
        studentIndex === index ? { ...student, status } : student
      )
    );
  };

  useEffect(()=>{
    setStudentData([]);
    setIsNoStudentLable(false);
    axios.get(`http://localhost:5000/students/${selectedDepartment}/${selectedclassSection}/${selectedYear}`)
      .then((response) => {
        setStudentData(
          response.data.map((student: Omit<StudentData, "status">) => ({
            ...student,
            status: "P",
          }))
        );
      })
      .catch((error:unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          setIsNoStudentLable(true);
          return;
        }

        console.error("Failed to fetch students", error);
      });
  },[selectedDepartment,selectedclassSection,selectedYear])
  

  return (
    <div className="flex min-h-screen flex-col lg:p-24 p-4">
      <div id="class_selector">
        <h3 className="text-lg font-semibold mb-2">Select Class Details</h3>
        {/*Department selection section*/}
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border border-gray-300 rounded-md p-2 m-2"
          >
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
        </select>

        {/*Class Section selection section*/}
        <select
          value={selectedclassSection}
          onChange={(e) => setClassSection(e.target.value)}
          className="border border-gray-300 rounded-md p-2 m-2"
        >
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
        </select>

        {/*Year selection section*/}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-md p-2 m-2"
        >
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>
      </div>
      <div>
        <h1 id="noStudentsLable" style={{display: isNoStudentLable ? "flex" : "none"}} className="text-gray-800">No Students</h1>
        {
          studentData.map((e,i)=>(
            <Scard
              key={i}
              sno={i+1}
              studentName={e.name}
              studentRoll={e.rollno}
              studentReg={e.registerno}
              status={e.status}
              onStatusChange={(status) => handleStudentStatusChange(i, status)}
            />
          ))
        }
      </div>
    </div>
  );
}

     