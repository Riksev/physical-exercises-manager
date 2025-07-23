import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IExercise } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setExercises } from '../../../features/dataSlice'
import { createPortal } from 'react-dom'

interface IAddExerciseModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddExerciseModal = ({ setIsModalOpen }: IAddExerciseModalProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const dispatch = useAppDispatch()

   const [name, setName] = useState<string>('')
   const [hasReps, setHasReps] = useState<boolean>(false)
   const [hasWeight, setHasWeight] = useState<boolean>(false)
   const [hasTime, setHasTime] = useState<boolean>(false)

   const [errorName, setErrorName] = useState<string>('')

   useEffect(() => {
      if (name === '') {
         setErrorName('Назва вправи не може бути порожньою.')
      } else {
         setErrorName('')
      }
   }, [name])

   const handleClick = () => {
      const newExercise: IExercise = {
         _id: Date.now().toString(),
         name,
         hasReps,
         hasWeight,
         hasTime,
      }
      const newExercises: IExercise[] = [...exercises]
      let inserted: boolean = false
      for (let i: number = 0; i < newExercises.length; i++) {
         if (
            newExercises[i].name.trim().toLowerCase() ===
            newExercise.name.trim().toLowerCase()
         ) {
            inserted = true
            break
         } else if (
            newExercises[i].name.trim().toLowerCase() >
            newExercise.name.trim().toLowerCase()
         ) {
            inserted = true
            newExercises.splice(i, 0, newExercise)
            break
         }
      }
      if (!inserted) {
         newExercises.push(newExercise)
      }
      dispatch(setExercises(newExercises))

      setIsModalOpen(false)
   }

   return createPortal(
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Додавання вправи</h2>
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
                        placeholder="Введіть назву вправи"
                        autoComplete="off"
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
                        onChange={(e) => setHasReps(e.target.checked)}
                     />
                  </div>
                  <div className="checkbox-block">
                     <label htmlFor="weight">Фіксувати робочу вагу:</label>
                     <input
                        type="checkbox"
                        id="weight"
                        onChange={(e) => setHasWeight(e.target.checked)}
                     />
                  </div>
                  <div className="checkbox-block">
                     <label htmlFor="time">Фіксувати час виконання:</label>
                     <input
                        type="checkbox"
                        id="time"
                        onChange={(e) => setHasTime(e.target.checked)}
                     />
                  </div>
               </div>
            </div>
            <h2 className="horizontal-line"></h2>
            <button
               type="button"
               className="button-add button-modal"
               onClick={handleClick}
               disabled={errorName !== ''}
            >
               додати
            </button>
         </div>
      </div>,
      document.body
   )
}

export default AddExerciseModal
