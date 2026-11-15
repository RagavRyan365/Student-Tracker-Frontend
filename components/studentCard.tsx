'use client'

export type StudentStatus = 'P' | 'A' | 'OD';

interface StudentCardProps {
  sno: number;
  studentName: string;
  studentReg: number;
  studentRoll: string;
  status: StudentStatus;
}

export default function StudentCard({
  sno,
  studentName,
  studentReg,
  studentRoll,
  status
}: StudentCardProps) {

  // Text weight mapping based on priority:
  // sno-1 (boldest), name-2, roll no-4, register number-6 (lightest)
  return (
    <div className="flex items-center m-4 lg:mr-[40%] gap-4 rounded-sm p-4 shadow-sm min-w-0 dark:bg-gray-900 bg-gray-200">

      {/* Student info column */}
      <div className="flex flex-col gap-1.5 mr-auto">
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
      <h1>{status}</h1>

    </div>
  )
}