import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

function DeleteModal({
  modalOpen,
  setModalOpen,
  text,
  setItem,
  deleteFunction,
}: any) {
  const { t, i18n } = useTranslation();

  function tog_standard() {
    setItem(null);
    setModalOpen(!modalOpen);
  }

  return (
    <Dialog open={modalOpen} onClose={tog_standard} className="relative z-9999">
      <DialogBackdrop
        transition
        className="fixed inset-0  bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-150 sm:min-h-full items-center sm:items-end sm:w-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h4>{t('confirmDelete', { item: text })}</h4>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2  sm:px-6">
              <button
                type="button"
                onClick={tog_standard}
                className=" justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {t('no')}
              </button>
              <button
                type="button"
                onClick={deleteFunction}
                className="justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-800 hover:bg-blue-600 sm:mt-0 sm:w-auto"
              >
                {t('yes')}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteModal;
