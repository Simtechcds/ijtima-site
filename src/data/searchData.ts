// Centralized search data from all accordion items across the site

export interface SearchItem {
  title: string;
  category: string;
  location: string;
  type: 'National' | 'Gauteng' | 'KZN' | 'Cape' | 'Old Workers' | 'Raiwind' | 'Tongi' | 'Nizamuddin Jor' | 'India' | 'UK' | 'Canada' | 'Other';
}

// South Africa data
const nationalItems = [
  "1975 Lenasia (GP)", "1976 Chatsworth (KZN)", "1977 Benoni (GP)", "1978 Newcastle (KZN)",
  "1979 Springfield (KZN)", "1980 Laudium (GP)", "1981 Lenasia (GP)", "1982 Ladysmith (KZN)",
  "1983 PMB (KZN)", "1984 Azaadville (GP)", "1985 Stanger (KZN)", "1986 Springs (GP)",
  "1987 Roshnee (GP)", "1988 PMB (KZN)", "1989 Lenasia (GP)", "1990 Springfield (KZN)",
  "1991 Malboro (GP)", "1992 Newcastle (KZN)", "1993 Laudium (GP)", "1994 Roshnee (GP)",
  "1995 PMB (KZN)", "1996 Mayfair (GP)", "1997 Dundee (KZN)", "1998 Azaadville (GP)",
  "1999 Reservoir Hills (KZN)"
];

const gautengItems = [
  "2000 Benoni", "2001 Lenasia", "2002 Laudium", "2003 Maraisburg", "2004 Nelspruit",
  "2005 Brits", "2006 Pietersburg", "2007 Mayfair", "2008 Lenasia", "2009 Roshnee",
  "2010 Benoni", "2011 Laudium", "2012 Azaadville", "2013 Mia's Farm", "2014 Lenasia",
  "2015 Roshnee", "2016 Benoni", "2017 Laudium", "2018 Rustenburg", "2019 Mia's Farm",
  "2023 Azaadville", "2024 Lenasia", "2025 Johannesburg"
];

const kznItems = [
  "2000 Ladysmith", "2001 Verulam", "2002 Estcourt", "2003 Reservoir Hills", "2004 PMB",
  "2005 Stanger", "2006 Chatsworth", "2007 Reservoir Hills", "2008 Masjid Al Hilal (DBN)",
  "2009 Port Shepstone", "2010 Phoenix", "2012 Newcastle", "2013 Overport", "2014 Isipingo Beach",
  "2015 Stanger", "2016 Ladysmith", "2017 Overport", "2018 PMB", "2019 Estcourt",
  "2023 Newlands", "2024 Newcastle", "2025 Overport"
];

const capeItems = ["2008 Cape Town (WC)", "2011 Port Elizabeth (EC)"];

const oldWorkersItems = [
  "1998 Azaadville (GP)", "2000 Madressah Zakariyya (GP)", "2001 Camperdown (KZN)",
  "2002 Epping – Cape Town (WP)", "2003 Azaadville (KZN)", "2004 Isipingo Beach (KZN)",
  "2005 Cape Town (WC)", "2006 Johannesburg (GP)", "2007 Reservoir Hills (KZN)",
  "2008 Cape Town (WC)", "2008 Durban (KZN)", "2008 Johannesburg (GP)", "2009 Port Elizabeth (EC)",
  "2010 Masjid un Noor (GP)", "2011 Phoenix Industrial (KZN)", "2012 Cape Town (WC)",
  "2013 Lenasia (GP)", "2014 Mt Edgecombe (KZN)", "2015 Cape Town (WC)", "2016 Benoni (GP)",
  "2017 Laudium (GP)", "2018 Ladysmith (KZN)", "2019 Lenasia (GP)", "2022 Shakaskraal (KZN)",
  "2023 Ormonde (GP)", "2024 La Mercy (KZN)", "2025 Masjid un Noor (GP)"
];

