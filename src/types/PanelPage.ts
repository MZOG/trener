import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type ClientPageProps = {
  userID: string;
  avatar: string | StaticImport;
};

export type GalleryImagesProps = {
  name: string;
  bucket_id: string;
  owner: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
};
