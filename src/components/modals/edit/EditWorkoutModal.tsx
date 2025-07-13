import { useEffect, useState } from 'react'
import type { IEditWorkoutModalProps, IWorkout } from '../../../interfaces'

const EditWorkoutModal = ({
   setIsEditWorkoutModalOpen,
   setWorkouts,
   activeWorkout,
}: IEditWorkoutModalProps) => {
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
            const workoutOnDate = prev.find((w) => w.date === date)
            if (!workoutOnDate) {
               setErrorDate('')
            } else {
               setErrorDate('Тренування на цю дату вже існує.')
            }
            return prev
         })
      }
   }, [date, setWorkouts, activeWorkout])

   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Редагування тренування</h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsEditWorkoutModalOpen(false)
                  }}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <div className="content-overflow-y">
               <div className="modal-main">
                  <div className="input-block">
                     <label htmlFor="date">Дата</label>
                     <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => {
                           setDate(e.target.value)
                        }}
                     />
                     {errorDate && <p className="error-message">{errorDate}</p>}
                  </div>
               </div>
            </div>
            <h2 className="horizontal-line"></h2>
            <button
               type="button"
               className="button-edit button-modal"
               onClick={() => {
                  setWorkouts((prev) => {
                     const editedWorkout: IWorkout = {
                        ...activeWorkout,
                        date,
                     }
                     const updated = [...prev]
                     const workoutIndex = updated.findIndex(
                        (w) => w._id === activeWorkout._id
                     )
                     if (workoutIndex !== -1) {
                        updated.splice(workoutIndex, 1)
                        let isInserted = false
                        for (let i = 0; i < updated.length; i++) {
                           if (updated[i].date > editedWorkout.date) {
                              updated.splice(i, 0, editedWorkout)
                              isInserted = true
                              break
                           }
                        }
                        if (!isInserted) {
                           updated.push(editedWorkout)
                        }
                     }
                     setIsEditWorkoutModalOpen(false)
                     return updated
                  })
               }}
               disabled={errorDate !== ''}
            >
               редагувати
            </button>
         </div>
      </div>
   )
}

export default EditWorkoutModal
