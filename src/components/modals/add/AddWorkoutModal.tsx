import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IWorkout } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setWorkouts } from '../../../features/dataSlice'

interface IAddWorkoutModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
}

const AddWorkoutModal = ({
   setIsModalOpen,
   setActiveWorkout,
}: IAddWorkoutModalProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

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
         if (workouts.findIndex((w) => w.date === date) === -1) {
            setErrorDate('')
         } else {
            setErrorDate('Тренування на цю дату вже існує.')
         }
      }
   }, [date, workouts])

   const handleClick = () => {
      const newWorkout: IWorkout = {
         _id: new Date().getTime().toString(),
         date,
         addedAt: new Date().toISOString(),
         exercises: [],
      }
      const newWorkouts = [...workouts]
      let isInserted = false
      for (let i = 0; i < newWorkouts.length; i++) {
         if (newWorkouts[i].date > newWorkout.date) {
            newWorkouts.splice(i, 0, newWorkout)
            setActiveWorkout(newWorkout)
            isInserted = true
            break
         }
      }
      if (!isInserted) {
         newWorkouts.push(newWorkout)
         setActiveWorkout(newWorkout)
      }
      dispatch(setWorkouts(newWorkouts))

      setIsModalOpen(false)
   }

   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Додавання тренування</h2>
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
               className="button-add button-modal"
               onClick={handleClick}
               disabled={errorDate !== ''}
            >
               додати
            </button>
         </div>
      </div>
   )
}

export default AddWorkoutModal
