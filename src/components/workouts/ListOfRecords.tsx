import type { Dispatch, SetStateAction } from 'react'
import { getWorkoutTime } from '../../features/workout'
import type {
   IExercise,
   IModal,
   IRecord,
   IWorkout,
   IWorkoutExercise,
} from '../../interfaces'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setWorkouts } from '../../features/dataSlice'
import { useTranslation } from 'react-i18next'
interface IListOfRecordsProps {
   workout: IWorkout
   exerciseFromWorkout: IWorkoutExercise
   exerciseFromWorkoutInfo: IExercise
   index: number
   setModal?: Dispatch<SetStateAction<IModal | null>>
}

const ListOfRecords = ({
   workout,
   exerciseFromWorkout,
   exerciseFromWorkoutInfo,
   index,
   setModal,
}: IListOfRecordsProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   const settings = useAppSelector((state) => state.settings.settings)
   const dispatch = useAppDispatch()
   const { t } = useTranslation()

   return (
      <div className="my-4 flex w-full flex-row flex-wrap items-stretch justify-center gap-1">
         {exerciseFromWorkout.records.map((record, id) => (
            <div
               className={`record-block flex flex-col items-center justify-between ${settings.hasPlanning ? ((record?.done ?? true) ? 'border-lime-500' : '') : null}`}
               key={id + index + 1}
            >
               <div
                  onClick={() => {
                     if (!setModal) return
                     setModal({
                        action: 'edit',
                        item: 'record',
                        data: {
                           activeWorkout: workout,
                           selectedExerciseFromWorkout: exerciseFromWorkout,
                           selectedExerciseInfo: exerciseFromWorkoutInfo,
                           selectedRecord: record,
                        },
                     })
                  }}
                  className="flex-1"
               >
                  <p>#{id + 1}</p>
                  {exerciseFromWorkoutInfo?.hasWeight &&
                     (record.weight ?? 0) !== 0 && (
                        <p>
                           <span className="text-sm">
                              {record.weight}{' '}
                              {settings.unitsType === 'metric'
                                 ? settings.language === 'en'
                                    ? 'kg'
                                    : 'кг'
                                 : settings.language === 'en'
                                   ? 'lbs'
                                   : 'фунт'}
                           </span>
                        </p>
                     )}
                  {exerciseFromWorkoutInfo?.hasReps &&
                     (record.reps ?? 0) > 0 && (
                        <p>
                           <span className="text-sm">
                              {record.reps} {t('workouts.workout.reps')}
                           </span>
                        </p>
                     )}
                  {exerciseFromWorkoutInfo?.hasTime && (
                     <p>
                        <span className="text-sm">{record.time}</span>
                     </p>
                  )}
                  {exerciseFromWorkoutInfo?.hasRPE && (record.rpe ?? 0) > 0 && (
                     <p>
                        <span className="text-sm">{record.rpe} RPE</span>
                     </p>
                  )}
                  {exerciseFromWorkoutInfo?.hasRIR && (record.rir ?? 0) > 0 && (
                     <p>
                        <span className="text-sm">{record.rir} RIR</span>
                     </p>
                  )}
               </div>

               {setModal && (
                  <div className="flex flex-col items-center justify-center gap-1.5">
                     <button
                        onClick={() => {
                           if (!setModal) return
                           setModal({
                              action: 'delete',
                              item: 'record',
                              data: {
                                 activeWorkout: workout,
                                 selectedExerciseFromWorkout:
                                    exerciseFromWorkout,
                                 selectedExerciseInfo: exerciseFromWorkoutInfo,
                                 selectedRecord: record,
                              },
                           })
                        }}
                        className="mt-2"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 640 640"
                           className="h-6 w-6 fill-red-500 stroke-black stroke-3"
                        >
                           <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
                        </svg>
                     </button>
                     {settings.hasPlanning && (
                        <div className="my-2 flex items-center justify-center">
                           <input
                              type="checkbox"
                              id={`record-checkbox-${id}`}
                              className="ml-0 accent-lime-500"
                              checked={record?.done ?? true}
                              onChange={(e) => {
                                 const newWorkouts = workouts.map((w) => {
                                    if (w._id === workout._id) {
                                       const newExercises: IWorkoutExercise[] =
                                          [...w.exercises]
                                       const newRecords = newExercises[
                                          index
                                       ].records.map((r, rIndex) => {
                                          if (rIndex === id) {
                                             const newRecord: IRecord = {
                                                ...r,
                                                done: e.target.checked,
                                                addedAt: e.target.checked
                                                   ? new Date().toISOString()
                                                   : '-',
                                             }
                                             return newRecord
                                          }
                                          return r
                                       })
                                       const isExerciseDone = newRecords.every(
                                          (r) => r.done ?? true
                                       )
                                       const newExerciseFromWorkout: IWorkoutExercise =
                                          {
                                             ...newExercises[index],
                                             done: isExerciseDone,
                                             records: newRecords,
                                          }
                                       newExercises[index] =
                                          newExerciseFromWorkout
                                       const isWorkoutDone = newExercises.every(
                                          (ex) => ex.done ?? true
                                       )
                                       const newWorkout: IWorkout = {
                                          ...w,
                                          done: isWorkoutDone,
                                          exercises: newExercises,
                                          startTime: getWorkoutTime(
                                             true,
                                             {
                                                ...w,
                                                exercises: newExercises,
                                             },
                                             'start'
                                          ),
                                          endTime: getWorkoutTime(
                                             true,
                                             {
                                                ...w,
                                                exercises: newExercises,
                                             },
                                             'end'
                                          ),
                                       }
                                       return newWorkout
                                    }
                                    return w
                                 })
                                 dispatch(setWorkouts(newWorkouts))
                              }}
                           />
                        </div>
                     )}
                  </div>
               )}
            </div>
         ))}
         {setModal && (
            <div className="record-block flex flex-col items-center justify-center border-transparent shadow-none outline-0">
               <button
                  onClick={() => {
                     if (!setModal) return
                     setModal({
                        action: 'add',
                        item: 'record',
                        data: {
                           activeWorkout: workout,
                           selectedExerciseFromWorkout: exerciseFromWorkout,
                           selectedExerciseInfo: exerciseFromWorkoutInfo,
                        },
                     })
                  }}
                  className="hover:brightness-110"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 640 640"
                     className="h-10 w-10 rounded-2xl bg-lime-500 fill-black stroke-white stroke-[10] shadow-2xl"
                  >
                     <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
                  </svg>
               </button>
            </div>
         )}
      </div>
   )
}

export default ListOfRecords
