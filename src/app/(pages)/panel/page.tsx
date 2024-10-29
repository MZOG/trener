import { currentUser } from '@clerk/nextjs/server';
import ClientPage from '../../../components/pages/panel/PanelPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel'
};

const PanelPage = async () => {
  const user = await currentUser();
  if (user) {
    return <ClientPage userID={user.id} avatar={user.imageUrl} />;
  }
};

export default PanelPage;
