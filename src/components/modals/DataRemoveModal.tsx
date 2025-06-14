import type { IDataRemoveModalProps } from '../../interfaces'

const DataRemoveModal = ({
   setIsDataRemoveModalOpen,
   setData,
}: IDataRemoveModalProps) => {
   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Видалення даних</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsDataRemoveModalOpen(false)}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <button
               type="button"
               className="button-remove button-modal"
               onClick={() => {
                  setData([], [])
                  setIsDataRemoveModalOpen(false)
               }}
            >
               видалити
            </button>
         </div>
      </div>
   )
}

export default DataRemoveModal
