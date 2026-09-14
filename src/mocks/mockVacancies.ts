
interface Vacancy
{
  id: number;
  title: string;
  location: string;
  category: string;
  salary: string;
};

export type { Vacancy };

export const vacancies: Vacancy[] = [
  {
    id: 1,
    title: "Truck driver",
    location: "Germany",
    category: "Drivers",
    salary: "€2,400 – €3,000"
  },
  {
    id: 2,
    title: "Warehouse Worker",
    location: "Poland",
    category: "Logistics",
    salary: "€1,800 – €2,300"
  },
  {
    id: 3,
    title: "Construction worker",
    location: "Czech republic",
    category: "Construction",
    salary: "€2,000 – €2,600"
  }
];
