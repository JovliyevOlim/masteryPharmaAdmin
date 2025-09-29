import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import moment from 'moment/moment';
import { addNewCourses, updateCourse } from '../../slices/courses/thunk.ts';
import { useTranslation } from 'react-i18next';
import img from '../../images/default.png';
import { baseUrl } from '../../helpers/api_helpers.ts';
import { image } from 'html2canvas/dist/types/css/types/image';
import { addFileUpload } from '../../slices/files/thunk.ts';
import { resetImageId } from '../../slices/files/reducer.ts';
import Image from '../../components/Image.tsx';

const AddCourses = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const { isAction, isSuccess, loading } = useSelector(
    (state: any) => state.Course,
  );
  const {
    isAction: isActionFile,
    isSuccess: isSuccessFile,
    loading: isLoadingFile,
    imageId,
  } = useSelector((state: any) => state.FileUpload);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const handleImageChange = async (event: any) => {
    const files = event.target.files;
    setSelectedFiles(files);
    if (files && files[0]) {
      const objectUrl = URL.createObjectURL(files[0]);
      setPreview(objectUrl);
    }
  };

  const imageUpload = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file: any) => {
        formData.append('file', file);
      });
      dispatch(addFileUpload(formData));
    }
  };

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
    setPreview('');
    setSelectedFiles([]);
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
    onSubmit: () => {
      imageUpload();
    },
  });

  function handleCourse() {
    if (item) {
      dispatch(
        updateCourse({
          ...validation.values,
          startDateTime: moment(validation.values.startDateTime).toISOString(),
          id: item.id,
          fileIds: [imageId],
        }),
      );
    } else {
      dispatch(
        addNewCourses({
          ...validation.values,
          startDateTime: moment(validation.values.startDateTime).toISOString(),
          fileIds: [imageId],
        }),
      );
    }
  }

  useEffect(() => {
    if (isSuccessFile) {
      handleCourse();
    }
  }, [isActionFile]);

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
      dispatch(resetImageId());
      setPreview('');
      setSelectedFiles([]);
    }
  }, [dispatch, isAction]);

  return (
    <Dialog open={modalOpen} onClose={tog_standard} className="relative z-9999">
      <DialogBackdrop
        transition
        className="fixed inset-0  bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-150 sm:min-h-full items-center  sm:w-full justify-center p-4 text-center sm:items-center sm:p-0">
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
              <div className={'sm:flex gap-3'}>
                <div className="z-30 mx-auto  bg-white/20 p-1 backdrop-blur">
                  <div className="relative  drop-shadow-2">
                    {preview || item?.filesIds.length === 0 ? (
                      <img
                        className={'rounded-4 object-cover'}
                        width={320}
                        height={320}
                        src={preview ? preview : img}
                        alt="profile"
                      />
                    ) : (
                      <Image item={item} />
                    )}

                    <label
                      htmlFor="profile"
                      className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                    >
                      <svg
                        className="fill-current"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                          fill=""
                        />
                      </svg>
                      <input
                        type="file"
                        name="profile"
                        id="profile"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
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
