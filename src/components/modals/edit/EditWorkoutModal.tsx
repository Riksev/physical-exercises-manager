import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IWorkout } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setWorkouts } from '../../../features/dataSlice'

interface IEditWorkoutModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   activeWorkout: IWorkout
}

const EditWorkoutModal = ({
   setIsModalOpen,
   activeWorkout,
}: IEditWorkoutModalProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   const [date, setDate] = useState<string>(() => {
      const now = new Date(activeWorkout.date)
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
         const workoutOnDate = workouts.find((w) => w.date === date)
         if (!workoutOnDate) {
            setErrorDate('')
         } else {
            setErrorDate('Тренування на цю дату вже існує.')
         }
      }
   }, [date, workouts])

   const handleClick = () => {
      const editedWorkout: IWorkout = {
         ...activeWorkout,
         date,
      }
      const newWorkouts = [...workouts]
      const workoutIndex = newWorkouts.findIndex(
         (w) => w._id === activeWorkout._id
      )
      if (workoutIndex !== -1) {
         newWorkouts.splice(workoutIndex, 1)
         let isInserted = false
         for (let i = 0; i < newWorkouts.length; i++) {
            if (newWorkouts[i].date > editedWorkout.date) {
               newWorkouts.splice(i, 0, editedWorkout)
               isInserted = true
               break
            }
         }
         if (!isInserted) {
            newWorkouts.push(editedWorkout)
         }
      }
      dispatch(setWorkouts(newWorkouts))

      setIsModalOpen(false)
   }

   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>
                  Редагування тренування <br className="block sm:hidden"></br>"
                  {activeWorkout.date}"
               </h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsModalOpen(false)
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
               onClick={handleClick}
               disabled={errorDate !== ''}
            >
               редагувати
            </button>
         </div>
      </div>
   )
}

export default EditWorkoutModal
