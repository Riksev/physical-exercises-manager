import { useEffect, useState } from 'react'
import type { IAddWorkoutModalProps, IWorkout } from '../../interfaces'

const AddWorkoutModal = ({
   setIsAddWorkoutModalOpen,
   setWorkouts,
   setActiveWorkout,
}: IAddWorkoutModalProps) => {
   const [date, setDate] = useState<string>(() => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
   })

   const [errorDate, setErrorDate] = useState<string>('')

   useEffect(() => {
      if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDate('Дата не може бути порожньою.')
      } else {
         setWorkouts((prev) => {
            if (prev.findIndex((w) => w.date === date) === -1) {
               setErrorDate('')
            } else {
               setErrorDate('Тренування на цю дату вже існує.')
            }
            return prev
         })
      }
   }, [date, setWorkouts])

   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-xl border-2 border-black/70 bg-white p-6 text-lg font-medium shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">
                  Додавання тренування
               </h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsAddWorkoutModalOpen(false)
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-5xl leading-none font-bold text-red-500 hover:bg-red-100"
               >
                  <span className="-translate-y-1.5">&times;</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="w-full pr-4 pl-2">
                  <div className="mb-4 text-left">
                     <label className="mb-2 block text-left" htmlFor="date">
                        Дата
                     </label>
                     <input
                        type="date"
                        id="date"
                        className="w-full rounded border border-gray-300 p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={date}
                        onChange={(e) => {
                           setDate(e.target.value)
                        }}
                     />
                     {errorDate && (
                        <p className="mt-1 block text-left text-red-600">
                           {errorDate}
                        </p>
                     )}
                  </div>
               </div>
               <h2 className="horizontal-line"></h2>
               <div className="flex flex-col gap-4">
                  <button
                     type="button"
                     className="button-add button-modal"
                     onClick={() => {
                        setWorkouts((prev) => {
                           const newWorkout: IWorkout = {
                              _id: new Date().getTime().toString(),
                              date,
                              exercises: [],
                           }
                           const updated = [...prev]
                           let isInserted = false
                           for (let i = 0; i < updated.length; i++) {
                              if (updated[i].date > newWorkout.date) {
                                 updated.splice(i, 0, newWorkout)
                                 setActiveWorkout(newWorkout)
                                 isInserted = true
                                 break
                              }
                           }
                           if (!isInserted) {
                              updated.push(newWorkout)
                              setActiveWorkout(newWorkout)
                           }
                           setIsAddWorkoutModalOpen(false)
                           return updated
                        })
                     }}
                     disabled={errorDate !== ''}
                  >
                     додати
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AddWorkoutModal
