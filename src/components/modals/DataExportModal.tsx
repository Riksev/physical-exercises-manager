import { useEffect, useState } from 'react'
import type { IDataExportModalProps } from '../../interfaces'

const DataExportModal = ({
   exercises,
   workouts,
   setIsDataExportModalOpen,
}: IDataExportModalProps) => {
   const getDate = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
   }

   const exportData = () => {
      const dataToSave = {
         exercises,
         workouts,
      }

      const jsonString = JSON.stringify(dataToSave, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${name}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
   }

   const [name, setName] = useState<string>(getDate())

   const [errorName, setErrorName] = useState<string>('')

   useEffect(() => {
      if (name === '') {
         setErrorName('Назва файлу не може бути порожньою.')
      } else {
         setErrorName('')
      }
   }, [name])

   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-xl border-2 border-black/70 bg-white p-6 text-lg font-medium shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">
                  Експорт даних
               </h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsDataExportModalOpen(false)
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-5xl leading-none font-bold text-red-500 hover:bg-red-100"
               >
                  <span className="-translate-y-1.5">&times;</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="w-full pr-4 pl-2">
                  <div className="mb-4">
                     <label className="mb-2 block text-left" htmlFor="name">
                        Назва файлу
                     </label>
                     <input
                        type="text"
                        id="name"
                        className="mb-2 w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Введіть назву файлу"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => {
                           setName(
                              e.target.value.trim() === '' ? '' : e.target.value
                           )
                        }}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                              e.preventDefault()
                           }
                        }}
                     />
                     {errorName && (
                        <p className="mt-1 block text-left text-red-600">
                           {errorName}
                        </p>
                     )}
                  </div>
               </div>
               <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold"></h2>
               <div className="flex flex-col gap-4">
                  <button
                     type="button"
                     className="button-add button-modal"
                     onClick={() => {
                        exportData()
                        setIsDataExportModalOpen(false)
                     }}
                     disabled={errorName !== ''}
                  >
                     експортувати
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DataExportModal
