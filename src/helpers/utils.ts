import { toast } from 'react-toastify';
import axios from 'axios';
import { t } from 'i18next';
import { baseUrl, getToken } from './api_helpers.ts';

export function formatNumber(num: number): string {
  // Sonni stringga aylantiramiz va raqamlarni ajratish uchun regexdan foydalanamiz
  const numStr: string = num.toString();
  const formatted = numStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '); // Raqamlar orasiga bo'shliq qo'shamiz
  return formatted;
}

export async function handleImage(event: any) {
  const file = event.target.files[0];
  let photoId: any = '';
  if (file) {
    const maxSizeInBytes = 3 * 1024 * 1024; // 3 MB ni baytlarda hisoblash
    if (file.size > maxSizeInBytes) {
      toast.error(t('button.uploadImageSize'));
    } else {
      const formData = new FormData();
      formData.append('request', file);
      try {
        const response: any = await axios.post(
          baseUrl + '/attachment/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        photoId = response?.object?.id;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
  return photoId;
}

const token = getToken();

export const getFileById = async (id: number): Promise<string> => {
  const response: any = await axios.get(`${baseUrl}/files/${id}`, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return URL.createObjectURL(response);
};
