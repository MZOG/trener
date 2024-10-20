import { currentUser } from '@clerk/nextjs/server';
import ClientPage from './ClientPage';

const PanelPage = async () => {
  const user = await currentUser();
  if (user) {
    return <ClientPage userID={user.id} />;
  }
};

export default PanelPage;
