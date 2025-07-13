import { useState } from 'react'
import type { IDataControllerProps } from '../../interfaces'
import DataImportModal from '../modals/other/ImportDataModal'
import DataRemoveModal from '../modals/remove/RemoveDataModal'
import DataExportModal from '../modals/other/ExportDataModal'

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
            <summary>Керування даними</summary>
            <div className="mt-4 flex flex-col gap-4 py-2">
               <button
                  className="button-action button-full"
                  onClick={() => {
                     setIsDataExportModalOpen(true)
                  }}
               >
                  експорт даних
               </button>
               <button
                  className="button-action button-full"
                  onClick={() => {
                     setIsDataImportModalOpen(true)
                  }}
               >
                  імпорт даних
               </button>
               <button
                  className="button-remove button-full"
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
