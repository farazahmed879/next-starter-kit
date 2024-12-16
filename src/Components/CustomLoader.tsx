import { LinearProgress } from "@mui/material";

const CustomLoader = ({ isLoading }: { isLoading?: boolean }) => {
  if (isLoading) return <LinearProgress color="secondary" />;
  return <></>;
};
export default CustomLoader;
