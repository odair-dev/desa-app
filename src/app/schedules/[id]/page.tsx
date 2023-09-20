import { api } from "@/services/api";
import { ISchedules } from "../page";

interface IPageProps {
    params: {id: string}
}

export default async function PropertyPage({ params }: IPageProps){
    
    const response = await api.get<ISchedules>(`properties/${params.id}`)
    
    return (
        <div>
            <h1>{response.data.enterprise}</h1>
            <h2>{response.data.address.street}, {response.data.address.number}</h2>
            <h2>{response.data.address.district}</h2>
            <h2>{response.data.address.city}</h2>
            <h2>{response.data.category.name}</h2>
        </div>
    )
}