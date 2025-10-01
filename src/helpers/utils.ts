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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getImageUrl = (id: number) => {
  return `${baseUrl}/files/download/${id}`;
};

export const truncateFileName = (name: string, maxLength: number = 20) => {
  if (name?.length <= maxLength) return name;

  const ext = name?.split('.').pop(); // kengaytma (pdf, docx, xlsx...)
  const base = name?.substring(0, maxLength - (ext?.length || 0) - 3);

  return `${base}...${ext}`;
};
export const getFileSizeInMB = (size: number) => {
  return (size / (1024 * 1024)).toFixed(2);
};
export const fileSize = (base64Data: any, mimeType: string) => {
  const byteCharacters = atob(base64Data); // base64 → binary
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  return blob.size;
};
