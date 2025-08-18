import { type Dispatch, type SetStateAction } from 'react'
import type { IModal } from '../../interfaces'
import { useTranslation } from 'react-i18next'

interface IDataManagerProps {
   setModal: Dispatch<SetStateAction<IModal | null>>
}

const DataManager = ({ setModal }: IDataManagerProps) => {
   const { t } = useTranslation()

   return (
      <>
         <details className="details">
            <summary>{t('other.dataManager.title')}</summary>
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
                  {t('other.dataManager.export')}
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
                  {t('other.dataManager.import')}
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
                  {t('other.dataManager.delete')}
               </button>
            </div>
         </details>
      </>
   )
}

export default DataManager
