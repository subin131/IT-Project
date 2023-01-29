import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { BiNoEntry } from "react-icons/bi";
import HorizontalStack from "./util/HorizontalStack";

const SortByRole = () => {
  //   const handleSortBy = (e) => {
  //     const newSortName = e.target.value;
  //     let newSortBy;

  //     Object.keys(sorts).forEach((sortName) => {
  //       if (sorts[sortName] === newSortName) newSortBy = sortName;
  //     });

  //     setComments([]);
  //     setPage(0);
  //     setEnd(false);
  //     setSortBy(newSortBy);
  //   };

  const sorts = {
    admin: "Admin",
    contributor: "Contributor",
  };
  return (
    <HorizontalStack spacing={1}>
      <Typography color="text.secondary" variant="subtitle2">
        Sort by:
      </Typography>
      <Select size="small" value={sorts} sx={{ minWidth: 150 }}>
        {Object.keys(sorts).map((sortName, i) => (
          <MenuItem value={sorts[sortName]} key={i}>
            {sorts[sortName]}
          </MenuItem>
        ))}
      </Select>
    </HorizontalStack>
  );
};

export default SortByRole;
