import { useEffect, useState } from 'react'
import AddExerciseModal from '../modals/add/AddExerciseModal'
import ListOfExercises from './ListOfExercises'
import type { IExercise, IExercisesProps } from '../../interfaces'
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
            <>
               <h2 className="horizontal-line title">Список вправ</h2>
               <div className="input-block">
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
               </div>
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
                  пошук вправ
               </button>
               <h2 className="horizontal-line my-1"></h2>
               <button
                  className="button-add button-full mb-2"
                  onClick={() => {
                     setIsAddExerciseModalOpen(true)
                  }}
               >
                  додати вправу
               </button>
               <ListOfExercises
                  exercises={filteredExercises}
                  clicker={setActiveExercise}
               />
            </>
         ) : (
            <Exercise
               activeExercise={activeExercise}
               setActiveExercise={setActiveExercise}
               setExercises={setExercises}
               setWorkouts={setWorkouts}
            />
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
