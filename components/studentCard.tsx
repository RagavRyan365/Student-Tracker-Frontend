'use client'

export type StudentStatus = 'P' | 'A' | 'OD';

interface StudentCardProps {
  sno: number;
  studentName: string;
  studentReg: number;
  studentRoll: string;
  status: StudentStatus;
  onStatusChange: (status: StudentStatus) => void;
}

export default function StudentCard({
  sno,
  studentName,
  studentReg,
  studentRoll,
  status,
  onStatusChange,
}: StudentCardProps) {

  // Text weight mapping based on priority:
  // sno-1 (boldest), name-2, roll no-4, register number-6 (lightest)
  return (
    <div className="flex items-center m-4 gap-4 rounded-sm p-4 shadow-sm min-w-0 dark:bg-gray-900 bg-gray-200">

      {/* Student info column */}
      <div className="flex flex-col gap-1.5">
            {/* sno, name, roll number horizontal row */}
            <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider">
                    {sno}
                </span>
                <span className="font-medium text-xs">Reg: {studentReg}</span>
            </div>
            <span className="font-normal text-xs">Roll: {studentRoll}</span>

            {/* register number below the horizontal row */}
            <span className="font-light text-xxs text-gray-500">
            Name: {studentName}
            </span>
      </div>

      {/* Three radio buttons on the right */}
      <div className="flex flex-col gap-1">
        <label>
          <input
            type="radio"
            name={"studentStatus" + sno}
            value="p"
            checked={status === 'P'}
            onChange={() => onStatusChange('P')}
            className="rounded w-3.5 h-3.5 border-gray-300 bg-white focus:outline-none"
          />
          <span className="text-xs mx-1 font-medium text-gray-800 dark:text-gray-200">Present</span>
        </label>
        <label>
          <input
            type="radio"
            name={"studentStatus" + sno}
            value="a"
            checked={status === 'A'}
            onChange={() => onStatusChange('A')}
            className="rounded w-3.5 h-3.5 border-gray-300 bg-white focus:outline-none"
          />
          <span className="text-xs mx-1 font-medium text-gray-800 dark:text-gray-200">Absent</span>
        </label>
        <label>
          <input
            type="radio"
            name={"studentStatus" + sno}
            value="od"
            onChange={() => onStatusChange('OD')}
            checked={status === 'OD'}
            className="rounded w-3.5 h-3.5 border-gray-300 bg-white focus:outline-none"
          />
          <span className="text-xs mx-1 font-medium text-gray-800 dark:text-gray-200">OD</span>
        </label>
      </div>

    </div>
  )
}