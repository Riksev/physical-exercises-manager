import { useEffect, useState } from 'react'
import type { IEditExerciseModalProps } from '../../interfaces'

const EditExerciseModal = ({
   setIsEditExerciseModalOpen,
   setExercises,
   activeExercise,
}: IEditExerciseModalProps) => {
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
   const [errorCheckboxes, setErrorCheckboxes] = useState<string>('')

   useEffect(() => {
      if (!hasReps && !hasWeight && !hasTime) {
         setErrorCheckboxes('Хоча б один з параметрів має бути обраний.')
      } else {
         setErrorCheckboxes('')
      }
   }, [hasReps, hasWeight, hasTime])

   useEffect(() => {
      if (name === '') {
         setErrorName('Назва вправи не може бути порожньою.')
      } else {
         setErrorName('')
      }
   }, [name])

   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Редагування вправи</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => {
                     setIsEditExerciseModalOpen(false)
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
                  {errorCheckboxes && (
                     <p className="error-message">{errorCheckboxes}</p>
                  )}
               </div>
            </div>
            <h2 className="horizontal-line"></h2>
            <button
               type="button"
               className="button-edit button-modal"
               onClick={() => {
                  setExercises((prev) => {
                     const updated = [...prev]
                     const exerciseIndex = updated.findIndex(
                        (ex) => ex._id === activeExercise._id
                     )
                     if (exerciseIndex !== -1) {
                        updated[exerciseIndex].name = name
                        updated[exerciseIndex].hasReps = hasReps
                        updated[exerciseIndex].hasWeight = hasWeight
                        updated[exerciseIndex].hasTime = hasTime
                     }
                     setIsEditExerciseModalOpen(false)
                     return updated
                  })
               }}
               disabled={
                  errorName !== '' || (!hasReps && !hasWeight && !hasTime)
               }
            >
               редагувати
            </button>
         </div>
      </div>
   )
}

export default EditExerciseModal
