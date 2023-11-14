"use client";
import { api } from "@/services/api";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { useRouter } from "next/navigation";

export interface INewSchedule {
  date: string;
  hour: string;
  observation: string;
}

export interface IFullSchedule {
  id: string;
  date: string;
  hour: string;
  observation: string;
  property_id: string;
  user_id: string;
}

export interface IScheduleContext {
  getSchedule: (date: string, schedule: string) => Promise<void>;
  free: string[];
  setFree: Dispatch<SetStateAction<string[]>>;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  hour: string;
  setHour: Dispatch<SetStateAction<string>>;
  confirmSchedule: boolean;
  setConfirmSchedule: Dispatch<SetStateAction<boolean>>;
  createSchedule: (date: INewSchedule, id: string) => Promise<boolean>;
  schedules: string[];
  getMySchedule: () => Promise<void>;
  mySchedules: IFullSchedule[] | null;
  setMySchedules: Dispatch<SetStateAction<IFullSchedule[] | null>>;
}

export const ScheduleContext = createContext({} as IScheduleContext);

export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export function ScheduleProvider({ children }: IDefaultProviderProps) {
  const [confirmSchedule, setConfirmSchedule] = useState(false);
  let dateSistem = new Date();
  if (dateSistem.getDay() == 0 || dateSistem.getDay() == 6) {
    dateSistem.setDate(dateSistem.getDate() + 1);
  }
  const [date, setDate] = useState(dateSistem);
  const [hour, setHour] = useState("");
  const [free, setFree] = useState([""]);
  const [mySchedules, setMySchedules] = useState<IFullSchedule[] | null>(null);
  const schedulesFree: string[] = [];
  const router = useRouter();
  const schedules = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  async function getSchedule(date: string, schedule: string) {
    try {
      if (date == new Date().toISOString().slice(0, 10)) {
        let addOneHour = new Date().getTime() + 60 * 60 * 1000;
        let newTime = new Date(addOneHour);
        let hour = newTime.getHours();
        let min = newTime.getMinutes();

        const refTime = `${hour.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}`;
        if (schedule >= refTime) {
          const response = await api.post(`/schedules/free/schedules`, {
            date,
            schedule,
          });
          if (response.data.free_time_schedule) {
            schedulesFree.push(schedule);
            setFree(schedulesFree.sort());
          }
        }
      } else {
        const response = await api.post(`/schedules/free/schedules`, {
          date,
          schedule,
        });
        if (response.data.free_time_schedule) {
          schedulesFree.push(schedule);
          setFree(schedulesFree.sort());
        }
      }
    } catch (error) {
      console.log("Falha ao buscar dados \n", error);
    }
  }

  async function getMySchedule() {
    try {
      const response = await api.get(`/schedules`);
      if (response.data.length > 0) {
        setMySchedules(response.data);
      }
    } catch (error) {
      console.log("Falha ao buscar dados \n", error);
    } finally {
      router.push("/myschedules");
    }
  }

  async function createSchedule(date: INewSchedule, id: string) {
    try {
      const response = await api.post(`/schedules/property/${id}`, {
        ...date,
      });
      return true;
    } catch (error) {
      console.log("Falha ao agendar \n", error);
      return false;
    }
  }

  return (
    <ScheduleContext.Provider
      value={{
        getSchedule,
        free,
        setFree,
        date,
        setDate,
        hour,
        setHour,
        confirmSchedule,
        setConfirmSchedule,
        createSchedule,
        schedules,
        getMySchedule,
        mySchedules,
        setMySchedules,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
