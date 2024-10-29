"use client";

import { useEffect, useState } from "react";

import {
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

const fira_code = Fira_Code({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const TypeWriter : typeof Typography = ({ ... props }) => {
  const text = props.children as string;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex === text.length - 1) {
          clearInterval(interval);
        }
        return prevIndex + 1;
      });
    }, Math.random() * 100 + 100);
    return () => clearInterval(interval);
  }, [ text ]);

  return <Typography { ... props }>{text.slice(0, index)}</Typography>;
}

export default function Home() {
  return (
    <Stack spacing={8} className="h-screen justify-center">
      <TypeWriter 
        variant="h1"
        className="text-center"
        color="primary"
        fontFamily={fira_code.style.fontFamily}>
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
