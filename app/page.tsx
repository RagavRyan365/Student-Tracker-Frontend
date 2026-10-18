'use client'
import {useState} from "react";

export default function Home() {
  // State variables to hold the selected department, class section, and year
  const [selectedDepartment, setSelectedDepartment] = useState("cse");
  const [classSection, setClassSection] = useState("A");
  const [selectedYear, setSelectedYear] = useState("1");
  const [studentData, setStudentData] = useState([]);

  return (

    <div className="flex min-h-screen flex-col lg:p-24 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Class Details</h3>
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
    </div>
  );
}

     