const BASE_URL = 'https://api.letterboxd.com/api/v0';

type LetterboxdSearchResult = {
  next: string;
  items: {
    type: string;
    film: {
      id: string;
      name: string;
      releaseYear: number;
      poster: {
        sizes: {
          width: number;
          height: number;
          url: string;
        }[];
      };
    };
  }[];
};

const search = async (query: string) => {
  const url = new URL(
    `${BASE_URL}/search?include=FilmSearchItem&input=${encodeURIComponent(
      query
    )}`
  );
  const res = await fetch(url.toString());

  if (!res.ok) {
    console.log('error', res.status, res.statusText);
    return;
  }

  const json = (await res.json()) as LetterboxdSearchResult;

  return json;
};

const letterboxd = {
  search,
};

export default letterboxd;
