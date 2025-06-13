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
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="text-md mx-4 flex max-h-[90vh] w-full flex-col rounded-xl border-2 border-black/70 bg-white p-6 font-medium shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">
                  Редагування вправи
               </h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => {
                     setIsEditExerciseModalOpen(false)
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-5xl leading-none font-bold text-red-500 hover:bg-red-100"
               >
                  <span className="-translate-y-1.5">&times;</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="w-full pr-4 pl-2">
                  <div className="mb-4">
                     <label className="mb-2 block text-left" htmlFor="name">
                        Назва вправи
                     </label>
                     <input
                        type="text"
                        id="name"
                        className="mb-2 w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                     {errorName && (
                        <p className="mt-1 block text-left text-red-600">
                           {errorName}
                        </p>
                     )}
                  </div>
                  <div className="mb-4 flex flex-row items-center justify-between rounded-md py-2 pr-2 transition-all duration-200 hover:bg-gray-300/50 active:bg-gray-300/50">
                     <label className="block" htmlFor="reps">
                        Фікусувати кількість повторень:
                     </label>
                     <input
                        type="checkbox"
                        id="reps"
                        checked={hasReps}
                        onChange={(e) => setHasReps(e.target.checked)}
                     />
                  </div>
                  <div className="mb-4 flex flex-row items-center justify-between rounded-md py-2 pr-2 transition-all duration-200 hover:bg-gray-300/50 active:bg-gray-300/50">
                     <label className="block" htmlFor="weight">
                        Фіксувати робочу вагу:
                     </label>
                     <input
                        type="checkbox"
                        id="weight"
                        checked={hasWeight}
                        onChange={(e) => setHasWeight(e.target.checked)}
                     />
                  </div>
                  <div className="mb-4 flex flex-row items-center justify-between rounded-md py-2 pr-2 transition-all duration-200 hover:bg-gray-300/50 active:bg-gray-300/50">
                     <label className="block" htmlFor="time">
                        Фіксувати час виконання:
                     </label>
                     <input
                        type="checkbox"
                        id="time"
                        checked={hasTime}
                        onChange={(e) => setHasTime(e.target.checked)}
                     />
                  </div>
                  {errorCheckboxes && (
                     <p className="mt-1 block text-left text-red-600">
                        {errorCheckboxes}
                     </p>
                  )}
               </div>
               <h2 className="horizontal-line"></h2>
               <div className="flex flex-col gap-4">
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
         </div>
      </div>
   )
}

export default EditExerciseModal
