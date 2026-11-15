'use client'

interface topMenuProp{
    Department:string;
    classSection:string;
    year:number;
    classc:string;
    onDepartmentChange:(dept:string)=>void;
    onClassSectionChange:(sec:string)=>void;
    onYearChange:(year:string)=>void;
}

export default function topMenu({
    Department,
    classSection,
    year,
    classc,
    onDepartmentChange,
    onClassSectionChange,
    onYearChange
}:topMenuProp){
    return(
        <div>
        <h1 className="text-lg font-semibold mb-2">Select Class Details</h1>
        <p className="text-gray-400 text-s">Class Code: {classc}</p>

        {/*Department selection section*/}
        <select
          value={Department}
          onChange={(e) => onDepartmentChange(e.target.value)}
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
          value={classSection}
          onChange={(e) => onClassSectionChange(e.target.value)}
          className="border border-gray-300 rounded-md p-2 m-2"
        >
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
        </select>

        {/*Year selection section*/}
        <select
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="border border-gray-300 rounded-md p-2 m-2"
        >
          <option value={1}>Year 1</option>
          <option value={2}>Year 2</option>
          <option value={3}>Year 3</option>
          <option value={4}>Year 4</option>
        </select>
      </div>
    )
}