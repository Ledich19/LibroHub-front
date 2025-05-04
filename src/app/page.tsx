// app/page.tsx
import { LoginModal } from "@/components/modals/ligin-modal";
import { getClient } from "@/lib/apollo-server";
import { gql, useQuery, query } from "@apollo/client";

import Image from "next/image";
import Link from "next/link";

const QUERY = gql`
   query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;
export default async function Home() {
  // const { data, loading, error } = useQuery(MY_QUERY);
  // console.log(data);

  const { data } = await getClient().query({ query: QUERY });
  // const [queryRef] = useBackgroundQuery(MY_QUERY);
  console.log(data.components);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <LoginModal />

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/app">
          <button>App</button>
        </Link>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/app/auth/login">
          <button>Login</button>
        </Link>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/app/auth/register">
          <button>Register</button>
        </Link>


        <div className="grid grid-cols-2 gap-4">
          {data.countries.map((country: any) => (
            <div key={country.code} className="flex flex-col gap-2">
              <h3>{country.name}</h3>
              <p>
                {country.code} - {country.emoji}
              </p>
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