// International data
const raiwindItems = [
  "2024 Raiwind Ijtema – Part 2", "2024 Raiwind Ijtema – Part 1", "2023 Raiwind Ijtema – Part 2",
  "2023 Raiwind Ijtema – Part 1", "2022 Raiwind Ijtema – Part 2", "2022 Raiwind Ijtema – Part 1",
  "2022 Old Workers Jor – Raiwind", "2021 Raiwind Ijtema – Part 2", "2021 Raiwind Ijtema – Part 1",
  "2021 Raiwind Old Workers Jor", "2020 Raiwind Ijtema", "2019 Raiwind Ijtema – Part 2",
  "2019 Raiwind Ijtema – Part 1", "2019 Old Workers Jor – Raiwind", "2018 Raiwind Ijtema – Part 2",
  "2018 Raiwind Ijtema – Part 1", "2017 Raiwind Ijtema", "2016 Raiwind Ijtema", "2014 Raiwind Ijtema",
  "2013 Raiwind Ijtema", "2012 Raiwind Ijtema", "2011 Raiwind Ijtema", "2010 Raiwind Ijtema",
  "2007 Raiwind Ijtema", "2006 Raiwind Ijtema"
];

const tongiItems = ["2016 Tongi Ijtema"];

const nizamuddinItems = [
  "2015 All Africa Nizamuddin Jor", "2013 All Africa Nizamuddin Jor", "2011 All Africa Nizamuddin Jor",
  "2011 All USA Nizamuddin Jor", "2011 All India Nizamuddin Jor", "2011 All Europe Nizamuddin Jor",
  "2006 SA Nizamuddin Jor", "2004 SA Nizamuddin Jor"
];

const ukItems = ["2018 Blackburn", "2019 Blackburn", "2022 Blackburn"];
const canadaItems = ["2011 Toronto", "2023 Canada"];
const otherItems = ["2011 Gaza", "2014 Sweden", "2014 Sudan", "2014 Jordan"];
const indiaItems = [
  "2025 Old Workers Jor (Panoli dist.)", "2024 Mosali (Panoli) Ijtema", "2023 All India Mashwara – Godhra",
  "2023 All India Mashwera – Bangalore", "2023 Dadhal (Panoli) Ijtema", "2022 Amrawati (Maharastra) Ijtema",
  "2022 Old Workers & Railway Workers – Bangalore", "2021 Kul Hind Mashwera – Delhi",
  "2021 Kathor (Panoli) Jor", "2019 Hyderabad Ijtema", "2019 Banaskantha Ijtema",
  "2019 Sarkhej Ijtema", "2019 Aanand Ijtema", "2019 Godhra Ijtema", "2018 Italwa (Surat) Ijtema",
  "2017 Surendra Nagar Ijtema"
];

// Create searchable items
export const searchableItems: SearchItem[] = [
  // South Africa items
  ...nationalItems.map(title => ({ title, category: 'South Africa', location: 'South Africa', type: 'National' as const })),
  ...gautengItems.map(title => ({ title, category: 'South Africa Regional', location: 'South Africa', type: 'Gauteng' as const })),
  ...kznItems.map(title => ({ title, category: 'South Africa Regional', location: 'South Africa', type: 'KZN' as const })),
  ...capeItems.map(title => ({ title, category: 'South Africa Regional', location: 'South Africa', type: 'Cape' as const })),
  ...oldWorkersItems.map(title => ({ title, category: 'South Africa', location: 'South Africa', type: 'Old Workers' as const })),
  
  // International items
  ...raiwindItems.map(title => ({ title, category: 'International', location: 'International', type: 'Raiwind' as const })),
  ...tongiItems.map(title => ({ title, category: 'International', location: 'International', type: 'Tongi' as const })),
  ...nizamuddinItems.map(title => ({ title, category: 'International', location: 'International', type: 'Nizamuddin Jor' as const })),
  ...ukItems.map(title => ({ title, category: 'International', location: 'International', type: 'UK' as const })),
  ...canadaItems.map(title => ({ title, category: 'International', location: 'International', type: 'Canada' as const })),
  ...otherItems.map(title => ({ title, category: 'International', location: 'International', type: 'Other' as const })),
  ...indiaItems.map(title => ({ title, category: 'International', location: 'International', type: 'India' as const })),
];

export const locationOptions = [
  { value: 'all', label: 'All' },
  { value: 'national', label: 'National' },
  { value: 'gauteng', label: 'Gauteng' },
  { value: 'kzn', label: 'KZN' },
  { value: 'cape', label: 'Cape' },
  { value: 'old-workers', label: 'Old Workers' },
  { value: 'raiwind', label: 'Raiwind' },
  { value: 'tongi', label: 'Tongi' },
  { value: 'nizamuddin-jor', label: 'Nizamuddin Jor' },
  { value: 'india', label: 'India' },
  { value: 'uk', label: 'UK' },
  { value: 'canada', label: 'Canada' },
];