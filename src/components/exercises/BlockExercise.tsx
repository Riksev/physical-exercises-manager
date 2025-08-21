import type { IExercise } from '../../interfaces'

export interface IBlockExerciseProps {
   exercise: IExercise
   clicker?: (exercise: IExercise) => void
}

const BlockExercise = ({ exercise, clicker }: IBlockExerciseProps) => {
   return (
      <div
         onClick={() => {
            if (clicker) {
               clicker(exercise)
            }
         }}
         className="block-exercise"
      >
         <p className="text-xl">{exercise.name}</p>
      </div>
   )
}

export default BlockExercise
