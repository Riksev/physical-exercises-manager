import { useEffect, useState } from 'react'
import type { IWorkoutStatisticsProps } from '../../interfaces'

const WorkoutStatistics = ({
   activeWorkout,
   isAddRecordModalOpen,
}: IWorkoutStatisticsProps) => {
   const [startTime, setStartTime] = useState('-')
   const [endTime, setEndTime] = useState('-')
   const [duration, setDuration] = useState('-')

   const getTimeString = (date: Date): string => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
   }

   useEffect(() => {
      if (!isAddRecordModalOpen) {
         let minTime: string = startTime
         let maxTime: string = endTime

         for (const exercise of activeWorkout.exercises) {
            for (const record of exercise.records) {
               const currentRecordTime = record?.addedAt
               if (currentRecordTime) {
                  if (minTime === '-' || currentRecordTime < minTime) {
                     minTime = currentRecordTime
                  }
                  if (maxTime === '-' || currentRecordTime > maxTime) {
                     maxTime = currentRecordTime
                  }
               }
            }
         }
         setStartTime(minTime)
         setEndTime(maxTime)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isAddRecordModalOpen])

   useEffect(() => {
      if (startTime !== '-' && endTime !== '-') {
         const start = new Date(startTime)
         const end = new Date(endTime)
         if (end.getTime() < start.getTime()) {
            setDuration('-')
            return
         }
         const diff = end.getTime() - start.getTime()
         const hours = Math.floor(diff / 3600000)
         const minutes = Math.floor((diff % 3600000) / 60000)
         const seconds = Math.floor((diff % 60000) / 1000)

         setDuration(`${hours} год. ${minutes} хв. ${seconds} сек.`)
      }
   }, [startTime, endTime])

   return (
      <details className="details">
         <summary>Статистика</summary>
         <h2 className="horizontal-line"></h2>
         <p className="text-center font-bold uppercase">Час</p>
         <p>
            Початок:{' '}
            {startTime === '-' ? startTime : getTimeString(new Date(startTime))}
         </p>
         <p>
            Кінець:{' '}
            {endTime === '-' ? endTime : getTimeString(new Date(endTime))}
         </p>
         <p>Тривалість: {duration}</p>
      </details>
   )
}

export default WorkoutStatistics
