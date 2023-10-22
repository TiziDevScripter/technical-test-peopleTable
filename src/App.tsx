import { useMemo, useState } from 'react';
import './App.css';
import { PeopleTableCard } from './components/PeopleTable';
import { usePeople } from './hooks/usePeople';
import { SortBy } from './type.d';


function App() {
  const { people, peopleRef, updatePeople, isLoading, isError } = usePeople()

  const [isZebra, setIsZebra] = useState(false)
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NONE)
  const [inputCountry, setInputCountry] = useState<string | null>(null)

  const peopleFiltered = useMemo(() => {
    return inputCountry != null && inputCountry.length > 0
      ? people.filter(user => user.location.country.toLowerCase().startsWith(inputCountry.toLowerCase()))
      : people
  }, [people, inputCountry])

  const peopleSorted = useMemo(() => {
    if (sortBy === SortBy.NONE) return peopleFiltered;
    if (sortBy === SortBy.COUNTRY) {
      return peopleFiltered
        .toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    };
    if (sortBy === SortBy.FIRST_NAME) {
      return peopleFiltered
        .toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    };
    if (sortBy === SortBy.LAST_NAME) {
      return peopleFiltered
        .toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    };
    return peopleFiltered
  }, [peopleFiltered, sortBy])

  function handleZebra() {
    setIsZebra(!isZebra)
  }
  function handleSortBy(sort: SortBy) {
    const newSort = sortBy == SortBy.NONE ? sort : SortBy.NONE
    setSortBy(newSort)
  }
  function handleDelete(id: number) {
    const newPeople = people.filter((person, index) => index != id)
    updatePeople(newPeople)
  }
  function handleValueReset() {
    updatePeople(peopleRef.current)
  }
  return (
    <>
      <header>
        <h1>Technical Test</h1>
      </header>
      <main>

        <article className='table-card'>

          <section className='title'>
            People:
            <span>{people.length}</span>
          </section>
          <section className='table-control'>
            <button onClick={() => handleZebra()}>
              {!isZebra ? "Show Zebras" : "Hide Zebras"}
            </button>

            <button onClick={() => handleSortBy(SortBy.COUNTRY)}>
              {sortBy != SortBy.COUNTRY ? "Show by country" : "Disabled by country"}
            </button>

            <button onClick={() => handleValueReset()}>
              Default values
            </button>

            <input
              type="text"
              name="input-country"
              placeholder='Put a country here'
              onChange={(event => setInputCountry(event.target.value))} />
          </section>
          {
            isLoading &&
            <strong>Loading...</strong>
          }
          {
            !isLoading && isError &&
            <strong>There had an error</strong>
          }
          {
            !isLoading && !isError && peopleSorted.length == 0 &&
            <strong>There's not results</strong>
          }
          {
            !isLoading && !isError && peopleSorted.length > 0 &&
            <PeopleTableCard peopleInput={peopleSorted} isZebra={isZebra} handleDelete={handleDelete} handleSortBy={handleSortBy} />
          }
        </article>
      </main>
    </>
  )
}

export default App
