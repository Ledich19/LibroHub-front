import { getClient } from "@/lib/apollo-server";
import { BooksWithFiltersQuery } from "../../../generated/graphql";
import MyImage from "@/components/ui/MyImage";
import { BOOKS_WITH_FILTER_QUERY } from "@/lib/graphql/queries/books.queries";
import AuthorAvatar from "@/components/AuthorAvatar";

import Filters from "./Filters";
import { ParsedUrlQuery } from "querystring";

const Books = async ({ searchParams }: { searchParams: ParsedUrlQuery }) => {
  console.log("-----searchParams", await searchParams);
  const variables = {
    filters: {
      // пример: genre: searchParams.genre,
    }
  };
  const { data } = await getClient().query<BooksWithFiltersQuery>({
    query: BOOKS_WITH_FILTER_QUERY,
    variables,
  });

  return (
    <>
      <Filters filtersData={data?.booksFilters ?? []} currentFilters={searchParams}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">

        {data?.books?.map((book) => (
          <div
            key={book.id}
            className="card bg-base-200 border border-base-300 rounded-2xl shadow-lg  flex flex-col"
          >
            <div className="w-full h-[256px] relative">
              <MyImage
                src={book.coverUrl ?? "/image-not-available-book.webp"}
                alt={book.title ?? ""}
                defaultImage="/image-not-available-book.webp"
                defaultAlt="Book cover not available"
                className="object-cover rounded-xl"
                fill
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {book?.authors?.map((author) => (
                <AuthorAvatar key={author.id} author={author} />
              ))}
            </div>
            <div className="p-4 pt-0">
              <h3 className="text-lg font-bold text-base-content mb-1 line-clamp-2 mt-2">
                {book.title}
              </h3>
              <p className="text-sm text-base-content line-clamp-4">
                {book.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Books;
