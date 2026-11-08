'use client'
import { useEffect, useState } from "react";

import Scard, { type StudentStatus } from "@/components/studentCard";

interface StudentData{
  name:string;
  rollNo:string;
  registerNo:number;
  status:StudentStatus;
}


export default function Home() {
  // State variables to hold the selected department, class section, and year
  const [selectedDepartment, setSelectedDepartment] = useState("cse");
  const [classSection, setClassSection] = useState("A");
  const [selectedYear, setSelectedYear] = useState("1");
  /*
    StudentName;
    StudentRollNo;
    StudentRegisterNo;
    Status - P,A or OD;
  */
  const [studentData, setStudentData] = useState<StudentData[]>([{
    name:"Example Student 1",
    rollNo:"EXS26123",
    registerNo:2314567849375729,
    status:"P",
  },{
    name:"Example Student 2",
    rollNo:"EXS26546",
    registerNo:23145678493756578,
    status:"P",
  }]);

  const handleStudentStatusChange = (index: number, status: StudentStatus) => {
    setStudentData((currentStudents) =>
      currentStudents.map((student, studentIndex) =>
        studentIndex === index ? { ...student, status } : student
      )
    );
  };

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
          <option value="cse">CSE</option>
          <option value="it">IT</option>
          <option value="ece">ECE</option>
          <option value="eee">EEE</option>
          <option value="mech">MECH</option>
        </select>

        {/*Class Section selection section*/}
        <select
          value={classSection}
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
        {
          studentData.map((e,i)=>(
            <Scard
              key={i}
              sno={i+1}
              studentName={e.name}
              studentRoll={e.rollNo}
              studentReg={e.registerNo}
              status={e.status}
              onStatusChange={(status) => handleStudentStatusChange(i, status)}
            />
          ))
        }
      </div>
    </div>
  );
}

     