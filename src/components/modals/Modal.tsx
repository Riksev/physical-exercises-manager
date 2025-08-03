import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type {
   IExercise,
   IModal,
   IRecord,
   IWorkout,
   IWorkoutExercise,
} from '../../interfaces'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setExercises, setWorkouts } from '../../features/dataSlice'
import ListOfExercises from '../exercises/ListOfExercises'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'
import { getWorkoutEndTime, getWorkoutStartTime } from '../../features/workout'

interface IModalProps {
   info: IModal | null
   setModal: Dispatch<SetStateAction<IModal | null>>
}

const Modal = ({ info, setModal }: IModalProps) => {
   const [action, item, data] = info
      ? [info.action, info.item, info.data]
      : [null, null, null]

   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   const getDate = (date = data?.date?.toString()) => {
      const now = new Date(date || Date.now())
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
   }

   const [title, setTitle] = useState<Array<string>>([])
   const [exerciseName, setExerciseName] = useState<string>(
      data?.activeExercise?.name ?? ''
   )
   const [workoutName, setWorkoutName] = useState<string>(
      data?.activeWorkout?.name ?? ''
   )
   const [workoutDifficulty, setWorkoutDifficulty] = useState<string>(
      data?.activeWorkout?.difficulty ?? 'medium'
   )
   const [hasReps, setHasReps] = useState<boolean>(
      data?.activeExercise?.hasReps ?? false
   )
   const [hasWeight, setHasWeight] = useState<boolean>(
      data?.activeExercise?.hasWeight ?? false
   )
   const [hasTime, setHasTime] = useState<boolean>(
      data?.activeExercise?.hasTime ?? false
   )
   const [date, setDate] = useState<string>(getDate(data?.activeWorkout?.date))
   const [searchName, setSearchName] = useState<string>('')
   const [filteredExercises, setFilteredExercises] =
      useState<IExercise[]>(exercises)
   const [reps, setReps] = useState<string>(
      (data?.selectedRecord?.reps || '').toString()
   )
   const [weight, setWeight] = useState<string>(
      (data?.selectedRecord?.weight || '').toString()
   )
   const [time, setTime] = useState<string>(
      (data?.selectedRecord?.time || '').toString()
   )
   const [fileName, setFileName] = useState<string>(
      action === 'export' ? getDate() : ''
   )
   const [infoImport, setInfoImport] = useState('')

   const [clockTime, setClockTime] = useState<dayjs.Dayjs | null>(
      action === 'setStartTime'
         ? dayjs(new Date(getWorkoutStartTime(false, data?.activeWorkout)))
         : action === 'setEndTime'
           ? dayjs(new Date(getWorkoutEndTime(false, data?.activeWorkout)))
           : dayjs(new Date())
   )

   const [errorName, setErrorName] = useState<string>('')
   const [errorTime, setErrorTime] = useState<string>('')
   const [errorFileName, setErrorFileName] = useState<string>('')
   const [errorImport, setErrorImport] = useState('')

   const [isLoading, setIsLoading] = useState<boolean>(true)

   const importData = (parsed: {
      exercises: IExercise[]
      workouts: IWorkout[]
   }) => {
      dispatch(setExercises(parsed.exercises || []))
      dispatch(setWorkouts(parsed.workouts || []))
   }

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInfoImport('')
      setErrorImport('')
      setFileName('')

      const file = event.target.files?.[0]
      if (!file) {
         setErrorImport('Будь ласка, оберіть файл для імпорту.')
         setFileName('')
         return
      }

      if (file.type !== 'application/json') {
         setErrorImport('Будь ласка, оберіть файл формату JSON (.json).')
         setFileName('')
         return
      }

      setFileName(file.name)
      setErrorImport('')

      const reader = new FileReader()
      reader.onload = (e) => {
         try {
            const fileContent = e.target?.result
            if (typeof fileContent === 'string') {
               const parsedData = JSON.parse(fileContent)
               importData(parsedData)
               setInfoImport('Дані успішно імпортовано.')
            } else {
               setErrorImport(
                  'Помилка: Не вдалося прочитати вміст файлу як текст.'
               )
            }
         } catch (parseError) {
            setErrorImport(
               'Помилка парсингу JSON: Переконайтеся, що файл містить дійсний JSON.'
            )
            console.error('Помилка парсингу JSON:', parseError)
         }
      }
      reader.onerror = () => {
         setErrorImport('Помилка читання файлу. Будь ласка, спробуйте ще раз.')
      }
      reader.readAsText(file)
   }

   const initTitle = () => {
      const newTitle: Array<string> = []
      switch (item) {
         case 'exercise':
            switch (action) {
               case 'add':
                  newTitle.push('Додавання вправи')
                  break
               case 'edit':
                  newTitle.push('Редагування вправи')
                  newTitle.push(data?.activeExercise?.name || '')
                  break
               case 'delete':
                  newTitle.push('Видалення вправи')
                  newTitle.push(data?.activeExercise?.name || '')
                  break
               default:
                  newTitle.push('Вправа')
                  break
            }
            break
         case 'workout':
            switch (action) {
               case 'add':
                  newTitle.push('Додавання тренування')
                  break
               case 'edit':
                  newTitle.push('Редагування тренування')
                  newTitle.push(data?.activeWorkout?.date || '')
                  break
               case 'delete':
                  newTitle.push('Видалення тренування')
                  newTitle.push(data?.activeWorkout?.date || '')
                  break
               case 'setStartTime':
                  newTitle.push('Встановлення часу початку тренування')
                  break
               case 'setEndTime':
                  newTitle.push('Встановлення часу кінця тренування')
                  break
               default:
                  newTitle.push('Тренування')
                  break
            }
            break
         case 'exerciseFromWorkout':
            switch (action) {
               case 'add':
                  newTitle.push('Додавання вправи до тренування')
                  newTitle.push(data?.activeWorkout?.date || '')
                  break
               case 'delete':
                  newTitle.push('Видалення з тренування вправи')
                  newTitle.push(data?.selectedExerciseInfo?.name || '')
                  break
               default:
                  newTitle.push('Вправа з тренування')
                  break
            }
            break
         case 'record':
            {
               switch (action) {
                  case 'add':
                     newTitle.push('Додавання запису')
                     break
                  case 'edit':
                     newTitle.push('Редагування запису')
                     newTitle.push(
                        [
                           data?.selectedRecord?.weight ?? '-',
                           data?.selectedRecord?.reps ?? '-',
                           data?.selectedRecord?.time ?? '-',
                        ].join('x')
                     )
                     break
                  case 'delete':
                     newTitle.push('Видалення запису')
                     newTitle.push(
                        [
                           data?.selectedRecord?.weight ?? '-',
                           data?.selectedRecord?.reps ?? '-',
                           data?.selectedRecord?.time ?? '-',
                        ].join('x')
                     )
                     break
                  default:
                     newTitle.push('Запис')
                     break
               }
            }
            break
         case 'data':
            {
               switch (action) {
                  case 'delete':
                     newTitle.push('Видалення даних')
                     break
                  case 'export':
                     newTitle.push('Експорт даних')
                     break
                  default:
                     newTitle.push('Дані')
                     break
               }
            }
            break
         default:
            newTitle.push('Модальне вікно')
            break
      }
      setTitle(newTitle)
   }

   const handleClick = () => {
      switch (item) {
         case 'exercise':
            {
               const newExercises: IExercise[] = [...exercises]
               switch (action) {
                  case 'add': {
                     const newExercise: IExercise = {
                        _id: Date.now().toString(),
                        name: exerciseName,
                        hasReps,
                        hasWeight,
                        hasTime,
                     }

                     let inserted: boolean = false
                     for (let i: number = 0; i < newExercises.length; i++) {
                        if (
                           newExercises[i].name.trim().toLowerCase() ===
                           newExercise.name.trim().toLowerCase()
                        ) {
                           inserted = true
                           break
                        } else if (
                           newExercises[i].name.trim().toLowerCase() >
                           newExercise.name.trim().toLowerCase()
                        ) {
                           inserted = true
                           newExercises.splice(i, 0, newExercise)
                           break
                        }
                     }
                     if (!inserted) {
                        newExercises.push(newExercise)
                     }
                     break
                  }
                  case 'edit': {
                     const exerciseIndex: number = newExercises.findIndex(
                        (ex) => ex._id === data?.activeExercise?._id
                     )
                     if (exerciseIndex !== -1) {
                        newExercises[exerciseIndex] = {
                           ...newExercises[exerciseIndex],
                           name: exerciseName,
                           hasReps,
                           hasWeight,
                           hasTime,
                        }
                     }
                     break
                  }
                  case 'delete': {
                     const exerciseIndex: number = newExercises.findIndex(
                        (ex) => ex._id === data?.activeExercise?._id
                     )
                     if (exerciseIndex !== -1) {
                        newExercises.splice(exerciseIndex, 1)
                     }

                     const newWorkouts: IWorkout[] = workouts.flatMap((w) => {
                        const filteredExercises: IWorkoutExercise[] =
                           w.exercises.filter(
                              (ex) =>
                                 ex.exercise_id !== data?.activeExercise?._id
                           )
                        if (filteredExercises.length !== 0) {
                           return [
                              {
                                 ...w,
                                 exercises: filteredExercises,
                              },
                           ]
                        }
                        return []
                     })
                     dispatch(setWorkouts(newWorkouts))
                     break
                  }
               }
               dispatch(setExercises(newExercises))
            }
            break
         case 'workout':
            {
               const newWorkouts: IWorkout[] = [...workouts]
               switch (action) {
                  case 'add':
                     {
                        const newWorkout: IWorkout = {
                           _id: new Date().getTime().toString(),
                           date,
                           addedAt: new Date().toISOString(),
                           name: workoutName,
                           difficulty: workoutDifficulty,
                           exercises: [],
                           startTime: new Date().toISOString(),
                           endTime: new Date().toISOString(),
                        }
                        let isInserted = false
                        for (let i = 0; i < newWorkouts.length; i++) {
                           if (newWorkouts[i].date > newWorkout.date) {
                              newWorkouts.splice(i, 0, newWorkout)
                              isInserted = true
                              break
                           }
                        }
                        if (!isInserted) {
                           newWorkouts.push(newWorkout)
                        }
                     }
                     break
                  case 'edit':
                     {
                        const editedWorkout: IWorkout = {
                           ...data?.activeWorkout,
                           _id:
                              data?.activeWorkout?._id ??
                              new Date().getTime().toString(),
                           date,
                           name: workoutName,
                           difficulty: workoutDifficulty,
                           exercises: data?.activeWorkout?.exercises ?? [],
                        }
                        const workoutIndex = newWorkouts.findIndex(
                           (w) => w._id === data?.activeWorkout?._id
                        )
                        if (workoutIndex !== -1) {
                           newWorkouts.splice(workoutIndex, 1)
                           let isInserted = false
                           for (let i = 0; i < newWorkouts.length; i++) {
                              if (newWorkouts[i].date > editedWorkout.date) {
                                 newWorkouts.splice(i, 0, editedWorkout)
                                 isInserted = true
                                 break
                              }
                           }
                           if (!isInserted) {
                              newWorkouts.push(editedWorkout)
                           }
                        }
                     }
                     break
                  case 'delete':
                     {
                        const workoutIndex = newWorkouts.findIndex(
                           (w) => w._id === data?.activeWorkout?._id
                        )
                        if (workoutIndex !== -1) {
                           newWorkouts.splice(workoutIndex, 1)
                        }
                     }
                     break
                  case 'setStartTime':
                     {
                        const workoutIndex = newWorkouts.findIndex(
                           (w) => w._id === data?.activeWorkout?._id
                        )
                        if (workoutIndex !== -1) {
                           newWorkouts[workoutIndex] = {
                              ...newWorkouts[workoutIndex],
                              startTime: clockTime?.toDate().toISOString(),
                           }
                        }
                     }
                     break
                  case 'setEndTime':
                     {
                        const workoutIndex = newWorkouts.findIndex(
                           (w) => w._id === data?.activeWorkout?._id
                        )
                        console.log(clockTime)
                        console.log('2 ', clockTime?.toDate().toISOString())

                        if (workoutIndex !== -1) {
                           newWorkouts[workoutIndex] = {
                              ...newWorkouts[workoutIndex],
                              endTime: clockTime?.toDate().toISOString(),
                           }
                        }
                     }
                     break
               }
               dispatch(setWorkouts(newWorkouts))
            }
            break
         case 'exerciseFromWorkout':
            {
               const newWorkouts: IWorkout[] = [...workouts]
               switch (action) {
                  case 'add':
                     {
                        const workoutIndex = newWorkouts.findIndex(
                           (w) => w._id === data?.activeWorkout?._id
                        )
                        if (workoutIndex !== -1) {
                           newWorkouts[workoutIndex] = {
                              ...newWorkouts[workoutIndex],
                              endTime: new Date().toISOString(),
                              exercises: [
                                 ...newWorkouts[workoutIndex].exercises.map(
                                    (ex) => ({
                                       ...ex,
                                    })
                                 ),
                                 {
                                    _id: new Date().getTime().toString(),
                                    exercise_id:
                                       data?.selectedExerciseInfo?._id ??
                                       new Date().getTime().toString(),
                                    addedAt: new Date().toISOString(),
                                    records: [],
                                 },
                              ],
                           }
                        }
                     }
                     break
                  case 'delete':
                     {
                        const workoutIndex = newWorkouts.findIndex(
                           (w) => w._id === data?.activeWorkout?._id
                        )
                        if (workoutIndex !== -1) {
                           newWorkouts[workoutIndex] = {
                              ...newWorkouts[workoutIndex],
                              exercises: newWorkouts[
                                 workoutIndex
                              ].exercises.filter((exercise) =>
                                 data?.selectedExerciseFromWorkout?._id
                                    ? exercise._id !==
                                      data?.selectedExerciseFromWorkout?._id
                                    : exercise.exercise_id !==
                                      data?.selectedExerciseInfo?._id
                              ),
                           }
                        }
                     }
                     break
               }
               dispatch(setWorkouts(newWorkouts))
            }
            break
         case 'record': {
            const newWorkouts: IWorkout[] = [...workouts]
            switch (action) {
               case 'add': {
                  const newRecord: IRecord = {
                     _id: new Date().getTime().toString(),
                     ...(data?.selectedExerciseInfo?.hasReps && {
                        reps: parseFloat(reps || '0'),
                     }),
                     ...(data?.selectedExerciseInfo?.hasWeight && {
                        weight: parseFloat(weight || '0'),
                     }),
                     ...(data?.selectedExerciseInfo?.hasTime && {
                        time,
                     }),
                     addedAt: new Date().toISOString(),
                  }
                  const workoutIndex = newWorkouts.findIndex(
                     (w) => w._id === data?.activeWorkout?._id
                  )
                  if (workoutIndex !== -1) {
                     newWorkouts[workoutIndex] = {
                        ...newWorkouts[workoutIndex],
                        endTime: new Date().toISOString(),
                        exercises: newWorkouts[workoutIndex].exercises.map(
                           (exercise) => {
                              if (data?.selectedExerciseFromWorkout?._id) {
                                 if (
                                    exercise._id ===
                                    data?.selectedExerciseFromWorkout?._id
                                 ) {
                                    return {
                                       ...exercise,
                                       records: [
                                          ...exercise.records,
                                          newRecord,
                                       ],
                                    }
                                 }
                              } else if (
                                 exercise.exercise_id ===
                                 data?.selectedExerciseInfo?._id
                              ) {
                                 return {
                                    ...exercise,
                                    records: [...exercise.records, newRecord],
                                 }
                              }
                              return exercise
                           }
                        ),
                     }
                  }
                  break
               }
               case 'edit':
                  {
                     const editedRecord = {
                        ...data?.selectedRecord,
                        _id:
                           data?.selectedRecord?._id ??
                           new Date().getTime().toString(),
                        ...(data?.selectedExerciseInfo?.hasReps && {
                           reps: parseFloat(reps),
                        }),
                        ...(data?.selectedExerciseInfo?.hasWeight && {
                           weight: parseFloat(weight),
                        }),
                        ...(data?.selectedExerciseInfo?.hasTime && {
                           time: time,
                        }),
                     }

                     const workoutIndex = newWorkouts.findIndex(
                        (w) => w._id === data?.activeWorkout?._id
                     )
                     if (workoutIndex !== -1) {
                        const exerciseIndex = newWorkouts[
                           workoutIndex
                        ].exercises.findIndex((ex) =>
                           data?.selectedExerciseFromWorkout?._id
                              ? ex._id ===
                                data?.selectedExerciseFromWorkout?._id
                              : ex.exercise_id ===
                                data?.selectedExerciseInfo?._id
                        )
                        if (exerciseIndex !== -1) {
                           const recordIndex = newWorkouts[
                              workoutIndex
                           ].exercises[exerciseIndex].records.findIndex(
                              (rec) => rec._id === data?.selectedRecord?._id
                           )
                           if (recordIndex !== -1) {
                              const updatedRecords = [
                                 ...newWorkouts[workoutIndex].exercises[
                                    exerciseIndex
                                 ].records.slice(0, recordIndex),
                                 editedRecord,
                                 ...newWorkouts[workoutIndex].exercises[
                                    exerciseIndex
                                 ].records.slice(recordIndex + 1),
                              ]
                              const updatedExercise = {
                                 ...newWorkouts[workoutIndex].exercises[
                                    exerciseIndex
                                 ],
                                 records: updatedRecords,
                              }
                              const updatedExercises = [
                                 ...newWorkouts[workoutIndex].exercises.slice(
                                    0,
                                    exerciseIndex
                                 ),
                                 updatedExercise,
                                 ...newWorkouts[workoutIndex].exercises.slice(
                                    exerciseIndex + 1
                                 ),
                              ]
                              newWorkouts[workoutIndex] = {
                                 ...newWorkouts[workoutIndex],
                                 exercises: updatedExercises,
                              }
                           }
                        }
                     }
                  }
                  break
               case 'delete':
                  {
                     const workoutIndex = newWorkouts.findIndex(
                        (w) => w._id === data?.activeWorkout?._id
                     )
                     if (workoutIndex !== -1) {
                        const exerciseIndex = newWorkouts[
                           workoutIndex
                        ].exercises.findIndex((ex) =>
                           data?.selectedExerciseFromWorkout?._id
                              ? ex._id ===
                                data?.selectedExerciseFromWorkout?._id
                              : ex.exercise_id ===
                                data?.selectedExerciseInfo?._id
                        )
                        if (exerciseIndex !== -1) {
                           const updatedRecords = newWorkouts[
                              workoutIndex
                           ].exercises[exerciseIndex].records.filter(
                              (record) =>
                                 record._id !== data?.selectedRecord?._id
                           )
                           const updatedExercises = newWorkouts[
                              workoutIndex
                           ].exercises.map((ex, idx) =>
                              idx === exerciseIndex
                                 ? {
                                      ...ex,
                                      records: updatedRecords,
                                   }
                                 : ex
                           )
                           newWorkouts[workoutIndex] = {
                              ...newWorkouts[workoutIndex],
                              exercises: updatedExercises,
                           }
                        }
                     }
                  }
                  break
            }
            dispatch(setWorkouts(newWorkouts))
            break
         }
         case 'data':
            {
               switch (action) {
                  case 'delete':
                     {
                        dispatch(setExercises([]))
                        dispatch(setWorkouts([]))
                     }
                     break
                  case 'export':
                     {
                        const dataToSave = {
                           exercises,
                           workouts,
                        }

                        const jsonString = JSON.stringify(dataToSave, null, 2)
                        const blob = new Blob([jsonString], {
                           type: 'application/json',
                        })
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = `${fileName}.json`
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        URL.revokeObjectURL(url)
                     }
                     break
               }
            }
            break
         default:
            console.warn('Unknown action or item:', action, item)
            break
      }
      setModal(null)
   }

   useEffect(() => {
      if (item === 'exercise' && (action === 'add' || action === 'edit')) {
         if (exerciseName === '') {
            setErrorName('Назва вправи не може бути порожньою.')
         } else {
            setErrorName('')
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [exerciseName])

   useEffect(() => {
      if (item === 'record' && (action === 'add' || action === 'edit')) {
         if (
            data?.activeExercise?.hasTime &&
            time.match(/^\d{2}:\d{2}:\d{2}$/)
         ) {
            setErrorTime('Невірний формат часу. Використовуйте HH:MM:SS.')
         } else {
            setErrorTime('')
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [time])

   useEffect(() => {
      if (item === 'data' && action === 'export') {
         if (fileName === '') {
            setErrorFileName('Назва файлу не може бути порожньою.')
         } else {
            setErrorFileName('')
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [fileName])

   useEffect(() => {
      initTitle()
      if (item === 'record' && action === 'add') {
         const exerciseInWorkout = data?.activeWorkout?.exercises.find(
            (ex) => ex._id === data?.selectedExerciseFromWorkout?._id
         )
         const lastRecord =
            exerciseInWorkout?.records[exerciseInWorkout.records.length - 1]
         if (data?.selectedExerciseInfo?.hasReps) {
            const prevReps = lastRecord?.reps || ''
            setReps(prevReps.toString())
         }
         if (data?.selectedExerciseInfo?.hasWeight) {
            const prevWeight = lastRecord?.weight || ''
            setWeight(prevWeight.toString())
         }
         if (data?.selectedExerciseInfo?.hasTime) {
            const prevTime = lastRecord?.time ?? '00:00:00'
            setTime(prevTime.toString())
         }
      }
      setIsLoading(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      !isLoading && (
         <div className="modal-bg">
            <div className="modal-content">
               <div className="modal-header">
                  <h2>
                     {title[0] + ' '}
                     {title.length > 1 && (
                        <>
                           <br className="block sm:hidden"></br>
                           {`'${title[1]}' `}
                        </>
                     )}
                     {title.length > 2 && (
                        <>
                           <br className="block sm:hidden"></br>
                           {`${title[2]} `}
                        </>
                     )}
                     {title.length > 3 && (
                        <>
                           <br className="block sm:hidden"></br>
                           {`'${title[3]}' `}
                        </>
                     )}
                  </h2>
                  <button
                     type="button"
                     aria-label="Close"
                     onClick={() => {
                        setModal(null)
                     }}
                     className="button-close"
                  >
                     <span>&times;</span>
                  </button>
               </div>
               <div className="content-overflow-y">
                  <div className="modal-main">
                     {(action === 'add' || action === 'edit') &&
                        item === 'exercise' && (
                           <>
                              <div className="input-block">
                                 <label htmlFor="name">Назва вправи</label>
                                 <input
                                    type="text"
                                    id="name"
                                    placeholder="Введіть назву вправи"
                                    autoComplete="off"
                                    value={exerciseName}
                                    onChange={(e) => {
                                       setExerciseName(
                                          e.target.value.trim() === ''
                                             ? ''
                                             : e.target.value
                                       )
                                    }}
                                    onKeyDown={(e) => {
                                       if (e.key === 'Enter') {
                                          e.preventDefault()
                                       }
                                    }}
                                 />
                                 {errorName && (
                                    <p className="error-message">{errorName}</p>
                                 )}
                              </div>
                              <div className="checkbox-block">
                                 <label htmlFor="reps">
                                    Фікусувати кількість повторень:
                                 </label>
                                 <input
                                    type="checkbox"
                                    id="reps"
                                    checked={hasReps}
                                    onChange={(e) =>
                                       setHasReps(e.target.checked)
                                    }
                                 />
                              </div>
                              <div className="checkbox-block">
                                 <label htmlFor="weight">
                                    Фіксувати робочу вагу:
                                 </label>
                                 <input
                                    type="checkbox"
                                    id="weight"
                                    checked={hasWeight}
                                    onChange={(e) =>
                                       setHasWeight(e.target.checked)
                                    }
                                 />
                              </div>
                              <div className="checkbox-block">
                                 <label htmlFor="time">
                                    Фіксувати час виконання:
                                 </label>
                                 <input
                                    type="checkbox"
                                    id="time"
                                    checked={hasTime}
                                    onChange={(e) =>
                                       setHasTime(e.target.checked)
                                    }
                                 />
                              </div>
                           </>
                        )}
                     {(action === 'add' || action === 'edit') &&
                        item === 'workout' && (
                           <>
                              <div className="input-block">
                                 <label htmlFor="date">Дата</label>
                                 <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => {
                                       setDate(e.target.value)
                                    }}
                                    disabled={Boolean(!data?.activeWorkout)}
                                 />
                              </div>
                              <div className="input-block">
                                 <label htmlFor="workoutName">
                                    Назва тренування
                                 </label>
                                 <input
                                    type="text"
                                    id="workoutName"
                                    placeholder="Введіть назву тренування"
                                    autoComplete="off"
                                    value={workoutName}
                                    onChange={(e) => {
                                       setWorkoutName(
                                          e.target.value.trim() === ''
                                             ? ''
                                             : e.target.value
                                       )
                                    }}
                                    onKeyDown={(e) => {
                                       if (e.key === 'Enter') {
                                          e.preventDefault()
                                       }
                                    }}
                                 />
                              </div>
                              <FormControl>
                                 <p className="p-2 font-medium">Складність</p>
                                 <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    className="flex w-full justify-around"
                                    value={workoutDifficulty}
                                    onChange={(e) =>
                                       setWorkoutDifficulty(e.target.value)
                                    }
                                 >
                                    <Radio
                                       className="radio-easy w-1/3"
                                       value="easy"
                                    />
                                    <Radio
                                       className="radio-medium w-1/3"
                                       value="medium"
                                    />
                                    <Radio
                                       className="radio-hard w-1/3"
                                       value="hard"
                                    />
                                 </RadioGroup>
                              </FormControl>
                           </>
                        )}
                     {item === 'exerciseFromWorkout' && action === 'add' && (
                        <>
                           <div className="input-block">
                              <label htmlFor="searchNameInModal">
                                 Пошук за назвою:
                              </label>
                              <input
                                 type="text"
                                 id="searchNameInModal"
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
                                    exercises.filter(
                                       (exercise) =>
                                          exercise.name
                                             .toLowerCase()
                                             .includes(
                                                searchName.toLowerCase()
                                             ) &&
                                          !data?.activeWorkout?.exercises?.some(
                                             (exerciseInWorkout) =>
                                                exerciseInWorkout.exercise_id ===
                                                exercise._id
                                          )
                                    )
                                 )
                              }}
                           >
                              пошук
                           </button>
                           <h2 className="horizontal-line"></h2>
                           <ListOfExercises
                              exercises={filteredExercises}
                              clicker={(exercise: IExercise) => {
                                 if (data) {
                                    data.selectedExerciseInfo = exercise
                                 }
                                 handleClick()
                              }}
                           />
                        </>
                     )}
                     {item === 'record' &&
                        (action === 'add' || action === 'edit') && (
                           <>
                              {data?.selectedExerciseInfo?.hasWeight && (
                                 <div className="input-block">
                                    <label htmlFor="weight">Робоча вага:</label>
                                    <input
                                       type="number"
                                       step="any"
                                       id="weight"
                                       placeholder="Введіть робочу вагу"
                                       value={weight}
                                       onChange={(e) =>
                                          setWeight(e.target.value)
                                       }
                                       onKeyDown={(e) => {
                                          if (
                                             e.key === 'e' ||
                                             e.key === 'Enter'
                                          ) {
                                             e.preventDefault()
                                          }
                                       }}
                                       onPaste={(e) => e.preventDefault()}
                                    />
                                 </div>
                              )}
                              {data?.selectedExerciseInfo?.hasReps && (
                                 <div className="input-block">
                                    <label htmlFor="reps">Повторення:</label>
                                    <input
                                       type="number"
                                       step="any"
                                       id="reps"
                                       min="0"
                                       placeholder="Введіть кількість повторень"
                                       value={reps}
                                       onChange={(e) => {
                                          setReps(e.target.value)
                                       }}
                                       onKeyDown={(e) => {
                                          if (
                                             e.key === '-' ||
                                             e.key === 'e' ||
                                             e.key === 'Enter'
                                          ) {
                                             e.preventDefault()
                                          }
                                       }}
                                       onPaste={(e) => e.preventDefault()}
                                    />
                                 </div>
                              )}
                              {data?.selectedExerciseInfo?.hasTime && (
                                 <div className="input-block">
                                    <label htmlFor="time">Час виконання:</label>
                                    <input
                                       type="text"
                                       id="time"
                                       placeholder="Введіть час виконання HH:MM:SS"
                                       value={time}
                                       onChange={(e) => {
                                          setTime(e.target.value)
                                       }}
                                       onKeyDown={(e) => {
                                          if (
                                             e.key === '-' ||
                                             e.key === 'e' ||
                                             e.key === 'Enter'
                                          ) {
                                             e.preventDefault()
                                          }
                                       }}
                                       onPaste={(e) => e.preventDefault()}
                                    />
                                    {errorTime && (
                                       <p className="error-message">
                                          {errorTime}
                                       </p>
                                    )}
                                 </div>
                              )}
                           </>
                        )}
                     {item === 'data' && action === 'export' && (
                        <div className="input-block">
                           <label htmlFor="fileName">Назва файлу</label>
                           <input
                              type="text"
                              id="fileName"
                              placeholder="Введіть назву файлу"
                              autoComplete="off"
                              value={fileName}
                              onChange={(e) => {
                                 setFileName(
                                    e.target.value.trim() === ''
                                       ? ''
                                       : e.target.value
                                 )
                              }}
                              onKeyDown={(e) => {
                                 if (e.key === 'Enter') {
                                    e.preventDefault()
                                 }
                              }}
                           />
                           {errorFileName && (
                              <p className="error-message">{errorFileName}</p>
                           )}
                        </div>
                     )}
                     {item === 'data' && action === 'import' && (
                        <div className="input-block">
                           <label
                              htmlFor="json-upload"
                              className="focus:ring-opacity-75 button-add button-modal mb-4 cursor-pointer rounded-2xl px-0 text-center font-bold uppercase shadow-md transition-all focus:ring-green-600 focus:outline-none not-only:focus:ring-2"
                           >
                              Обрати JSON файл для імпорту
                           </label>
                           <input
                              id="json-upload"
                              type="file"
                              accept="application/json"
                              className="hidden"
                              onChange={(e) => {
                                 handleFileChange(e)
                              }}
                           />
                           {fileName && (
                              <p className="info-message">
                                 Обрано файл:{' '}
                                 <span className="font-bold">{fileName}</span>
                              </p>
                           )}
                           {errorImport && (
                              <p className="error-message">{errorImport}</p>
                           )}
                           {infoImport && (
                              <p className="success-message">{infoImport}</p>
                           )}
                        </div>
                     )}
                     {(action === 'setStartTime' ||
                        action === 'setEndTime') && (
                        <div className="flex w-full flex-col items-center justify-center gap-2">
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                 defaultValue={dayjs(new Date())}
                                 value={clockTime}
                                 className="w-full"
                                 ampm={false}
                              />
                           </LocalizationProvider>
                           <button
                              className="button-action button-modal"
                              onClick={() => {
                                 setClockTime(dayjs(new Date()))
                              }}
                           >
                              поточний час
                           </button>
                           <button
                              className="button-action button-modal"
                              onClick={() => {
                                 const newTime: string =
                                    action === 'setStartTime'
                                       ? getWorkoutStartTime(
                                            true,
                                            data?.activeWorkout
                                         )
                                       : action === 'setEndTime'
                                         ? getWorkoutEndTime(
                                              true,
                                              data?.activeWorkout
                                           )
                                         : ''
                                 setClockTime(dayjs(newTime))
                              }}
                           >
                              із записів
                           </button>
                        </div>
                     )}
                  </div>
               </div>
               {(action === 'add' ||
                  action === 'edit' ||
                  action === 'export' ||
                  action == 'setStartTime' ||
                  action == 'setEndTime') && (
                  <>
                     <h2 className="horizontal-line"></h2>
                  </>
               )}
               {(item !== 'exerciseFromWorkout' || action !== 'add') &&
                  action !== 'import' && (
                     <>
                        <button
                           type="button"
                           className={`button-${action} button-modal`}
                           onClick={handleClick}
                           disabled={Boolean(
                              errorName || errorTime || errorFileName
                           )}
                        >
                           {action === 'add'
                              ? 'додати'
                              : action === 'edit' ||
                                  action == 'setStartTime' ||
                                  action == 'setEndTime'
                                ? 'зберегти'
                                : action === 'delete'
                                  ? 'видалити'
                                  : action === 'export'
                                    ? 'експортувати'
                                    : 'unknown'}
                        </button>
                     </>
                  )}
            </div>
         </div>
      )
   )
}

export default Modal
