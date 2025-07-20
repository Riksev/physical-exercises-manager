import { useEffect, useState } from 'react'
import type { IAddWorkoutModalProps, IWorkout } from '../../../interfaces'

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
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Додавання тренування</h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsAddWorkoutModalOpen(false)
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
               className="button-add button-modal"
               onClick={() => {
                  setWorkouts((prev) => {
                     const newWorkout: IWorkout = {
                        _id: new Date().getTime().toString(),
                        date,
                        addedAt: new Date().toISOString(),
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
   )
}

export default AddWorkoutModal
