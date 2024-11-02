"use client";

import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

const TypeWriter: typeof Typography = ({ ...props }) => {
  const text = props.children as string;

  const [index, setIndex] = useState({ i: 0, typo: "" });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const characters = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const type = () => {
      clearTimeout(timeout);
      setIndex(({ i, typo }) => {
        if (i < text.length) {
          if (typo !== "") {
            timeout = setTimeout(type, Math.random() * 50 + 190);
            typo = "";
          } else if (i > 0 && typo === "" && Math.random() < 0.1) {
            timeout = setTimeout(type, Math.random() * 100 + 380);
            let char = Array.from(characters.difference(new Set(text[i])))[
              Math.floor(Math.random() * 25)
            ];
            if (text[i] === text[i].toLowerCase()) char = char.toLowerCase();
            typo = char;
          } else {
            timeout = setTimeout(type, Math.random() * 50 + 220);
            i = i + 1;
          }
        }
        return { i, typo };
      });
    };
    type();
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <Typography className="flex justify-center" {...props}>
      {text.slice(0, index.i) + index.typo}
      <Box
        sx={{
          marginLeft: 2,
          width: "0.1em",
          height: "1em",
          bgcolor: "primary.main",
          "@keyframes blink": {
            from: { opacity: 0 },
            "50%": { opacity: 1 },
          },
          animation: "blink 500ms infinite step-end",
        }}
      />
    </Typography>
  );
};

export { TypeWriter };