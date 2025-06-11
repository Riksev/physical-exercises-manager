import { useState } from 'react'
import type { IDataControllerProps } from '../interfaces'
import DataImportModal from './modals/DataImportModal'
import DataRemoveModal from './modals/DataRemoveModal'
import DataExportModal from './modals/DataExportModal'

const DataManager = ({
   exercises,
   workouts,
   setData,
}: IDataControllerProps) => {
   const [isDataExportModalOpen, setIsDataExportModalOpen] =
      useState<boolean>(false)
   const [isDataImportModalOpen, setIsDataImportModalOpen] =
      useState<boolean>(false)
   const [isDataRemoveModalOpen, setIsDataRemoveModalOpen] =
      useState<boolean>(false)

   return (
      <>
         <details className="details">
            <summary className="cursor-pointer text-xl font-bold">
               Керування даними
            </summary>
            <div className="mt-4 flex flex-col gap-4 py-2">
               <button
                  className="w-full bg-blue-500 p-4 hover:bg-blue-600 active:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:opacity-50"
                  onClick={() => {
                     setIsDataExportModalOpen(true)
                  }}
               >
                  експорт даних
               </button>
               <button
                  className="w-full bg-blue-500 p-4 hover:bg-blue-600 active:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:opacity-50"
                  onClick={() => {
                     setIsDataImportModalOpen(true)
                  }}
               >
                  імпорт даних
               </button>
               <button
                  className="w-full bg-red-500 p-4 hover:bg-red-800 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-800 disabled:opacity-50"
                  onClick={() => {
                     setIsDataRemoveModalOpen(true)
                  }}
               >
                  повне видалення
               </button>
            </div>
         </details>
         {isDataExportModalOpen && (
            <DataExportModal
               exercises={exercises}
               workouts={workouts}
               setIsDataExportModalOpen={setIsDataExportModalOpen}
            />
         )}
         {isDataImportModalOpen && (
            <DataImportModal
               exercises={exercises}
               workouts={workouts}
               setData={setData}
               setIsDataImportModalOpen={setIsDataImportModalOpen}
            />
         )}
         {isDataRemoveModalOpen && (
            <DataRemoveModal
               setIsDataRemoveModalOpen={setIsDataRemoveModalOpen}
               setData={setData}
            />
         )}
      </>
   )
}

export default DataManager
