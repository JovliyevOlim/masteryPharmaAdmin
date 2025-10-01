import React, { useEffect, useState } from 'react';
import {
  fileSize,
  getFileById,
  getFileSizeInMB,
  getImageUrl,
  truncateFileName
} from '../helpers/utils.ts';
import { getFileIcon } from '../pages/Courses/AddCourses.tsx';

function File({ id }: { id: number }) {
  const [file, setFile] = useState<any>(null);

  useEffect(() => {
    getFileById(id).then((response) => setFile(response));
  }, [id]);


  const downloadFile = (
    base64Data: string,
    fileName: string,
    mimeType: string,
  ) => {
    const byteCharacters = atob(base64Data); // base64 → binary
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
  };



  return (
    <div>
      <button
        onClick={() => downloadFile(file.data, file.name, file.type)}
        className={'flex items-center gap-2 '}
      >
        {getFileIcon(file?.name)}
        <span>
          {file
            ? `${truncateFileName(file?.name)} (${getFileSizeInMB(fileSize(file.data, file.type))} MB)`
            : ''}
        </span>
      </button>
    </div>
  );
}

export default File;
