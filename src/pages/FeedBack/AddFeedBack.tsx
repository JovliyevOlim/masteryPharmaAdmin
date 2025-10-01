import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { addNewFeedBack } from '../../slices/feedback/thunk.ts';
import { useTranslation } from 'react-i18next';

const AddFeedBack = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const { isAction, isSuccess, loading } = useSelector(
    (state: any) => state.Feedback,
  );

  const [initialValues, setInitialValues] = useState({
    fullName: '',
    content: '',
  });

  function tog_standard() {
    setModalOpen(!modalOpen);
    validation.resetForm();
    setItem(null);
  }

  useEffect(() => {
    if (item) {
      setInitialValues({
        fullName: '',
        content: '',
      });
    } else {
      setInitialValues({
        fullName: '',
        content: '',
      });
      validation.resetForm();
    }
  }, [item]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      fullName: Yup.string().required(t("fullNameRequired")),
      content: Yup.string().required(t("commentRequired")),
    }),
    onSubmit: (values) => {
      if (item) {
        // dispatch(updateEmployee({ ...values, id: item.id }));
      } else {
        dispatch(
          addNewFeedBack({
            ...values,
          }),
        );
      }
    },
  });

  useEffect(() => {}, [isAction]);

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      validation.resetForm();
      setItem(null);
      setInitialValues({
        fullName: '',
        content: '',
      });
    }
  }, [dispatch, isAction]);

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
              <div className="divide-y divide-blue-200">
                <h5
                  className={
                    'text-title-md font-semibold text-black dark:text-white '
                  }
                >
                  {t('addFeedback')}
                </h5>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className={'sm:flex flex-col gap-3'}>
                  <div className={'my-2 w-full'}>
                    <label
                      htmlFor="fullName"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      {t('fullName')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        name="fullName"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.fullName || ''}
                        placeholder={t('fullName')}
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.fullName &&
                    validation.errors.fullName ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.fullName}
                      </h6>
                    ) : null}
                  </div>
                  <div className={'my-2 w-full'}>
                    <label
                      htmlFor="content"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      {t('comment')}
                    </label>
                    <div className="mt-2">
                      <textarea
                        rows={4}
                        id="content"
                        name="content"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.content || ''}
                        placeholder={t('comment')}
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.content && validation.errors.content ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.content}
                      </h6>
                    ) : null}
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2  sm:px-6">
                  <button
                    type="button"
                    onClick={tog_standard}
                    className=" justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex justify-center items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-800 hover:bg-blue-600 sm:mt-0 sm:w-auto"
                  >
                    {t('save')}
                    {loading && (
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default AddFeedBack;
