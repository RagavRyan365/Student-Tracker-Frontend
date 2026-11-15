'use client'
import { useEffect, useState } from "react";
import axios from "axios";

import ScardEdit, { type StudentStatus } from "@/components/studentCardEdit";
import Scard from "@/components/studentCard";
import TopMenu from "@/components/topMenu";

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
  const [selectedDepartment, setSelectedDepartment] = useState<string>("IT");
  const [selectedclassSection, setSelectedClassSection] = useState<string>("C");
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [classCode,setClassCode] = useState<string>("ITC2026");

  /*
    StudentName;
    StudentRollNo;
    StudentRegisterNo;
    Status - P,A or OD;
  */
  const [studentData, setStudentData] = useState<StudentData[]>([]);

  //State of the No student lable
  const [isNoStudentLable,setIsNoStudentLable] = useState<boolean>(false);
  const [isAttendanceMarked,setIsAttendanceMarked] = useState<boolean>(false);

  const handleStudentStatusChange = (index: number, status: StudentStatus) => {
    setStudentData((currentStudents) =>
      currentStudents.map((student, studentIndex) =>
        studentIndex === index ? { ...student, status } : student
      )
    );
  };

  const handleDepartmentSelector = (dept:string)=>{
    setSelectedDepartment(dept);
  };

  const handleClassSectionSelector = (sec:string)=>{
    setSelectedClassSection(sec);
  };
  
  const handleYearSelector = (year:number)=>{
    setSelectedYear(year);
  }

  function markAttendance(){
    axios.post(`${backend}/api/mark/attendance`,{
      studentsData:studentData,
      subjectCode:"ITHS02",
      classCode:classCode
    }).then((response)=>{
      setIsAttendanceMarked(true);
      console.log(response.data);
    })
  }

  useEffect(()=>{
    axios.get(`${backend}/api/verify/attendance/ITHS02/${classCode}`).then((response)=>{
      setIsAttendanceMarked(false);
    }).catch((error:unknown)=>{
      if(axios.isAxiosError(error) && error.response?.status === 400){
        setIsAttendanceMarked(true);
      }
    })
  },[classCode])

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
  
  if(!isAttendanceMarked)return (
    <div className="flex min-h-screen flex-col lg:p-24 p-4">

      <TopMenu 
        Department={selectedDepartment}
        classSection={selectedclassSection}
        year={selectedYear}
        classc={classCode}
        onDepartmentChange={(dept)=>handleDepartmentSelector(dept)}
        onClassSectionChange={(sec)=>handleClassSectionSelector(sec)}
        onYearChange={(year)=>handleYearSelector(year)}
      />
  
      <div className="flex flex-col">
        <h1 id="noStudentsLable" style={{display: isNoStudentLable ? "flex" : "none"}} className="text-red-200 m-2">No Students</h1>
        {
          studentData.map((e,i)=>(
            <ScardEdit
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
      <div className="mt-6 flex justify-end lg:pr-[40%]">
        <button
          className="w-40 rounded-md bg-green-400 p-2 text-black transition-[1] hover:drop-shadow-lg hover:drop-shadow-green-900 dark:bg-green-600 dark:text-white"
          onClick={markAttendance} disabled={isAttendanceMarked}
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );

  else return(
    <div className="flex min-h-screen flex-col lg:p-24 p-4">

      <TopMenu 
        Department={selectedDepartment}
        classSection={selectedclassSection}
        year={selectedYear}
        classc={classCode}
        onDepartmentChange={(dept)=>handleDepartmentSelector(dept)}
        onClassSectionChange={(sec)=>handleClassSectionSelector(sec)}
        onYearChange={(year)=>handleYearSelector(year)}
      />
  
      <div className="flex flex-col">
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
            />
          ))
        }
      </div>
    </div>
  );
}

     