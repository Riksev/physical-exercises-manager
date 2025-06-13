import { useState } from 'react'
import type {
   IDataImportModalProps,
   IExercise,
   IWorkout,
} from '../../interfaces'

const DataImportModal = ({
   setData,
   setIsDataImportModalOpen,
}: IDataImportModalProps) => {
   const [fileName, setFileName] = useState('')
   const [error, setError] = useState('')
   const [info, setInfo] = useState('')

   const importData = (parsed: {
      exercises: IExercise[]
      workouts: IWorkout[]
   }) => {
      setData(parsed.exercises || [], parsed.workouts || [])
   }

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInfo('')
      setError('')
      setFileName('')

      const file = event.target.files?.[0]
      if (!file) {
         setError('Будь ласка, оберіть файл для імпорту.')
         setFileName('')
         return
      }

      if (file.type !== 'application/json') {
         setError('Будь ласка, оберіть файл формату JSON (.json).')
         setFileName('')
         return
      }

      setFileName(file.name)
      setError('')

      const reader = new FileReader()
      reader.onload = (e) => {
         try {
            const fileContent = e.target?.result
            if (typeof fileContent === 'string') {
               const parsedData = JSON.parse(fileContent)
               importData(parsedData)
               setInfo('Дані успішно імпортовано.')
            } else {
               setError('Помилка: Не вдалося прочитати вміст файлу як текст.')
            }
         } catch (parseError) {
            setError(
               'Помилка парсингу JSON: Переконайтеся, що файл містить дійсний JSON.'
            )
            console.error('Помилка парсингу JSON:', parseError)
         }
      }
      reader.onerror = () => {
         setError('Помилка читання файлу. Будь ласка, спробуйте ще раз.')
      }
      reader.readAsText(file)
   }

   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 flex max-h-[90vh] w-full flex-col rounded-xl border-2 border-black/70 bg-white p-6 shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">Імпорт даних</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsDataImportModalOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-5xl leading-none font-bold text-red-500 hover:bg-red-100"
               >
                  <span className="-translate-y-1.5">&times;</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="w-full pr-4 pl-2">
                  <div className="flex flex-col gap-4">
                     <label
                        htmlFor="json-upload"
                        className="focus:ring-opacity-75 button-add button-modal cursor-pointer rounded-lg font-bold uppercase shadow-md transition-all focus:ring-green-600 focus:outline-none not-only:focus:ring-2"
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
                        <p className="mt-2 text-left text-lg text-gray-700">
                           Обрано файл:{' '}
                           <span className="font-bold">{fileName}</span>
                        </p>
                     )}
                     {error && (
                        <p className="left mt-2 text-left text-lg text-red-600">
                           {error}
                        </p>
                     )}
                     {info && (
                        <p className="mt-2 text-left text-lg font-bold text-green-600">
                           {info}
                        </p>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DataImportModal
