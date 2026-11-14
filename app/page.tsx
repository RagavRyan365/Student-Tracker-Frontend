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
  //backend url from .env
  const backend = process.env.NEXT_PUBLIC_BACKEND;

  // State variables to hold the selected department, class section, and year
  const [selectedDepartment, setSelectedDepartment] = useState("IT");
  const [selectedclassSection, setClassSection] = useState("C");
  const [selectedYear, setSelectedYear] = useState("1");
  const [classCode,setClassCode] = useState("ITC26");

  /*
    StudentName;
    StudentRollNo;
    StudentRegisterNo;
    Status - P,A or OD;
  */
  const [studentData, setStudentData] = useState<StudentData[]>([]);

  //State of the No student lable
  const [isNoStudentLable,setIsNoStudentLable] = useState<boolean>(false);

  const handleStudentStatusChange = (index: number, status: StudentStatus) => {
    setStudentData((currentStudents) =>
      currentStudents.map((student, studentIndex) =>
        studentIndex === index ? { ...student, status } : student
      )
    );
  };

  function markAttendance(){
    axios.post(`${backend}/api/mark/attendance`,{
      studentsData:studentData,
      subjectCode:"ITHS02",
      classCode:classCode
    }).then((response)=>{
      console.log(response.data);
    })
  }

  useEffect(()=>{
    setStudentData([]);
    setIsNoStudentLable(false);
    axios.get(`${backend}/api/students/${selectedDepartment}/${selectedclassSection}/${selectedYear}`)
      .then((response) => {
        setClassCode(response.data.classCode[0].classcode);
        setStudentData(
          response.data.list.map((student: Omit<StudentData, "status">) => ({
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
        <h1 className="text-lg font-semibold mb-2">Select Class Details</h1>
        <p className="text-gray-400 text-s">Class Code: {classCode}</p>

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
        <h1 id="noStudentsLable" style={{display: isNoStudentLable ? "flex" : "none"}} className="text-red-200 m-2">No Students</h1>
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
      <button className="dark:bg-green-600 w-40 ml-[48%] bg-green-400 p-2 rounded-md transition-[1] hover:drop-shadow-lg hover:drop-shadow-green-900 text-black dark:text-white"
      onClick={markAttendance}>Mark Attendance</button>
    </div>
  );
}

     