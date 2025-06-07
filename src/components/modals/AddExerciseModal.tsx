import { useEffect, useState } from 'react'
import type { IAddExerciseModalProps, IExercise } from '../../interfaces'

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
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="text-md mx-4 max-h-[90vh] w-full overflow-y-auto rounded-xl border-2 border-black/70 bg-white p-6 font-medium shadow-lg sm:w-2/3 lg:w-1/3">
            <h2 className="mb-8 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold">
               Додавання вправи
            </h2>
            <form>
               <div className="mb-4">
                  <label className="mb-2 block text-left" htmlFor="name">
                     Назва вправи
                  </label>
                  <input
                     type="text"
                     id="name"
                     className="w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                     onChange={(e) => setHasTime(e.target.checked)}
                  />
               </div>
               {errorCheckboxes && (
                  <p className="mt-1 block text-left text-red-600">
                     {errorCheckboxes}
                  </p>
               )}
               <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold"></h2>
               <div className="flex flex-col gap-4">
                  <button
                     id="addExerciseButton"
                     type="button"
                     className="w-full bg-green-500 px-4 py-2 hover:bg-green-600 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-600 disabled:opacity-50"
                     onClick={() => {
                        const newExercise: IExercise = {
                           _id: Date.now().toString(),
                           name,
                           hasReps,
                           hasWeight,
                           hasTime,
                        }
                        setExercises((prevExercises: IExercise[]) => {
                           const updatedExercises: IExercise[] = [
                              ...prevExercises,
                           ]
                           let inserted = false
                           for (let i = 0; i < updatedExercises.length; i++) {
                              if (
                                 updatedExercises[i].name
                                    .trim()
                                    .toLowerCase() ===
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
                  <button
                     type="button"
                     className="w-full bg-gray-300 px-4 py-2 hover:bg-gray-400 active:bg-gray-400"
                     onClick={() => {
                        setIsAddExerciseModalOpen(false)
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

export default AddExerciseModal
