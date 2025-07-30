import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/Tables/CustomTable.tsx';
import { getAllStudents } from '../../slices/students/thunk.ts';
import { useTranslation } from 'react-i18next';

const Students = () => {
  const { t } = useTranslation();
  document.title = t('students');

  const dispatch: any = useDispatch();
  const { students, isAction } = useSelector((state: any) => state.Students);

  useEffect(() => {
    dispatch(getAllStudents());
  }, [isAction]);

  const columns = [
    {
      key: 'fullName',
      title: t('fullName'),
    },
    {
      key: 'email',
      title: t('email'),
    },
    {
      key: 'phoneNumber',
      title: t('phoneNumber'),
    },
    {
      key: 'courseName',
      title: t('courseName'),
    },
    {
      key: 'position',
      title: t('position'),
    },
    {
      key: 'region',
      title: t('region'),
    },
    {
      key: 'companyName',
      title: t('companyName'),
    },
    {
      key: 'comment',
      title: t('comment'),
    },
  ];

  return (
    <>
      <div className={'flex justify-between items-center my-3'}>
        <Breadcrumb pageName={document.title} />
        {/*<button*/}
        {/*  onClick={() => setModal(true)}*/}
        {/*  className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"*/}
        {/*>*/}
        {/*  qoshish*/}
        {/*</button>*/}
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <CustomTable columns={columns} data={students} />
        </div>
      </div>
    </>
  );
};

export default Students;
