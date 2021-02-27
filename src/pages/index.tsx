import { Sidebar } from '@/components/common';
import { NoPetFound, PetGrid, SomethingWentWrong } from '@/components/shared';
import fetcher from '@/lib/fetcher';
import { useFilter } from '@/provider/FilterProvider';
import { FC } from 'react';
import useSWR from 'swr';

const Index: FC = () => {
  const { filter: { selected } } = useFilter();
  let search = '';

  if (selected.country) search += `country=${selected.country?.value || ""}`;
  if (selected.species) search += `&species=${selected.species}`;
  if (selected.text) search += `&text=${selected.text}`;

  const query = `/api/pets?${search}`;
  const { data: pets, error } = useSWR(query, fetcher);

  const renderErrorPage = () => {
    return error?.statusCode === 404 ? <NoPetFound appliedFilters={selected} /> : <SomethingWentWrong />
  }

  return (
    <div className="content">
      <Sidebar />
      <div className="grid-container">
        {selected.text && !error && (
          <h2 className="search-text">
            Search result for: <span className="text-primary">{selected.text}</span>
          </h2>
        )}
        {error
          ? renderErrorPage()
          : !pets
            ? <h1>Loading...</h1>
            : <PetGrid pets={pets.data} />
        }
      </div>

      <style jsx>
        {`
        .content {
          display: flex;
          margin: 80px 0;
          padding: 20px 50px;
        }

        .grid-container {
          width: 100%;
        }

        .search-text {
          margin-bottom: 20px;
        }
      `}
      </style>
    </div>
  )
}

export default Index
