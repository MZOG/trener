'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type UserInfoProps = {
  user_id: string;
  email: Text;
  is_trainer: boolean;
  full_name: string;
};

const ClientPage = ({ userID }: { userID: string }) => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);

  const handleSelect = (isTrainer: boolean) => {
    // setSelected(isTrainer);
    // router.refresh();
    console.log(`isTrainer: ${isTrainer}`);
  };

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  const getData = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userID);

    if (data) {
      setUserInfo(data[0]);
      setLoading(false);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto px-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[700px]" />
          <Skeleton className="h-4 w-[600px]" />
          <Skeleton className="h-4 w-[600px]" />
        </div>
      </section>
    );
  }

  if (userInfo?.is_trainer === null) {
    return (
      <section className="max-w-3xl mx-auto px-5">
        <div className="p-10 bg-white border rounded-xl">
          <p>
            Panel jest dostępny w dwóch opcjach, dla trenera oraz dla
            trenującego.
          </p>
          <p>Wybierz opcję, która pasuje do Ciebie.</p>

          <div className="mt-10 flex gap-5">
            <Button onClick={() => handleSelect(true)}>Jestem trenerem</Button>
            <Button onClick={() => handleSelect(false)} variant="outline">
              Szukam trenera
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5">
      <div className="bg-white p-10 border rounded-2xl">
        <h1>Panel</h1>
      </div>
    </div>
  );
};

export default ClientPage;
