type TData = {
  id: number;
  f1: TNode;
  f2: TNode;
  f3: TNode;
  f4: TNode;
  label: number;
};

type TNode = string;

type TOriginal = {
  E: number;
};

const data: TData[] = [
  { id: 1, f1: "A", f2: "X", f3: "P", f4: "N", label: 1 },
  { id: 2, f1: "B", f2: "Y", f3: "P", f4: "N", label: 1 },
  { id: 3, f1: "A", f2: "Y", f3: "Q", f4: "M", label: 1 },
  { id: 4, f1: "A", f2: "Y", f3: "Q", f4: "N", label: 1 },
  { id: 5, f1: "A", f2: "X", f3: "Q", f4: "N", label: 1 },
  { id: 6, f1: "B", f2: "Y", f3: "P", f4: "M", label: 0 },
  { id: 7, f1: "A", f2: "X", f3: "Q", f4: "N", label: 0 },
  { id: 8, f1: "A", f2: "Y", f3: "P", f4: "M", label: 1 },
  { id: 9, f1: "A", f2: "Y", f3: "P", f4: "N", label: 0 },
  { id: 10, f1: "B", f2: "Y", f3: "P", f4: "M", label: 0 },
  { id: 11, f1: "A", f2: "Y", f3: "P", f4: "N", label: 0 },
  { id: 12, f1: "A", f2: "Y", f3: "P", f4: "N", label: 0 },
  { id: 13, f1: "A", f2: "Y", f3: "Q", f4: "M", label: 1 },
  { id: 14, f1: "A", f2: "Y", f3: "Q", f4: "M", label: 0 },
  { id: 15, f1: "B", f2: "Y", f3: "Q", f4: "M", label: 1 },
];

console.table(data);

function roundf(num: number) {
  return Math.round(num * 10000) / 10000;
}

function filter_data(columns: number[], values: string[]) {
  if (columns.length !== values.length) {
    throw new Error("columns and values must have the same length");
  }

  const result = [];

  for (const dt of data) {
    let match = true;
    for (const col of columns) {
      if (dt[`f${col}` as keyof TData] !== values[col]) {
        match = false;
        break;
      }
    }
    if (match) {
      result.push(dt);
    }
  }

  console.table(result);
  return {
    newData: result,
    total: result.length,
    c1: result.filter((x) => x.label === 1).length,
    c0: result.filter((x) => x.label === 0).length,
  };
}


const res = filter_data([3, 2], ["P", "X"]);
console.log(res)