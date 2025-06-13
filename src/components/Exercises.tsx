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
               <h2 className="horizontal-line">Вправи</h2>
               <div className="flex flex-col items-start gap-4">
                  <label htmlFor="searchName">Пошук за назвою:</label>
                  <input
                     type="text"
                     id="searchName"
                     placeholder="Введіть назву вправи"
                     autoComplete="off"
                     value={searchName}
                     onChange={(e) => {
                        setSearchName(e.target.value)
                     }}
                  />
                  <button
                     className="button-action button-modal"
                     onClick={() => {
                        setFilteredExercises(
                           exercises.filter((ex) =>
                              ex.name
                                 .toLowerCase()
                                 .includes(searchName.toLowerCase())
                           )
                        )
                     }}
                     disabled={exercises.length === 0}
                  >
                     пошук
                  </button>
               </div>
               <h2 className="horizontal-line"></h2>
               <button
                  className="button-add button-full mb-4"
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
