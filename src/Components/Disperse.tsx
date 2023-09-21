import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { removeDuplicates, sumOfArray, validateAmount } from "../utils";

const Disperse = () => {
  let delimiter = /[=,\s|]/;
  const [error, setError] = useState<string>();

  const [val, setVal] = useState<string>("");

  const [duplicateIndex, setDuplicateIndex] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setIsSuccess(false);
    setVal(e.target.value);
  };

  function validateAddress(arr: string[]) {
    let address: string[] = [];
    let duplicateAddress: string[] = [];
    let lines: number[] = [];
    let err = "";
    arr.forEach((x) => {
      address.push(x.split(delimiter)[0]);
    });
    let index = -1;
    let duplicateIndexArr: any = [];
    address.filter((x, i) => {
      if (address.indexOf(x) !== i) {
        index = i;
        duplicateIndexArr.push(index);
        setDuplicateIndex([...duplicateIndex, index]);
        duplicateAddress.push(address[index]);
        lines.push(index + 1);
        // setError(`Duplicate address ${address[index]} at line ${index + 1}`);
      }

      return address.indexOf(x) !== i;
    });
    if (duplicateIndexArr.length === 0) {
      setError("");
      setDuplicateIndex([]);
      setIsSuccess(true);
    } else {
      //   let err = `Duplicate Address ${duplicateAddress.join(
      //     ", "
      //   )} on lines ${lines.join(", ")}`;
      let err: string[] = [];
      for (let i = 0; i < duplicateAddress.length; i++) {
        let errMessage = `Address ${duplicateAddress[i]} encountered duplicate in line : ${lines[i]}`;
        err.push(errMessage);
      }
      setError(err.join("\n"));
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

    const { isValid, index } = validateAmount(arr, delimiter);
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
    // setIsSuccess(true);
  };

  const obj: any = {};
  const indexed: any = {};

  const duplicate: number[] = [];

  val.split("\n").forEach((x, i) => {
    let key = x.split(delimiter)[0];
    let val = x.split(delimiter)[1];
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
    // setIsSuccess(true);
    const uniqueObj: any = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const unique = removeDuplicates(obj[key]);
        uniqueObj[key] = unique;
      }
    }

    console.log(uniqueObj);
  };

  //   let arr =
  //     val.split("\n").length > 10 ? val.split("\n") : [...Array(10).keys()];

  let arr = val.split("\n");
  return (
    <div>
      <Typography sx={{ color: "grey" }}>Addresses with Amounts</Typography>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ p: "1rem 1rem 0 1rem", background: "whitesmoke" }}>
          {arr.map((x, i) => (
            <li style={{ listStyle: "none", marginBottom: "5px" }}>{i + 1}</li>
          ))}
        </Box>
        <TextField
          onChange={handleChange}
          value={val}
          multiline
          rows={val.split("\n").length > 8 ? val.split("\n").length : 8}
          // variant="filled"
          fullWidth
          sx={{
            fontWeight: "600 !important",
            backgroundColor: "whitesmoke",
          }}
        />
      </Box>
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
                Keep the first one    
              </Button>
              <span style={{color: 'red'}}>|</span>
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

      {isSuccess && (
        <Alert sx={{ mt: "1rem" }} severity="success">
          {"Input accepted"}
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
