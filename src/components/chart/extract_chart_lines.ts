export const extractChartLines = (data: any): string[] => {
  const lines: { [key: string]: boolean } = {};

  data.forEach((data: any) => {
    Object.keys(data)
      .filter((value) => value != "name")
      .forEach((value) => (lines[value] = true));
  });

  return Object.keys(lines);
};
