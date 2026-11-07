'use client'
import { useState } from 'react'

export default function studentCard(props: any) {
  const [status, setStatus] = useState<'present' | 'absent' | 'od'>('present')
  const { sno = '1', studentName = 'Student Name', studentReg = '1234567890', studentRoll = 'AB12345' } = props

  const [cardColor,setColor] = useState("gray-500")

  // Text weight mapping based on priority:
  // sno-1 (boldest), name-2, roll no-4, register number-6 (lightest)
  return (
    <div className="flex items-center gap-4 rounded-sm p-4 shadow-sm min-w-0">
      {/* Student info column */}
      <div className="flex flex-col gap-1.5">
            {/* sno, name, roll number horizontal row */}
            <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider">
                    {sno}
                </span>
                <span className="font-medium text-xs">{studentName}</span>
            </div>
            <span className="font-normal text-xs">Roll: {studentRoll}</span>

            {/* register number below the horizontal row */}
            <span className="font-light text-xxs text-gray-500">
            Reg: {studentReg}
            </span>
      </div>

      {/* Three radio buttons on the right */}
      <div className="flex flex-col gap-1">
        <label>
          <input
            type="radio"
            name="studentStatus"
            value="present"
            checked={status === 'present'}
            onChange={() => setStatus('present')}
            className="rounded w-3.5 h-3.5 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-xs font-medium text-gray-700">Present</span>
        </label>
        <label>
          <input
            type="radio"
            name="studentStatus"
            value="absent"
            checked={status === 'absent'}
            onChange={() => setStatus('absent')}
            className="rounded w-3.5 h-3.5 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-xs font-medium text-gray-700">Absent</span>
        </label>
        <label>
          <input
            type="radio"
            name="studentStatus"
            value="od"
            checked={status === 'od'}
            onChange={() => setStatus('od')}
            className="rounded w-3.5 h-3.5 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-xs font-medium text-gray-700">OD</span>
        </label>
      </div>
    </div>
  )
}