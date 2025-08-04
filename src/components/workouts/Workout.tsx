import { type Dispatch, type SetStateAction } from 'react'
import {
   Pages,
   type IExercise,
   type IModal,
   type IWorkout,
   type IWorkoutExercise,
} from '../../interfaces'
import WorkoutStatistics from './WorkoutStatistics'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Swiper as SwiperType } from 'swiper'
import { setWorkouts } from '../../features/dataSlice'

interface IWorkoutProps {
   activeWorkout: IWorkout
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
   setModal: Dispatch<SetStateAction<IModal | null>>
   modal: IModal | null
   swiperRef: React.RefObject<SwiperType | null>
   setActivePage: Dispatch<SetStateAction<number>>
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
}

const Workout = ({
   activeWorkout,
   setActiveWorkout,
   setModal,
   modal,
   swiperRef,
   setActivePage,
   setActiveExercise,
}: IWorkoutProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   return (
      <div className="app-page">
         <h2 className="horizontal-line title">
            {activeWorkout?.date}
            <p className="hidden sm:inline">{' - '}</p>
            <p className="sm:hidden"></p>
            {activeWorkout?.date &&
               new Date(activeWorkout.date)
                  .toLocaleDateString('uk-UA', { weekday: 'long' })
                  .replace(/^./, (c) => c.toUpperCase())}
            {activeWorkout?.name && (
               <>
                  <br></br>
                  {activeWorkout.name}
               </>
            )}
         </h2>
         <div className="flex w-full flex-col items-center gap-4">
            <div
               className={`block-border border-${activeWorkout.difficulty || 'medium'}`}
            >
               <p className="mb-4 w-full text-left text-2xl font-medium">
                  Вправи:
               </p>
               <div>
                  {activeWorkout.exercises.length === 0 ? (
                     <p className="error-info mb-4 text-center">
                        Вправи відсутні.
                     </p>
                  ) : (
                     activeWorkout.exercises.map((exercise, index) => {
                        const exerciseInfo =
                           exercises.find(
                              (ex) => ex._id === exercise.exercise_id
                           ) || null
                        const exerciseParams =
                           exerciseInfo?.hasReps ||
                           exerciseInfo?.hasWeight ||
                           exerciseInfo?.hasTime
                        return (
                           exerciseInfo && (
                              <details key={index} className="details">
                                 <summary className="font-medium">
                                    <div className="flex w-full items-center justify-between gap-x-2">
                                       {exerciseInfo.name}
                                       <div className="flex w-1/3 flex-row justify-end">
                                          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                                             <div className="flex w-full flex-row items-center justify-end gap-x-4">
                                                <button
                                                   onClick={() => {
                                                      setActiveExercise(
                                                         exerciseInfo
                                                      )
                                                      setActivePage(
                                                         Pages.EXERCISES
                                                      )
                                                      swiperRef.current?.slideTo(
                                                         Pages.EXERCISES
                                                      )
                                                   }}
                                                >
                                                   <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 640 640"
                                                      className="h-6 w-6"
                                                   >
                                                      <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                                                   </svg>
                                                </button>
                                                <button
                                                   onClick={() => {
                                                      setModal({
                                                         action: 'delete',
                                                         item: 'exerciseFromWorkout',
                                                         data: {
                                                            activeWorkout,
                                                            selectedExerciseFromWorkout:
                                                               exercise,
                                                            selectedExerciseInfo:
                                                               exerciseInfo,
                                                         },
                                                      })
                                                   }}
                                                >
                                                   <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 640 640"
                                                      className="h-6 w-6 fill-red-500 stroke-black stroke-3"
                                                   >
                                                      <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
                                                   </svg>
                                                </button>
                                             </div>
                                             {activeWorkout.exercises.length >
                                                1 && (
                                                <div className="flex w-full flex-row items-center justify-end gap-x-4">
                                                   <button
                                                      className="disabled:opacity-25"
                                                      disabled={index === 0}
                                                      onClick={() => {
                                                         const newWorkouts =
                                                            workouts.map(
                                                               (w) => {
                                                                  if (
                                                                     w._id ===
                                                                     activeWorkout._id
                                                                  ) {
                                                                     const newExercises: IWorkoutExercise[] =
                                                                        [
                                                                           ...w.exercises,
                                                                        ]
                                                                     ;[
                                                                        newExercises[
                                                                           index -
                                                                              1
                                                                        ],
                                                                        newExercises[
                                                                           index
                                                                        ],
                                                                     ] = [
                                                                        newExercises[
                                                                           index
                                                                        ],
                                                                        newExercises[
                                                                           index -
                                                                              1
                                                                        ],
                                                                     ]
                                                                     return {
                                                                        ...w,
                                                                        exercises:
                                                                           newExercises,
                                                                     }
                                                                  }
                                                                  return w
                                                               }
                                                            )
                                                         dispatch(
                                                            setWorkouts(
                                                               newWorkouts
                                                            )
                                                         )
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
                                                      disabled={
                                                         index ===
                                                         activeWorkout.exercises
                                                            .length -
                                                            1
                                                      }
                                                      onClick={() => {
                                                         const newWorkouts =
                                                            workouts.map(
                                                               (w) => {
                                                                  if (
                                                                     w._id ===
                                                                     activeWorkout._id
                                                                  ) {
                                                                     const newExercises: IWorkoutExercise[] =
                                                                        [
                                                                           ...w.exercises,
                                                                        ]
                                                                     ;[
                                                                        newExercises[
                                                                           index +
                                                                              1
                                                                        ],
                                                                        newExercises[
                                                                           index
                                                                        ],
                                                                     ] = [
                                                                        newExercises[
                                                                           index
                                                                        ],
                                                                        newExercises[
                                                                           index +
                                                                              1
                                                                        ],
                                                                     ]
                                                                     return {
                                                                        ...w,
                                                                        exercises:
                                                                           newExercises,
                                                                     }
                                                                  }
                                                                  return w
                                                               }
                                                            )
                                                         dispatch(
                                                            setWorkouts(
                                                               newWorkouts
                                                            )
                                                         )
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
                                    </div>
                                 </summary>
                                 <h2 className="horizontal-line"></h2>
                                 {exercise.records.length === 0 ||
                                 !exerciseParams ? (
                                    <p className="my-4 block text-left">
                                       {!exerciseParams
                                          ? 'Вправа не містить параметрів.'
                                          : 'Записи відсутні.'}
                                    </p>
                                 ) : (
                                    <div className="my-4">
                                       <div className="table-block-row header">
                                          <p className="table-block-cell table-block-cell-number">
                                             №
                                          </p>
                                          {exerciseInfo?.hasWeight && (
                                             <p className="table-block-cell table-block-cell-text">
                                                Вага
                                             </p>
                                          )}
                                          {exerciseInfo?.hasReps && (
                                             <p className="table-block-cell table-block-cell-text">
                                                Повтори
                                             </p>
                                          )}
                                          {exerciseInfo?.hasTime && (
                                             <p className="table-block-cell table-block-cell-text">
                                                Час
                                             </p>
                                          )}
                                       </div>
                                       {exercise.records.map((record, id) => (
                                          <details key={id}>
                                             <summary>
                                                <div className="table-block-row">
                                                   <p className="table-block-cell table-block-cell-number">
                                                      {id + 1}
                                                   </p>
                                                   {exerciseInfo?.hasWeight && (
                                                      <p className="table-block-cell table-block-cell-text">
                                                         {record.weight
                                                            ? record.weight
                                                            : '-'}
                                                      </p>
                                                   )}
                                                   {exerciseInfo?.hasReps && (
                                                      <p className="table-block-cell table-block-cell-text">
                                                         {record.reps
                                                            ? record.reps
                                                            : '-'}
                                                      </p>
                                                   )}
                                                   {exerciseInfo?.hasTime && (
                                                      <p className="table-block-cell table-block-cell-text">
                                                         {record.time
                                                            ? record.time
                                                            : '-'}
                                                      </p>
                                                   )}
                                                </div>
                                             </summary>
                                             <div className="flex w-full flex-row items-center justify-between">
                                                <button
                                                   className="button-edit w-1/2 truncate rounded-none px-4 py-1 max-[400px]:text-sm"
                                                   onClick={() => {
                                                      setModal({
                                                         action: 'edit',
                                                         item: 'record',
                                                         data: {
                                                            activeWorkout,
                                                            selectedExerciseFromWorkout:
                                                               exercise,
                                                            selectedExerciseInfo:
                                                               exerciseInfo,
                                                            selectedRecord:
                                                               record,
                                                         },
                                                      })
                                                   }}
                                                >
                                                   редагувати
                                                </button>
                                                <button
                                                   className="button-delete w-1/2 truncate rounded-none px-4 py-1 max-[400px]:text-sm"
                                                   onClick={() => {
                                                      setModal({
                                                         action: 'delete',
                                                         item: 'record',
                                                         data: {
                                                            activeWorkout,
                                                            selectedExerciseFromWorkout:
                                                               exercise,
                                                            selectedExerciseInfo:
                                                               exerciseInfo,
                                                            selectedRecord:
                                                               record,
                                                         },
                                                      })
                                                   }}
                                                >
                                                   видалити
                                                </button>
                                             </div>
                                          </details>
                                       ))}
                                    </div>
                                 )}
                                 <button
                                    className={`button-add button-modal ${!exerciseParams ? 'hidden' : ''}`}
                                    onClick={() => {
                                       setModal({
                                          action: 'add',
                                          item: 'record',
                                          data: {
                                             activeWorkout,
                                             selectedExerciseFromWorkout:
                                                exercise,
                                             selectedExerciseInfo: exerciseInfo,
                                          },
                                       })
                                    }}
                                 >
                                    додати
                                 </button>
                              </details>
                           )
                        )
                     })
                  )}
                  <button
                     className="button-add button-full"
                     onClick={() => {
                        setModal({
                           action: 'add',
                           item: 'exerciseFromWorkout',
                           data: { activeWorkout },
                        })
                     }}
                  >
                     додати
                  </button>
               </div>
            </div>
            <WorkoutStatistics
               activeWorkout={activeWorkout}
               isAnyModalOpen={modal !== null}
               setModal={setModal}
            />
            <button
               className="button-action button-full"
               onClick={() => {
                  setModal({
                     action: 'notes',
                     item: 'workout',
                     data: { activeWorkout },
                  })
               }}
            >
               нотатки
            </button>
            <button
               className="button-edit button-full"
               onClick={() => {
                  setModal({
                     action: 'edit',
                     item: 'workout',
                     data: { activeWorkout },
                  })
               }}
            >
               редагувати
            </button>
            <button
               className="button-delete button-full"
               onClick={() => {
                  setModal({
                     action: 'delete',
                     item: 'workout',
                     data: { activeWorkout },
                  })
               }}
            >
               видалити
            </button>
            <button
               className="button-action button-full"
               onClick={() => {
                  setActiveWorkout(null)
               }}
            >
               назад
            </button>
         </div>
      </div>
   )
}

export default Workout
