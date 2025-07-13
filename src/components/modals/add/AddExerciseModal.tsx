import { useEffect, useState } from 'react'
import type { IAddExerciseModalProps, IExercise } from '../../../interfaces'

const AddExerciseModal = ({
   setIsAddExerciseModalOpen,
   setExercises,
}: IAddExerciseModalProps) => {
   const [name, setName] = useState<string>('')
   const [hasReps, setHasReps] = useState<boolean>(false)
   const [hasWeight, setHasWeight] = useState<boolean>(false)
   const [hasTime, setHasTime] = useState<boolean>(false)

   const [errorName, setErrorName] = useState<string>('')
   const [errorCheckboxes, setErrorCheckboxes] = useState<string>('')

   useEffect(() => {
      if (name === '') {
         setErrorName('Назва вправи не може бути порожньою.')
      } else {
         setErrorName('')
      }
   }, [name])

   useEffect(() => {
      if (!hasReps && !hasWeight && !hasTime) {
         setErrorCheckboxes('Хоча б один з параметрів має бути обраний.')
      } else {
         setErrorCheckboxes('')
      }
   }, [hasReps, hasWeight, hasTime])

   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Додавання вправи</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => {
                     setIsAddExerciseModalOpen(false)
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
                  {errorCheckboxes && (
                     <p className="error-message">{errorCheckboxes}</p>
                  )}
               </div>
            </div>
            <h2 className="horizontal-line"></h2>
            <button
               type="button"
               className="button-add button-modal"
               onClick={() => {
                  const newExercise: IExercise = {
                     _id: Date.now().toString(),
                     name,
                     hasReps,
                     hasWeight,
                     hasTime,
                  }
                  setExercises((prevExercises: IExercise[]) => {
                     const updatedExercises: IExercise[] = [...prevExercises]
                     let inserted = false
                     for (let i = 0; i < updatedExercises.length; i++) {
                        if (
                           updatedExercises[i].name.trim().toLowerCase() ===
                           newExercise.name.trim().toLowerCase()
                        ) {
                           inserted = true
                           break
                        } else if (
                           updatedExercises[i].name.trim().toLowerCase() >
                           newExercise.name.trim().toLowerCase()
                        ) {
                           inserted = true
                           updatedExercises.splice(i, 0, newExercise)
                           break
                        }
                     }
                     if (!inserted) {
                        updatedExercises.push(newExercise)
                     }
                     return updatedExercises
                  })
                  setIsAddExerciseModalOpen(false)
               }}
               disabled={
                  errorName !== '' || (!hasReps && !hasWeight && !hasTime)
               }
            >
               додати
            </button>
         </div>
      </div>
   )
}

export default AddExerciseModal
