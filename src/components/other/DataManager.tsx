import { type Dispatch, type SetStateAction } from 'react'
import type { IModal } from '../../interfaces'

interface IDataManagerProps {
   setModal: Dispatch<SetStateAction<IModal | null>>
}

const DataManager = ({ setModal }: IDataManagerProps) => {
   return (
      <>
         <details className="details">
            <summary>Керування даними</summary>
            <div className="mt-4 flex flex-col gap-4 py-2">
               <button
                  className="button-action button-full"
                  onClick={() => {
                     setModal({
                        action: 'export',
                        item: 'data',
                        data: {},
                     })
                  }}
               >
                  експорт даних
               </button>
               <button
                  className="button-action button-full"
                  onClick={() => {
                     setModal({
                        action: 'import',
                        item: 'data',
                        data: {},
                     })
                  }}
               >
                  імпорт даних
               </button>
               <button
                  className="button-delete button-full"
                  onClick={() => {
                     setModal({
                        action: 'delete',
                        item: 'data',
                        data: {},
                     })
                  }}
               >
                  повне видалення
               </button>
            </div>
         </details>
      </>
   )
}

export default DataManager
