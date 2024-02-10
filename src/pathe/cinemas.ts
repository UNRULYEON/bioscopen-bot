export enum Cities {
  Amsterdam = 'Amsterdam',
  Utrecht = 'Utrecht',
  Groningen = 'Groningen',
  Rotterdam = 'Rotterdam',
  DenHaag = 'Den Haag',
  Eindhoven = 'Eindhoven',
  Helmond = 'Helmond',
  Zaandam = 'Zaandam',
  Delft = 'Delft',
  Tilburg = 'Tilburg',
  Breda = 'Breda',
  Haarlem = 'Haarlem',
  Amersfoort = 'Amersfoort',
  Arnhem = 'Arnhem',
  Zwolle = 'Zwolle',
  Ede = 'Ede',
  Nijmegen = 'Nijmegen',
  Schiedam = 'Schiedam',
  Leeuwarden = 'Leeuwarden',
}

export type PatheCinema = {
  id: number;
  name: string;
  fullName: string;
  city: Cities;
};

export const cinemas: PatheCinema[] = [
  { id: 1, name: 'City', fullName: 'Pathé City', city: Cities.Amsterdam },
  {
    id: 2,
    name: 'Tuschinski',
    fullName: 'Koninklijk Theater Tuschinski',
    city: Cities.Amsterdam,
  },
  {
    id: 3,
    name: 'Rembrandt Utrecht',
    fullName: 'Pathé Rembrandt',
    city: Cities.Utrecht,
  },
  {
    id: 4,
    name: 'Groningen',
    fullName: 'Pathé Groningen',
    city: Cities.Groningen,
  },
  {
    id: 5,
    name: 'Buitenhof',
    fullName: 'Pathé Buitenhof',
    city: Cities.Rotterdam,
  },
  {
    id: 6,
    name: 'Schouwburgplein',
    fullName: 'Pathé Schouwburgplein',
    city: Cities.Rotterdam,
  },
  {
    id: 7,
    name: 'Scheveningen',
    fullName: 'Pathé Scheveningen',
    city: Cities.DenHaag,
  },
  {
    id: 8,
    name: 'Eindhoven',
    fullName: 'Pathé Eindhoven',
    city: Cities.Eindhoven,
  },
  { id: 9, name: 'Arena', fullName: 'Pathé Arena', city: Cities.Amsterdam },
  {
    id: 10,
    name: 'De Munt',
    fullName: 'Pathé De Munt',
    city: Cities.Amsterdam,
  },
  { id: 11, name: 'Helmond', fullName: 'Pathé Helmond', city: Cities.Helmond },
  {
    id: 12,
    name: 'De Kuip',
    fullName: 'Pathé De Kuip',
    city: Cities.Rotterdam,
  },
  {
    id: 13,
    name: 'Spuimarkt',
    fullName: 'Pathé Spuimarkt',
    city: Cities.DenHaag,
  },
  { id: 14, name: 'Zaandam', fullName: 'Pathé Zaandam', city: Cities.Zaandam },
  {
    id: 17,
    name: 'Maastricht',
    fullName: 'Pathé Maastricht',
    city: Cities.Zaandam,
  },
  { id: 18, name: 'Delft', fullName: 'Pathé Delft', city: Cities.Delft },
  {
    id: 19,
    name: 'Tilburg Centrum',
    fullName: 'Pathé Tilburg Centrum',
    city: Cities.Tilburg,
  },
  { id: 20, name: 'Breda', fullName: 'Pathé Breda', city: Cities.Breda },
  { id: 22, name: 'Haarlem', fullName: 'Pathé Haarlem', city: Cities.Haarlem },
  {
    id: 23,
    name: 'Amersfoort',
    fullName: 'Pathé Amersfoort',
    city: Cities.Amersfoort,
  },
  { id: 27, name: 'Arnhem', fullName: 'Pathé Arnhem', city: Cities.Arnhem },
  { id: 28, name: 'Zwolle', fullName: 'Pathé Zwolle', city: Cities.Zwolle },
  { id: 29, name: 'Ede', fullName: 'Pathé Ede', city: Cities.Ede },
  {
    id: 30,
    name: 'Utrecht Leidsche Rijn',
    fullName: 'Pathé Utrecht Leidsche Rijn',
    city: Cities.Utrecht,
  },
  {
    id: 31,
    name: 'Nijmegen',
    fullName: 'Pathé Nijmegen',
    city: Cities.Nijmegen,
  },
  {
    id: 36,
    name: 'Amsterdam Noord',
    fullName: 'Pathé Amsterdam Noord',
    city: Cities.Amsterdam,
  },
  {
    id: 37,
    name: 'Tilburg Stappegoor',
    fullName: 'Pathé Tilburg Stappegoor',
    city: Cities.Tilburg,
  },
  {
    id: 38,
    name: 'Schiedam',
    fullName: 'Pathé Schiedam',
    city: Cities.Schiedam,
  },
  {
    id: 39,
    name: 'Leeuwarden',
    fullName: 'Pathé Leeuwarden',
    city: Cities.Leeuwarden,
  },
];

export type PatheCinemaGroupedByCity = {
  city: Cities;
  cinemas: PatheCinema[];
};

export const cinamesGroupByCity: PatheCinemaGroupedByCity[] = Object.values(
  Cities
).map((city) => ({
  city,
  cinemas: cinemas.filter((cinema) => cinema.city === city),
}));