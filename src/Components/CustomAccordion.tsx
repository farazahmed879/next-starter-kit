import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CustomAccordion({ data = [] }: any) {
  return (
    <div>
      {data.map((e: any, key: number) => (
        <Accordion key={key}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${e?.id}-content`}
            id={`${e?.id}-header`}
          >
            <Typography component="span">{e?.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{e?.data}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
