
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
    salary: "€2,400 – €3,000",
  },
  {
    id: 2,
    title: "Warehouse worker",
    location: "Poland",
    category: "Logistics",
    salary: "€1,800 – €2,300",
  },
  {
    id: 3,
    title: "Construction worker",
    location: "Czech Republic",
    category: "Construction",
    salary: "€2,000 – €2,600",
  },
  {
    id: 4,
    title: "Electrician",
    location: "Germany",
    category: "Construction",
    salary: "€2,300 – €3,100",
  },
  {
    id: 5,
    title: "Plumber",
    location: "Netherlands",
    category: "Construction",
    salary: "€2,400 – €3,200",
  },
  {
    id: 6,
    title: "Welder",
    location: "Belgium",
    category: "Manufacturing",
    salary: "€2,300 – €3,000",
  },
  {
    id: 7,
    title: "Production operator",
    location: "Poland",
    category: "Manufacturing",
    salary: "€1,900 – €2,500",
  },
  {
    id: 8,
    title: "Machine operator",
    location: "Germany",
    category: "Manufacturing",
    salary: "€2,200 – €2,800",
  },
  {
    id: 9,
    title: "Forklift operator",
    location: "Netherlands",
    category: "Logistics",
    salary: "€2,100 – €2,700",
  },
  {
    id: 10,
    title: "Logistics coordinator",
    location: "Germany",
    category: "Logistics",
    salary: "€2,300 – €3,000",
  },
  {
    id: 11,
    title: "Hotel receptionist",
    location: "Austria",
    category: "Hospitality",
    salary: "€1,900 – €2,400",
  },
  {
    id: 12,
    title: "Kitchen assistant",
    location: "Italy",
    category: "Hospitality",
    salary: "€1,700 – €2,200",
  },
  {
    id: 13,
    title: "Waiter",
    location: "Germany",
    category: "Hospitality",
    salary: "€1,800 – €2,400",
  },
  {
    id: 14,
    title: "Frontend developer",
    location: "Poland",
    category: "IT",
    salary: "€2,500 – €3,500",
  },
  {
    id: 15,
    title: "QA engineer",
    location: "Czech Republic",
    category: "IT",
    salary: "€2,300 – €3,200",
  },
  {
    id: 16,
    title: "IT support specialist",
    location: "Germany",
    category: "IT",
    salary: "€2,200 – €3,000",
  },
  {
    id: 17,
    title: "Bus driver",
    location: "Germany",
    category: "Drivers",
    salary: "€2,500 – €3,200",
  },
  {
    id: 18,
    title: "Delivery driver",
    location: "Netherlands",
    category: "Drivers",
    salary: "€2,100 – €2,700",
  },
  {
    id: 19,
    title: "Cleaner",
    location: "Austria",
    category: "Other",
    salary: "€1,700 – €2,200",
  },
  {
    id: 20,
    title: "Farm worker",
    location: "Denmark",
    category: "Other",
    salary: "€1,800 – €2,400",
  },
];
