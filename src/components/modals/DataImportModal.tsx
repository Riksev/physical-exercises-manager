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
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Імпорт даних</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsDataImportModalOpen(false)}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <div className="content-overflow-y">
               <div className="modal-main">
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
                     {error && <p className="error-message">{error}</p>}
                     {info && <p className="success-message">{info}</p>}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DataImportModal
