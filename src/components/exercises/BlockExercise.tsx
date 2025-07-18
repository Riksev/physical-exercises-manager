import type { IBlockExerciseProps } from '../../interfaces'

const BlockExercise = ({ exercise, clicker }: IBlockExerciseProps) => {
   return (
      <div
         onClick={() => {
            if (clicker) {
               clicker(exercise)
            }
         }}
         className="w-full cursor-pointer rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-cyan-500 p-4 font-semibold transition-all hover:font-bold hover:drop-shadow-lg hover:saturate-200 active:font-bold active:drop-shadow-lg active:saturate-200"
      >
         <p className="text-xl">{exercise.name}</p>
      </div>
   )
}

export default BlockExercise
