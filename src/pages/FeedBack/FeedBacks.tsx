import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/Tables/CustomTable.tsx';
import {
  approvedFeeback,
  deleteFeedbacks,
  getAllFeedBacks,
} from '../../slices/feedback/thunk.ts';
import AddFeedBack from './AddFeedBack.tsx';
import { useTranslation } from 'react-i18next';
import { MdCancel, MdCheckCircle, MdDelete, MdEdit } from 'react-icons/md';
import DeleteModal from '../../components/DeleteModal.tsx';

const Index = () => {
  const { t } = useTranslation();
  document.title = t('feedbacks');
  const dispatch: any = useDispatch();
  const { feedbacks, isAction } = useSelector((state: any) => state.Feedback);
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
    dispatch(deleteFeedbacks(editData.id));
    setModalDelete(false);
    setEditData(null);
  };

  const approvedFeedBackClick = (id: number) => {
    dispatch(approvedFeeback(id));
  };

  useEffect(() => {
    dispatch(getAllFeedBacks());
  }, [isAction]);

  const columns = [
    {
      key: 'fullName',
      title: t('fullName'),
    },
    {
      key: 'content',
      title: t('comment'),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (item: any) => (
        <div className="flex items-center space-x-3.5">
          {item.approved ? (
            <button
              onClick={() => approvedFeedBackClick(item.id)}
              className="text-success"
            >
              <MdCheckCircle />
            </button>
          ) : (
            <button
              onClick={() => approvedFeedBackClick(item.id)}
              className="text-danger"
            >
              <MdCancel />
            </button>
          )}
          <button
            onClick={() => onClickDelete(item)}
            className="hover:text-danger"
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

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
          <CustomTable columns={columns} data={feedbacks} />
        </div>
      </div>
      <AddFeedBack
        modalOpen={modal}
        setModalOpen={setModal}
        item={editData}
        setItem={setEditData}
      />
      <DeleteModal
        modalOpen={modalDelete}
        setModalOpen={setModalDelete}
        text={t('feedback')}
        setItem={setEditData}
        deleteFunction={deleteFunction}
      />
    </>
  );
};

export default Index;
