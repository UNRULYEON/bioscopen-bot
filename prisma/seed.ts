import db from '@/db';

type Cinema = {
  id: string;
  name: string;
  scrapeName: string;
};

type City = {
  id: string;
  name: string;
  cinemas: Cinema[];
};

type Company = {
  id: string;
  name: 'Pathé' | 'Kino';
  emoji: string;
  cities: City[];
};

// Do not change IDs of existing records
const companies: Company[] = [
  {
    id: '077a1761-d50a-4bb4-a604-b1e56f7b90af',
    name: 'Pathé',
    emoji: '🐓',
    cities: [
      {
        id: 'bbd4223e-d427-408f-860c-a7c3af60ac51',
        name: 'Amsterdam',
        cinemas: [
          {
            id: '792b044f-7b55-4f7a-a434-8c4eb0fb1f93',
            name: 'Pathé Amsterdam Noord',
            scrapeName: 'Pathé Amsterdam Noord',
          },
          {
            id: 'a2615d9b-ac0b-489b-9e3e-550b94be7e44',
            name: 'Pathé Arena',
            scrapeName: 'Pathé Arena',
          },
          {
            id: '00afd0a1-aa01-4843-9ad2-e28fb84aa18d',
            name: 'Koninklijk Theater Tuschinski',
            scrapeName: 'Koninklijk Theater Tuschinski',
          },
          {
            id: 'edd24627-8c02-4ef1-85ad-ed2852884238',
            name: 'Pathé City',
            scrapeName: 'Pathé City',
          },
          {
            id: 'd71d81bd-cc1d-4754-aec9-05c8a4a1249b',
            name: 'Pathé De Munt',
            scrapeName: 'Pathé De Munt',
          },
        ],
      },
      {
        id: '53aadb9b-157a-4ca2-b5f0-424bb5049ea8',
        name: 'Rotterdam',
        cinemas: [
          {
            id: 'a0eb024b-053f-4f3b-8f59-0028c24a0129',
            name: 'Pathé Schouwburgplein',
            scrapeName: 'Pathé Schouwburgplein',
          },
          {
            id: '5b6f3c6c-ea47-41e8-8ce2-6652e8b1c380',
            name: 'Pathé De Kuip',
            scrapeName: 'Pathé De Kuip',
          },
        ],
      },
      {
        id: '16a67ae0-08d9-442c-a188-2c1d526ada7e',
        name: 'Den Haag',
        cinemas: [
          {
            id: '1a8482fb-c55c-4c9c-b59f-67b7095f8ca6',
            name: 'Pathé Buitenhof',
            scrapeName: 'Pathé Buitenhof',
          },
          {
            id: '3760af2e-673c-4a67-8e93-2bd742078b69',
            name: 'Pathé Spuimarkt',
            scrapeName: 'Pathé Spuimarkt',
          },
          {
            id: 'c715bbc1-4656-4650-a347-1b8876110753',
            name: 'Pathé Scheveningen',
            scrapeName: 'Pathé Scheveningen',
          },
          {
            id: '4972a9e3-7c47-486d-bac9-dd2679abe99a',
            name: 'Pathé Ypenburg',
            scrapeName: 'Pathé Ypenburg',
          },
        ],
      },
      {
        id: '5b2d877d-aa39-4992-9410-0f8bf28caa78',
        name: 'Utrecht',
        cinemas: [
          {
            id: 'ea01a250-803a-447b-aabc-36454920d113',
            name: 'Pathé Rembrandt Utrecht',
            scrapeName: 'Pathé Rembrandt Utrecht',
          },
          {
            id: 'fcab4260-9c1a-4b15-9d5b-be4b0bf3502e',
            name: 'Pathé Utrecht Leidsche Rijn',
            scrapeName: 'Pathé Utrecht Leidsche Rijn',
          },
        ],
      },
      {
        id: 'caf02382-eb8c-4039-901b-7d6926d95f84',
        name: 'Amersfoort',
        cinemas: [
          {
            id: 'c61b5661-c203-4985-908b-4eab988d04fc',
            name: 'Pathé Amersfoort',
            scrapeName: 'Amersfoort',
          },
        ],
      },
      {
        id: 'f005dd77-ad4f-4ee5-8e7e-845bf0854d45',
        name: 'Arnhem',
        cinemas: [
          {
            id: '3f05c124-f2f5-43d4-9b1d-a136b969b720',
            name: 'Pathé Arnhem',
            scrapeName: 'Arnhem',
          },
        ],
      },
      {
        id: 'ba909274-2d6b-48fb-9687-076a57ad7e4f',
        name: 'Breda',
        cinemas: [
          {
            id: 'c47730f1-aa9d-474f-9576-b01f03904a38',
            name: 'Pathé Breda',
            scrapeName: 'Breda',
          },
        ],
      },
      {
        id: 'af74b7f2-85d0-484d-b311-2ea6ecfcd7f2',
        name: 'Delft',
        cinemas: [
          {
            id: 'd26fb165-61e7-4002-a3f0-ccebffc31df7',
            name: 'Pathé Delft',
            scrapeName: 'Delft',
          },
        ],
      },
      {
        id: '80d5225d-0d33-418a-ba1b-6dd6aad94672',
        name: 'Ede',
        cinemas: [
          {
            id: '617534d6-f75c-4794-8ba3-ed15c2672ed2',
            name: 'Pathé Ede',
            scrapeName: 'Ede',
          },
        ],
      },
      {
        id: '8b887388-d509-412e-a8a8-ac481f0d3775',
        name: 'Eindhoven',
        cinemas: [
          {
            id: 'e40bbcee-afbb-47a3-9ec5-1e52763ba2e9',
            name: 'Pathé Eindhoven',
            scrapeName: 'Eindhoven',
          },
        ],
      },
      {
        id: 'e470ee9c-adfd-4a56-b100-5c0484513ee2',
        name: 'Groningen',
        cinemas: [
          {
            id: '7d5cd07a-e025-40ec-97e8-863dddf0e3cc',
            name: 'Pathé Groningen',
            scrapeName: 'Groningen',
          },
        ],
      },
      {
        id: '4bd71180-dba7-4449-9680-57a1a3126dc3',
        name: 'Haarlem',
        cinemas: [
          {
            id: '2da57b97-4be8-4ad9-97ba-eaa49e500434',
            name: 'Pathé Haarlem',
            scrapeName: 'Haarlem',
          },
        ],
      },
      {
        id: 'eeb20f2e-9878-44f6-bdf9-866425eb4361',
        name: 'Helmond',
        cinemas: [
          {
            id: 'c04be3fe-4c49-402d-b559-ce540d75f259',
            name: 'Pathé Helmond',
            scrapeName: 'Helmond',
          },
        ],
      },
      {
        id: '511b4983-c359-48d9-9280-67bbc1ad402a',
        name: 'Leeuwarden',
        cinemas: [
          {
            id: '637365d2-2edf-45c0-a24a-d6890de2690c',
            name: 'Pathé Leeuwarden',
            scrapeName: 'Leeuwarden',
          },
        ],
      },
      {
        id: '446077ab-8c89-4c2e-b171-e9caa3898bb9',
        name: 'Maastricht',
        cinemas: [
          {
            id: '93894dfa-2c8e-4454-ab60-cb0aff21d581',
            name: 'Pathé Maastricht',
            scrapeName: 'Maastricht',
          },
        ],
      },
      {
        id: '125b00eb-feeb-469e-8ca3-6470bbebe47f',
        name: 'Nijmegen',
        cinemas: [
          {
            id: '4f9fd8aa-7fc5-4dea-ade6-7c3dd511b826',
            name: 'Pathé Nijmegen',
            scrapeName: 'Nijmegen',
          },
        ],
      },
      {
        id: '0fdaa87e-e95a-4bba-83c5-aee4d8ac2124',
        name: 'Schiedam',
        cinemas: [
          {
            id: '677ab266-068c-43de-92ae-ee537bfe1964',
            name: 'Pathé Schiedam',
            scrapeName: 'Schiedam',
          },
        ],
      },
      {
        id: '5ef2992b-765b-4cfc-bdcf-c36828b89a1f',
        name: 'Tilburg',
        cinemas: [
          {
            id: '212c81de-6606-4dfd-ade2-88cd864cd471',
            name: 'Pathé Tilburg Centrum',
            scrapeName: 'Pathé Tilburg Centrum',
          },
          {
            id: '85612271-6d7b-4865-ad39-05de8fb8cb57',
            name: 'Pathé Tilburg Stappegoor',
            scrapeName: 'Pathé Tilburg Stappegoor',
          },
        ],
      },
      {
        id: '385b5921-bde5-4c82-8169-7920b1e23591',
        name: 'Zaandam',
        cinemas: [
          {
            id: 'c79090bd-a559-4992-9aa1-3dd315838a19',
            name: 'Pathé Zaandam',
            scrapeName: 'Zaandam',
          },
        ],
      },
      {
        id: '7bf6ff5c-29ee-4e11-b35f-8c7f7a14728d',
        name: 'Zwolle',
        cinemas: [
          {
            id: '28624987-24fe-4dfa-8950-d3ccedf77d08',
            name: 'Pathé Zwolle',
            scrapeName: 'Zwolle',
          },
        ],
      },
    ],
  },
];

await Promise.all(
  companies.map(async (co) => {
    const company = await db.company.upsert({
      create: {
        id: co.id,
        name: co.name,
        emoji: co.emoji,
      },
      update: {
        name: co.name,
        emoji: co.emoji,
      },
      where: {
        id: co.id,
      },
    });

    return await Promise.all(
      co.cities.map(async (ci) => {
        const city = await db.city.upsert({
          create: {
            id: ci.id,
            name: ci.name,
          },
          update: {
            name: ci.name,
          },
          where: {
            id: ci.id,
          },
        });

        return await Promise.all(
          ci.cinemas.map(async (cin) => {
            await db.cinema.upsert({
              create: {
                id: cin.id,
                name: cin.name,
                scrapeName: cin.scrapeName,
                cityId: city.id,
                companyId: company.id,
              },
              update: {
                name: cin.name,
                scrapeName: cin.scrapeName,
                cityId: city.id,
                companyId: company.id,
              },
              where: {
                id: cin.id,
              },
            });
          })
        );
      })
    );
  })
);

await db.$disconnect();

console.log('🌱 Seeded database');
