import { useState } from 'react';
import { MenuBar, RestaurantCard, SearchBar } from '~/components';
import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';

const ITEMS = ['전체', '스시·해산물', '장어', '덴푸라', '돈카츠·쿠시카츠'];

const IndexPage: NextPageWithLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const query = trpc.restaurant.getRestaurants.useQuery({
    search: searchTerm,
  });

  function onSearchChange(value: string) {
    setSearchTerm(value);
    void query.refetch();
  }

  return (
    <div className="flex flex-col max-w-[430px] px-4 pb-[65px]">
      <div className="flex flex-col pt-8 items-start gap-y-4">
        <div className="flex flex-col"></div>
        <SearchBar onChange={onSearchChange}></SearchBar>
        {/* {query.status === 'pending' && '(loading)'} */}
        <div className="flex gap-1 max-w-full overflow-x-auto">
          {ITEMS.map((e, i) => (
            <span
              key={i}
              className={
                'font-semibold text-sm leading-5 px-3 py-2 rounded-md break-keep whitespace-nowrap ' +
                (i ? 'text-[#667085]' : 'text-[#344054] bg-[#F9FAFB]')
              }
            >
              {e}
            </span>
          ))}
        </div>

        {query.data?.items.map((item) => (
          <RestaurantCard key={item.id} restaurant={item}></RestaurantCard>
        ))}
      </div>

      <nav
        role="navigation"
        className="fixed overflow-hidden z-10 bottom-0 right-0 left-0 w-full border-t bg-white px-8 max-w-[430px]"
      >
        <MenuBar></MenuBar>
      </nav>
    </div>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @see https://trpc.io/docs/v11/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
