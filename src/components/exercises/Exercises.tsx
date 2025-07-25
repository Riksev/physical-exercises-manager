import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import ListOfExercises from './ListOfExercises'
import type { IExercise, IModal } from '../../interfaces'
import Exercise from './Exercise'

interface IExercisesProps {
   exercises: IExercise[]
   activeExercise: IExercise | null
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
   setModal: Dispatch<SetStateAction<IModal | null>>
}

const Exercises = ({
   exercises,
   activeExercise,
   setActiveExercise,
   setModal,
}: IExercisesProps) => {
   const [searchName, setSearchName] = useState<string>('')
   const [filteredExercises, setFilteredExercises] =
      useState<IExercise[]>(exercises)

   useEffect(() => {
      setFilteredExercises(exercises)
   }, [exercises])

   return (
      <>
         {!activeExercise ? (
            <div className="app-page">
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
                  пошук
               </button>
               <h2 className="horizontal-line my-1"></h2>
               <button
                  className="button-add button-full mb-2"
                  onClick={() => {
                     setModal({
                        action: 'add',
                        item: 'exercise',
                        data: null,
                     })
                  }}
               >
                  додати
               </button>
               <ListOfExercises
                  exercises={filteredExercises}
                  clicker={setActiveExercise}
               />
            </div>
         ) : (
            <Exercise
               activeExercise={activeExercise}
               setActiveExercise={setActiveExercise}
               setModal={setModal}
            />
         )}
      </>
   )
}

export default Exercises
