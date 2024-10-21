import {
  Button,
  Container,
  Icon,
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
      <Typography variant="h1" className="text-center">
        Abdelrahman Mokbel
      </Typography>
      <Stack direction="row" spacing={8} className="justify-center">
        <Button
          target="_blank"
          href="https://google.com"
          rel="noopener"
          variant="text"
        >
          <GitHubIcon sx={{ fontSize: 72 }} />
        </Button>
        <LinkedInIcon sx={{ fontSize: 72 }} />
        <EmailIcon sx={{ fontSize: 72 }} />
      </Stack>
    </Stack>
  );
}
