import { getClient } from '@/lib/apollo-server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { UserDocument, UserQuery, UserQueryVariables } from '../../../../generated/graphql';

type Props = { params: { id: string } };

export default async function UserPage({ params }: Props) {
  // 1. Получаем JWT из cookie
  const session = (await cookies()).get('session');
  console.log("---session", session);


  // 2. Запрос к GraphQL серверу с токеном
  const { data, error } = await getClient().query<UserQuery, UserQueryVariables>({
    query: UserDocument,
    variables: { id: parseInt(params.id) },
    fetchPolicy: 'no-cache',
  });
  console.log("---data", error);
  console.log("---data", data);


  // 3. Если пользователь не найден
  if (!data?.user) return notFound();

  const { user, viewer } = data;

  const isOwner = viewer?.id === user.id;

  // 5. Отображаем данные
  return (
    <>
      <h1>{user.name}</h1>
      {isOwner && <p>Это ваш профиль</p>}
      Чейто профиль
      <button className='btn  btn-outline btn-primary'>Добавить книгу</button>
      <button className='btn btn-outline btn-primary'>Добавить серию</button>
      <button className='btn btn-outline btn-primary'>Добавить автора</button>

    </>
  );
}
