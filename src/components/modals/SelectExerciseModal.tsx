import { useState } from 'react'
import type { IExercise, ISelectExerciseModalProps } from '../../interfaces'
import ListOfExercises from '../ListOfExercises'

const SelectExerciseModal = ({
   setIsSelectExerciseModalOpen,
   exercises,
   clicker,
}: ISelectExerciseModalProps) => {
   const [searchName, setSearchName] = useState<string>('')
   const [filteredExercises, setFilteredExercises] =
      useState<IExercise[]>(exercises)

   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 flex max-h-[90vh] w-full flex-col rounded-xl border-2 border-black/70 bg-white p-6 shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">
                  Вибір вправи для пошуку
               </h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsSelectExerciseModalOpen(false)
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-5xl leading-none font-bold text-red-500 hover:bg-red-100"
               >
                  <span className="-translate-y-1.5">&times;</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="w-full pr-4 pl-2">
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
                  <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold"></h2>
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
