import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IExercise } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setExercises } from '../../../features/dataSlice'
import { createPortal } from 'react-dom'

interface IEditExerciseModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   activeExercise: IExercise
}

const EditExerciseModal = ({
   setIsModalOpen,
   activeExercise,
}: IEditExerciseModalProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const dispatch = useAppDispatch()

   const [name, setName] = useState<string>(activeExercise.name)
   const [hasReps, setHasReps] = useState<boolean>(
      activeExercise?.hasReps ?? false
   )
   const [hasWeight, setHasWeight] = useState<boolean>(
      activeExercise?.hasWeight ?? false
   )
   const [hasTime, setHasTime] = useState<boolean>(
      activeExercise?.hasTime ?? false
   )

   const [errorName, setErrorName] = useState<string>('')

   useEffect(() => {
      if (name === '') {
         setErrorName('Назва вправи не може бути порожньою.')
      } else {
         setErrorName('')
      }
   }, [name])

   const handleClick = () => {
      const newExercises: IExercise[] = [...exercises]
      const exerciseIndex: number = newExercises.findIndex(
         (ex) => ex._id === activeExercise._id
      )
      if (exerciseIndex !== -1) {
         newExercises[exerciseIndex] = {
            ...newExercises[exerciseIndex],
            name,
            hasReps,
            hasWeight,
            hasTime,
         }
      }
      dispatch(setExercises(newExercises))
      setIsModalOpen(false)
   }

   return createPortal(
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>
                  Редагування вправи <br className="block sm:hidden"></br>"
                  {activeExercise.name}"
               </h2>
               <button
                  type="button"
                  aria-label="Close"
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
                     <label htmlFor="name">Назва вправи</label>
                     <input
                        type="text"
                        id="name"
                        className="mb-2"
                        placeholder="Введіть назву вправи"
                        value={name}
                        onChange={(e) => {
                           setName(
                              e.target.value.trim() === '' ? '' : e.target.value
                           )
                        }}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              e.preventDefault()
                           }
                        }}
                        autoComplete="off"
                     />
                     {errorName && <p className="error-message">{errorName}</p>}
                  </div>
                  <div className="checkbox-block">
                     <label htmlFor="reps">
                        Фікусувати кількість повторень:
                     </label>
                     <input
                        type="checkbox"
                        id="reps"
                        checked={hasReps}
                        onChange={(e) => setHasReps(e.target.checked)}
                     />
                  </div>
                  <div className="checkbox-block">
                     <label htmlFor="weight">Фіксувати робочу вагу:</label>
                     <input
                        type="checkbox"
                        id="weight"
                        checked={hasWeight}
                        onChange={(e) => setHasWeight(e.target.checked)}
                     />
                  </div>
                  <div className="checkbox-block">
                     <label htmlFor="time">Фіксувати час виконання:</label>
                     <input
                        type="checkbox"
                        id="time"
                        checked={hasTime}
                        onChange={(e) => setHasTime(e.target.checked)}
                     />
                  </div>
               </div>
            </div>
            <h2 className="horizontal-line"></h2>
            <button
               type="button"
               className="button-edit button-modal"
               onClick={handleClick}
               disabled={errorName !== ''}
            >
               редагувати
            </button>
         </div>
      </div>,
      document.body
   )
}

export default EditExerciseModal
