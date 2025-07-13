import { useState } from 'react'
import type { IExercise, ISelectExerciseModalProps } from '../../../interfaces'
import ListOfExercises from '../../exercises/ListOfExercises'

const SelectExerciseModal = ({
   setIsSelectExerciseModalOpen,
   exercises,
   clicker,
}: ISelectExerciseModalProps) => {
   const [searchName, setSearchName] = useState<string>('')
   const [filteredExercises, setFilteredExercises] =
      useState<IExercise[]>(exercises)

   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Вибір вправи для пошуку</h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsSelectExerciseModalOpen(false)
                  }}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <div className="content-overflow-y">
               <div className="modal-main">
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
                     <button
                        className="button-action button-modal"
                        onClick={() => {
                           setFilteredExercises(
                              exercises.filter((exercise) =>
                                 exercise.name
                                    .toLowerCase()
                                    .includes(searchName.toLowerCase())
                              )
                           )
                        }}
                     >
                        пошук
                     </button>
                  </div>
                  <h2 className="horizontal-line"></h2>
                  <ListOfExercises
                     exercises={filteredExercises}
                     clicker={clicker}
                     showAll={true}
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default SelectExerciseModal
