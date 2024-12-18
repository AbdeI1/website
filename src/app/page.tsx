import { Button, Stack, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

import { Fira_Code } from "next/font/google";

import { TypeWriter } from "@/components/Typewriter";

const fira_code = Fira_Code({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const links = [
  { Icon: GitHubIcon, link: "https://github.com/AbdeI1" },
  {
    Icon: LinkedInIcon,
    link: "https://www.linkedin.com/in/abdelrahman-mokbel/",
  },
  { Icon: EmailIcon, link: "mailto:abdelrahmanmmokbel@gmail.com" },
];

export default function Home() {
  return (
    <Stack spacing={8} className="h-screen justify-center">
      <TypeWriter
        variant="h1"
        color="primary"
        fontFamily={fira_code.style.fontFamily}
      >
        Abdelrahman Mokbel
      </TypeWriter>

      <Stack direction="row" spacing={4} className="justify-center">
        {links.map(({ Icon, link }, index) => (
          <Button
            disableElevation
            key={index}
            target="_blank"
            href={link}
            rel="noopener"
            variant="contained"
            sx={{
              color: "var(--variant-containedBg)",
              bgcolor: "transparent",
            }}
          >
            <Typography variant="h1">
              <Icon fontSize="inherit" />
            </Typography>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
