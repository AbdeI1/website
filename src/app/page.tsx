"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

import { Fira_Code } from "next/font/google";
import Script from "next/script";

const fira_code = Fira_Code({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

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

const Grain = () => {
  return (
    <>
      <canvas
        id="noise"
        style={{
          zIndex: 100,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.1,
        }}
      />
      <Script src="/test/noise.js" />
    </>
  );
};

export default function Home() {
  return (
    <Stack spacing={8} className="h-screen justify-center">
      <Grain />
      <TypeWriter
        variant="h1"
        color="primary"
        fontFamily={fira_code.style.fontFamily}
      >
        Abdelrahman Mokbel
      </TypeWriter>
      <Stack
        direction="row"
        spacing={2}
        className="justify-center"
        divider={<Divider orientation="vertical" variant="middle" flexItem />}
      >
        {[
          { Icon: GitHubIcon, link: "https://google.com" },
          { Icon: LinkedInIcon, link: "https://google.com" },
          { Icon: EmailIcon, link: "https://google.com" },
        ].map(({ Icon, link }, index) => (
          <Button
            key={index}
            target="_blank"
            href={link}
            rel="noopener"
            variant="text"
          >
            <Icon sx={{ fontSize: 72 }} />
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
