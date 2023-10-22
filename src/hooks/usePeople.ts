import { useEffect, useRef, useState } from "react";
import { Person } from "../type.d";

export function usePeople() {
    const [people, setPeople] = useState<Person[]>([]);
    const peopleRef = useRef<Person[]>([])

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    function updatePeople(something: any) {
        setPeople(something)
    }

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        fetch(`https://randomuser.me/api/?results=10&seed=people`)
            .then(res => {
                if (!res.ok) throw new Error(`ok: ${res.ok} \nstatus: ${res.status} \n statusText: "${res.statusText}"`)
                return res.json()
            })
            .then(data => {
                setPeople(data.results)
                peopleRef.current = data.results
            })
            .catch(err => {
                setIsError(err)
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return {
        people,
        peopleRef,
        updatePeople,
        isLoading,
        isError
    };
}