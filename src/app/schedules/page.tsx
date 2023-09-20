import { api } from "@/services/api"
import Link from "next/link";

interface IAddress{
    id: string;
	street: string;
	number: string;
	district: string;
	city: string;
	state: string;
	zip_code: number;
}

interface ICategory{
    id: string;
    name: string;
}

export interface ISchedules{
    id: string;
    enterprise: string;
    sold: boolean;
    address: IAddress;
    category: ICategory;
}

async function getSchedules() {
    try {
        // const response = await api.get('properties/')
        const response = await api.get<ISchedules[]>('properties/')
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed')
    }    
}

export default async function Schedules() {

    const schedules = await getSchedules();
    const results = schedules.results;
    // console.log(schedules);
    // console.log(schedules.results);

    return (
        <div>
            <ul>
                {
                    results.map((schedule) => (
                        <li key={schedule.id}>
                            <Link href={`/schedules/${schedule.id}`}>{schedule.enterprise}</Link>
                            {/* <h1>{schedule.enterprise}</h1>
                            <h2>{schedule.address.street}, {schedule.address.number}</h2>
                            <h2>{schedule.address.district}</h2>
                            <h2>{schedule.address.city}</h2>
                            <h2>{schedule.category.name}</h2> */}
                        </li>
                    ))}
            </ul>
        </div>
    )
}