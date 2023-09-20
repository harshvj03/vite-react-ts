import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { sumOfArray, validateAmount } from "../utils";

const Disperse = () => {
  const [error, setError] = useState<string>();

  const [val, setVal] = useState<string>("");

  const [duplicateIndex, setDuplicateIndex] = useState<number[]>([]);

  const handleChange = (e: any) => {
    setVal(e.target.value);
  };

  function validateAddress(arr: string[]) {
    let address: string[] = [];
    let err = "";
    arr.forEach((x) => {
      address.push(x.split(" ")[0]);
    });
    let index = -1;
    let duplicateIndexArr: any = [];
    address.filter((x, i) => {
      if (address.indexOf(x) !== i) {
        index = i;
        duplicateIndexArr.push(index);
        setDuplicateIndex([...duplicateIndex, index]);
        setError(`Duplicate address ${address[index]} at line ${index + 1}`);
      }

      return address.indexOf(x) !== i;
    });
    if (duplicateIndexArr.length === 0) {
      setError("");
      setDuplicateIndex([]);
    }
  }

  const onSubmit = () => {
    console.log(val, "val");
    console.log();
    if (val.length === 0) {
      setError("input can't be empty");
      return;
    }
    const arr = val.split("\n");
    console.log(arr);

    const { isValid, index } = validateAmount(arr);
    if (!isValid) {
      setError(`Line number ${index + 1} wrong amount`);
      return;
    }
    validateAddress(arr);
  };

  const combineBalances = () => {
    console.log(obj);
    const obj1 = { ...obj };
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        obj1[key] = sumOfArray(obj1[key]);
      }
    }

    const ansArray = [];
    for (const key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        ansArray.push(`${key} ${obj1[key]}`);
      }
    }

    const ans = ansArray.join("\n");
    setVal(ans);
    setError("");
    setDuplicateIndex([]);
  };

  const obj: any = {};
  const indexed: any = {};

  const duplicate: number[] = [];

  val.split("\n").forEach((x, i) => {
    let key = x.split(" ")[0];
    let val = x.split(" ")[1];
    console.log(key);
    if (obj[key]) {
      obj[key] = [...obj[key], val];
      duplicate.push(i);
    } else {
      obj[key] = [val];
      indexed[key] = i;
    }
  });

  const keepFirstOne = () => {
    const a = val.split("\n").filter((_x, i) => !duplicate.includes(i));
    console.log(a);
    setVal(a.join("\n"));
    setError("");
    setDuplicateIndex([]);
  };

  return (
    <div>
      <Typography sx={{ color: "grey" }}>Addresses with Amounts</Typography>
      <TextField
        onChange={handleChange}
        value={val}
        multiline
        rows={8}
        // variant="filled"
        fullWidth
        sx={{
          fontWeight: "600 !important",
        }}
      />
      <Typography sx={{ color: "grey" }}>
        Separated by ',' or ' ' or '='
      </Typography>

      {duplicateIndex.length > 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button sx={{ color: "red", textTransform: "none" }}>
              {"Duplicated"}
            </Button>
            <Box>
              <Button
                sx={{ color: "red", textTransform: "none" }}
                onClick={keepFirstOne}
              >
                Keep the first one{" "}
              </Button>
              <Button
                sx={{ color: "red", textTransform: "none" }}
                onClick={combineBalances}
              >
                Combine Balance{" "}
              </Button>
            </Box>
          </Box>
        </>
      )}
      {error && (
        <Alert sx={{ mt: "1rem" }} severity="error">
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        sx={{ mt: "1rem" }}
        fullWidth
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default Disperse;
