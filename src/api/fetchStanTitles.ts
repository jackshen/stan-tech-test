export interface StanTitle {
  description: string;
  genre: string;
  id: number;
  image: string;
  language: string;
  rating: string;
  title: string;
  type: string;
  year: number;
}

const fetchStanTitles = async (): Promise<StanTitle[]> => {
  const response = await fetch("/getStanTitles");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export default fetchStanTitles;
