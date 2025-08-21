import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setWorkouts } from '../../features/dataSlice'
import { Pages, type IExercise, type IWorkout } from '../../interfaces'
import ListOfRecords from './ListOfRecords'
import type { Dispatch, SetStateAction } from 'react'
import { Swiper as SwiperType } from 'swiper'

interface IBlockWorkoutProps {
   workout: IWorkout
   clicker: (workout: IWorkout) => void
   controlOrder?: boolean
   index: number
   filteredLength?: number
   swiperRef: React.RefObject<SwiperType | null>
   setActivePage: Dispatch<SetStateAction<number>>
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
}

const BlockWorkout = ({
   workout,
   clicker,
   controlOrder,
   index,
   filteredLength,
   swiperRef,
   setActivePage,
   setActiveExercise,
}: IBlockWorkoutProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)
   const settings = useAppSelector((state) => state.settings.settings)
   const dispatch = useAppDispatch()
   const { t } = useTranslation()

   return (
      <div
         className={`block-border border-${workout.difficulty || 'medium'}`}
         key={index}
      >
         <div className="mb-2 flex w-full flex-row items-center justify-between">
            <p className="pr-3">
               {workout.date}
               <span className="responsive-break-off">{' - '}</span>
               <span className="responsive-break-on"> </span>
               {new Date(workout.date)
                  .toLocaleDateString(
                     settings.language === 'ru'
                        ? 'ru-RU'
                        : settings.language === 'en'
                          ? 'en-GB'
                          : 'uk-UA',
                     { weekday: 'long' }
                  )
                  .replace(/^./, (c) => c.toUpperCase())}
               <br></br>
               {settings.hasPlanning
                  ? (workout?.done ?? true)
                     ? '✅ '
                     : '❌ '
                  : null}
               {workout?.name}
            </p>
            <div className="flex w-2/3 flex-col items-center justify-end gap-2 sm:w-1/3">
               <button
                  className="button-edit button-modal truncate text-sm max-[400px]:text-xs"
                  onClick={() => {
                     clicker(workout)
                  }}
               >
                  {t('workouts.fillWorkout')}
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
                     <summary className="relative pr-20 font-medium">
                        <span className="text-wrap">{exerciseInfo.name}</span>
                        {swiperRef?.current?.activeIndex !==
                           Pages.EXERCISES && (
                           <button
                              className="icon-search absolute top-1 right-12"
                              onClick={() => {
                                 setActiveExercise(exerciseInfo)
                                 setActivePage(Pages.EXERCISES)
                                 swiperRef.current?.slideTo(Pages.EXERCISES)
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
                        )}

                        <button className="absolute top-1 right-1" disabled>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 640"
                              className="icon-copy h-6 w-6"
                           >
                              <path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z" />
                           </svg>
                        </button>
                     </summary>
                     {!exerciseHasParams || wex.records.length === 0 ? (
                        <p className="mt-4 block text-left">
                           {t('workouts.noRecords')}
                        </p>
                     ) : (
                        <ListOfRecords
                           workout={workout}
                           exerciseFromWorkout={wex}
                           exerciseFromWorkoutInfo={exerciseInfo}
                           index={index}
                        />
                     )}
                  </details>
               )
            }
         })}
      </div>
   )
}

export default BlockWorkout
