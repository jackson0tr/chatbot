import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Avatar, Box, CardContent, Link, Typography } from "@mui/material";

export default function CardComp({ image, name, supervisorName, thesis, group }) {
  
  const truncatedName = name.length > 15 ? name.slice(0, 15) + "..." : name;
  const studentName = group.length>1 ? group[0]+", ..." :group;
  return (
    <Card sx={{ maxWidth: 345, border: "1px solid rgba(43, 1, 62, 0.4)" }}>
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", mr: 1 }}>Project Name:</Typography>
          {truncatedName}
        </Typography>
        <Typography sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", mr: 1 }}>Super. Name:</Typography>
          Dr.{supervisorName}
        </Typography>
        <Typography sx={{ display: "flex" }}>
          <Typography sx={{ fontWeight: "bold", mr: 1 }}>Group Name:</Typography>
          {studentName}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center',mt:1 }}>
          <Link href={thesis}>
            <Avatar alt="pdf logo" src="/image/pdfIcon.png" />
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
