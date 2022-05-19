import { csv } from 'd3';

const csvUrl = 'https://raw.githubusercontent.com/Jthaker19/D3_Datasest/main/a1-Cereals.csv';
export const getData = async () => {

  const data = await csv(csvUrl);

  return data;
};