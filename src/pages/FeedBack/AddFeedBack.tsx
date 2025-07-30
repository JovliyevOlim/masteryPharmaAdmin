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
                    className="flex justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-800 hover:bg-blue-600 sm:mt-0 sm:w-auto"
                  >
                    {t('save')}
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
