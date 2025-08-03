import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setWorkouts } from '../../features/dataSlice'
import type { IRecord, IWorkout } from '../../interfaces'

interface IBlockWorkoutProps {
   workout: IWorkout
   clicker: (workout: IWorkout) => void
   controlOrder?: boolean
   index?: number
   filteredLength?: number
}

const BlockWorkout = ({
   workout,
   clicker,
   controlOrder,
   index,
   filteredLength,
}: IBlockWorkoutProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   return (
      <div className={`block-border border-${workout.difficulty || 'medium'}`}>
         <div className="mb-2 flex w-full flex-row items-center justify-between">
            <p className="pr-3">
               {workout.date}
               <span className="responsive-break-off">{' - '}</span>
               <span className="responsive-break-on"> </span>
               {new Date(workout.date)
                  .toLocaleDateString('uk-UA', { weekday: 'long' })
                  .replace(/^./, (c) => c.toUpperCase())}

               {workout.name && (
                  <>
                     <br></br>
                     {workout.name}
                  </>
               )}
            </p>
            <div className="flex w-2/3 flex-col items-center justify-end gap-2">
               <button
                  className="button-edit button-modal truncate text-sm max-[400px]:text-xs sm:w-1/3"
                  onClick={() => {
                     clicker(workout)
                  }}
               >
                  заповнити
               </button>
               {controlOrder && (filteredLength ?? 0) > 1 && (
                  <div className="flex w-full flex-row items-center justify-center gap-x-4">
                     <button
                        className="disabled:opacity-25"
                        disabled={index === 0}
                        onClick={() => {
                           const newWorkouts: IWorkout[] = [...workouts]
                           const realIndex = workouts.findIndex(
                              (w) => w._id === workout._id
                           )
                           if (realIndex > 0) {
                              ;[
                                 newWorkouts[realIndex],
                                 newWorkouts[realIndex - 1],
                              ] = [
                                 newWorkouts[realIndex - 1],
                                 newWorkouts[realIndex],
                              ]
                           }
                           dispatch(setWorkouts([...newWorkouts]))
                        }}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 640 640"
                           className="h-5 w-6 fill-green-500 stroke-black stroke-[6]"
                        >
                           <path d="M297.4 41.4C309.9 28.9 330.2 28.9 342.7 41.4L470.7 169.4C479.9 178.6 482.6 192.3 477.6 204.3C472.6 216.3 460.9 224 448 224L384 224L384 560C384 586.5 362.5 608 336 608L304 608C277.5 608 256 586.5 256 560L256 224L192 224C179.1 224 167.4 216.2 162.4 204.2C157.4 192.2 160.2 178.5 169.4 169.4L297.4 41.4z" />
                        </svg>
                     </button>
                     <button
                        className="disabled:opacity-25"
                        disabled={index === (filteredLength ?? 0) - 1}
                        onClick={() => {
                           const newWorkouts: IWorkout[] = [...workouts]
                           const realIndex = workouts.findIndex(
                              (w) => w._id === workout._id
                           )
                           if (realIndex > 0) {
                              ;[
                                 newWorkouts[realIndex],
                                 newWorkouts[realIndex + 1],
                              ] = [
                                 newWorkouts[realIndex + 1],
                                 newWorkouts[realIndex],
                              ]
                           }
                           dispatch(setWorkouts([...newWorkouts]))
                        }}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 640 640"
                           className="h-5 w-6 rotate-180 fill-red-500 stroke-black stroke-[6]"
                        >
                           <path d="M297.4 41.4C309.9 28.9 330.2 28.9 342.7 41.4L470.7 169.4C479.9 178.6 482.6 192.3 477.6 204.3C472.6 216.3 460.9 224 448 224L384 224L384 560C384 586.5 362.5 608 336 608L304 608C277.5 608 256 586.5 256 560L256 224L192 224C179.1 224 167.4 216.2 162.4 204.2C157.4 192.2 160.2 178.5 169.4 169.4L297.4 41.4z" />
                        </svg>
                     </button>
                  </div>
               )}
            </div>
         </div>
         {workout.exercises.map((wex) => {
            const exerciseInfo =
               exercises.find((ex) => ex._id === wex.exercise_id) || null
            const exerciseHasParams =
               exerciseInfo &&
               (exerciseInfo.hasWeight ||
                  exerciseInfo.hasReps ||
                  exerciseInfo.hasTime)
            if (exerciseInfo) {
               return (
                  <details
                     key={wex._id ? wex._id : exerciseInfo._id}
                     className="details"
                  >
                     <summary className="font-medium">
                        {exerciseInfo.name}
                     </summary>
                     {!exerciseHasParams || wex.records.length === 0 ? (
                        <p className="mt-4 block text-left">Записи відсутні.</p>
                     ) : (
                        <>
                           <div className="table-block-row header mt-4">
                              <p className="table-block-cell table-block-cell-number">
                                 №
                              </p>
                              {exerciseInfo.hasWeight && (
                                 <p className="table-block-cell table-block-cell-text">
                                    Вага
                                 </p>
                              )}
                              {exerciseInfo.hasReps && (
                                 <p className="table-block-cell table-block-cell-text">
                                    Повтори
                                 </p>
                              )}
                              {exerciseInfo.hasTime && (
                                 <p className="table-block-cell table-block-cell-text">
                                    Час
                                 </p>
                              )}
                           </div>
                           {wex.records.map((record: IRecord, id: number) => (
                              <div
                                 key={exerciseInfo._id + id + 1}
                                 className="table-block-row"
                              >
                                 <p className="table-block-cell table-block-cell-number">
                                    {id + 1}
                                 </p>
                                 {exerciseInfo.hasWeight && (
                                    <p className="table-block-cell table-block-cell-text">
                                       {record.weight ? record.weight : '-'}
                                    </p>
                                 )}
                                 {exerciseInfo.hasReps && (
                                    <p className="table-block-cell table-block-cell-text">
                                       {record.reps ? record.reps : '-'}
                                    </p>
                                 )}
                                 {exerciseInfo.hasTime && (
                                    <p className="table-block-cell table-block-cell-text">
                                       {record.time ? record.time : '-'}
                                    </p>
                                 )}
                              </div>
                           ))}
                        </>
                     )}
                  </details>
               )
            }
         })}
      </div>
   )
}

export default BlockWorkout
