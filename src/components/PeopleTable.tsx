import { Person, SortBy } from "../type.d";
import './PeopleTable.css';

interface People {
    peopleInput: Person[];
    isZebra?: boolean;
    handleDelete?: (index: number) => void;
    handleSortBy?: (sort: SortBy) => void;
}
export function PeopleTableCard({ peopleInput, isZebra, handleDelete, handleSortBy }: People) {


    return (

        <table className='table'>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th onClick={() => handleSortBy && handleSortBy(SortBy.FIRST_NAME)}>First</th>
                    <th onClick={() => handleSortBy && handleSortBy(SortBy.LAST_NAME)}>Last</th>
                    <th onClick={() => handleSortBy && handleSortBy(SortBy.COUNTRY)}>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {peopleInput.map((person: any, index) => {
                    return (
                        <tr
                            className={isZebra ? 'zebra' : ''}
                            key={person.email}>
                            <td>
                                <img src={person.picture.thumbnail} />
                            </td>
                            <td>{person.name.first}</td>
                            <td>{person.name.last}</td>
                            <td>{person.location.country}</td>
                            <td>
                                <button onClick={() => handleDelete && handleDelete(index)} className="button-delete">Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}