import {
  Button,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Home() {
  return (
    <Stack spacing={8} className="h-screen justify-center">
      <Typography variant="h1" className="text-center" color="primary">
        Abdelrahman Mokbel
      </Typography>
      <Stack direction="row" spacing={8} className="justify-center">
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
            variant="contained"
          >
            <Icon sx={{ fontSize: 72 }} />
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
