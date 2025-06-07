import { useEffect, useState } from 'react'
import type { IEditExerciseModalProps } from '../../interfaces'

const EditExerciseModal = ({
   setIsEditExerciseModalOpen,
   setExercises,
   exercises,
   activeExercise,
   setActiveExercise,
}: IEditExerciseModalProps) => {
   const exercise = exercises.find(
      (exercise) => exercise.name === activeExercise.name
   )

   const [name, setName] = useState<string>(exercise ? exercise.name : '')
   const [hasReps, setHasReps] = useState<boolean>(
      exercise ? exercise.hasReps : false
   )
   const [hasWeight, setHasWeight] = useState<boolean>(
      exercise ? exercise.hasWeight : false
   )
   const [hasTime, setHasTime] = useState<boolean>(
      exercise ? exercise.hasTime : false
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
         <div className="text-md mx-4 max-h-[90vh] w-full overflow-y-auto rounded-xl border-2 border-black/70 bg-white p-6 font-medium shadow-lg sm:w-2/3 lg:w-1/3">
            <h2 className="mb-8 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold">
               Редагування вправи
            </h2>
            <form>
               <div className="w-full">
                  <div className="mb-4">
                     <label className="mb-2 block text-left" htmlFor="name">
                        Назва вправи
                     </label>
                     <input
                        type="text"
                        id="name"
                        className="w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  <div className="mb-4 flex flex-row items-center justify-between rounded-md p-2 transition-all duration-200 hover:bg-gray-300/50 active:bg-gray-300/50">
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
                  <div className="mb-4 flex flex-row items-center justify-between rounded-md p-2 transition-all duration-200 hover:bg-gray-300/50 active:bg-gray-300/50">
                     <label className="block" htmlFor="weight">
                        Фіксувати додаткову вагу:
                     </label>
                     <input
                        type="checkbox"
                        id="weight"
                        checked={hasWeight}
                        onChange={(e) => setHasWeight(e.target.checked)}
                     />
                  </div>
                  <div className="mb-4 flex flex-row items-center justify-between rounded-md p-2 transition-all duration-200 hover:bg-gray-300/50 active:bg-gray-300/50">
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
               <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold"></h2>
               <div className="flex flex-col gap-4">
                  <button
                     type="button"
                     className="w-full bg-yellow-500 px-4 py-2 hover:bg-yellow-600 active:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-600 disabled:opacity-50"
                     onClick={() => {
                        const newExercises = exercises.map((exercise) => {
                           if (exercise.name === activeExercise.name) {
                              const newExercise = {
                                 ...exercise,
                                 name,
                                 hasReps,
                                 hasWeight,
                                 hasTime,
                              }
                              setActiveExercise(newExercise)
                              return newExercise
                           }
                           return exercise
                        })
                        setExercises(newExercises)
                        setIsEditExerciseModalOpen(false)
                     }}
                     disabled={
                        errorName !== '' || (!hasReps && !hasWeight && !hasTime)
                     }
                  >
                     редагувати
                  </button>
                  <button
                     type="button"
                     className="w-full bg-gray-300 px-4 py-2 hover:bg-gray-400 active:bg-gray-400"
                     onClick={() => {
                        setIsEditExerciseModalOpen(false)
                     }}
                  >
                     скасувати
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default EditExerciseModal
