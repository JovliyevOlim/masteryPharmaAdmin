import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal.tsx';
import CustomTable from '../../components/Tables/CustomTable.tsx';
import { deleteCourse, getAllCourses } from '../../slices/courses/thunk.ts';
import moment from 'moment';
import AddCourses, { getFileIcon } from './AddCourses.tsx';
import { useTranslation } from 'react-i18next';
import {
  formatNumber,
} from '../../helpers/utils.ts';
import { MdDelete, MdEdit } from 'react-icons/md';
import { resetImageId } from '../../slices/files/reducer.ts';
import Image from '../../components/Image.tsx';
import File from '../../components/File.tsx';

const Courses = () => {
  const { t, i18n } = useTranslation();
  document.title = t('courses');
  const dispatch: any = useDispatch();
  const { courses, isAction } = useSelector((state: any) => state.Course);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const onClickEdit = (data: any) => {
    setModal(true);
    setEditData(data);
  };

  const onClickDelete = (data: any) => {
    setModalDelete(true);
    setEditData(data);
  };

  const deleteFunction = () => {
    dispatch(deleteCourse(editData.id));
    setModalDelete(false);
    setEditData(null);
  };

  useEffect(() => {
    dispatch(resetImageId());
    dispatch(getAllCourses());
  }, [isAction]);

  const columns = useMemo(
    () => [
      {
        key: 'title',
        title: t('name'),
      },
      {
        key: 'teacherName',
        title: t('teacher'),
      },
      {
        key: 'fileId',
        title: t('file'),
        render: (item: any) => (
          <>
            <File id={item?.fileId} />
          </>
        ),
      },
      {
        key: 'imageId',
        title: t('image'),
        render: (item: any) => (
          <>
            <Image width={80} height={50} id={item.imageId} key={item.id} />
          </>
        ),
      },
      {
        key: 'description',
        title: t('description'),
      },
      {
        key: 'price',
        title: t('price'),
        render: (item: any) => (
          <>
            {formatNumber(item.price)} {t('currency')}
          </>
        ),
      },
      {
        key: 'startDateTime',
        title: t('startDate'),
        render: (item: any) => (
          <>{moment(item?.startDateTime).format('YYYY-MM-DD')}</>
        ),
      },
      {
        key: 'durationHours',
        title: t('duration'),
        render: (item: any) => (
          <>
            {item.durationHours} {t('hours')}
          </>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        render: (item: any) => (
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => onClickEdit(item)}
              className="hover:text-success"
            >
              <MdEdit />
            </button>
            <button
              onClick={() => onClickDelete(item)}
              className="hover:text-danger"
            >
              <MdDelete />
            </button>
          </div>
        ),
      },
    ],
    [i18n.language],
  );
  return (
    <>
      <div className={'flex justify-between items-center my-3'}>
        <Breadcrumb pageName={document.title} />
        <button
          onClick={() => setModal(true)}
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          {t('add')}
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <CustomTable columns={columns} data={courses} />
        </div>
      </div>
      <AddCourses
        modalOpen={modal}
        setModalOpen={setModal}
        item={editData}
        setItem={setEditData}
      />
      <DeleteModal
        modalOpen={modalDelete}
        setModalOpen={setModalDelete}
        text={t('course')}
        setItem={setEditData}
        deleteFunction={deleteFunction}
      />
    </>
  );
};

export default Courses;
