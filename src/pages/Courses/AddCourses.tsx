import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import moment from 'moment/moment';
import { addNewCourses,updateCourse } from '../../slices/courses/thunk.ts';
import { useTranslation } from 'react-i18next';

const AddCourses = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const { isAction, isSuccess, loading } = useSelector(
    (state: any) => state.Course,
  );

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    teacherName: '',
    startDateTime: moment(new Date()).format('YYYY-MM-DD'),
    durationHours: '',
    price: '',
    online: false,
  });

  function tog_standard() {
    setModalOpen(!modalOpen);
    validation.resetForm();
    setItem(null);
  }

  useEffect(() => {
    if (item) {
      setInitialValues({
        title: item?.title,
        description: item?.description,
        teacherName: item?.teacherName,
        startDateTime: moment(item?.startDateTime).format('YYYY-MM-DD'),
        durationHours: item?.durationHours,
        price: item?.price,
        online: item?.online,
      });
    } else {
      setInitialValues({
        title: '',
        description: '',
        teacherName: '',
        startDateTime: moment(new Date()).format('YYYY-MM-DD'),
        durationHours: '',
        price: '',
        online: false,
      });
      validation.resetForm();
    }
  }, [item]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required(t('nameRequired')),
      teacherName: Yup.string().required(t('teacherRequired')),
      description: Yup.string().required(t('descriptionRequired')),
      durationHours: Yup.string().required(t('durationRequired')),
      price: Yup.string().required(t('priceRequired')),
    }),
    onSubmit: (values) => {
      if (item) {
        dispatch(
          updateCourse({
            ...values,
            startDateTime: moment(values.startDateTime).toISOString(),
            id: item.id,
          }),
        );
      } else {
        dispatch(
          addNewCourses({
            ...values,
            startDateTime: moment(values.startDateTime).toISOString(),
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
        title: '',
        description: '',
        teacherName: '',
        startDateTime: moment(new Date()).format('YYYY-MM-DD'),
        durationHours: '',
        price: '',
        online: false,
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
                  {t('addCourse')}
                </h5>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className={'sm:flex  gap-3'}>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="title"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      {t('name')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.title || ''}
                        placeholder={t('name')}
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.title && validation.errors.title ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.title}
                      </h6>
                    ) : null}
                  </div>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="teacherName"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      {t('teacher')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="teacherName"
                        name="teacherName"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.teacherName || ''}
                        placeholder={t('teacher')}
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.teacherName &&
                    validation.errors.teacherName ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.teacherName}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className={'sm:flex  gap-3'}>
                  <div className={'my-2 w-full'}>
                    <label
                      htmlFor="description"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      {t('description')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="description"
                        name="description"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ''}
                        placeholder={t('description')}
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.description &&
                    validation.errors.description ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.description}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className={'sm:flex  gap-3'}>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="price"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      {t('price')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="price"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.price || ''}
                        name="price"
                        type="number"
                        placeholder={t('price')}
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.price && validation.errors.price ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.price}
                      </h6>
                    ) : null}
                  </div>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="startDateTime"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      {t('startDate')}
                    </label>
                    <div className="mt-2">
                      <div className="relative inline-block w-full">
                        <input
                          id="startDateTime"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.startDateTime || ''}
                          name={t('startDate')}
                          type="date"
                          className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={'sm:flex gap-3 align-items-end'}>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="durationHours"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      {t('duration')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="durationHours"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.durationHours || ''}
                        name="durationHours"
                        type="number"
                        placeholder={t('duration')}
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.durationHours &&
                    validation.errors.durationHours ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.durationHours}
                      </h6>
                    ) : null}
                  </div>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="online"
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="online"
                          className="sr-only"
                          name="online"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          checked={validation.values.online || ''}
                        />
                        <div
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                            validation.values.online &&
                            'border-primary bg-gray dark:bg-transparent'
                          }`}
                        >
                          <span
                            className={`opacity-0 ${validation.values.online && '!opacity-100'}`}
                          >
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      {t('online')}
                    </label>
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
export default AddCourses;
