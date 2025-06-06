import type { IListOfExercisesProps } from '../interfaces'

const ListOfExercises = ({
   exercises,
   setActiveExercise,
}: IListOfExercisesProps) => {
   return (
      <div className="flex w-full flex-col gap-4">
         {exercises.length === 0 ? (
            <p className="text-xl font-semibold text-gray-700">
               Вправ не знайдено.
            </p>
         ) : (
            exercises.map((exercise, index) => (
               <div
                  key={index}
                  onClick={() => {
                     setActiveExercise(exercise)
                  }}
                  className="cursor-pointer rounded-lg bg-gradient-to-tr from-fuchsia-500 to-cyan-500 p-4 font-semibold transition-all hover:font-bold hover:drop-shadow-lg hover:saturate-200 active:font-bold active:drop-shadow-lg active:saturate-200"
               >
                  <p className="text-xl">{exercise.name}</p>
               </div>
            ))
         )}
      </div>
   )
}

export default ListOfExercises
