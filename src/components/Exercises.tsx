import { useEffect, useState } from 'react'
import AddExerciseModal from './modals/AddExerciseModal'
import ListOfExercises from './ListOfExercises'
import type { IExercise, IExercisesProps } from '../interfaces'
import Exercise from './Exercise'

const Exercises = ({
   exercises,
   setExercises,
   activeExercise,
   setActiveExercise,
   setWorkouts,
}: IExercisesProps) => {
   const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] =
      useState<boolean>(false)

   const [searchName, setSearchName] = useState<string>('')
   const [filteredExercises, setFilteredExercises] =
      useState<IExercise[]>(exercises)

   useEffect(() => {
      setFilteredExercises(exercises)
   }, [exercises])

   return (
      <>
         {!activeExercise ? (
            <div className="w-full text-xl font-medium">
               <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-3xl font-bold">
                  Вправи
               </h2>
               <div className="flex flex-col items-start gap-4">
                  <label htmlFor="searchName">Пошук за назвою:</label>
                  <input
                     type="text"
                     id="searchName"
                     className="w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     placeholder="Введіть назву вправи"
                     autoComplete="off"
                     value={searchName}
                     onChange={(e) => {
                        setSearchName(e.target.value)
                     }}
                  />
                  <button
                     className="w-full bg-blue-500 px-4 py-2 hover:bg-blue-600 active:bg-blue-600"
                     onClick={() => {
                        setFilteredExercises(
                           exercises.filter((ex) =>
                              ex.name
                                 .toLowerCase()
                                 .includes(searchName.toLowerCase())
                           )
                        )
                     }}
                  >
                     пошук
                  </button>
               </div>
               <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold"></h2>
               <button
                  className="mb-4 w-full bg-green-500 p-4 hover:bg-green-600 active:bg-green-600"
                  onClick={() => {
                     setIsAddExerciseModalOpen(true)
                  }}
               >
                  додати
               </button>
               <ListOfExercises
                  exercises={filteredExercises}
                  clicker={setActiveExercise}
               />
               <div className="mt-8"></div>
            </div>
         ) : (
            <>
               <Exercise
                  activeExercise={activeExercise}
                  setActiveExercise={setActiveExercise}
                  setExercises={setExercises}
                  setWorkouts={setWorkouts}
               />
               <div className="mt-8"></div>
            </>
         )}
         {isAddExerciseModalOpen && (
            <AddExerciseModal
               setIsAddExerciseModalOpen={setIsAddExerciseModalOpen}
               setExercises={setExercises}
            />
         )}
      </>
   )
}

export default Exercises
