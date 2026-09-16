import { vacancies } from "../mocks/mockVacancies";

export type ContactFormData = {
  name: string;
  contact: string;
  message: string;
};

export const mockFetch = async <T,>(
  data: T
): Promise<T> => {
  const delay = 300 + Math.random() * 500;

  await new Promise((resolve) => {
    setTimeout(resolve, delay)
  });

  if (Math.random() < 0.2) {
    throw new Error("Something went wrong");
  }

  return data;
};

export const getVacancies = () => {
  return mockFetch(vacancies);
};

export const submitApplication = async (
  data: ContactFormData
): Promise<void> => {
  await mockFetch(data);
};

export const submitContactForm = async (
  data: ContactFormData
): Promise<void> => {
  await mockFetch(data);
};
